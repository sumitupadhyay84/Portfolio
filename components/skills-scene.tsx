"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skills } from "@/constants/site";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────────

const HEMISPHERE_SEGMENTS: [number, number, number, number, number, number][] = [
  [32, 32, Math.PI / 2 - 0.5, 1, Math.PI / 2 - 0.5, 1],
  [32, 32, Math.PI * 1.5 - 0.5, 1, Math.PI / 2 - 0.5, 1],
  [32, 32, -0.5, 1, Math.PI / 2 - 0.5, 1],
  [32, 32, Math.PI - 0.5, 1, Math.PI / 2 - 0.5, 1],
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Build an initial ball-grid layout. Called synchronously so balls exist on the first render frame. */
function buildGrid(allSkills: Skill[], mobile: boolean, tablet: boolean): Ball[] {
  const radius = mobile ? 0.52 : tablet ? 0.75 : 1.1;
  const cols = mobile ? 4 : tablet ? 5 : 7;
  const spacingX = radius * 2.2;
  const spacingY = radius * 2.6; // extra vertical gap for Html labels

  return allSkills.map((_, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const totalRows = Math.ceil(allSkills.length / cols);
    return {
      id: index,
      x: -((cols - 1) * spacingX) / 2 + col * spacingX,
      y: ((totalRows - 1) * spacingY) / 2 - row * spacingY,
      z: 0,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      vz: (Math.random() - 0.5) * 0.08,
      r: radius,
      spinSpeed: Math.random() * 0.05,
      interacted: true, // start animated immediately
    };
  });
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Load an SVG icon as a THREE texture. Skips fetch when icon path is empty. */
function useSkillTexture(icon: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!icon) return; // no icon path — keep texture null, skip fetch

    let active = true;

    const loadDirect = (url: string) => {
      new THREE.TextureLoader().load(
        url,
        (loaded) => {
          if (!active) return;
          loaded.colorSpace = THREE.SRGBColorSpace;
          loaded.needsUpdate = true;
          setTexture(loaded);
        },
        undefined,
        () => { if (active) setTexture(null); }
      );
    };

    fetch(icon)
      .then((res) => res.text())
      .then((svg) => {
        const patched = svg
          .replace(/width="[^"]*"/g, "")
          .replace(/height="[^"]*"/g, "")
          .replace("<svg ", '<svg width="512" height="512" ');
        const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(patched)))}`;
        loadDirect(dataUrl);
      })
      .catch(() => loadDirect(icon));

    return () => { active = false; };
  }, [icon]);

  return texture;
}

// ─── SkillBall ─────────────────────────────────────────────────────────────────

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
  const hasIcon = Boolean(skill.icon);

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
      onClick={(e) => {
        e.stopPropagation();
        if (!ball) return;
        ball.interacted = true;
        ball.spinSpeed = 0.4;
        ball.vz = (Math.random() - 0.5) * 0.5;
        ball.vx += (Math.random() - 0.5) * 0.5;
        ball.vy += (Math.random() - 0.5) * 0.5;
      }}
    >
      {/* Base sphere — white for icon balls, dark-blue for text-only balls */}
      <mesh>
        <sphereGeometry args={[radius, 64, 64]} />
        <meshStandardMaterial
          color={hasIcon ? "#e5e7eb" : "#1e3a5f"}
          metalness={hasIcon ? 0.05 : 0.3}
          roughness={hasIcon ? 0.3 : 0.4}
        />
      </mesh>

      {/* SVG icon projected onto the sphere surface */}
      {texture &&
        HEMISPHERE_SEGMENTS.map((seg, i) => (
          <mesh key={`${skill.name}-seg-${i}`}>
            <sphereGeometry args={[radius * 1.01, seg[0], seg[1], seg[2], seg[3], seg[4], seg[5]]} />
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

      {/* Skill name label — always visible below the ball */}
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

// ─── SkillsPhysics ─────────────────────────────────────────────────────────────

function SkillsPhysics({ allSkills }: { allSkills: Skill[] }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const isTablet = typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1024;

  // Build grid synchronously so balls exist on the very first render frame
  const ballsRef = useRef<Ball[]>(buildGrid(allSkills, isMobile, isTablet));
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const isMobileRef = useRef(isMobile);
  const isTabletRef = useRef(isTablet);

  // Rebuild grid when viewport crosses the mobile/tablet breakpoints
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      if (mobile !== isMobileRef.current || tablet !== isTabletRef.current) {
        isMobileRef.current = mobile;
        isTabletRef.current = tablet;
        ballsRef.current = buildGrid(allSkills, mobile, tablet);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [allSkills]);

  useFrame(({ viewport, pointer }) => {
    const balls = ballsRef.current;
    const mx = pointer.x * (viewport.width / 2);
    const my = pointer.y * (viewport.height / 2);
    const isActive = Math.abs(pointer.x) > 0.01 || Math.abs(pointer.y) > 0.01;
    mouseRef.current = { x: mx, y: my, active: isActive };

    const mobile = isMobileRef.current;
    const tablet = isTabletRef.current;
    const attractRadius = mobile ? 2.4 : tablet ? 3.5 : 5.5;
    const damping = isActive ? 0.98 : 0.995;
    // Extra margin on mobile/tablet so Html labels don't clip at the canvas edge
    const boundsX = viewport.width / 2 - (mobile ? 0.7 : tablet ? 0.9 : 1.2);
    const boundsY = viewport.height / 2 - (mobile ? 1.1 : tablet ? 1.0 : 1.2);

    // ── Apply forces ──────────────────────────────────────────────────────────
    for (const ball of balls) {
      // Gravity towards centre
      ball.vx += -ball.x * 0.0003;
      ball.vy += -ball.y * 0.0003;
      ball.vz += -ball.z * 0.01;

      // Mouse repulsion
      if (isActive) {
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

      // Integrate
      ball.x += ball.vx;
      ball.y += ball.vy;
      ball.z += ball.vz;
      ball.vx *= damping;
      ball.vy *= damping;
      ball.vz *= damping;

      // Boundary collisions
      if (ball.x > boundsX)  { ball.x = boundsX;   ball.vx *= -0.9; }
      if (ball.x < -boundsX) { ball.x = -boundsX;  ball.vx *= -0.9; }
      if (ball.y > boundsY)  { ball.y = boundsY;   ball.vy *= -0.9; }
      if (ball.y < -boundsY) { ball.y = -boundsY;  ball.vy *= -0.9; }
      if (ball.z > 2)  { ball.z = 2;   ball.vz *= -0.8; }
      if (ball.z < -2) { ball.z = -2;  ball.vz *= -0.8; }
    }

    // ── Ball–ball collision ───────────────────────────────────────────────────
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

// ─── SkillsScene (exported) ────────────────────────────────────────────────────

export function SkillsScene() {
  // Mount the Canvas once when the section nears the viewport, then keep it alive permanently.
  const [everVisible, setEverVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const allSkills = useMemo(() => skills, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEverVisible(true);
          observer.disconnect(); // never unmount again
        }
      },
      { threshold: 0, rootMargin: "300px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      // Height responsive: tallest on mobile (4-col grid), medium on tablet (5-col), compact on desktop
      className="relative flex h-[56rem] w-full cursor-crosshair items-center justify-center overflow-hidden bg-zinc-950 md:h-[44rem] lg:h-[50rem]"
    >
      {everVisible ? (
        <Canvas camera={{ position: [0, 0, 40], fov: 20 }} gl={{ antialias: true, alpha: true }}>
          <SkillsPhysics allSkills={allSkills} />
        </Canvas>
      ) : (
        <div className="h-full w-full bg-zinc-950" />
      )}
    </div>
  );
}
