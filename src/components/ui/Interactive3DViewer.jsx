import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { WebGLFallback } from './WebGLFallback';

/**
 * Interactive 3D Architectural Scene for "From structure to space" section.
 * Renders transforming layers based on selected service mode.
 */
function ServiceLayerScene({ activeLayer }) {
  const meshGroup = useRef();

  useFrame((state, delta) => {
    if (meshGroup.current) {
      meshGroup.current.rotation.y += delta * 0.2;
    }
  });

  // Material & color properties based on active service
  const isInterior = activeLayer === 'interior' || activeLayer === 'complete';
  const isCarpentry = activeLayer === 'carpentry' || activeLayer === 'complete';
  const isRenovation = activeLayer === 'renovation' || activeLayer === 'complete';
  const isPainting = activeLayer === 'painting' || activeLayer === 'complete';

  const wallColor = isPainting ? "#D85B3F" : "#F7F7F5";
  const frameWireframe = isRenovation;

  return (
    <group ref={meshGroup} position={[0, -0.4, 0]} scale={1.1}>
      {/* Structural Base Grid / Foundation */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[3.4, 0.2, 3.4]} />
        <meshStandardMaterial color="#EEEEEB" roughness={0.8} />
      </mesh>

      {/* Structural Framing Columns (Renovation Layer) */}
      <group position={[0, 0.9, 0]}>
        {/* Wireframe / Steel Skeleton */}
        <mesh position={[-1.4, 0, -1.4]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial color="#111111" wireframe={frameWireframe} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[1.4, 0, -1.4]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial color="#111111" wireframe={frameWireframe} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[-1.4, 0, 1.4]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial color="#111111" wireframe={frameWireframe} roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[1.4, 0, 1.4]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial color="#111111" wireframe={frameWireframe} roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* Main Wall Layer (Painting / Finishing Layer) */}
      <mesh position={[-0.8, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.8, 2.6]} />
        <meshStandardMaterial 
          color={wallColor} 
          roughness={0.4} 
          metalness={0.05} 
        />
      </mesh>

      {/* Carpentry Layer (Timber Millwork & Joinery Cubes) */}
      {isCarpentry && (
        <group position={[0.7, 0.6, 0.2]}>
          {/* Custom Timber Shelving / Cabinet Wall */}
          <mesh position={[0, 0.3, -0.6]} castShadow>
            <boxGeometry args={[1.2, 1.2, 0.3]} />
            <meshStandardMaterial color="#B08D74" roughness={0.5} />
          </mesh>
          {/* Timber Dining / Desk surface */}
          <mesh position={[-0.2, -0.1, 0.4]} castShadow>
            <boxGeometry args={[1.4, 0.1, 0.7]} />
            <meshStandardMaterial color="#6E4F3A" roughness={0.4} />
          </mesh>
          {/* Timber bench legs */}
          <mesh position={[-0.7, -0.35, 0.4]}>
            <boxGeometry args={[0.08, 0.4, 0.6]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
          <mesh position={[0.3, -0.35, 0.4]}>
            <boxGeometry args={[0.08, 0.4, 0.6]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        </group>
      )}

      {/* Interior Lighting & Glass Layer */}
      {isInterior && (
        <group position={[0.7, 1.0, 0]}>
          {/* Glass Partition Wall */}
          <mesh position={[0.1, 0, 0]}>
            <boxGeometry args={[0.05, 1.8, 2.6]} />
            <meshStandardMaterial color="#C4D4E0" transparent opacity={0.4} roughness={0.1} />
          </mesh>
          {/* Recessed Warm Pendant Spotlights */}
          <pointLight position={[0.3, 0.6, 0.2]} intensity={1.5} color="#FFD1B3" distance={3.5} />
          <pointLight position={[-0.5, 0.6, -0.4]} intensity={1.0} color="#FFFFFF" distance={3} />
          {/* Pendant Fixture geometry */}
          <mesh position={[0.3, 0.8, 0.2]}>
            <coneGeometry args={[0.15, 0.25, 16]} />
            <meshStandardMaterial color="#111111" />
          </mesh>
        </group>
      )}

      {/* Ceiling Structural Beam */}
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[3.2, 0.1, 3.2]} />
        <meshStandardMaterial color="#262626" roughness={0.5} />
      </mesh>
    </group>
  );
}

export const Interactive3DViewer = ({ activeServiceId, activeLayer = 'interior' }) => {
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGLError(true);
    } catch (e) {
      setHasWebGLError(true);
    }
  }, []);

  if (hasWebGLError) {
    return <WebGLFallback label="02 / STRUCTURE TO SPACE" />;
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[500px] bg-[#EEEEEB] border border-[#D9D9D4] rounded-[6px] overflow-hidden shadow-xs">
      <div className="absolute inset-0 architectural-grid-fine opacity-50 pointer-events-none"></div>

      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
        <span className="text-xs uppercase tracking-architectural font-mono text-[#111111] bg-[#F7F7F5] px-3 py-1 border border-[#D9D9D4] rounded-[2px]">
          LAYER: {activeLayer.toUpperCase()}
        </span>
        <span className="text-[11px] text-[#6B6B67] uppercase font-mono">
          3D SPECIFICATION
        </span>
      </div>

      <Suspense fallback={<WebGLFallback label="02 / STRUCTURE TO SPACE" />}>
        <Canvas
          camera={{ position: [4.5, 3.5, 5], fov: 38 }}
          gl={{ antialias: true, alpha: true }}
          onError={() => setHasWebGLError(true)}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[6, 10, 5]} intensity={1.2} />
          <directionalLight position={[-5, 3, -3]} intensity={0.4} color="#D85B3F" />

          <Float speed={1.0} rotationIntensity={0.05} floatIntensity={0.1}>
            <ServiceLayerScene activeLayer={activeLayer} />
          </Float>

          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2.2} />
        </Canvas>
      </Suspense>

      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-xs font-mono text-[#6B6B67] border-t border-[#D9D9D4] pt-3 bg-[#F7F7F5]/80 backdrop-blur-xs px-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D85B3F]"></span>
          <span className="text-[#111111]">DYNAMIC TRANSFORM SCENE</span>
        </div>
        <span>SELECT SERVICE TO ISOLATE</span>
      </div>
    </div>
  );
};
