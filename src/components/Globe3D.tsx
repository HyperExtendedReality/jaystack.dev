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
type CountriesData = {
  features: Array<{
    geometry?: {
      type: string;
      coordinates: number[][];
    };
  }>;
};
type ServerData = { servers: Server[] };
type ServerPoint = Server & { vector: THREE.Vector3; continent: Continent };
type ConnectionKind = 'backbone' | 'regional' | 'peering' | 'cloudflare';
type Connection = {
  curve: THREE.QuadraticBezierCurve3;
  packet1: { sprite: THREE.Sprite; position: number; speed: number; };
  packet2: { sprite: THREE.Sprite; position: number; speed: number; };
  trailMaterial: THREE.MeshBasicMaterial;
};

const connectionStyles: Record<ConnectionKind, {
  trail: number;
  packet: number;
  opacity: number;
  radius: number;
}> = {
  backbone: { trail: 0x22d3ee, packet: 0x67e8f9, opacity: 0.72, radius: 0.007 },
  regional: { trail: 0xa78bfa, packet: 0xc4b5fd, opacity: 0.54, radius: 0.006 },
  peering: { trail: 0x4ade80, packet: 0x86efac, opacity: 0.42, radius: 0.005 },
  cloudflare: { trail: 0xf48120, packet: 0xfbbf24, opacity: 0.92, radius: 0.009 },
};

// A representative edge route, rather than a literal map of Cloudflare's private topology.
const cloudflareRoute = [
  'Seattle, USA',
  'Chicago, USA',
  'New York, USA',
  'London, UK',
  'Frankfurt, Germany',
  'Mumbai, India',
  'Singapore',
  'Tokyo, Japan',
  'Los Angeles, USA',
  'Dallas, USA',
  'Miami, USA',
  'São Paulo, Brazil',
];

