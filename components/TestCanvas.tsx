// components/TestCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import clsx from 'clsx';
import { OrbitControls } from '@react-three/drei';

interface TestCanvasProps {
  children?: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  alpha?: boolean;
  toneMapping?: number;
  exposure?: number;
  controls?: boolean;
}

export default function TestCanvas({
  children,
  className = '',
  cameraPosition = [0, 0, 8],
  cameraFov = 30,
  alpha = true,
  toneMapping = 0,
  exposure = 0.8,
  controls = true,
}: TestCanvasProps) {
  return (
    <div
      className={clsx('w-full h-full relative', className)}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Canvas
        className="w-full h-full"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          touchAction: 'none',
        }}
        gl={{
          antialias: true,
          alpha: alpha,
          toneMapping: toneMapping as THREE.ToneMapping,
          toneMappingExposure: exposure,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: cameraPosition,
          fov: cameraFov,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {controls && (
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
              enableDamping={true}
              dampingFactor={0.05}
              minDistance={3}
              maxDistance={20}
              target={[0, 0, 0]}
            />
          )}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
