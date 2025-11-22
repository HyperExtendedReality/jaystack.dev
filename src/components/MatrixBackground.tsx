import { useEffect, useRef } from 'react';

// --- For reusability, we can define props for customization ---
interface ConsoleLogBackgroundProps {
  /** The font size of the log text */
  fontSize?: number;
  /** The interval in milliseconds to add a new line */
  newLineInterval?: number;
  /** Opacity of the canvas element */
  opacity?: number;
}
// --- Define a type for our log lines for better structure ---
interface LogLine {
  text: string;
  color: string;
}

// --- Helper functions to generate realistic logs ---

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomIp = () => `${getRandomInt(10, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(1, 254)}`;
const getTimestamp = () => new Date().toISOString();
const getSyslogTimestamp = () => {
    const date = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate().toString().padStart(2, ' ')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

const generateLogLine = (): LogLine => {
  const logTypes = ['nginx', 'syslog', 'auth', 'kernel', 'app'];
  const type = logTypes[Math.floor(Math.random() * logTypes.length)];

  let text = '';
  // Muted, realistic terminal colors
  let color = '#86efac'; // Muted green (Tailwind green-300)

  switch (type) {
    case 'nginx':
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD'];
      const paths = ['/api/v1/users', '/assets/main.css', '/dashboard', '/login', '/api/status', '/static/js/bundle.js'];
      const statusCodes = [200, 201, 304, 401, 403, 404, 500];
      const method = methods[Math.floor(Math.random() * methods.length)];
      const path = paths[Math.floor(Math.random() * paths.length)];
      const code = statusCodes[Math.floor(Math.random() * statusCodes.length)];
      text = `${getRandomIp()} - - [${getTimestamp()}] "${method} ${path} HTTP/1.1" ${code} ${getRandomInt(100, 5000)} "-" "Mozilla/5.0"`;
      if (code >= 500) color = '#fca5a5'; // Muted Red (red-300)
      else if (code >= 400) color = '#fde047'; // Muted Yellow (yellow-300)
      else color = '#86efac'; // Muted Green
      break;

    case 'syslog':
      const daemons = ['systemd', 'cron', 'rsyslogd'];
      const messages = [
        'Started Session 42 of user root.',
        'Starting Cleanup of Temporary Directories...',
        'Reloading OpenBSD Secure Shell server.',
        'Removed slice User Slice of root.',
        'Stopping User Manager for UID 0...'
      ];
      const daemon = daemons[Math.floor(Math.random() * daemons.length)];
      text = `${getSyslogTimestamp()} localhost ${daemon}[${getRandomInt(100, 9999)}]: ${messages[Math.floor(Math.random() * messages.length)]}`;
      color = '#cbd5e1'; // Slate 300
      break;

    case 'auth':
      const authMsgs = [
        `Accepted publickey for root from ${getRandomIp()} port ${getRandomInt(10000, 60000)} ssh2`,
        `Disconnected from user root ${getRandomIp()} port ${getRandomInt(10000, 60000)}`,
        `pam_unix(sshd:session): session opened for user root by (uid=0)`,
        `Failed password for invalid user admin from ${getRandomIp()} port ${getRandomInt(10000, 60000)} ssh2`
      ];
      text = `${getSyslogTimestamp()} localhost sshd[${getRandomInt(1000, 9999)}]: ${authMsgs[Math.floor(Math.random() * authMsgs.length)]}`;
      if (text.includes('Failed')) color = '#fca5a5'; // Muted Red
      else if (text.includes('Accepted')) color = '#86efac'; // Muted Green
      else color = '#cbd5e1'; // Slate 300
      break;

    case 'kernel':
      const kernelMsgs = [
        `[${(performance.now() / 1000).toFixed(6)}] CPU0: Package temperature above threshold, cpu clock throttled (total events = ${getRandomInt(1, 100)})`,
        `[${(performance.now() / 1000).toFixed(6)}] TCP: request_sock_TCP: Possible SYN flooding on port 80. Sending cookies.`,
        `[${(performance.now() / 1000).toFixed(6)}] iptables: IN=eth0 OUT= MAC=00:00:00:00:00:00 SRC=${getRandomIp()} DST=${getRandomIp()} LEN=60 TOS=0x00 PREC=0x00 TTL=64 ID=${getRandomInt(1000, 9999)} DF PROTO=TCP SPT=${getRandomInt(1024, 65535)} DPT=22 WINDOW=29200 RES=0x00 SYN URGP=0`,
        `[${(performance.now() / 1000).toFixed(6)}] EXT4-fs (sda1): mounted filesystem with ordered data mode. Opts: (null)`
      ];
      text = kernelMsgs[Math.floor(Math.random() * kernelMsgs.length)];
      if (text.includes('SYN flooding')) color = '#fde047'; // Muted Yellow
      else color = '#94a3b8'; // Slate 400
      break;

    case 'app':
        const appLevels = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
        const appLevel = appLevels[Math.floor(Math.random() * appLevels.length)];
        const components = ['AuthService', 'DatabaseConnector', 'PaymentGateway', 'UserWorker', 'CacheLayer'];
        const appMsgs = [
            'Transaction processed successfully',
            'Connection pool exhausted, retrying...',
            'Cache miss for key: user_profile_123',
            'API rate limit exceeded for client',
            'Garbage collection started'
        ];
        text = `[${getTimestamp()}] [${appLevel}] [${components[Math.floor(Math.random() * components.length)]}] ${appMsgs[Math.floor(Math.random() * appMsgs.length)]}`;
        if (appLevel === 'ERROR') color = '#fca5a5';
        else if (appLevel === 'WARN') color = '#fde047';
        else if (appLevel === 'DEBUG') color = '#7dd3fc'; // Sky 300
        else color = '#bef264'; // Lime 300
        break;
  }

  return { text, color };
};


const ConsoleLogBackground = ({
  fontSize = 12,
  newLineInterval = 150, // Faster logs
  opacity = 0.15, // Reduced opacity for background feel
}: ConsoleLogBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logLinesRef = useRef<LogLine[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastLineTime = 0;
    const lineHeight = fontSize * 1.4;

    const initialize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      const maxLines = Math.ceil(canvas.height / lineHeight);
      if (logLinesRef.current.length === 0) {
        for (let i = 0; i < maxLines; i++) {
          logLinesRef.current.unshift(generateLogLine());
        }
      }
    };

    const draw = (timestamp: number) => {
      if (timestamp - lastLineTime > newLineInterval) {
        lastLineTime = timestamp;
        logLinesRef.current.push(generateLogLine());

        const maxLines = Math.ceil(canvas.height / lineHeight) + 5;
        if (logLinesRef.current.length > maxLines) {
          logLinesRef.current.shift();
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Realistic monospace font
      ctx.font = `${fontSize}px 'Courier New', Courier, monospace`;
      
      const lines = logLinesRef.current;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[lines.length - 1 - i];
        const y = canvas.height / window.devicePixelRatio - (i * lineHeight) - 20; // Start slightly up
        
        if (y < -lineHeight) break;

        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 20, y); // Left padding
      }
    };

    const animate = (timestamp: number) => {
      draw(timestamp);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      initialize();
    };
    
    initialize();
    window.addEventListener('resize', handleResize);
    animate(0);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [fontSize, newLineInterval]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 blur-[1px]" // Added blur
      style={{ background: '#050505', opacity }} // Dark background
    />
  );
};

export default ConsoleLogBackground;