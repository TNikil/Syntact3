'use client';

import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const CONFIG = {
  FLOAT_SPEED: 0.4,
  FLOAT_AMOUNT: 0.08,
  INITIAL_SCALE: 2.5,
};

interface ModelProps {
  scale?: number;
  tvVideoUrl?: string;
  tvMuted?: boolean;
  tvLoop?: boolean;
  enableRotation?: boolean;
  enableParallax?: boolean;
}

export default function Model({
  scale = CONFIG.INITIAL_SCALE,
  tvVideoUrl = '/videos/sample.mp4',
  tvMuted = true,
  tvLoop = true,
}: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);

  // Load model (syntact8_model)
  const { scene, animations } = useGLTF('/models/syntact5_model.glb');

  // Initialize animations
  const { actions, names } = useAnimations(animations, groupRef);

  // 1. Fix texture color spaces & ensure materials render colors properly
  useEffect(() => {
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          materials.forEach((mat: any) => {
            if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
            if (mat.emissiveMap)
              mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            mat.needsUpdate = true;
          });
        }
      }
    });
  }, [scene]);

  // 2. Play animations on mount
  useEffect(() => {
    names.forEach((name) => {
      actions[name]?.play();
    });
  }, [actions, names]);

  // 3. Client-side only: Setup TV Video
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const video = document.createElement('video');
    video.src = tvVideoUrl;
    video.muted = tvMuted;
    video.loop = tvLoop;
    video.playsInline = true;
    video.crossOrigin = 'anonymous';
    video.play().catch(() => {});

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    videoTextureRef.current = texture;

    // Apply to TV_Screen
    scene.traverse((node) => {
      if ((node as THREE.Mesh).name === 'TV_Screen') {
        (node as THREE.Mesh).material = new THREE.MeshBasicMaterial({
          map: texture,
        });
      }
    });

    return () => {
      video.pause();
      video.src = '';
      texture.dispose();
    };
  }, [scene, tvVideoUrl, tvMuted, tvLoop]);

  // 4. Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * CONFIG.FLOAT_SPEED) *
        CONFIG.FLOAT_AMOUNT;
      if (videoTextureRef.current) videoTextureRef.current.needsUpdate = true;
    }
  });

  return <primitive ref={groupRef} object={scene} scale={scale} />;
}

useGLTF.preload('/models/syntact5_model.glb');
