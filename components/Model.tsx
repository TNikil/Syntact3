// components/Model.tsx
'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// Constants for better maintainability
const CONFIG = {
  MOUSE_SENSITIVITY_Y: 0.15,
  MOUSE_SENSITIVITY_X: 0.05,
  SCROLL_INFLUENCE: 0.0004,
  FLOAT_SPEED: 0.4,
  FLOAT_AMOUNT: 0.08,
  FADE_START: 300,
  FADE_END: 900,
  LERP_SPEED: 0.05,
  SCALE_DURING_FADE: 0.25,
  INITIAL_SCALE: 2.5,
} as const;

interface ModelProps {
  scale?: number;
  enableRotation?: boolean;
  enableParallax?: boolean;
  enableFade?: boolean;
  preserveMaterials?: boolean;
  preserveLights?: boolean;
  environmentIntensity?: number;
  exposure?: number;
  tvVideoUrl?: string;
  tvVolume?: number;
  tvMuted?: boolean;
  tvLoop?: boolean;
}

interface GLTFResult {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  materials: { [name: string]: THREE.Material };
  nodes: { [name: string]: THREE.Object3D };
}

function isMesh(object: THREE.Object3D): object is THREE.Mesh {
  return (object as THREE.Mesh).isMesh === true;
}

function isLight(object: THREE.Object3D): object is THREE.Light {
  return (object as THREE.Light).isLight === true;
}

