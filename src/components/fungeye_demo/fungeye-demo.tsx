import { useState } from "react";
import home_dark from "../../assets/home-dark.png";
import home_light from "../../assets/home-light.png";
import camera from "../../assets/camera.png";
import results from "../../assets/results.png";
import library_dark from "../../assets/library-dark.png";
import library_light from "../../assets/library-light.png";
import afterscan_dark from "../../assets/afterscan-dark.png";
import afterscan_light from "../../assets/afterscan-light.png";
import settings_dark from "../../assets/settings-dark.png";
import settings_light from "../../assets/settings-light.png";
import donation_dark from "../../assets/donation-dark.png";
import donation_light from "../../assets/donation-light.png";

const IMAGES = {
  home_dark: home_dark,
  home_light: home_light,
  camera: camera,
  results: results,
  library_dark: library_dark,
  library_light: library_light,
  afterscan_dark: afterscan_dark,
  afterscan_light: afterscan_light,
  settings_dark: settings_dark,
  settings_light: settings_light,
  donation_dark: donation_dark,
  donation_light: donation_light,
};

type DemoScreen = "home" | "camera" | "results" | "library" | "settings" | "donation";

const FungEyeDemo = () => {
  const [screen, setScreen] = useState<DemoScreen>("home");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const getActiveImage = () => {
    switch (screen) {
      case "home":
        return isDarkMode ? IMAGES.home_dark : IMAGES.home_light;
      case "camera":
        return IMAGES.camera;
      case "results":
        return IMAGES.results;
      case "library":
        return isDarkMode ? IMAGES.library_dark : IMAGES.library_light;
      case "settings":
        return isDarkMode ? IMAGES.settings_dark : IMAGES.settings_light;
      case "donation":
        return isDarkMode ? IMAGES.donation_dark : IMAGES.donation_light;
      default:
        return IMAGES.home_dark;
    }
  };

  return (
    <div className="fungeye-demo">
      <div className="fungeye-phone">
        <img
          src={getActiveImage()}
          alt={`FungEye ${screen} screen`}
          className="screen-image"
          loading="lazy"
          decoding="async"
        />

        {screen !== "camera" && screen !== "results" && (
          <button
            type="button"
            aria-label="Toggle FungEye color theme"
            className="hotspot theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          />
        )}

        {screen === "home" && (
          <>
            <button
              type="button"
              aria-label="Start a mushroom scan"
              className="hotspot btn-start-scan"
              onClick={() => setScreen("camera")}
            />
            <button
              type="button"
              aria-label="Open mushroom collection"
              className="hotspot nav-item-left"
              onClick={() => setScreen("library")}
            />
            <button
              type="button"
              aria-label="Open data donation"
              className="hotspot nav-item-center"
              onClick={() => setScreen("donation")}
            />
            <button
              type="button"
              aria-label="Open settings"
              className="hotspot nav-item-right"
              onClick={() => setScreen("settings")}
            />
          </>
        )}

        {screen === "camera" && (
          <>
            <button
              type="button"
              aria-label="Capture mushroom image"
              className="hotspot btn-shutter"
              onClick={() => setScreen("results")}
            />
            <button
              type="button"
              aria-label="Return to FungEye home"
              className="hotspot btn-back-home"
              onClick={() => setScreen("home")}
            />
            <button
              type="button"
              aria-label="Open mushroom collection"
              className="hotspot nav-item-left"
              onClick={() => setScreen("library")}
            />
            <button
              type="button"
              aria-label="Open settings"
              className="hotspot nav-item-right"
              onClick={() => setScreen("settings")}
            />
          </>
        )}

        {screen === "results" && (
          <>
            <button
              type="button"
              aria-label="Save result to collection"
              className="hotspot btn-save-collection"
              onClick={() => setScreen("library")}
            />
            <button
              type="button"
              aria-label="Close result"
              className="hotspot btn-close-results"
              onClick={() => setScreen("camera")}
            />
          </>
        )}

        {(screen === "library" ||
          screen === "settings" ||
          screen === "donation") && (
          <button
            type="button"
            aria-label="Return to FungEye home"
            className="hotspot btn-back-arrow"
            onClick={() => setScreen("home")}
          />
        )}

        {screen === "library" && (
          <>
            <button
              type="button"
              aria-label="Open FungEye camera"
              className="hotspot btn-fab-camera"
              onClick={() => setScreen("camera")}
            />
            <button
              type="button"
              aria-label="Open settings"
              className="hotspot nav-item-right"
              onClick={() => setScreen("settings")}
            />
          </>
        )}
      </div>

      <style>{`
        .fungeye-demo {
          display: flex;
          width: 100%;
          justify-content: center;
        }

        .fungeye-phone {
          position: relative;
          width: 100%;
          max-width: 19rem;
          aspect-ratio: 375 / 812;
          border-radius: clamp(1.75rem, 11.73%, 2.75rem);
          border: clamp(0.45rem, 3.2cqw, 0.75rem) solid #171a17;
          overflow: hidden;
          background: #000;
          box-shadow:
            0 2rem 5rem -2rem rgba(0, 0, 0, 0.95),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 0 1px rgba(255, 255, 255, 0.06);
          container-type: inline-size;
        }

        .fungeye-phone::before {
          content: "";
          position: absolute;
          z-index: 30;
          left: 50%;
          top: 0.6%;
          width: 28%;
          height: 2.5%;
          transform: translateX(-50%);
          border-radius: 999px;
          background: #111411;
          pointer-events: none;
        }

        .fungeye-phone .screen-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .fungeye-phone .hotspot {
          position: absolute;
          cursor: pointer;
          border: 0;
          padding: 0;
          border-radius: 0.75rem;
          background: transparent;
          z-index: 20;
        }

        .fungeye-phone .hotspot:focus-visible {
          outline: 2px solid #86efac;
          outline-offset: -2px;
          background: rgba(134, 239, 172, 0.12);
        }

        .fungeye-phone .theme-toggle {
          top: 7.4%;
          right: 6.7%;
          width: 12%;
          height: 5.55%;
        }
        .fungeye-phone .btn-back-arrow {
          top: 5.55%;
          left: 5.3%;
          width: 13.4%;
          height: 6.2%;
        }
        .fungeye-phone .btn-close-results {
          top: 6.15%;
          left: 5.3%;
          width: 13.4%;
          height: 6.2%;
        }

        .fungeye-phone .btn-start-scan {
          bottom: 11.7%;
          left: 10%;
          width: 80%;
          height: 6.8%;
        }

        .fungeye-phone .btn-shutter {
          bottom: 4.25%;
          left: 50%;
          transform: translateX(-50%);
          width: 18.4%;
          aspect-ratio: 1;
          border-radius: 50%;
        }
        .fungeye-phone .btn-back-home {
          top: 7.4%;
          left: 6.7%;
          width: 12%;
          height: 5.55%;
        }

        .fungeye-phone .btn-save-collection {
          bottom: 4.9%;
          right: 8%;
          width: 55%;
          height: 7.4%;
        }

        .fungeye-phone .btn-fab-camera {
          bottom: 5.55%;
          left: 50%;
          transform: translateX(-50%);
          width: 20%;
          aspect-ratio: 1;
          border-radius: 50%;
        }

        .fungeye-phone .nav-item-left {
          bottom: 3.7%;
          left: 5%;
          width: 16%;
          height: 7.4%;
        }
        .fungeye-phone .nav-item-center {
          bottom: 3.7%;
          left: 50%;
          transform: translateX(-50%);
          width: 48%;
          height: 7.4%;
        }
        .fungeye-phone .nav-item-right {
          bottom: 3.7%;
          right: 5%;
          width: 16%;
          height: 7.4%;
        }
      `}</style>
    </div>
  );
};

export default FungEyeDemo;
