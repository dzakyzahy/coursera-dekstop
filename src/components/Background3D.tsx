import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedOrb({ color, position, scale, distort, speed }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial 
          color={color} 
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0} 
          metalness={0.1} 
          roughness={0.2}
          distort={distort} 
          speed={speed} 
        />
      </mesh>
    </Float>
  );
}

export default function Background3D({ isDarkMode }: { isDarkMode: boolean }) {
  // Vibrant colors for light mode, deep moody colors for dark mode
  const color1 = isDarkMode ? "#4c1d95" : "#8b5cf6"; // Purple
  const color2 = isDarkMode ? "#1e3a8a" : "#3b82f6"; // Blue
  
  return (
    <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-1000" style={{ background: isDarkMode ? '#050505' : '#f8fafc' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={isDarkMode ? 0.2 : 0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={isDarkMode ? 0.5 : 1} color={color2} />
        
        <AnimatedOrb position={[-2, 1, -2]} scale={1.5} color={color1} distort={0.4} speed={2} />
        <AnimatedOrb position={[2, -1, -3]} scale={2} color={color2} distort={0.3} speed={1.5} />
        <AnimatedOrb position={[0, 0, -5]} scale={3} color={isDarkMode ? "#020617" : "#e2e8f0"} distort={0.2} speed={1} />
        
        <Environment preset={isDarkMode ? "night" : "city"} />
      </Canvas>
    </div>
  );
}