export default function Model({
  scale = CONFIG.INITIAL_SCALE,
  enableRotation = false,
  enableParallax = true,
  enableFade = true,
  preserveMaterials = true,
  preserveLights = true,
  environmentIntensity = 0.5,
  exposure = 1.0,
  tvVideoUrl = '/videos/sample.mp4',
  tvVolume = 0.5,
  tvMuted = true,
  tvLoop = true,
}: ModelProps) {
  const [error, setError] = useState(false);
  const [materialsLoaded, setMaterialsLoaded] = useState(false);
  const [tvFound, setTvFound] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const lightsRef = useRef<THREE.Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const isAnimating = useRef(false);
  const rotationTarget = useRef({ y: 0, x: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoTextureRef = useRef<THREE.VideoTexture | null>(null);
  const errorLoggedRef = useRef(false);

  let gltf: GLTFResult | null = null;
  try {
    gltf = useGLTF('/models/syntact3_model.glb') as GLTFResult;
  } catch (e) {
    console.error('Model loading error:', e);
    setError(true);
  }

  const animations = gltf?.animations || [];
  const { actions, names } = useAnimations(animations, groupRef);

  // ============================================================
  // ✅ VIDEO TEXTURE WITH SILENT ERROR HANDLING
  // ============================================================
  const createVideoTexture = () => {
    if (typeof window === 'undefined') return null;

    const video = document.createElement('video');
    video.src = tvVideoUrl;
    video.muted = true;
    video.loop = tvLoop;
    video.playsInline = true;
    video.preload = 'auto';
    video.crossOrigin = 'anonymous';
    video.volume = 0;

    videoRef.current = video;

    // ✅ Silent error handling - only log once
    video.addEventListener('error', (e) => {
      const videoElement = e.target as HTMLVideoElement;
      const error = videoElement.error;

      // ✅ Only log if it's a real error (not just a warning)
      if (error && error.code !== 0) {
        if (!errorLoggedRef.current) {
          errorLoggedRef.current = true;
          console.warn('📺 Video warning (non-critical):', {
            code: error.code,
            message: error.message || 'Unknown',
          });
          console.info('📺 Video may still play - continuing...');
        }
      }
    });

    // ✅ Track successful load
    video.addEventListener('loadeddata', () => {
      console.log('📺 Video data loaded successfully!');
      setVideoReady(true);
    });

    video.addEventListener('canplaythrough', () => {
      console.log('📺 Video ready to play!');
      setVideoReady(true);
      video.play().catch(() => {});
    });

    const startVideo = () => {
      video
        .play()
        .then(() => {
          console.log('📺 Video playing!');
          setVideoReady(true);
          if (tvFound) {
            console.log('📺 TV is ON with video!');
          }
        })
        .catch((e) => {
          console.warn('📺 Video autoplay blocked:', e.message);
          // Play on interaction
          const playOnInteraction = () => {
            video.play().catch(() => {});
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
          };
          document.addEventListener('click', playOnInteraction);
          document.addEventListener('touchstart', playOnInteraction);
        });
    };

    if (video.readyState >= 2) {
      startVideo();
    } else {
      video.addEventListener('canplaythrough', startVideo);
      video.addEventListener('loadeddata', startVideo);
    }

    const texture = new THREE.VideoTexture(video);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    videoTextureRef.current = texture;

    return texture;
  };

  // ============================================================
  // ✅ APPLY VIDEO TO TV SCREEN
  // ============================================================
  const applyVideoToTV = (scene: THREE.Group) => {
    const tvScreenName = 'TV_Screen';
    let foundTV = false;

    scene.traverse((node: THREE.Object3D) => {
      if (isMesh(node)) {
        const mesh = node as THREE.Mesh;
        if (mesh.name === tvScreenName) {
          console.log('📺 Found TV screen! Name:', mesh.name);

          const texture = createVideoTexture();
          if (texture) {
            videoTextureRef.current = texture;

            // ✅ Create fresh material for TV
            const tvMaterial = new THREE.MeshStandardMaterial({
              map: texture,
              emissive: new THREE.Color('#ffffff'),
              emissiveIntensity: 0.3,
              emissiveMap: texture,
              roughness: 0.2,
              metalness: 0.1,
              toneMapped: true,
            });

            mesh.material = tvMaterial;
            mesh.material.needsUpdate = true;

            setTvFound(true);
            foundTV = true;
            console.log('✅ Video texture applied to TV_Screen!');
          }
        }
      }
    });

    if (!foundTV) {
      console.warn('⚠️ TV_Screen not found. Available meshes:');
      scene.traverse((node: THREE.Object3D) => {
        if (isMesh(node)) {
          console.log('  -', node.name);
        }
      });
    }
  };

  // ============================================================
  // ✅ BLENDER MATERIAL PRESERVATION
  // ============================================================
  const preserveBlenderMaterials = (scene: THREE.Group) => {
    if (!preserveMaterials) return;

    console.log('🔄 Preserving Blender materials...');

    scene.traverse((node: THREE.Object3D) => {
      if (isMesh(node)) {
        const mesh = node as THREE.Mesh;
        if (mesh.material) {
          const materials = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];

          materials.forEach((mat: THREE.Material) => {
            if (
              mat.type === 'MeshStandardMaterial' ||
              mat.type === 'MeshPhysicalMaterial'
            ) {
              const standardMat = mat as THREE.MeshStandardMaterial;
              standardMat.needsUpdate = true;

              if (standardMat.map) {
                standardMat.map.colorSpace = THREE.SRGBColorSpace;
                standardMat.map.flipY = false;
              }
              if (standardMat.normalMap) {
                standardMat.normalMap.colorSpace = THREE.LinearSRGBColorSpace;
              }
              if (standardMat.roughnessMap) {
                standardMat.roughnessMap.colorSpace =
                  THREE.LinearSRGBColorSpace;
              }
              if (standardMat.metalnessMap) {
                standardMat.metalnessMap.colorSpace =
                  THREE.LinearSRGBColorSpace;
              }
              if (standardMat.aoMap) {
                standardMat.aoMap.colorSpace = THREE.LinearSRGBColorSpace;
              }
              if (standardMat.emissiveMap) {
                standardMat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
              }

              if (standardMat.emissiveIntensity === undefined) {
                standardMat.emissiveIntensity = 1.0;
              }

              if (standardMat.transparent) {
                standardMat.depthWrite = false;
                standardMat.side = THREE.DoubleSide;
              }
            }
          });
        }
      }
    });

    setMaterialsLoaded(true);
    console.log('✅ Blender materials preserved successfully!');
  };

  // ============================================================
  // ✅ BLENDER LIGHT PRESERVATION
  // ============================================================
  const preserveBlenderLights = (scene: THREE.Group) => {
    if (!preserveLights) return;

    console.log('🔄 Preserving Blender lights...');

    const lightNodes: THREE.Light[] = [];
    scene.traverse((node: THREE.Object3D) => {
      if (isLight(node)) {
        const light = node as THREE.Light;
        lightNodes.push(light);
        console.log(`💡 Light: ${node.name || 'unnamed'}`, {
          type: node.type,
          intensity: light.intensity,
        });
      }
    });

    if (lightsRef.current) {
      lightsRef.current.children = [];
      lightNodes.forEach((light) => {
        const cloned = light.clone();
        lightsRef.current?.add(cloned);
      });
    }

    return lightNodes;
  };

  // ============================================================
  // ✅ MODEL INITIALIZATION
  // ============================================================
  useEffect(() => {
    if (!gltf || error) return;

    console.log('📦 Model loaded, processing...');

    if (preserveMaterials) {
      preserveBlenderMaterials(gltf.scene);
    }

    if (preserveLights) {
      preserveBlenderLights(gltf.scene);
    }

    applyVideoToTV(gltf.scene);

    console.log('📊 Scene structure:');
    gltf.scene.traverse((node: THREE.Object3D) => {
      if (isMesh(node)) {
        const mesh = node as THREE.Mesh;
        console.log(`  🎨 Mesh: ${node.name || 'unnamed'}`, {
          geometry: mesh.geometry?.type || 'unknown',
          material: mesh.material
            ? Array.isArray(mesh.material)
              ? 'multi'
              : mesh.material.type
            : 'none',
        });
      }
      if (isLight(node)) {
        const light = node as THREE.Light;
        console.log(`  💡 Light: ${node.name || 'unnamed'}`, {
          type: node.type,
          intensity: light.intensity,
        });
      }
    });

    console.log('✅ Model processing complete!');
    if (tvFound) {
      console.log('📺 TV is ready!');
    }
  }, [gltf, error, preserveMaterials, preserveLights]);

  // ============================================================
  // ✅ CLEANUP
  // ============================================================
  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = '';
        videoRef.current = null;
      }
      if (videoTextureRef.current) {
        videoTextureRef.current.dispose();
        videoTextureRef.current = null;
      }
    };
  }, []);

  // ============================================================
  // ✅ MOUSE TRACKING
  // ============================================================
  useEffect(() => {
    if (!enableParallax) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableParallax]);

  // ============================================================
  // ✅ SCROLL TRACKING
  // ============================================================
  useEffect(() => {
    if (!enableFade) return;

    let rafId: number;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        scrollY.current = window.scrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enableFade]);

  // ============================================================
  // ✅ FALLBACK
  // ============================================================
  if (error || !gltf) {
    return (
      <mesh>
        <torusKnotGeometry args={[1, 0.3, 100, 16]} />
        <meshPhysicalMaterial
          color="#d34e24"
          metalness={0.8}
          roughness={0.2}
          clearcoat={0.3}
          emissive="#d34e24"
          emissiveIntensity={0.1}
        />
      </mesh>
    );
  }

  // ============================================================
  // ✅ ANIMATION LOOP
  // ============================================================
  useFrame((state) => {
    if (!groupRef.current || error) return;

    if (enableParallax) {
      const targetRotY =
        mouseTarget.current.x * CONFIG.MOUSE_SENSITIVITY_Y +
        scrollY.current * CONFIG.SCROLL_INFLUENCE;
      const targetRotX = mouseTarget.current.y * CONFIG.MOUSE_SENSITIVITY_X;

      rotationTarget.current.y = targetRotY;
      rotationTarget.current.x = targetRotX;
    }

    if (enableRotation) {
      groupRef.current.rotation.y += 0.005;
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        rotationTarget.current.y,
        CONFIG.LERP_SPEED,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        rotationTarget.current.x,
        CONFIG.LERP_SPEED,
      );
    }

    groupRef.current.position.y =
      Math.sin(state.clock.elapsedTime * CONFIG.FLOAT_SPEED) *
      CONFIG.FLOAT_AMOUNT;

    if (enableFade) {
      const progress = Math.min(
        Math.max(
          (scrollY.current - CONFIG.FADE_START) /
            (CONFIG.FADE_END - CONFIG.FADE_START),
          0,
        ),
        1,
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      groupRef.current.position.z = easedProgress * -5;
      groupRef.current.scale.setScalar(
        scale * (1 - easedProgress * CONFIG.SCALE_DURING_FADE),
      );
    }

    if (videoTextureRef.current) {
      videoTextureRef.current.needsUpdate = true;
    }
  });

  // ============================================================
  // ✅ RENDER
  // ============================================================
  return (
    <>
      {preserveLights && <group ref={lightsRef} />}
      <primitive ref={groupRef} object={gltf.scene} scale={scale} />
    </>
  );
}

useGLTF.preload('/models/syntact3_model.glb');
