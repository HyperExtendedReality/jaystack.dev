import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// One scene, no external models: the belt carries an idea through three build stations.
export default function AssemblyLine({ paused, stage, onStageChange }: {
  paused: boolean; stage: number; onStageChange: (stage: number) => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef({ paused, stage, onStageChange });
  const [failed, setFailed] = useState(false);
  useEffect(() => { state.current = { paused, stage, onStageChange }; }, [paused, stage, onStageChange]);
  useEffect(() => {
    const container = host.current;
    if (!container) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" }); }
    catch { setFailed(true); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose(); pmrem.dispose();
    const factory = new THREE.Group();
    factory.rotation.set(0.22, -0.24, 0.02);
    scene.add(factory);
    const cream = new THREE.MeshStandardMaterial({ color: 0xd4ddc8, metalness: 0.3, roughness: 0.48 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x25332b, metalness: 0.4, roughness: 0.5 });
    const ink = new THREE.MeshBasicMaterial({ color: 0x101813 });
    const lime = new THREE.MeshStandardMaterial({ color: 0xc8ff4a, emissive: 0x8bbc22, emissiveIntensity: 0.25, roughness: 0.45 });
    const purple = new THREE.MeshStandardMaterial({ color: 0xb5a1ff, roughness: 0.4 });
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>([cream, dark, ink, lime, purple]);
    const textures: THREE.Texture[] = [];
    function mesh(parent: THREE.Object3D, geometry: THREE.BufferGeometry, material: THREE.Material, x = 0, y = 0, z = 0) {
      geometries.add(geometry);
      const object = new THREE.Mesh(geometry, material);
      object.position.set(x, y, z); parent.add(object); return object;
    }
    function box(parent: THREE.Object3D, size: number[], material: THREE.Material, x = 0, y = 0, z = 0) {
      return mesh(parent, new RoundedBoxGeometry(size[0], size[1], size[2], 2, Math.min(...size) * 0.2), material, x, y, z);
    }
    function text(parent: THREE.Object3D, value: string, width: number, x: number, y: number, z: number, color = "#c8ff4a") {
      const canvas = document.createElement("canvas"); canvas.width = 768; canvas.height = 128;
      const ctx = canvas.getContext("2d")!;
      ctx.font = "bold 52px monospace"; ctx.fillStyle = color; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.font = `bold ${Math.min(52, 52 * 720 / Math.max(ctx.measureText(value).width, 1))}px monospace`;
      ctx.fillText(value, 384, 64);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false }); materials.add(material);
      return mesh(parent, new THREE.PlaneGeometry(width, width / 6), material, x, y, z);
    }
    // Conveyor, rollers, feet and edge lights.
    box(factory, [6.1, 0.36, 1.55], cream, 0, -0.82);
    box(factory, [5.85, 0.12, 1.36], ink, 0, -0.59);
    for (const x of [-2.45, 2.45]) for (const z of [-0.5, 0.5]) box(factory, [0.25, 0.65, 0.25], dark, x, -1.29, z);
    const rollers = Array.from({ length: 27 }, (_, i) => {
      const roller = mesh(factory, new THREE.CylinderGeometry(0.075, 0.075, 1.27, 10), dark, -2.8 + i * 0.215, -0.52);
      roller.rotation.x = Math.PI / 2; return roller;
    });
    for (let i = 0; i < 13; i++) box(factory, [0.13, 0.04, 0.02], lime, -2.65 + i * 0.44, -0.78, 0.79);
    text(factory, "IDEA → INTERFACE → SYSTEM → SHIP", 4.3, 0, -1.53, 0.7);

    const arms: { shoulder: THREE.Group; elbow: THREE.Group; claw: THREE.Group }[] = [];
    for (let i = 0; i < 3; i++) {
      const station = new THREE.Group(); station.position.set((i - 1) * 2.05, -0.52, -0.48); factory.add(station);
      mesh(station, new THREE.CylinderGeometry(0.34, 0.4, 0.18, 24), dark, 0, 0.1);
      const shoulder = new THREE.Group(); shoulder.position.y = 0.25; station.add(shoulder);
      mesh(shoulder, new THREE.SphereGeometry(0.19, 16, 12), lime);
      box(shoulder, [0.24, 0.95, 0.28], cream, 0, 0.48);
      const elbow = new THREE.Group(); elbow.position.y = 0.95; shoulder.add(elbow);
      mesh(elbow, new THREE.SphereGeometry(0.19, 16, 12), i === 1 ? purple : lime);
      box(elbow, [0.21, 0.85, 0.24], cream, 0, 0.42);
      const claw = new THREE.Group(); claw.position.y = 0.88; elbow.add(claw);
      box(claw, [0.45, 0.18, 0.27], dark);
      for (const side of [-1, 1]) box(claw, [0.09, 0.27, 0.12], lime, side * 0.19, 0.18);
      arms.push({ shoulder, elbow, claw });
      text(factory, ["01 / DESIGN", "02 / CONNECT", "03 / SHIP"][i], 1.8, (i - 1) * 2.05, 2.05, -0.5, i === 1 ? "#b5a1ff" : "#c8ff4a");
    }

    // The same product becomes a UI, gains a database, and arrives in its shipping box.
    const product = new THREE.Group(); factory.add(product);
    const screen = new THREE.Group(); product.add(screen);
    box(screen, [1.13, 0.87, 0.13], cream, 0, 0.08);
    box(screen, [0.97, 0.68, 0.025], ink, 0, 0.07, 0.085);
    for (let i = 0; i < 3; i++) mesh(screen, new THREE.SphereGeometry(0.026, 8, 6), i === 0 ? purple : lime, -0.37 + i * 0.1, 0.31, 0.11);
    box(screen, [0.33, 0.37, 0.02], purple, -0.23, 0.01, 0.11);
    for (let i = 0; i < 3; i++) box(screen, [0.35 - i * 0.06, 0.045, 0.02], lime, 0.21, 0.13 - i * 0.1, 0.11);
    const database = new THREE.Group(); product.add(database);
    for (let i = 0; i < 3; i++) mesh(database, new THREE.CylinderGeometry(0.28, 0.28, 0.15, 24), i === 1 ? purple : lime, 0, i * 0.18);
    database.position.set(0.67, -0.13, 0.08);
    const parcel = new THREE.Group(); product.add(parcel);
    box(parcel, [1.42, 0.85, 0.65], dark, 0, -0.03, 0.03);
    box(parcel, [1.43, 0.16, 0.69], lime, 0, 0.4, 0.03);
    box(parcel, [0.18, 0.78, 0.025], cream, -0.42, -0.02, 0.37);
    text(parcel, "SHIPPED ✓", 1, 0.13, 0.05, 0.38);
    const sparkles = Array.from({ length: 9 }, (_, i) => mesh(factory, new THREE.BoxGeometry(0.065, 0.065, 0.065), i % 2 ? purple : lime));

    // Pip supervises the assembly line and is also the portfolio chat companion.
    const robot = new THREE.Group(); robot.position.set(2.46, 1.07, 0.38); robot.scale.setScalar(0.62); factory.add(robot);
    const head = new THREE.Group(); robot.add(head);
    box(head, [0.96, 0.65, 0.58], cream);
    box(head, [0.77, 0.43, 0.04], ink, 0, 0, 0.31);
    const eyes = [-1, 1].map(side => box(head, [0.1, 0.17, 0.02], lime, side * 0.2, 0.03, 0.35));
    box(head, [0.15, 0.035, 0.02], purple, 0, -0.11, 0.35);
    box(head, [0.035, 0.25, 0.035], dark, 0, 0.45);
    mesh(head, new THREE.SphereGeometry(0.085, 12, 8), lime, 0, 0.61);
    box(robot, [0.62, 0.52, 0.43], cream, 0, -0.65);
    text(robot, "PIP", 0.5, 0, -0.63, 0.24);
    const hand = new THREE.Group(); hand.position.set(0.47, -0.43, 0); robot.add(hand);
    box(hand, [0.15, 0.47, 0.2], lime, 0, 0.2);
    box(robot, [0.15, 0.42, 0.2], dark, -0.46, -0.62);
    for (const side of [-1, 1]) box(robot, [0.2, 0.2, 0.35], dark, side * 0.2, -1);

    const light = new THREE.DirectionalLight(0xeaffdb, 2.5); light.position.set(-3, 5, 6); scene.add(light);
    const fill = new THREE.PointLight(0xb5a1ff, 15, 12); fill.position.set(3, 3, 2); scene.add(fill);
    const pointer = { x: 0, y: 0 };
    let visible = true, dirty = true, progress = state.current.stage, target = progress;
    const onScroll = () => {
      if (state.current.paused) return;
      const rect = container.getBoundingClientRect();
      const amount = THREE.MathUtils.clamp((window.innerHeight * 0.42 - rect.top) / Math.max(rect.height * 0.85, 1), 0, 1);
      state.current.onStageChange(Math.min(2, Math.floor(amount * 3)));
    };
    const onPointer = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => { pointer.x = 0; pointer.y = 0; };
    window.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("pointermove", onPointer); container.addEventListener("pointerleave", onLeave);
    const resize = new ResizeObserver(() => {
      const { width, height } = container.getBoundingClientRect(); if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.set(0, 0.25, Math.max(10, 11.5 / camera.aspect));
      camera.updateProjectionMatrix(); renderer.setSize(width, height); dirty = true;
    });
    resize.observe(container);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; dirty = true; }); intersection.observe(container);
    let frame = 0, time = 0, last = 0, previousStage = -1, wasPaused = state.current.paused;
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      const dt = Math.min((now - last) / 1000, 0.04); last = now;
      if (!visible || document.hidden) return;
      const { paused, stage } = state.current;
      if (paused && wasPaused && stage === previousStage && Math.abs(progress - target) < 0.001 && !dirty) return;
      previousStage = stage; wasPaused = paused; dirty = false; target = stage;
      // Pause stops the clock, but never skips the eased trip to a new station.
      // This keeps reduced-motion mode calm without making stage changes snap.
      if (!paused) time += dt;
      progress = THREE.MathUtils.damp(progress, target, 3.8, dt);
      factory.rotation.y = -0.24 + (paused ? 0 : pointer.x * 0.32);
      factory.rotation.x = 0.22 + (paused ? 0 : pointer.y * 0.12);
      // Keep one product moving through the whole line. Each station eases its
      // contribution in and out so the build feels assembled rather than swapped.
      product.position.set((progress - 1) * 2.05, -0.02 + Math.sin(time * 2) * 0.025, 0.4);
      const stationBlend = (from: number, to: number) => THREE.MathUtils.smoothstep(progress, from, to);
      screen.scale.setScalar(1 - stationBlend(0.72, 1.12));
      database.scale.setScalar(stationBlend(0.42, 0.82) * (1 - stationBlend(1.22, 1.58)));
      parcel.scale.setScalar(stationBlend(1.28, 1.78));
      screen.rotation.y = Math.sin(time) * 0.04;
      arms.forEach(({ shoulder, elbow, claw }, i) => {
        const active = THREE.MathUtils.clamp(1 - Math.abs(progress - i) * 0.75, 0, 1);
        shoulder.rotation.z = (i === 2 ? 0.35 : -0.35) + Math.sin(time * 1.6 + i) * 0.09 * active;
        shoulder.rotation.x = 0.08;
        elbow.rotation.z = (i === 2 ? -1 : 1) * (1.45 + active * 0.42 + Math.sin(time * 1.6 + i) * 0.24 * active);
        claw.rotation.z = Math.sin(time * 1.6 + i) * 0.2;
      });
      rollers.forEach(roller => { roller.rotation.y = time; });
      head.rotation.y = paused ? 0 : pointer.x * 0.7;
      head.rotation.z = Math.sin(time * 0.8) * 0.07;
      hand.rotation.z = -0.5 + Math.sin(time * 2.5) * 0.28;
      robot.position.y = 1.07 + Math.sin(time * 1.2) * 0.06;
      eyes.forEach(eye => eye.scale.y = !paused && time % 4 > 3.85 ? 0.15 : 1);
      sparkles.forEach((spark, i) => {
        spark.visible = progress > 1.7;
        const t = (time * 0.5 + i / sparkles.length) % 1;
        spark.position.set(2.05 + Math.sin(i * 2.4) * t * 0.8, 0.4 + t, 0.4 + Math.cos(i * 2.4) * t * 0.6);
        spark.rotation.set(time, i, time); spark.scale.setScalar(1 - t);
      });
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(draw);
    const onLost = (event: Event) => { event.preventDefault(); setFailed(true); cancelAnimationFrame(frame); };
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); intersection.disconnect();
      window.removeEventListener("scroll", onScroll); container.removeEventListener("pointermove", onPointer); container.removeEventListener("pointerleave", onLeave);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      geometries.forEach(item => item.dispose()); materials.forEach(item => item.dispose()); textures.forEach(item => item.dispose());
      environment.dispose(); renderer.dispose(); renderer.domElement.remove();
    };
  }, []);
  return <div ref={host} className="sculpture-canvas assembly-canvas" role="img" aria-label="Miniature software factory: three robotic arms assemble an interface, connect a database, and package the finished app. Pip the robot waves beside the conveyor.">
    {failed && <div className="sculpture-fallback" aria-hidden="true">&lt;/&gt;<span>DESIGN → CONNECT → SHIP</span></div>}
  </div>;
}

