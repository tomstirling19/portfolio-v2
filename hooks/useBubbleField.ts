"use client";

import Matter from "matter-js";
import { useEffect, useMemo, useRef } from "react";

const BASE_RADIUS = 45;
const RADIUS_PER_CHAR = 1.8;
const MAX_RADIUS = 85;

const WALL_THICKNESS = 60;
const RESTITUTION = 0.5;
const FRICTION_AIR = 0.025;

const WANDER_FORCE = 0.00065;
const WANDER_TURN = 0.22;

function radiusFor(text: string) {
  return Math.min(BASE_RADIUS + text.length * RADIUS_PER_CHAR, MAX_RADIUS);
}

function createWalls(width: number, height: number) {
  const halfWall = WALL_THICKNESS / 2;
  return [
    Matter.Bodies.rectangle(width / 2, -halfWall, width, WALL_THICKNESS, { isStatic: true }),
    Matter.Bodies.rectangle(width / 2, height + halfWall, width, WALL_THICKNESS, {
      isStatic: true,
    }),
    Matter.Bodies.rectangle(-halfWall, height / 2, WALL_THICKNESS, height, { isStatic: true }),
    Matter.Bodies.rectangle(width + halfWall, height / 2, WALL_THICKNESS, height, {
      isStatic: true,
    }),
  ];
}

function createWanderer(bodies: Matter.Body[], mouseConstraint: Matter.MouseConstraint) {
  const angles = bodies.map(() => Math.random() * Math.PI * 2);
  return () => {
    bodies.forEach((body, index) => {
      if (mouseConstraint.body === body) return;
      angles[index] += (Math.random() - 0.5) * WANDER_TURN;
      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(angles[index]) * WANDER_FORCE,
        y: Math.sin(angles[index]) * WANDER_FORCE,
      });
    });
  };
}

export function useBubbleField(items: readonly string[], reducedMotion: boolean | null) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bubbleElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const radii = useMemo(() => items.map(radiusFor), [items]);

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = container.getBoundingClientRect();
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });

    const bodies = radii.map((radius) => {
      const x = radius + Math.random() * (width - radius * 2);
      const y = radius + Math.random() * (height - radius * 2);
      return Matter.Bodies.circle(x, y, radius, {
        restitution: RESTITUTION,
        frictionAir: FRICTION_AIR,
        friction: 0,
      });
    });

    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.15, render: { visible: false } },
    });

    Matter.Composite.add(engine.world, [
      ...bodies,
      ...createWalls(width, height),
      mouseConstraint,
    ]);

    const wander = createWanderer(bodies, mouseConstraint);
    Matter.Events.on(engine, "beforeUpdate", wander);

    const syncPositions = () => {
      bodies.forEach((body, index) => {
        const el = bubbleElsRef.current[index];
        if (!el) return;
        const radius = body.circleRadius ?? 0;
        el.style.transform = `translate(${body.position.x - radius}px, ${body.position.y - radius}px)`;
      });
    };
    Matter.Events.on(engine, "afterUpdate", syncPositions);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, "beforeUpdate", wander);
      Matter.Events.off(engine, "afterUpdate", syncPositions);
      Matter.Mouse.clearSourceEvents(mouse);
      Matter.Engine.clear(engine);
    };
  }, [radii, reducedMotion]);

  return { containerRef, bubbleElsRef, radii };
}
