import React, { useState } from "react";
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

// Make sure these images are placed in your public/assets folder
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

const FungEyeDemo = () => {
  const [screen, setScreen] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Logic to determine which static image to show
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
    <div className="demo-container">
      <div className="phone-mockup">
        {/* Main Screenshot Display */}
        <img
          src={getActiveImage()}
          alt={`FungEye ${screen} screen`}
          className="screen-image"
        />

        {/* --- NAVIGATION HOTSPOTS (Invisible Buttons) --- */}

        {/* Global Dark Mode Toggle (Positioned over the sun/moon icon) */}
        {screen !== "camera" && screen !== "results" && (
          <div
            className="hotspot theme-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          />
        )}

        {/* Home Screen Navigation */}
        {screen === "home" && (
          <>
            <div
              className="hotspot btn-start-scan"
              onClick={() => setScreen("camera")}
            />
            <div
              className="hotspot nav-item-left"
              onClick={() => setScreen("library")}
            />
            <div
              className="hotspot nav-item-center"
              onClick={() => setScreen("donation")}
            />
            <div
              className="hotspot nav-item-right"
              onClick={() => setScreen("settings")}
            />
          </>
        )}

        {/* Camera Screen Navigation */}
        {screen === "camera" && (
          <>
            <div
              className="hotspot btn-shutter"
              onClick={() => setScreen("results")}
            />
            <div
              className="hotspot btn-back-home"
              onClick={() => setScreen("home")}
            />
            <div
              className="hotspot nav-item-left"
              onClick={() => setScreen("library")}
            />
            <div
              className="hotspot nav-item-right"
              onClick={() => setScreen("settings")}
            />
          </>
        )}

        {/* Results Screen Navigation */}
        {screen === "results" && (
          <>
            <div
              className="hotspot btn-save-collection"
              onClick={() => setScreen("library")}
            />
            <div
              className="hotspot btn-close-results"
              onClick={() => setScreen("camera")}
            />
          </>
        )}

        {/* Sub-page Back Buttons (Library, Settings, Donation) */}
        {(screen === "library" ||
          screen === "settings" ||
          screen === "donation") && (
          <div
            className="hotspot btn-back-arrow"
            onClick={() => setScreen("home")}
          />
        )}

        {/* Library Dock Navigation */}
        {screen === "library" && (
          <>
            <div
              className="hotspot btn-fab-camera"
              onClick={() => setScreen("camera")}
            />
            <div
              className="hotspot nav-item-right"
              onClick={() => setScreen("settings")}
            />
          </>
        )}
      </div>

      <style>{`
        .demo-container {
          display: flex;
          justify-content: center;
          padding: 40px 20px;
          background: #111;
        }

        .phone-mockup {
          position: relative;
          width: 375px;
          height: 812px;
          border-radius: 44px;
          border: 12px solid #222;
          overflow: hidden;
          background: #000;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .screen-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Hotspot Base Style */
        .hotspot {
          position: absolute;
          cursor: pointer;
          background: rgba(
            255,
            0,
            0,
            0
          ); /* Change to 0.2 to see buttons for alignment */
          z-index: 20;
        }

        /* Top Bar Actions */
        .theme-toggle {
          top: 60px;
          right: 25px;
          width: 45px;
          height: 45px;
        }
        .btn-back-arrow {
          top: 45px;
          left: 20px;
          width: 50px;
          height: 50px;
        }
        .btn-close-results {
          top: 50px;
          left: 20px;
          width: 50px;
          height: 50px;
        }

        /* Home Specific */
        .btn-start-scan {
          bottom: 95px;
          left: 10%;
          width: 80%;
          height: 55px;
        }

        /* Camera Specific */
        .btn-shutter {
          bottom: 34.5px;
          left: 50%;
          transform: translateX(-50%);
          width: 69px;
          height: 69px;
          border-radius: 50%;
        }
        .btn-back-home {
          top: 60px;
          left: 25px;
          width: 45px;
          height: 45px;
        }

        /* Results Specific */
        .btn-save-collection {
          bottom: 40px;
          right: 30px;
          width: 55%;
          height: 60px;
        }

        /* Library Specific */
        .btn-fab-camera {
          bottom: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }

        /* Bottom Dock Icons (Global mapping) */
        .nav-item-left {
          bottom: 30px;
          left: 5%;
          width: 60px;
          height: 60px;
        }
        .nav-item-center {
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 60px;
        }
        .nav-item-right {
          bottom: 30px;
          right: 5%;
          width: 60px;
          height: 60px;
        }

        @media (max-width: 450px) {
          .phone-mockup {
            width: 320px;
            height: 690px;
            border-width: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default FungEyeDemo;
