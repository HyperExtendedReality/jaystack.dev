import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const cities = [
    { name: 'New York', lat: 40.7128, lng: -74.0060, type: 'server' },
    { name: 'London', lat: 51.5074, lng: -0.1278, type: 'server' },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, type: 'server' },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093, type: 'client' },
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, type: 'client' },
    { name: 'São Paulo', lat: -23.5505, lng: -46.6333, type: 'client' },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, type: 'server' },
    { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, type: 'server' },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, type: 'client' },
    { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, type: 'server' },
] as const;

const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

const Globe3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    // --- Basic Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // --- Controls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // --- Globe and Globe Group ---
    const globeRadius = 5;
    const globeGroup = new THREE.Group();
    const AXIAL_TILT = 23.5 * (Math.PI / 180);
    globeGroup.rotation.z = AXIAL_TILT;
    scene.add(globeGroup);

    // --- Layer 1: Green Base Sphere ---
    const baseSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.05
    });
    const baseSphere = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, 64, 64), baseSphereMaterial);
    globeGroup.add(baseSphere);

    // --- Layer 2: Country Coastline Outlines ---
    fetch('/countries.json') // Using the provided file name
      .then(res => res.json())
      .then(data => {
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ff00,
          transparent: true,
          opacity: 0.4,
        });
        const allPoints: THREE.Vector3[] = [];
        
        // ** THE FIX: Correctly parse LineString geometry **
        data.features.forEach((feature: any) => {
          // Check for valid geometry of type LineString
          if (feature.geometry && feature.geometry.type === 'LineString') {
            const coordinates = feature.geometry.coordinates;
            for (let i = 0; i < coordinates.length - 1; i++) {
              const startCoords = coordinates[i];
              const endCoords = coordinates[i + 1];
              
              // Draw lines on a slightly larger radius to ensure they are visible over the base sphere
              const lineRadius = globeRadius + 0.01;
              const start = latLngToVector3(startCoords[1], startCoords[0], lineRadius);
              const end = latLngToVector3(endCoords[1], endCoords[0], lineRadius);
              
              allPoints.push(start, end);
            }
          }
        });

        const lineGeometry = new THREE.BufferGeometry().setFromPoints(allPoints);
        const outlines = new THREE.LineSegments(lineGeometry, lineMaterial);
        globeGroup.add(outlines);
      });
      
    // --- Layer 3: Textured Earth Surface ---
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('/earth-dark.jpeg');
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    
    const earthMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
      transparent: true,
      opacity: 0.9, // Reduced opacity to see outlines underneath
    });
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, 64, 64), earthMaterial);
    globeGroup.add(earthMesh);

    // --- City Points and Connections (rendered on the surface) ---
    const cityPoints: { mesh: THREE.Mesh; type: 'server' | 'client' }[] = [];
    cities.forEach(city => {
      const position = latLngToVector3(city.lat, city.lng, globeRadius);
      const pointSize = city.type === 'server' ? 0.07 : 0.04;
      const color = city.type === 'server' ? 0x00ff00 : 0x00c8ff;
      const pointMesh = new THREE.Mesh(
        new THREE.SphereGeometry(pointSize, 16, 16),
        new THREE.MeshBasicMaterial({ color })
      );
      pointMesh.position.copy(position);
      globeGroup.add(pointMesh);
      cityPoints.push({ mesh: pointMesh, type: city.type });
    });

    // ... (The rest of your code for connections, particles, animation, etc. remains the same)
    const connections: { curve: THREE.QuadraticBezierCurve3; particle: THREE.Mesh; speed: number; particlePosition: number; }[] = [];
    const baseLinePoints: THREE.Vector3[] = [];
    const glowLinePoints: THREE.Vector3[] = [];
    
    const servers = cityPoints.filter(p => p.type === 'server');
    const clients = cityPoints.filter(p => p.type === 'client');

    clients.forEach(client => {
      const randomServer = servers[Math.floor(Math.random() * servers.length)];
      if (!randomServer) return;

      const startVec = client.mesh.position;
      const endVec = randomServer.mesh.position;
      const distance = startVec.distanceTo(endVec);
      const controlPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5).normalize().multiplyScalar(globeRadius + distance * 0.3);
      const curve = new THREE.QuadraticBezierCurve3(startVec, controlPoint, endVec);
      const curvePoints = curve.getPoints(50);
      
      for (let i = 0; i < curvePoints.length - 1; i++) {
        baseLinePoints.push(curvePoints[i], curvePoints[i+1]);
        glowLinePoints.push(curvePoints[i], curvePoints[i+1]);
      }

      const particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 8, 8), 
          new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      globeGroup.add(particle);
      connections.push({ curve, particle, particlePosition: Math.random(), speed: Math.random() * 0.003 + 0.001 });
    });

    const baseLineGeom = new THREE.BufferGeometry().setFromPoints(baseLinePoints);
    const glowLineGeom = new THREE.BufferGeometry().setFromPoints(glowLinePoints);
    const baseLine = new THREE.LineSegments(baseLineGeom, new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.3, linewidth: 2 }));
    const glowLine = new THREE.LineSegments(glowLineGeom, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
    globeGroup.add(baseLine, glowLine);

    const clock = new THREE.Clock();
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      cityPoints.forEach(point => {
        const pulse = Math.sin(elapsedTime * 3 + point.mesh.position.x) * 0.15 + 0.9;
        point.mesh.scale.set(pulse, pulse, pulse);
      });
      
      connections.forEach(conn => {
        conn.particlePosition = (conn.particlePosition + conn.speed) % 1;
        conn.curve.getPointAt(conn.particlePosition, conn.particle.position);
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const { clientWidth, clientHeight } = currentMount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      currentMount.removeChild(renderer.domElement);
      
      scene.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
             if (Array.isArray(object.material)) {
                object.material.forEach(material => material.dispose());
             } else {
                object.material.dispose();
             }
          }
        }
      });
      earthTexture.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%' }}
      className="cursor-grab active:cursor-grabbing"
    />
  );
};

export default Globe3D;