// AvatarModel.jsx
"use client";
import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Avatar = () => {
  const { scene, animations } = useGLTF("/avatar.glb");
  const mixer = useRef();

  useEffect(() => {
    if (!scene) return;
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }
  }, [animations, scene]);

  useFrame((_, delta) => {
    if (mixer.current) mixer.current.update(delta);
  });

  return scene ? <primitive object={scene} scale={1.7} position={[0.8, -2, 0]} /> : null;
};

const AvatarModel = () => {
  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{ position: [0, 1, 5], fov: 50 }}
     gl={{ alpha: true, preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Avatar />
        <OrbitControls enableZoom={false} />
      </Suspense>
    </Canvas>
  );
};

useGLTF.preload("/avatar.glb");

export default AvatarModel;
