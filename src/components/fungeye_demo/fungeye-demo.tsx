import { useEffect, useRef, useState, type CSSProperties } from "react";
import home_dark from "../../assets/home-dark.webp";
import home_light from "../../assets/home-light.webp";
import camera from "../../assets/camera.webp";
import results from "../../assets/results.webp";
import library_dark from "../../assets/library-dark.webp";
import library_light from "../../assets/library-light.webp";
import afterscan_dark from "../../assets/afterscan-dark.webp";
import afterscan_light from "../../assets/afterscan-light.webp";
import settings_dark from "../../assets/settings-dark.webp";
import settings_light from "../../assets/settings-light.webp";
import donation_dark from "../../assets/donation-dark.webp";
import donation_light from "../../assets/donation-light.webp";

type Screen = "home" | "camera" | "results" | "library" | "settings" | "donation";
type Action = Screen | "back" | "theme" | "save";
// rect is [x1, y1, x2, y2] in screenshot pixels (every screen is 757 x 1700).
type Spot = { label: string; rect: [number, number, number, number]; to?: Action; note?: string; primary?: boolean; round?: boolean; savedOnly?: boolean };

const W = 757;
const H = 1700;

const screens: Record<Screen, { title: string; hint: string; image: (dark: boolean, saved: boolean) => string }> = {
  home: { title: "Home", hint: "Tap Start Scan to open the camera.", image: (d) => (d ? home_dark : home_light) },
  camera: { title: "Camera", hint: "Tap the shutter to identify the mushroom.", image: () => camera },
  results: { title: "Identification result", hint: "Save the find to your collection.", image: () => results },
  library: {
    title: "My collection",
    hint: "Saved finds live here, offline. Scan again or open settings.",
    image: (d, saved) => (saved ? (d ? afterscan_dark : afterscan_light) : d ? library_dark : library_light),
  },
  settings: { title: "Settings", hint: "The on-device model and camera options. Tap Support FungEye.", image: (d) => (d ? settings_dark : settings_light) },
  donation: { title: "Support", hint: "Community funding pays for model training. Tap back to return.", image: (d) => (d ? donation_dark : donation_light) },
};

const spots: Record<Screen, Spot[]> = {
  home: [
    { label: "Toggle FungEye color theme", rect: [639, 140, 716, 217], to: "theme", round: true },
    { label: "Start a mushroom scan", rect: [49, 1390, 708, 1487], to: "camera", primary: true },
    { label: "Open mushroom collection", rect: [52, 1520, 149, 1611], to: "library" },
    { label: "Open data donation", rect: [175, 1520, 578, 1611], to: "donation" },
    { label: "Open settings", rect: [606, 1520, 703, 1611], to: "settings" },
  ],
  camera: [
    { label: "Return to FungEye home", rect: [39, 87, 252, 150], to: "home" },
    { label: "Open data donation", rect: [563, 93, 718, 144], to: "donation" },
    { label: "Identify from a photo", rect: [295, 1335, 462, 1398], to: "results" },
    { label: "Capture mushroom image", rect: [307, 1481, 450, 1625], to: "results", primary: true, round: true },
    { label: "Open mushroom collection", rect: [68, 1504, 165, 1601], to: "library" },
    { label: "Open settings", rect: [590, 1504, 687, 1601], to: "settings" },
  ],
  results: [
    { label: "Close result", rect: [35, 122, 120, 208], to: "back", round: true },
    { label: "Share result", rect: [43, 1510, 256, 1611], note: "In the app this opens the phone's share sheet." },
    { label: "Save result to collection", rect: [285, 1510, 712, 1611], to: "save", primary: true },
  ],
  library: [
    { label: "Go back", rect: [29, 87, 126, 184], to: "back", round: true },
    { label: "Open data donation", rect: [43, 353, 714, 495], to: "donation" },
    { label: "Open Common Puffball result", rect: [23, 693, 363, 1126], to: "results", savedOnly: true },
    { label: "Open FungEye camera", rect: [326, 1493, 431, 1597], to: "camera", primary: true, round: true },
    { label: "Open settings", rect: [543, 1543, 650, 1640], to: "settings" },
  ],
  settings: [
    { label: "Go back", rect: [39, 122, 124, 208], to: "back", round: true },
    { label: "Toggle FungEye color theme", rect: [615, 122, 701, 208], to: "theme", round: true },
    { label: "Support FungEye", rect: [39, 1316, 718, 1448], to: "donation", primary: true },
  ],
  donation: [
    { label: "Go back", rect: [35, 122, 120, 208], to: "back", round: true, primary: true },
    { label: "Donate $15", rect: [43, 1576, 712, 1689], note: "Demo only. No payment is taken." },
  ],
};

const steps: { label: string; path: Screen[] }[] = [
  { label: "Home", path: ["home"] },
  { label: "Scan", path: ["home", "camera"] },
  { label: "Identify", path: ["home", "camera", "results"] },
  { label: "Collection", path: ["home", "library"] },
  { label: "Settings", path: ["home", "settings"] },
];

