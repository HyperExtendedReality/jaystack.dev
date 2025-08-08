import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// --- Helper Functions and Type Definitions ---

const latLngToVector3 = (lat: number, lng: number, radius: number): THREE.Vector3 => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
};

type Continent = 'North America' | 'South America' | 'Europe' | 'Africa' | 'Asia' | 'Oceania';

const getContinent = (lng: number): Continent => {
    if (lng > -125 && lng < -66) return 'North America';
    if (lng > -81 && lng < -34) return 'South America';
    if (lng > -10 && lng < 44) return 'Europe'; // Europe/Africa are grouped for simplicity
    if (lng > 100 && lng < 180) return 'Oceania';
    return 'Asia'; // Asia/Africa
};

type Server = { name: string; lat: number; lng: number };
type ServerPoint = Server & { vector: THREE.Vector3; continent: Continent };
type Connection = {
  curve: THREE.QuadraticBezierCurve3;
  packet1: { sprite: THREE.Sprite; position: number; speed: number; };
  packet2: { sprite: THREE.Sprite; position: number; speed: number; };
  trailMaterial: THREE.MeshBasicMaterial;
};

const Globe3D = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  const [trailTexture, glowTexture] = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const trail = loader.load(`${import.meta.env.BASE_URL}trail.webp`);
    trail.wrapS = THREE.RepeatWrapping;
    const glow = loader.load(`${import.meta.env.BASE_URL}glow.webp`);
    return [trail, glow];
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;
    const currentMount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = Math.PI - Math.PI / 4;

    const globeRadius = 5;
    const globeGroup = new THREE.Group();
    globeGroup.rotation.z = 23.5 * (Math.PI / 180);
    scene.add(globeGroup);

    // --- Globe Layers ---

    // Add an invisible sphere that occludes (hides) objects on the far side.
    // It's invisible because colorWrite is false, but it writes to the depth buffer.
    const occluder = new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 64, 64),
      new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true })
    );
    globeGroup.add(occluder);
    
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.05 })
    ));
    
    const earthTexture = new THREE.TextureLoader().load(`${import.meta.env.BASE_URL}earth-dark.jpeg`);
    earthTexture.colorSpace = THREE.SRGBColorSpace;
    earthTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    
    const earthMaterial = new THREE.MeshBasicMaterial({
        map: earthTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        color: 0x777777,
    });
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, 64, 64), earthMaterial);
    globeGroup.add(earthMesh);
    
    const gridPoints: THREE.Vector3[] = [];
    const gridRadius = globeRadius + 0.005; 
    for (let lat = -90; lat <= 90; lat += 15) {
      for (let lng = -180; lng <= 180; lng += 5) {
        gridPoints.push(latLngToVector3(lat, lng, gridRadius), latLngToVector3(lat, lng + 5, gridRadius));
      }
    }
    for (let lng = -180; lng <= 180; lng += 15) {
      for (let lat = -90; lat <= 90; lat += 5) {
        gridPoints.push(latLngToVector3(lat, lng, gridRadius), latLngToVector3(lat + 5, lng, gridRadius));
      }
    }
    const gridGeom = new THREE.BufferGeometry().setFromPoints(gridPoints);
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.05, depthTest: false });
    const gridLines = new THREE.LineSegments(gridGeom, gridMaterial);
    globeGroup.add(gridLines);

    const connections: Connection[] = [];
    
    Promise.all([
      fetch(`${import.meta.env.BASE_URL}countries.json`).then(res => res.json()),
      fetch(`${import.meta.env.BASE_URL}servers.json`).then(res => res.json())
    ]).then(([countriesData, serverJson]) => {
      const servers: Server[] = serverJson.servers;

      const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.75 });
      const outlinePoints: THREE.Vector3[] = [];
      countriesData.features.forEach((feature: any) => {
        if (feature.geometry?.type === 'LineString') {
          for (let i = 0; i < feature.geometry.coordinates.length - 1; i++) {
            const start = latLngToVector3(feature.geometry.coordinates[i][1], feature.geometry.coordinates[i][0], globeRadius + 0.01);
            const end = latLngToVector3(feature.geometry.coordinates[i+1][1], feature.geometry.coordinates[i+1][0], globeRadius + 0.01);
            if (start.distanceTo(end) < globeRadius * 1.5) {
              outlinePoints.push(start, end);
            }
          }
        }
      });
      globeGroup.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(outlinePoints), outlineMaterial));

      const serverPoints: ServerPoint[] = servers.map(server => ({
        ...server,
        vector: latLngToVector3(server.lat, server.lng, globeRadius),
        continent: getContinent(server.lng)
      }));
      
      const spriteMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: 0x00ff00, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
      serverPoints.forEach(server => {
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.15, 0.15, 1);
        sprite.position.copy(server.vector);
        globeGroup.add(sprite);
      });
      
      const establishedConnections = new Set<string>();
      const createConnection = (start: ServerPoint, end: ServerPoint) => {
          const key = `${Math.min(serverPoints.indexOf(start), serverPoints.indexOf(end))}-${Math.max(serverPoints.indexOf(start), serverPoints.indexOf(end))}`;
          if (establishedConnections.has(key)) return;
          establishedConnections.add(key);

          const distance = start.vector.distanceTo(end.vector);
          // MODIFICATION: Increased the arc height factor to prevent long connections from
          // visually clipping through the globe. This makes the arcs more pronounced.
          const arcHeight = distance * distance * 0.0625;
          const controlPoint = start.vector.clone().lerp(end.vector, 0.5).normalize().multiplyScalar(globeRadius + arcHeight);
          
          const curve = new THREE.QuadraticBezierCurve3(start.vector, controlPoint, end.vector);
          
          const tubeGeom = new THREE.TubeGeometry(curve, 32, 0.005, 8, false);
          const trailMaterial = new THREE.MeshBasicMaterial({ map: trailTexture, transparent: true, blending: THREE.AdditiveBlending, color: 0xffffff });
          globeGroup.add(new THREE.Mesh(tubeGeom, trailMaterial));
          
          const packetMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: 0xffffff, transparent: true, blending: THREE.AdditiveBlending });
          const packet1 = new THREE.Sprite(packetMaterial.clone());
          packet1.scale.set(0.08, 0.08, 1);
          const packet2 = new THREE.Sprite(packetMaterial.clone());
          packet2.scale.set(0.08, 0.08, 1);
          globeGroup.add(packet1, packet2);

          connections.push({
            curve,
            trailMaterial,
            packet1: { sprite: packet1, position: Math.random(), speed: Math.random() * 0.02 + 0.005 },
            packet2: { sprite: packet2, position: Math.random(), speed: Math.random() * 0.02 + 0.005 },
          });
      };
      
      // --- THE NEW CONNECTION ALGORITHM ---
      
      const serversByContinent = new Map<Continent, ServerPoint[]>();
      serverPoints.forEach(p => {
        if (!serversByContinent.has(p.continent)) serversByContinent.set(p.continent, []);
        serversByContinent.get(p.continent)!.push(p);
      });

      // 1. Identify Gateways
      const gateways = new Map<Continent, ServerPoint>();
      for (const [continent, points] of serversByContinent.entries()) {
        let bestGateway: ServerPoint | null = null;
        let minAvgDist = Infinity;
        
        for (const candidate of points) {
          let totalDist = 0;
          let otherCount = 0;
          for (const other of serverPoints) {
            if (other.continent !== continent) {
              totalDist += candidate.vector.distanceTo(other.vector);
              otherCount++;
            }
          }
          const avgDist = totalDist / otherCount;
          if (avgDist < minAvgDist) {
            minAvgDist = avgDist;
            bestGateway = candidate;
          }
        }
        if (bestGateway) gateways.set(continent, bestGateway);
      }
      const gatewayList = Array.from(gateways.values());

      // 2. Connect Gateways (Intercontinental Backbone)
      for(let i=0; i < gatewayList.length; i++) {
        for(let j=i+1; j < gatewayList.length; j++) {
            createConnection(gatewayList[i], gatewayList[j]);
        }
      }

      // 3. Connect regional servers to their gateway (Spoke-to-Hub)
      for (const [continent, points] of serversByContinent.entries()) {
          const gateway = gateways.get(continent);
          if (gateway) {
              points.forEach(point => {
                  if (point !== gateway) {
                      createConnection(point, gateway);
                  }
              });
          }
      }
      
      // MODIFICATION: Connect to the 2 nearest neighbors for denser, more realistic peering.
      // This increases the chance of connections like Hawaii-Japan.
      const PEERS_TO_CONNECT = 2;
      serverPoints.forEach(startServer => {
          const nearestPeers = serverPoints
            .filter(p => p.name !== startServer.name)
            .sort((a,b) => startServer.vector.distanceTo(a.vector) - startServer.vector.distanceTo(b.vector));
          
          for (let i = 0; i < PEERS_TO_CONNECT; i++) {
              if (nearestPeers[i]) {
                  createConnection(startServer, nearestPeers[i]);
              }
          }
      });

    });

    const animate = () => {
      requestAnimationFrame(animate);
      connections.forEach(conn => {
        if (conn.trailMaterial.map) conn.trailMaterial.map.offset.x -= 0.0005;
        conn.packet1.position = (conn.packet1.position + conn.packet1.speed) % 1;
        conn.packet2.position = (conn.packet2.position + conn.packet2.speed) % 1;
        conn.curve.getPointAt(conn.packet1.position, conn.packet1.sprite.position);
        conn.curve.getPointAt(1 - conn.packet2.position, conn.packet2.sprite.position);
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        if (currentMount) {
            camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      currentMount.removeChild(renderer.domElement);
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineSegments || obj instanceof THREE.Sprite) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(mat => mat.dispose());
          else obj.material?.dispose();
        }
      });
      earthTexture.dispose();
      trailTexture.dispose();
      glowTexture.dispose();
    };
  }, [trailTexture, glowTexture]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', touchAction: 'none' }} className="cursor-grab active:cursor-grabbing" />;
};

export default Globe3D;