const Globe3D = ({ cameraZ = 15 }: { cameraZ?: number }) => {
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
    const isCompact = currentMount.clientWidth < 480;
    const sphereSegments = isCompact ? 40 : 64;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompact ? 1.35 : 1.75));
    currentMount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
      new THREE.SphereGeometry(globeRadius, sphereSegments, sphereSegments),
      new THREE.MeshBasicMaterial({ colorWrite: false, depthWrite: true })
    );
    globeGroup.add(occluder);
    
    globeGroup.add(new THREE.Mesh(
      new THREE.SphereGeometry(globeRadius, sphereSegments, sphereSegments),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.05 })
    ));
    
    // A procedural surface keeps the globe lightweight and avoids blocking the hero
    // on a large earth texture. Country outlines provide the geographic detail.
    const earthMaterial = new THREE.MeshBasicMaterial({
        color: 0x063b19,
        transparent: true,
        opacity: 0.22,
    });
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(globeRadius, sphereSegments, sphereSegments), earthMaterial);
    globeGroup.add(earthMesh);
    
    const gridPoints: THREE.Vector3[] = [];
    const gridRadius = globeRadius + 0.005;
    const gridLineStep = isCompact ? 30 : 15;
    const gridSegmentStep = isCompact ? 10 : 5;
    for (let lat = -90; lat <= 90; lat += gridLineStep) {
      for (let lng = -180; lng <= 180; lng += gridSegmentStep) {
        gridPoints.push(latLngToVector3(lat, lng, gridRadius), latLngToVector3(lat, lng + gridSegmentStep, gridRadius));
      }
    }
    for (let lng = -180; lng <= 180; lng += gridLineStep) {
      for (let lat = -90; lat <= 90; lat += gridSegmentStep) {
        gridPoints.push(latLngToVector3(lat, lng, gridRadius), latLngToVector3(lat + gridSegmentStep, lng, gridRadius));
      }
    }
    const gridGeom = new THREE.BufferGeometry().setFromPoints(gridPoints);
    const gridMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.05, depthTest: false });
    const gridLines = new THREE.LineSegments(gridGeom, gridMaterial);
    globeGroup.add(gridLines);

    const connections: Connection[] = [];
    
    const requestController = new AbortController();
    const fetchJson = <T,>(path: string): Promise<T> =>
      fetch(`${import.meta.env.BASE_URL}${path}`, { signal: requestController.signal }).then((response) => {
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.json() as Promise<T>;
      });

    Promise.all([
      fetchJson<CountriesData>('countries.json'),
      fetchJson<ServerData>('servers.json')
    ]).then(([countriesData, serverJson]) => {
      const servers: Server[] = serverJson.servers;

      const outlineMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.75 });
      const outlinePoints: THREE.Vector3[] = [];
      countriesData.features.forEach((feature) => {
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
      const createConnection = (start: ServerPoint, end: ServerPoint, kind: ConnectionKind) => {
          // Internet route categories share a lane; the orange edge network can overlay them.
          const network = kind === 'cloudflare' ? kind : 'internet';
          const key = `${network}:${Math.min(serverPoints.indexOf(start), serverPoints.indexOf(end))}-${Math.max(serverPoints.indexOf(start), serverPoints.indexOf(end))}`;
          if (establishedConnections.has(key)) return;
          establishedConnections.add(key);

          const style = connectionStyles[kind];
          const distance = start.vector.distanceTo(end.vector);
          // MODIFICATION: Increased the arc height factor to prevent long connections from
          // visually clipping through the globe. This makes the arcs more pronounced.
          const arcHeight = distance * distance * 0.0625 + (kind === 'cloudflare' ? 0.12 : 0);
          const controlPoint = start.vector.clone().lerp(end.vector, 0.5).normalize().multiplyScalar(globeRadius + arcHeight);
          
          const curve = new THREE.QuadraticBezierCurve3(start.vector, controlPoint, end.vector);
          
          const tubeGeom = new THREE.TubeGeometry(curve, isCompact ? 20 : 32, style.radius, isCompact ? 5 : 8, false);
          const trailMaterial = new THREE.MeshBasicMaterial({
            map: trailTexture,
            transparent: true,
            opacity: style.opacity,
            blending: THREE.AdditiveBlending,
            color: style.trail,
          });
          globeGroup.add(new THREE.Mesh(tubeGeom, trailMaterial));
          
          const packetMaterial = new THREE.SpriteMaterial({
            map: glowTexture,
            color: style.packet,
            transparent: true,
            opacity: kind === 'cloudflare' ? 1 : 0.82,
            blending: THREE.AdditiveBlending,
          });
          const packet1 = new THREE.Sprite(packetMaterial.clone());
          const packetScale = kind === 'cloudflare' ? 0.11 : 0.08;
          packet1.scale.set(packetScale, packetScale, 1);
          const packet2 = new THREE.Sprite(packetMaterial.clone());
          packet2.scale.set(packetScale, packetScale, 1);
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
            createConnection(gatewayList[i], gatewayList[j], 'backbone');
        }
      }

      // 3. Connect regional servers to their gateway (Spoke-to-Hub)
      for (const [continent, points] of serversByContinent.entries()) {
          const gateway = gateways.get(continent);
          if (gateway) {
              points.forEach(point => {
                  if (point !== gateway) {
                      createConnection(point, gateway, 'regional');
                  }
              });
          }
      }
      
      // MODIFICATION: Connect to the 2 nearest neighbors for denser, more realistic peering.
      // This increases the chance of connections like Hawaii-Japan.
      const PEERS_TO_CONNECT = isCompact ? 1 : 2;
      serverPoints.forEach(startServer => {
          const nearestPeers = serverPoints
            .filter(p => p.name !== startServer.name)
            .sort((a,b) => startServer.vector.distanceTo(a.vector) - startServer.vector.distanceTo(b.vector));
          
          for (let i = 0; i < PEERS_TO_CONNECT; i++) {
              if (nearestPeers[i]) {
                  createConnection(startServer, nearestPeers[i], 'peering');
              }
          }
      });

      // Add a high-contrast edge network across representative Cloudflare metros.
      const serverByName = new Map(serverPoints.map((server) => [server.name, server]));
      const cloudflarePoints = cloudflareRoute
        .map((name) => serverByName.get(name))
        .filter((server): server is ServerPoint => Boolean(server));
      const cloudflareNodeMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: connectionStyles.cloudflare.trail,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });

      cloudflarePoints.forEach((server, index) => {
        const node = new THREE.Sprite(cloudflareNodeMaterial.clone());
        node.scale.set(0.19, 0.19, 1);
        node.position.copy(server.vector);
        globeGroup.add(node);

        const next = cloudflarePoints[(index + 1) % cloudflarePoints.length];
        createConnection(server, next, 'cloudflare');
      });
      cloudflareNodeMaterial.dispose();

      const addCloudflareLink = (from: string, to: string) => {
        const start = serverByName.get(from);
        const end = serverByName.get(to);
        if (start && end) createConnection(start, end, 'cloudflare');
      };
      addCloudflareLink('Miami, USA', 'N. Virginia, USA');
      addCloudflareLink('N. Virginia, USA', 'London, UK');
      addCloudflareLink('London, UK', 'Johannesburg, South Africa');
      addCloudflareLink('Johannesburg, South Africa', 'Mumbai, India');
      addCloudflareLink('Singapore', 'Sydney, Australia');
      addCloudflareLink('Sydney, Australia', 'Los Angeles, USA');

    }).catch((error) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      console.warn('Globe data could not be loaded.', error);
    });

    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
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
      requestController.abort();
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (renderer.domElement.parentNode === currentMount) currentMount.removeChild(renderer.domElement);
      scene.traverse(obj => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.LineSegments || obj instanceof THREE.Sprite) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(mat => mat.dispose());
          else obj.material?.dispose();
        }
      });
      trailTexture.dispose();
      glowTexture.dispose();
    };
  }, [trailTexture, glowTexture, cameraZ]);

  return (
    <div className="relative h-full w-full">
      <div
        ref={mountRef}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
        className="cursor-grab active:cursor-grabbing"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1 top-1 flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/55 backdrop-blur-sm sm:right-3 sm:top-3 sm:gap-3 sm:px-3 sm:text-[9px] sm:tracking-[0.15em]"
      >
        <span className="inline-flex items-center gap-1.5">
          <span className="h-px w-4 bg-gradient-to-r from-cyan-400 via-violet-400 to-green-400 sm:w-5" />
          Internet
        </span>
        <span className="inline-flex items-center gap-1.5 text-orange-300/80">
          <span className="h-px w-4 bg-orange-400 sm:w-5" />
          Cloudflare edge
        </span>
      </div>
    </div>
  );
};

export default Globe3D;
