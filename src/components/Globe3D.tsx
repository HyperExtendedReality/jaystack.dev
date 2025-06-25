
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
    const connections: Array<{ from: number; to: number; opacity: number; pulse: number }> = [];
    const points: Array<{ x: number; y: number; z: number; lat: number; lng: number; pulse: number }> = [];

    // Generate random points on sphere surface
    const generatePoints = () => {
      for (let i = 0; i < 80; i++) {
        const lat = (Math.random() - 0.5) * Math.PI;
        const lng = Math.random() * 2 * Math.PI;
        points.push({ 
          x: 0, y: 0, z: 0, 
          lat, lng, 
          pulse: Math.random() * Math.PI * 2 
        });
      }
    };

    // Generate connections between points
    const generateConnections = () => {
      for (let i = 0; i < 60; i++) {
        const from = Math.floor(Math.random() * points.length);
        let to = Math.floor(Math.random() * points.length);
        while (to === from) {
          to = Math.floor(Math.random() * points.length);
        }
        connections.push({ 
          from, 
          to, 
          opacity: Math.random() * 0.5 + 0.2,
          pulse: Math.random() * Math.PI * 2
        });
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

    generatePoints();
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
      });

      // Draw globe wireframe (latitude and longitude lines)
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.15)';
      ctx.lineWidth = 1;

      // Draw latitude lines
      for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/8) {
        ctx.beginPath();
        let firstPoint = true;
        for (let lng = 0; lng <= 2 * Math.PI; lng += 0.1) {
          const pos3D = sphericalTo3D(lat, lng);
          const rotated = rotate3D(pos3D.x, pos3D.y, pos3D.z);
          
          if (rotated.z > -radius * 0.3) { // Only draw visible parts
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
      for (let lng = 0; lng < 2 * Math.PI; lng += Math.PI/8) {
        ctx.beginPath();
        let firstPoint = true;
        for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += 0.1) {
          const pos3D = sphericalTo3D(lat, lng);
          const rotated = rotate3D(pos3D.x, pos3D.y, pos3D.z);
          
          if (rotated.z > -radius * 0.3) { // Only draw visible parts
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

      // Draw connections first (behind points)
      connections.forEach(connection => {
        const fromPoint = points[connection.from];
        const toPoint = points[connection.to];

        if (fromPoint.z > -radius * 0.5 && toPoint.z > -radius * 0.5) {
          const fromProjected = project3D(fromPoint.x, fromPoint.y, fromPoint.z);
          const toProjected = project3D(toPoint.x, toPoint.y, toPoint.z);

          // Animate connection opacity with pulse effect
          connection.pulse += 0.03;
          const pulseOpacity = (Math.sin(connection.pulse) + 1) * 0.5;
          const opacity = connection.opacity * pulseOpacity * 0.6;

          ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(fromProjected.x, fromProjected.y);
          ctx.lineTo(toProjected.x, toProjected.y);
          ctx.stroke();
        }
      });

      // Draw connection points
      visiblePoints.forEach(point => {
        const projected = project3D(point.x, point.y, point.z);
        
        // Calculate depth-based brightness and size
        const depthFactor = (point.z + radius) / (2 * radius);
        const brightness = 0.3 + depthFactor * 0.7;
        const size = 1.5 + depthFactor * 2;
        
        // Pulsing effect
        const pulseSize = Math.sin(point.pulse) * 0.5 + 1;
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          projected.x, projected.y, 0,
          projected.x, projected.y, size * pulseSize * 3
        );
        gradient.addColorStop(0, `rgba(0, 255, 0, ${brightness * 0.8})`);
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size * pulseSize * 3, 0, 2 * Math.PI);
        ctx.fill();

        // Draw the point itself
        ctx.fillStyle = `rgba(0, 255, 0, ${brightness})`;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size * pulseSize, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Increment rotation for continuous animation
      rotationY += 0.005;
      rotationX += 0.002;
    };

    const interval = setInterval(draw, 50);

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
