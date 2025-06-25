
import { useEffect, useRef } from 'react';

const Globe3D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.35;

    let rotationX = 0;
    let rotationY = 0;
    
    // Major cities and their approximate coordinates
    const cities = [
      { name: 'New York', lat: 40.7128, lng: -74.0060, type: 'server' },
      { name: 'London', lat: 51.5074, lng: -0.1278, type: 'server' },
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503, type: 'server' },
      { name: 'Sydney', lat: -33.8688, lng: 151.2093, type: 'client' },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777, type: 'client' },
      { name: 'São Paulo', lat: -23.5505, lng: -46.6333, type: 'client' },
      { name: 'Dubai', lat: 25.2048, lng: 55.2708, type: 'server' },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198, type: 'server' },
      { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, type: 'server' },
      { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, type: 'client' },
      { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, type: 'server' },
      { name: 'Stockholm', lat: 59.3293, lng: 18.0686, type: 'client' },
      { name: 'Cape Town', lat: -33.9249, lng: 18.4241, type: 'client' },
      { name: 'Moscow', lat: 55.7558, lng: 37.6176, type: 'client' },
      { name: 'Seoul', lat: 37.5665, lng: 126.9780, type: 'server' },
      { name: 'Mexico City', lat: 19.4326, lng: -99.1332, type: 'client' },
      { name: 'Toronto', lat: 43.6532, lng: -79.3832, type: 'client' },
      { name: 'Berlin', lat: 52.5200, lng: 13.4050, type: 'server' },
      { name: 'Paris', lat: 48.8566, lng: 2.3522, type: 'client' },
      { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, type: 'server' }
    ];

    const connections: Array<{ 
      from: number; 
      to: number; 
      opacity: number; 
      pulse: number;
      speed: number;
      particlePosition: number;
      type: 'server-server' | 'client-server' | 'client-client';
    }> = [];

    const points: Array<{ 
      x: number; y: number; z: number; 
      lat: number; lng: number; 
      pulse: number;
      name: string;
      type: 'server' | 'client';
      activity: number;
    }> = [];

    // Convert cities to 3D points
    cities.forEach(city => {
      const lat = city.lat * Math.PI / 180;
      const lng = city.lng * Math.PI / 180;
      points.push({
        x: 0, y: 0, z: 0,
        lat, lng,
        pulse: Math.random() * Math.PI * 2,
        name: city.name,
        type: city.type,
        activity: Math.random()
      });
    });

    // Generate intelligent connections based on real internet infrastructure patterns
    const generateConnections = () => {
      const servers = points.filter(p => p.type === 'server');
      const clients = points.filter(p => p.type === 'client');

      // Server-to-server backbone connections (major internet hubs)
      for (let i = 0; i < servers.length; i++) {
        for (let j = i + 1; j < servers.length; j++) {
          if (Math.random() < 0.4) { // 40% chance for server-server connection
            const serverIndex1 = points.indexOf(servers[i]);
            const serverIndex2 = points.indexOf(servers[j]);
            connections.push({
              from: serverIndex1,
              to: serverIndex2,
              opacity: Math.random() * 0.3 + 0.4,
              pulse: Math.random() * Math.PI * 2,
              speed: Math.random() * 0.02 + 0.01,
              particlePosition: 0,
              type: 'server-server'
            });
          }
        }
      }

      // Client-to-server connections (users connecting to services)
      clients.forEach(client => {
        const clientIndex = points.indexOf(client);
        // Each client connects to 1-3 servers
        const numConnections = Math.floor(Math.random() * 3) + 1;
        const shuffledServers = [...servers].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < Math.min(numConnections, shuffledServers.length); i++) {
          const serverIndex = points.indexOf(shuffledServers[i]);
          connections.push({
            from: clientIndex,
            to: serverIndex,
            opacity: Math.random() * 0.2 + 0.2,
            pulse: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.03 + 0.015,
            particlePosition: Math.random(),
            type: 'client-server'
          });
        }
      });

      // Some client-to-client connections (P2P traffic)
      for (let i = 0; i < clients.length; i++) {
        if (Math.random() < 0.15) { // 15% chance for P2P connection
          const otherClient = clients[Math.floor(Math.random() * clients.length)];
          if (otherClient !== clients[i]) {
            const clientIndex1 = points.indexOf(clients[i]);
            const clientIndex2 = points.indexOf(otherClient);
            connections.push({
              from: clientIndex1,
              to: clientIndex2,
              opacity: Math.random() * 0.15 + 0.1,
              pulse: Math.random() * Math.PI * 2,
              speed: Math.random() * 0.025 + 0.02,
              particlePosition: Math.random(),
              type: 'client-client'
            });
          }
        }
      }
    };

    // Convert spherical coordinates to 3D cartesian
    const sphericalTo3D = (lat: number, lng: number) => {
      const x = radius * Math.cos(lat) * Math.cos(lng);
      const y = radius * Math.sin(lat);
      const z = radius * Math.cos(lat) * Math.sin(lng);
      return { x, y, z };
    };

    // Rotate point in 3D space
    const rotate3D = (x: number, y: number, z: number) => {
      // Rotate around Y axis
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      
      // Rotate around X axis
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      
      return { x: x1, y: y1, z: z2 };
    };

    // Project 3D point to 2D screen
    const project3D = (x: number, y: number, z: number) => {
      const perspective = 800;
      const scale = perspective / (perspective + z);
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        scale: scale
      };
    };

    // Calculate point on sphere surface between two points for curved connections
    const getArcPoint = (point1: any, point2: any, t: number) => {
      // Spherical interpolation (slerp) for smooth curves on sphere surface
      const dot = point1.x * point2.x + point1.y * point2.y + point1.z * point2.z;
      const theta = Math.acos(Math.max(-1, Math.min(1, dot / (radius * radius))));
      
      if (theta < 0.001) return point1; // Points too close
      
      const sinTheta = Math.sin(theta);
      const a = Math.sin((1 - t) * theta) / sinTheta;
      const b = Math.sin(t * theta) / sinTheta;
      
      return {
        x: a * point1.x + b * point2.x,
        y: a * point1.y + b * point2.y,
        z: a * point1.z + b * point2.z
      };
    };

    generateConnections();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update point positions
      points.forEach(point => {
        const pos3D = sphericalTo3D(point.lat, point.lng);
        const rotated = rotate3D(pos3D.x, pos3D.y, pos3D.z);
        point.x = rotated.x;
        point.y = rotated.y;
        point.z = rotated.z;
        point.pulse += 0.05;
        point.activity = Math.sin(point.pulse * 0.7) * 0.3 + 0.7;
      });

      // Draw globe wireframe (simplified for performance)
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.lineWidth = 1;

      // Draw latitude lines
      for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/4) {
        ctx.beginPath();
        let firstPoint = true;
        for (let lng = 0; lng <= 2 * Math.PI; lng += 0.2) {
          const pos3D = sphericalTo3D(lat, lng);
          const rotated = rotate3D(pos3D.x, pos3D.y, pos3D.z);
          
          if (rotated.z > -radius * 0.3) {
            const projected = project3D(rotated.x, rotated.y, rotated.z);
            if (firstPoint) {
              ctx.moveTo(projected.x, projected.y);
              firstPoint = false;
            } else {
              ctx.lineTo(projected.x, projected.y);
            }
          } else {
            firstPoint = true;
          }
        }
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lng = 0; lng < 2 * Math.PI; lng += Math.PI/4) {
        ctx.beginPath();
        let firstPoint = true;
        for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += 0.2) {
          const pos3D = sphericalTo3D(lat, lng);
          const rotated = rotate3D(pos3D.x, pos3D.y, pos3D.z);
          
          if (rotated.z > -radius * 0.3) {
            const projected = project3D(rotated.x, rotated.y, rotated.z);
            if (firstPoint) {
              ctx.moveTo(projected.x, projected.y);
              firstPoint = false;
            } else {
              ctx.lineTo(projected.x, projected.y);
            }
          } else {
            firstPoint = true;
          }
        }
        ctx.stroke();
      }

      // Sort points by z-depth for proper rendering
      const visiblePoints = points
        .map((point, index) => ({ ...point, index }))
        .filter(point => point.z > -radius * 0.5)
        .sort((a, b) => a.z - b.z);

      // Draw curved connections with animated particles
      connections.forEach(connection => {
        const fromPoint = points[connection.from];
        const toPoint = points[connection.to];

        if (fromPoint.z > -radius * 0.5 && toPoint.z > -radius * 0.5) {
          // Draw curved connection line
          ctx.strokeStyle = connection.type === 'server-server' 
            ? `rgba(0, 255, 0, ${connection.opacity * 0.8})` 
            : connection.type === 'client-server'
            ? `rgba(0, 200, 255, ${connection.opacity * 0.6})`
            : `rgba(255, 100, 0, ${connection.opacity * 0.4})`;
          ctx.lineWidth = connection.type === 'server-server' ? 2 : 1;
          
          ctx.beginPath();
          let firstPoint = true;
          
          // Draw arc between points
          for (let t = 0; t <= 1; t += 0.05) {
            const arcPoint = getArcPoint(fromPoint, toPoint, t);
            const projected = project3D(arcPoint.x, arcPoint.y, arcPoint.z);
            
            if (firstPoint) {
              ctx.moveTo(projected.x, projected.y);
              firstPoint = false;
            } else {
              ctx.lineTo(projected.x, projected.y);
            }
          }
          ctx.stroke();

          // Animate particle along connection
          connection.particlePosition += connection.speed;
          if (connection.particlePosition > 1) {
            connection.particlePosition = 0;
          }

          // Draw moving particle
          const particlePoint = getArcPoint(fromPoint, toPoint, connection.particlePosition);
          const particleProjected = project3D(particlePoint.x, particlePoint.y, particlePoint.z);
          
          const gradient = ctx.createRadialGradient(
            particleProjected.x, particleProjected.y, 0,
            particleProjected.x, particleProjected.y, 4
          );
          gradient.addColorStop(0, connection.type === 'server-server' 
            ? 'rgba(0, 255, 0, 0.8)' 
            : 'rgba(0, 200, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(particleProjected.x, particleProjected.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Draw cities/nodes
      visiblePoints.forEach(point => {
        const projected = project3D(point.x, point.y, point.z);
        
        // Calculate depth-based brightness and size
        const depthFactor = (point.z + radius) / (2 * radius);
        const brightness = 0.4 + depthFactor * 0.6;
        const baseSize = point.type === 'server' ? 3 : 2;
        const size = baseSize + depthFactor * 2;
        
        // Activity-based pulsing
        const pulseSize = point.activity;
        
        // Different colors for servers vs clients
        const color = point.type === 'server' ? 'rgba(0, 255, 0,' : 'rgba(0, 200, 255,';
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          projected.x, projected.y, 0,
          projected.x, projected.y, size * pulseSize * 4
        );
        gradient.addColorStop(0, `${color} ${brightness * 0.8})`);
        gradient.addColorStop(1, `${color} 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size * pulseSize * 4, 0, 2 * Math.PI);
        ctx.fill();

        // Draw the node itself
        ctx.fillStyle = `${color} ${brightness})`;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size * pulseSize, 0, 2 * Math.PI);
        ctx.fill();

        // Draw city labels for major nodes (when they're in front and large enough)
        if (point.type === 'server' && depthFactor > 0.6 && size > 4) {
          ctx.fillStyle = `rgba(0, 255, 0, ${brightness * 0.7})`;
          ctx.font = '10px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(point.name, projected.x, projected.y - size * 2);
        }
      });

      // Increment rotation for continuous animation
      rotationY += 0.004;
      rotationX += 0.001;
    };

    const interval = setInterval(draw, 40); // Slightly slower for better performance

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={350}
      height={350}
      className="opacity-90"
    />
  );
};

export default Globe3D;
