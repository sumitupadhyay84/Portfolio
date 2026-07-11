"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skills } from "@/constants/site";

type Skill = (typeof skills)[number];

type Ball = {
  id: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  r: number;
  spinSpeed: number;
  interacted: boolean;
};

const HEMISPHERE_SEGMENTS: [number, number, number, number, number, number][] = [
  [32, 32, Math.PI / 2 - 0.5, 1, Math.PI / 2 - 0.5, 1],
  [32, 32, Math.PI * 1.5 - 0.5, 1, Math.PI / 2 - 0.5, 1],
  [32, 32, -0.5, 1, Math.PI / 2 - 0.5, 1],
  [32, 32, Math.PI - 0.5, 1, Math.PI / 2 - 0.5, 1],
];

function useSkillTexture(icon: string) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;

    const loadTexture = (url: string) => {
      new THREE.TextureLoader().load(
        url,
        (loaded) => {
          if (!active) return;
          loaded.colorSpace = THREE.SRGBColorSpace;
          loaded.needsUpdate = true;
          setTexture(loaded);
        },
        undefined,
        () => {
          if (!active) return;
          setTexture(null);
        }
      );
    };

    fetch(icon)
      .then((response) => response.text())
      .then((svg) => {
        const patched = svg
          .replace(/width="[^"]*"/g, "")
          .replace(/height="[^"]*"/g, "")
          .replace("<svg ", '<svg width="512" height="512" ');
        const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(patched)))}`;
        loadTexture(dataUrl);
      })
      .catch(() => loadTexture(icon));

    return () => {
      active = false;
    };
  }, [icon]);

  return texture;
}

function SkillBall({
  skill,
  index,
  ballsRef,
}: {
  skill: Skill;
  index: number;
  ballsRef: MutableRefObject<Ball[]>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useSkillTexture(skill.icon);
  const ball = ballsRef.current[index];
  const radius = ball?.r ?? 1.1;

  useFrame(() => {
    if (!groupRef.current || !ball) return;

    groupRef.current.position.set(
      ball.x,
      ball.y + Math.sin(Date.now() * 0.0015 + ball.id) * 0.12,
      ball.z
    );

    if (ball.interacted) {
      groupRef.current.rotation.x += ball.vy * 0.15;
      groupRef.current.rotation.y += ball.vx * 0.15;
    } else {
      groupRef.current.rotation.set(0, 0, 0);
    }

    if (ball.spinSpeed > 0.001) {
      groupRef.current.rotation.z += ball.spinSpeed;
      ball.spinSpeed *= 0.95;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={(event) => {
        event.stopPropagation();
        if (!ball) return;
        ball.interacted = true;
        ball.spinSpeed = 0.4;
        ball.vz = (Math.random() - 0.5) * 0.5;
        ball.vx += (Math.random() - 0.5) * 0.5;
        ball.vy += (Math.random() - 0.5) * 0.5;
      }}
    >
      {/* Base sphere */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color={skill.icon ? "#e5e7eb" : "#1e3a5f"}
          metalness={skill.icon ? 0.05 : 0.3}
          roughness={skill.icon ? 0.3 : 0.4}
        />
      </mesh>

      {/* SVG icon overlaid on the ball (only when icon exists) */}
      {texture &&
        HEMISPHERE_SEGMENTS.map((segment, segmentIndex) => (
          <mesh key={`${skill.name}-${segmentIndex}`}>
            <sphereGeometry
              args={[
                radius * 1.01,
                segment[0],
                segment[1],
                segment[2],
                segment[3],
                segment[4],
                segment[5],
              ]}
            />
            <meshStandardMaterial
              map={texture}
              transparent
              depthWrite={false}
              roughness={0.3}
              metalness={0.1}
              color="#ffffff"
            />
          </mesh>
        ))}

      {/* Text label always visible below the ball */}
      <Html
        position={[0, -(radius + 0.35), 0]}
        center
        distanceFactor={10}
        zIndexRange={[0, 10]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            background: "rgba(9, 9, 11, 0.82)",
            border: "1px solid rgba(6,182,212,0.35)",
            borderRadius: "6px",
            padding: "2px 7px",
            color: "#e4e4e7",
            fontSize: "9px",
            fontFamily: "'Inter', monospace",
            fontWeight: 600,
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            backdropFilter: "blur(4px)",
            userSelect: "none",
          }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function SkillsPhysics({ allSkills }: { allSkills: Skill[] }) {
  const ballsRef = useRef<Ball[]>([]);
  const mouse = useRef({ x: 0, y: 0, active: false });
  const isMobile = useRef(false);

  useEffect(() => {
    const onResize = () => {
      isMobile.current = window.innerWidth < 768;
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (ballsRef.current.length !== allSkills.length) {
    const radius = isMobile.current ? 0.58 : 1.1;
    const cols = isMobile.current ? 3 : 7;
    const spacing = radius * 2;
    ballsRef.current = allSkills.map((_, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const totalRows = Math.ceil(allSkills.length / cols);
      return {
        id: index,
        x: -((cols - 1) * spacing) / 2 + col * spacing,
        y: ((totalRows - 1) * spacing) / 2 - row * spacing,
        z: 0,
        // Give each ball an initial random velocity so they scatter immediately on mount
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        vz: (Math.random() - 0.5) * 0.08,
        r: radius,
        spinSpeed: Math.random() * 0.05,
        interacted: true, // pre-mark interacted so rotations are alive from the start
      };
    });
  }

  useFrame(({ viewport, pointer }) => {
    const balls = ballsRef.current;
    const mx = pointer.x * (viewport.width / 2);
    const my = pointer.y * (viewport.height / 2);
    mouse.current = { x: mx, y: my, active: Math.abs(pointer.x) > 0.01 || Math.abs(pointer.y) > 0.01 };

    const attractRadius = isMobile.current ? 2.4 : 5.5;
    const damping = mouse.current.active ? 0.98 : 0.995;
    const boundsX = viewport.width / 2 - (isMobile.current ? 0.8 : 1.2);
    const boundsY = viewport.height / 2 - (isMobile.current ? 0.8 : 1.2);

    for (const ball of balls) {
      ball.vx += -ball.x * 0.0003;
      ball.vy += -ball.y * 0.0003;
      ball.vz += -ball.z * 0.01;

      if (mouse.current.active) {
        const dx = ball.x - mx;
        const dy = ball.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < attractRadius && dist > 0) {
          ball.interacted = true;
          const force = (attractRadius - dist) * 0.02;
          ball.vx += (dx / dist) * force;
          ball.vy += (dy / dist) * force;
        }
      }

      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.z += ball.vz;
      ball.vx *= damping;
      ball.vy *= damping;
      ball.vz *= damping;

      if (ball.x > boundsX) {
        ball.x = boundsX;
        ball.vx *= -0.9;
      }
      if (ball.x < -boundsX) {
        ball.x = -boundsX;
        ball.vx *= -0.9;
      }
      if (ball.y > boundsY) {
        ball.y = boundsY;
        ball.vy *= -0.9;
      }
      if (ball.y < -boundsY) {
        ball.y = -boundsY;
        ball.vy *= -0.9;
      }
      if (ball.z > 2) {
        ball.z = 2;
        ball.vz *= -0.8;
      }
      if (ball.z < -2) {
        ball.z = -2;
        ball.vz *= -0.8;
      }
    }

    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        const a = balls[i];
        const b = balls[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dz = b.z - a.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        const minDist = a.r + b.r;

        if (dist < minDist && dist > 0) {
          if (a.interacted || b.interacted) {
            a.interacted = true;
            b.interacted = true;
          }
          const overlap = (minDist - dist) * 0.05;
          const nx = dx / dist;
          const ny = dy / dist;
          const nz = dz / dist;
          a.vx -= nx * overlap;
          a.vy -= ny * overlap;
          a.vz -= nz * overlap;
          b.vx += nx * overlap;
          b.vy += ny * overlap;
          b.vz += nz * overlap;
        }
      }
    }
  });

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 10, 7]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} />
      <pointLight position={[0, 0, 10]} intensity={0.8} />
      {allSkills.map((skill, index) => (
        <SkillBall key={skill.name} skill={skill} index={index} ballsRef={ballsRef} />
      ))}
    </>
  );
}

export function SkillsScene() {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const allSkills = useMemo(() => skills, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    // Use a large rootMargin so the Canvas mounts before the section scrolls into full view
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
      rootMargin: "400px 0px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[37.5rem] w-full cursor-crosshair items-center justify-center overflow-hidden bg-zinc-950 md:h-[50rem]"
    >
      {visible ? (
        <Canvas camera={{ position: [0, 0, 40], fov: 20 }} gl={{ antialias: true, alpha: true }}>
          <SkillsPhysics allSkills={allSkills} />
        </Canvas>
      ) : (
        <div className="h-full w-full bg-zinc-950" />
      )}
    </div>
  );
}
