
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

    let rotation = 0;
    const connections: Array<{ from: number; to: number; opacity: number }> = [];
    const points: Array<{ x: number; y: number; z: number; lat: number; lng: number }> = [];

    // Generate random points on sphere
    const generatePoints = () => {
      for (let i = 0; i < 50; i++) {
        const lat = (Math.random() - 0.5) * Math.PI;
        const lng = Math.random() * 2 * Math.PI;
        const x = radius * Math.cos(lat) * Math.cos(lng);
        const y = radius * Math.cos(lat) * Math.sin(lng);
        const z = radius * Math.sin(lat);
        points.push({ x, y, z, lat, lng });
      }
    };

    // Generate connections
    const generateConnections = () => {
      for (let i = 0; i < 30; i++) {
        const from = Math.floor(Math.random() * points.length);
        let to = Math.floor(Math.random() * points.length);
        while (to === from) {
          to = Math.floor(Math.random() * points.length);
        }
        connections.push({ from, to, opacity: Math.random() * 0.5 + 0.1 });
      }
    };

    generatePoints();
    generateConnections();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw globe wireframe
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
      ctx.lineWidth = 1;

      // Draw latitude lines
      for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += Math.PI/6) {
        ctx.beginPath();
        for (let lng = 0; lng <= 2 * Math.PI; lng += 0.1) {
          const x = centerX + radius * Math.cos(lat) * Math.cos(lng + rotation);
          const y = centerY + radius * Math.cos(lat) * Math.sin(lng + rotation);
          const z = radius * Math.sin(lat);
          
          if (z > -radius * 0.5) { // Only draw front hemisphere
            if (lng === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw longitude lines
      for (let lng = 0; lng < 2 * Math.PI; lng += Math.PI/6) {
        ctx.beginPath();
        for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += 0.1) {
          const x = centerX + radius * Math.cos(lat) * Math.cos(lng + rotation);
          const y = centerY + radius * Math.cos(lat) * Math.sin(lng + rotation);
          const z = radius * Math.sin(lat);
          
          if (z > -radius * 0.5) { // Only draw front hemisphere
            if (lat === -Math.PI/2) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw connection points
      points.forEach(point => {
        const x = centerX + point.x * Math.cos(rotation) - point.y * Math.sin(rotation);
        const y = centerY + point.y * Math.cos(rotation) + point.x * Math.sin(rotation);
        const z = point.z;

        if (z > -radius * 0.5) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // Draw connections
      connections.forEach(connection => {
        const fromPoint = points[connection.from];
        const toPoint = points[connection.to];

        const fromX = centerX + fromPoint.x * Math.cos(rotation) - fromPoint.y * Math.sin(rotation);
        const fromY = centerY + fromPoint.y * Math.cos(rotation) + fromPoint.x * Math.sin(rotation);
        const fromZ = fromPoint.z;

        const toX = centerX + toPoint.x * Math.cos(rotation) - toPoint.y * Math.sin(rotation);
        const toY = centerY + toPoint.y * Math.cos(rotation) + toPoint.x * Math.sin(rotation);
        const toZ = toPoint.z;

        if (fromZ > -radius * 0.5 && toZ > -radius * 0.5) {
          ctx.strokeStyle = `rgba(0, 255, 0, ${connection.opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
        }

        // Animate connection opacity
        connection.opacity += (Math.random() - 0.5) * 0.02;
        connection.opacity = Math.max(0.1, Math.min(0.6, connection.opacity));
      });

      rotation += 0.005;
    };

    const interval = setInterval(draw, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="opacity-80"
    />
  );
};

export default Globe3D;
