
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const particleSystems = [];
    
    const createParticles = (count, color, size) => {
      const geo = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < count; i++) {
        vertices.push(
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000,
          Math.random() * 2000 - 1000
        );
      }
      geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      const mat = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      return new THREE.Points(geo, mat);
    };

    particleSystems.push(createParticles(300, 0xffd700, 3));
    particleSystems.push(createParticles(250, 0xffb6c1, 2));
    particleSystems.push(createParticles(200, 0xdda0dd, 4));
    
    particleSystems.forEach(p => scene.add(p));
    camera.position.z = 500;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.001;
      
      particleSystems.forEach((system, idx) => {
        system.rotation.x = Math.sin(time + idx) * 0.2;
        system.rotation.y += 0.001 * (idx + 1);
        system.rotation.z = Math.cos(time + idx) * 0.1;
      });
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
}