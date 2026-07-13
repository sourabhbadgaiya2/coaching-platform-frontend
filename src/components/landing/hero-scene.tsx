// "use client";

// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// export function HeroScene() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const width = container.clientWidth;
//     const height = container.clientHeight;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
//     camera.position.set(3.2, 2.2, 5);
//     camera.lookAt(0, 0, 0);

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(width, height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     container.appendChild(renderer.domElement);

//     // Lighting — warm, single key light like a desk lamp
//     const key = new THREE.DirectionalLight(0xffe3b0, 1.4);
//     key.position.set(4, 5, 3);
//     scene.add(key);
//     const fill = new THREE.AmbientLight(0x2b3b30, 1.1);
//     scene.add(fill);

//     // Stack of "exam papers" — slabs of varying warm tones
//     const stack = new THREE.Group();
//     const slabColors = [
//       0xc98a2c, 0xf3efe3, 0xa6342a, 0xf3efe3, 0x5c6b60, 0xf3efe3,
//     ];
//     slabColors.forEach((color, i) => {
//       const geometry = new THREE.BoxGeometry(1.6, 0.08, 2.1);
//       const material = new THREE.MeshStandardMaterial({
//         color,
//         roughness: 0.85,
//         metalness: 0.05,
//       });
//       const slab = new THREE.Mesh(geometry, material);
//       slab.position.y = i * 0.11;
//       slab.rotation.y = (Math.random() - 0.5) * 0.15;
//       slab.position.x = (Math.random() - 0.5) * 0.08;
//       stack.add(slab);
//     });
//     stack.position.y = -0.4;
//     scene.add(stack);

//     // Chalk-dust particles drifting around the stack
//     const particleCount = 140;
//     const positions = new Float32Array(particleCount * 3);
//     for (let i = 0; i < particleCount; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 4;
//       positions[i * 3 + 1] = Math.random() * 2.5 - 0.5;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
//     }
//     const particleGeometry = new THREE.BufferGeometry();
//     particleGeometry.setAttribute(
//       "position",
//       new THREE.BufferAttribute(positions, 3),
//     );
//     const particleMaterial = new THREE.PointsMaterial({
//       color: 0xf3efe3,
//       size: 0.02,
//       transparent: true,
//       opacity: 0.5,
//     });
//     const particles = new THREE.Points(particleGeometry, particleMaterial);
//     scene.add(particles);

//     let frameId: number;
//     const clock = new THREE.Clock();

//     const animate = () => {
//       const t = clock.getElapsedTime();
//       stack.rotation.y = t * 0.25;
//       particles.rotation.y = t * 0.05;
//       const posAttr = particleGeometry.attributes
//         .position as THREE.BufferAttribute;
//       for (let i = 0; i < particleCount; i++) {
//         const y = posAttr.getY(i);
//         posAttr.setY(i, y > 2 ? -0.5 : y + 0.0025);
//       }
//       posAttr.needsUpdate = true;
//       renderer.render(scene, camera);
//       frameId = requestAnimationFrame(animate);
//     };
//     animate();

//     const handleResize = () => {
//       if (!container) return;
//       const w = container.clientWidth;
//       const h = container.clientHeight;
//       camera.aspect = w / h;
//       camera.updateProjectionMatrix();
//       renderer.setSize(w, h);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       cancelAnimationFrame(frameId);
//       window.removeEventListener("resize", handleResize);
//       renderer.dispose();
//       container.removeChild(renderer.domElement);
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="w-full h-full" aria-hidden="true" />
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(3.2, 2.2, 5);
    camera.lookAt(0, -0.15, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const key = new THREE.DirectionalLight(0xffe3b0, 1.4);
    key.position.set(4, 5, 3);
    scene.add(key);
    const fill = new THREE.AmbientLight(0x2b3b30, 1.1);
    scene.add(fill);

    const stack = new THREE.Group();
    const slabColors = [
      0xc98a2c, 0xf3efe3, 0xa6342a, 0xf3efe3, 0x5c6b60, 0xf3efe3,
    ];
    slabColors.forEach((color, i) => {
      const geometry = new THREE.BoxGeometry(1.6, 0.08, 2.1);
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.85,
        metalness: 0.05,
      });
      const slab = new THREE.Mesh(geometry, material);
      slab.position.y = i * 0.11;
      slab.rotation.y = (Math.random() - 0.5) * 0.15;
      slab.position.x = (Math.random() - 0.5) * 0.08;
      stack.add(slab);
    });
    stack.position.y = -0.15;
    scene.add(stack);

    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = Math.random() * 2.5 - 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf3efe3,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      stack.rotation.y = t * 0.25;
      particles.rotation.y = t * 0.05;
      const posAttr = particleGeometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        const y = posAttr.getY(i);
        posAttr.setY(i, y > 2 ? -0.5 : y + 0.0025);
      }
      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" aria-hidden="true" />
  );
}
