import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { WebGLFallback } from './WebGLFallback';

/**
 * Procedural Architectural Building Model
 * Refined, neutral materials (concrete, oak timber, smoked glass, matte steel)
 * Slowly rotates and subtly tracks cursor position
 */
function ArchitecturalBuilding({ pointerPos }) {
  const groupRef = useRef();
  const targetRotationY = useRef(0);
  const targetRotationX = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Constant slow architectural rotation
    targetRotationY.current += delta * 0.15;
    
    // Smooth lerp based on cursor offset
    const targetX = pointerPos.current.y * 0.2;
    const targetY = targetRotationY.current + pointerPos.current.x * 0.2;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]} scale={0.9}>
      {/* 1. Base Concrete Foundation Slab */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.3, 3.2]} />
        <meshStandardMaterial color="#D9D9D4" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Ground Water / Patio Recess */}
      <mesh position={[1.2, 0.01, -0.6]} receiveShadow>
        <boxGeometry args={[1.4, 0.02, 1.6]} />
        <meshStandardMaterial color="#2B3036" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* 2. Ground Floor Solid Wall Block */}
      <mesh position={[-0.9, 0.6, 0.2]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 1.2, 2.2]} />
        <meshStandardMaterial color="#F7F7F5" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Ground Floor Smoked Glass Living Area */}
      <mesh position={[0.8, 0.6, 0.4]}>
        <boxGeometry args={[1.8, 1.18, 1.8]} />
        <meshStandardMaterial 
          color="#111111" 
          roughness={0.1} 
          metalness={0.3} 
          transparent={true} 
          opacity={0.65} 
        />
      </mesh>

      {/* Interior Living Light/Column Accent */}
      <mesh position={[0.7, 0.6, 0.4]}>
        <cylinderGeometry args={[0.06, 0.06, 1.18, 16]} />
        <meshStandardMaterial color="#D85B3F" roughness={0.4} />
      </mesh>

      {/* Interior Floor Light Accent */}
      <pointLight position={[0.8, 0.5, 0.4]} intensity={0.8} color="#FFE6D5" distance={3} />

      {/* 3. First Floor Cantilevered Oak Timber Box */}
      <group position={[0.1, 1.7, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.6, 1.0, 2.6]} />
          <meshStandardMaterial color="#B08D74" roughness={0.5} metalness={0.1} />
        </mesh>

        {/* Oak Vertical Slats / Louvre Details */}
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={i} position={[-1.6 + i * 0.25, 0, 1.31]} castShadow>
            <boxGeometry args={[0.04, 0.95, 0.06]} />
            <meshStandardMaterial color="#6E4F3A" roughness={0.4} />
          </mesh>
        ))}

        {/* Master Bedroom Glass Window Insert */}
        <mesh position={[0.6, 0, 1.31]}>
          <boxGeometry args={[1.2, 0.7, 0.02]} />
          <meshStandardMaterial color="#111111" roughness={0.1} transparent opacity={0.7} />
        </mesh>
      </group>

      {/* 4. Roof Terrace Slab & Parapet */}
      <mesh position={[0.1, 2.3, 0]} castShadow>
        <boxGeometry args={[3.7, 0.12, 2.7]} />
        <meshStandardMaterial color="#262626" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* 5. Steel Support Columns */}
      <mesh position={[1.6, 0.6, 1.1]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.6, 0.6, -0.3]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Subtle Terrace Planter Box */}
      <mesh position={[-1.2, 2.45, 0.8]}>
        <boxGeometry args={[0.8, 0.18, 0.4]} />
        <meshStandardMaterial color="#4A4A46" roughness={0.8} />
      </mesh>
    </group>
  );
}

/**
 * Main Hero3DModel Container with Error Boundary & Canvas Lighting
 */
export const Hero3DModel = ({ label = "01 / FEATURED SPACE" }) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const pointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGLError(true);
    } catch (e) {
      setHasWebGLError(true);
    }

    const handleMouseMove = (e) => {
      pointerPos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (hasWebGLError) {
    return <WebGLFallback label={label} />;
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] bg-[#EEEEEB] border border-[#D9D9D4] rounded-[6px] overflow-hidden select-none shadow-sm">
      {/* Background Architectural Fine Grid */}
      <div className="absolute inset-0 architectural-grid-fine opacity-50 pointer-events-none"></div>

      {/* Top Header Badge Overlay */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <span className="text-xs uppercase tracking-architectural font-mono text-[#111111] bg-[#F7F7F5]/90 backdrop-blur-sm px-3 py-1.5 border border-[#D9D9D4] rounded-[2px] shadow-2xs">
          {label}
        </span>
        <span className="text-[11px] text-[#6B6B67] uppercase tracking-wider font-mono hidden sm:inline-block">
          INTERACTIVE 3D MODEL
        </span>
      </div>

      {/* 3D R3F Canvas */}
      <Suspense fallback={<WebGLFallback label={label} />}>
        <Canvas
          shadows
          camera={{ position: [5, 4, 6], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          onError={() => setHasWebGLError(true)}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Restrained Ambient & Directional Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[8, 12, 6]}
            intensity={1.2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={25}
            shadow-camera-left={-6}
            shadow-camera-right={6}
            shadow-camera-top={6}
            shadow-camera-bottom={-6}
            color="#FFFFFF"
          />
          <directionalLight position={[-6, 4, -4]} intensity={0.4} color="#C4D4E0" />

          {/* Floating Subtle Animation */}
          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.2}>
            <ArchitecturalBuilding pointerPos={pointerPos} />
          </Float>

          {/* Minimal OrbitControls */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2.1} 
            minPolarAngle={Math.PI / 6} 
          />
        </Canvas>
      </Suspense>

      {/* Bottom Floating Metadata Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none text-xs font-mono text-[#6B6B67] border-t border-[#D9D9D4]/80 pt-3 bg-[#F7F7F5]/40 backdrop-blur-xs px-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D85B3F]"></span>
          <span className="text-[#111111]">RESIDENTIAL STRUCTURE</span>
        </div>
        <span className="text-[11px]">DRAG TO EXPLORE</span>
      </div>
    </div>
  );
};
