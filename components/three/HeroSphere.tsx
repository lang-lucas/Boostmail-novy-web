"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.08;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.12;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.6} position={[2, 0.5, 0]}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#398FFF"
          emissive="#1A5ADA"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={1.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function GlowSphere() {
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.5}>
      <mesh scale={2.5} position={[2, 0.5, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#398FFF" transparent opacity={0.03} />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 60;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#398FFF"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroSphere() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#398FFF" />
        <AnimatedSphere />
        <GlowSphere />
        <Particles />
      </Canvas>
    </div>
  );
}
