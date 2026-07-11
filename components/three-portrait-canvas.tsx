"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  image: string;
  alt?: string;
  className?: string;
};

function PortraitMesh({ image }: { image: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      image,
      (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace;
        loaded.needsUpdate = true;
        setTexture(loaded);
      },
      undefined,
      () => setTexture(null)
    );
  }, [image]);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      mouse.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Compute plane dimensions to FILL the viewport while maintaining image aspect ratio
  const dimensions = useMemo(() => {
    if (!texture?.image) {
      // Default portrait ratio fill — use full viewport width, portrait height
      return { width: viewport.width, height: viewport.height };
    }
    const img = texture.image as HTMLImageElement;
    const imgAspect = img.width / img.height;
    const vpAspect = viewport.width / viewport.height;

    let width: number;
    let height: number;

    if (imgAspect > vpAspect) {
      // Image is wider than viewport — constrain by width
      width = viewport.width;
      height = viewport.width / imgAspect;
    } else {
      // Image is taller — constrain by height (fills vertically)
      height = viewport.height;
      width = viewport.height * imgAspect;
    }

    return { width, height };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture, viewport.width, viewport.height]);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.current.x * 0.15,
      0.08
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      mouse.current.y * 0.1,
      0.08
    );
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
  });

  if (!texture) return null;

  return (
    <>
      <ambientLight intensity={1.6} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-4, -2, -3]} intensity={0.35} />
      <mesh ref={meshRef} position={[0, -0.05, 0]}>
        <planeGeometry args={[dimensions.width, dimensions.height, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.02}
          roughness={0.4}
          metalness={0.05}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

export function ThreePortrait({ image, alt = "Developer portrait", className = "" }: Props) {
  return (
    <div
      id="threed-portrait-canvas-container"
      aria-label={alt}
      className={`relative h-full w-full overflow-visible ${className}`}
      style={{ cursor: "pointer", userSelect: "none" }}
    >
      <Canvas
        className="!h-full !w-full"
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        style={{ width: "100%", height: "100%" }}
      >
        <PortraitMesh image={image} />
      </Canvas>
    </div>
  );
}
