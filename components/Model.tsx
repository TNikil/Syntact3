'use client';

import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const CONFIG = {
  FLOAT_SPEED: 0.4,
  FLOAT_AMOUNT: 0.08,
  INITIAL_SCALE: 2.5,
  VIDEO_SPEED: 0.5, // 0.5 = half speed (slow motion), 1.0 = normal speed
};

interface ModelProps {
  scale?: number;
  tvVideoUrl?: string;
  tvTwoVideoUrl?: string;
  tvMuted?: boolean;
  tvLoop?: boolean;
  playbackRate?: number; // Optional prop to adjust speed dynamically
  enableRotation?: boolean;
  enableParallax?: boolean;
}

export default function Model({
  scale = CONFIG.INITIAL_SCALE,
  tvVideoUrl = '/videos/sample_2.mp4',
  tvTwoVideoUrl = '/videos/sample.mp4',
  tvMuted = true,
  tvLoop = true,
  playbackRate = CONFIG.VIDEO_SPEED,
}: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
  const videoTwoTextureRef = useRef<THREE.VideoTexture | null>(null);

  // Load model (syntact1_model)
  const { scene, animations } = useGLTF('/models/syntact1_model.glb');

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

  // 3. Client-side only: Setup TV Videos (Screen 1 & Screen 2) in Slow Motion
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // --- Video 1 Setup ---
    const video1 = document.createElement('video');
    video1.src = tvVideoUrl;
    video1.muted = tvMuted;
    video1.loop = tvLoop;
    video1.playsInline = true;
    video1.crossOrigin = 'anonymous';
    video1.playbackRate = playbackRate; // Sets slow motion speed
    video1.play().catch(() => {});

    const texture1 = new THREE.VideoTexture(video1);
    texture1.colorSpace = THREE.SRGBColorSpace;
    videoTextureRef.current = texture1;

    // --- Video 2 Setup ---
    const video2 = document.createElement('video');
    video2.src = tvTwoVideoUrl;
    video2.muted = tvMuted;
    video2.loop = tvLoop;
    video2.playsInline = true;
    video2.crossOrigin = 'anonymous';
    video2.playbackRate = playbackRate; // Sets slow motion speed
    video2.play().catch(() => {});

    const texture2 = new THREE.VideoTexture(video2);
    texture2.colorSpace = THREE.SRGBColorSpace;
    videoTwoTextureRef.current = texture2;

    // Apply textures to respective screen meshes by name
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        if (mesh.name === 'TV_Screen') {
          mesh.material = new THREE.MeshBasicMaterial({ map: texture1 });
        } else if (mesh.name === 'TV_Screen_2') {
          mesh.material = new THREE.MeshBasicMaterial({ map: texture2 });
        }
      }
    });

    return () => {
      video1.pause();
      video1.src = '';
      texture1.dispose();

      video2.pause();
      video2.src = '';
      texture2.dispose();
    };
  }, [scene, tvVideoUrl, tvTwoVideoUrl, tvMuted, tvLoop, playbackRate]);

  // 4. Animation loop
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * CONFIG.FLOAT_SPEED) *
        CONFIG.FLOAT_AMOUNT;
      if (videoTextureRef.current) videoTextureRef.current.needsUpdate = true;
      if (videoTwoTextureRef.current)
        videoTwoTextureRef.current.needsUpdate = true;
    }
  });

  return <primitive ref={groupRef} object={scene} scale={scale} />;
}

useGLTF.preload('/models/syntact1_model.glb');
