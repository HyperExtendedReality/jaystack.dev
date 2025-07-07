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

// --- A helper function to generate realistic, dynamic log lines ---
const generateLogLine = (): LogLine => {
  const logLevels = [
    { prefix: '[INFO]', color: '#888' },
    { prefix: '[SUCCESS]', color: '#2E7D32' }, // Darker Green
    { prefix: '[WARN]', color: '#ED6C02' },   // Orange
    { prefix: '[ERROR]', color: '#D32F2F' },   // Red
    { prefix: '[DEBUG]', color: '#0288D1' },  // Blue
  ];

  const actions = [
    'Initializing', 'Compiling', 'Fetching', 'Rendering', 'Connecting to', 'Authenticating',
    'Validating', 'Deploying', 'Optimizing', 'Resolving dependencies for'
  ];

  const subjects = [
    'CoreModule', 'AuthService', 'API_Endpoint:/v1/users', 'WebSocket', 'AssetPipeline',
    'Component:Header', 'ServiceWorker', 'GraphQL_Query:GetUser', 'Stylesheet:main.css'
  ];
  
  const statuses = ['...DONE', '...OK', '...FAILED', '...IN_PROGRESS'];

  const level = logLevels[Math.floor(Math.random() * logLevels.length)];
  const action = actions[Math.floor(Math.random() * actions.length)];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const timestamp = new Date().toISOString();

  // Make ERROR lines more distinct
  if (level.prefix === '[ERROR]') {
    return {
      text: `${timestamp} ${level.prefix} Failed to ${action.toLowerCase()} ${subject}. Status: ${status}`,
      color: level.color,
    };
  }

  return {
    text: `${timestamp} ${level.prefix} ${action} ${subject} ${Math.random() > 0.7 ? status : ''}`,
    color: level.color,
  };
};


const ConsoleLogBackground = ({
  fontSize = 12,
  newLineInterval = 300, // Add a new line every 300ms
  opacity = 0.15,
}: ConsoleLogBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use a ref for log lines to avoid re-renders on update
  const logLinesRef = useRef<LogLine[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastLineTime = 0;
    const lineHeight = fontSize * 1.5; // Spacing between lines

    // --- This function initializes or re-initializes the canvas state ---
    const initialize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      
      // Pre-fill the screen with some lines so it's not empty on load
      const maxLines = Math.ceil(canvas.height / lineHeight);
      if (logLinesRef.current.length === 0) {
        for (let i = 0; i < maxLines; i++) {
          logLinesRef.current.unshift(generateLogLine());
        }
      }
    };

    // --- The core animation function ---
    const draw = (timestamp: number) => {
      // Add a new line based on the interval
      if (timestamp - lastLineTime > newLineInterval) {
        lastLineTime = timestamp;
        logLinesRef.current.push(generateLogLine());

        // Keep the array from growing infinitely
        const maxLines = Math.ceil(canvas.height / lineHeight) + 5; // +5 for buffer
        if (logLinesRef.current.length > maxLines) {
          logLinesRef.current.shift();
        }
      }

      // Clear the canvas for the new frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      
      // Draw lines from the bottom up
      const lines = logLinesRef.current;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[lines.length - 1 - i]; // Get line from end of array
        const y = canvas.height / window.devicePixelRatio - (i * lineHeight);
        
        // Stop drawing if we're off-screen
        if (y < -lineHeight) break;

        ctx.fillStyle = line.color;
        ctx.fillText(line.text, 10, y);
      }
    };

    const animate = (timestamp: number) => {
      draw(timestamp);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      // Re-initialize canvas dimensions but keep existing logs
      initialize();
    };
    
    initialize();
    window.addEventListener('resize', handleResize);
    animate(0); // Start the animation

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [fontSize, newLineInterval]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent', opacity }}
    />
  );
};

export default ConsoleLogBackground;