const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const FungEyeDemo = () => {
  const [history, setHistory] = useState<Screen[]>(["home"]);
  const [dark, setDark] = useState(true);
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState("");
  const noteTimer = useRef<number>();
  const screen = history[history.length - 1];

  // Warm the cache so screen changes never flash an empty phone.
  useEffect(() => {
    [home_dark, home_light, camera, results, library_dark, library_light, afterscan_dark, afterscan_light, settings_dark, settings_light, donation_dark, donation_light]
      .forEach((src) => { new Image().src = src; });
    return () => window.clearTimeout(noteTimer.current);
  }, []);

  const act = (spot: Spot) => {
    window.clearTimeout(noteTimer.current);
    setNote(spot.note ?? "");
    if (spot.note) noteTimer.current = window.setTimeout(() => setNote(""), 2600);
    if (!spot.to) return;
    if (spot.to === "theme") return setDark((d) => !d);
    if (spot.to === "back") return setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
    if (spot.to === "save") {
      setSaved(true);
      return setHistory(["home", "library"]);
    }
    const to = spot.to;
    setHistory((h) => (to === "home" ? ["home"] : [...h, to]));
  };

  return (
    <div className="fungeye-demo">
      <div className="fungeye-phone">
        <img src={screens[screen].image(dark, saved)} alt={`FungEye ${screens[screen].title} screen`} className="screen-image" decoding="async" />
        {spots[screen].filter((spot) => !spot.savedOnly || saved).map((spot) => {
          const [x1, y1, x2, y2] = spot.rect;
          const style: CSSProperties = { left: pct(x1, W), top: pct(y1, H), width: pct(x2 - x1, W), height: pct(y2 - y1, H) };
          return (
            <button
              key={spot.label}
              type="button"
              aria-label={spot.label}
              title={spot.label}
              className={`hotspot${spot.primary ? " is-primary" : ""}${spot.round ? " is-round" : ""}`}
              style={style}
              onClick={() => act(spot)}
            />
          );
        })}
        {note && <p className="fungeye-note" role="status">{note}</p>}
      </div>
      <div className="fungeye-guide">
        <p aria-live="polite"><strong>{screens[screen].title}.</strong> {screens[screen].hint}</p>
        <nav aria-label="Jump to a FungEye screen">
          {steps.map(({ label, path }) => (
            <button key={label} type="button" aria-current={path[path.length - 1] === screen ? "step" : undefined} onClick={() => setHistory(path)}>
              {label}
            </button>
          ))}
        </nav>
      </div>

      <style>{`
        .fungeye-demo { display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%; }
        .fungeye-phone {
          position: relative;
          width: 100%;
          max-width: 19rem;
          aspect-ratio: ${W} / ${H};
          border-radius: 2.4rem;
          border: 0.6rem solid #171a17;
          overflow: hidden;
          background: #000;
          box-shadow: 0 2rem 5rem -2rem rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        .fungeye-phone .screen-image { width: 100%; height: 100%; display: block; }
        .fungeye-phone .hotspot {
          position: absolute;
          border: 0;
          padding: 0;
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          z-index: 2;
          transition: background-color .2s, box-shadow .2s;
        }
        .fungeye-phone .hotspot.is-round { border-radius: 50%; }
        .fungeye-phone .hotspot:hover { background: rgba(200, 255, 74, 0.14); box-shadow: 0 0 0 2px rgba(200, 255, 74, 0.7); }
        .fungeye-phone .hotspot:focus-visible { outline: 2px solid #c8ff4a; outline-offset: 2px; background: rgba(200, 255, 74, 0.14); }
        .fungeye-phone .hotspot.is-primary { box-shadow: 0 0 0 2px rgba(200, 255, 74, 0.85); animation: fungeye-pulse 1.8s ease-out infinite; }
        @keyframes fungeye-pulse { 0% { box-shadow: 0 0 0 2px rgba(200, 255, 74, 0.9); } 100% { box-shadow: 0 0 0 12px rgba(200, 255, 74, 0); } }
        .fungeye-note {
          position: absolute; left: 8%; right: 8%; bottom: 13%; z-index: 3;
          padding: 10px 12px; border-radius: 12px;
          background: #10120fee; color: #f1f0e9; font-size: 12px; line-height: 1.5; text-align: center;
          box-shadow: 0 12px 30px #0008;
        }
        .fungeye-guide { width: 100%; max-width: 22rem; text-align: center; }
        .fungeye-guide p { min-height: 3.2em; font-size: 13px; line-height: 1.6; color: #b9c2ae; }
        .fungeye-guide strong { color: #f1f0e9; font-weight: 600; }
        .fungeye-guide nav { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 10px; }
        .fungeye-guide nav button {
          min-height: 36px; padding: 0 12px; border-radius: 40px;
          border: 1px solid #ffffff2a; color: #c3c9b9; font-size: 12px; background: transparent; cursor: pointer;
        }
        .fungeye-guide nav button:hover { border-color: #c8ff4a80; color: #f1f0e9; }
        .fungeye-guide nav button[aria-current] { background: #c8ff4a; border-color: #c8ff4a; color: #10120f; font-weight: 600; }
        @media (prefers-reduced-motion: reduce) { .fungeye-phone .hotspot.is-primary { animation: none; } }
      `}</style>
    </div>
  );
};

export default FungEyeDemo;
