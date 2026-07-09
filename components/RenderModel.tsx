// components/RenderModel.tsx
'use client';

import React, { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  ScrollControls,
  PresentationControls,
  Float,
} from '@react-three/drei';
import clsx from 'clsx';

interface RenderModelProps {
  children: ReactNode;
  className?: string;
  controls?: boolean;
  environment?: boolean;
  autoRotate?: boolean;
  scrollControls?: boolean;
  presentationControls?: boolean;
}

const RenderModel = ({
  children,
  className,
  controls = false,
  environment = false,
  autoRotate = true,
  scrollControls = false,
  presentationControls = false,
  ...canvasProps
}: RenderModelProps) => {
  return (
    <div className={clsx('relative w-full h-full', className)}>
      <Canvas
        className="w-full h-full"
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 1, // ACES Filmic
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        {...canvasProps}
      >
        {/* Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={30} />

        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <directionalLight position={[-5, 5, 5]} intensity={0.8} />
          <directionalLight
            position={[5, -5, 0]}
            intensity={0.3}
            color="#d34e24"
          />
          <hemisphereLight args={['#87CEEB', '#3a1c0d', 0.4]} />
          <pointLight position={[-5, 0, 5]} intensity={0.5} color="#d34e24" />

          {/* Environment */}
          {environment && <Environment preset="studio" />}

          {/* Controls */}
          {controls && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              autoRotate={autoRotate}
              autoRotateSpeed={1.5}
              minDistance={3}
              maxDistance={15}
              target={[0, 0, 0]}
            />
          )}

          {scrollControls ? (
            <ScrollControls pages={3} damping={0.1}>
              {children}
            </ScrollControls>
          ) : presentationControls ? (
            <PresentationControls
              global
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
            >
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                {children}
              </Float>
            </PresentationControls>
          ) : (
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              {children}
            </Float>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RenderModel;
