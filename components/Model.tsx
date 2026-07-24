'use client';

import React, { useEffect, useRef, useState } from 'react';
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
}

export default function Model({
  scale = CONFIG.INITIAL_SCALE,
  tvVideoUrl = '/videos/sample.mp4',
}: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);

  // Load model
  const { scene, animations } = useGLTF('/models/syntact6_model_lego-2.glb');

  // Initialize animations
  const { actions, names } = useAnimations(animations, groupRef);

  // 1. Play animations on mount
  useEffect(() => {
    names.forEach((name) => {
      actions[name]?.play();
    });
  }, [actions, names]);

  // 2. Client-side only: Setup TV Video
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const video = document.createElement('video');
    video.src = tvVideoUrl;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
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
  }, [scene, tvVideoUrl]);

  // 3. Animation loop
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

useGLTF.preload('/models/syntact6_model_lego-2.glb');
