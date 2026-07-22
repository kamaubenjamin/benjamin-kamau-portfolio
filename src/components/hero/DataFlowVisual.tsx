"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

export function DataFlowVisual() {
  const shouldReduceMotion = useReducedMotion();

  const nodes = useMemo(
    () => [
      { x: 10, y: 30, label: "Data", color: "#10b981" },
      { x: 28, y: 50, label: "Docs", color: "#34d399" },
      { x: 46, y: 30, label: "DB", color: "#10b981" },
      { x: 64, y: 50, label: "Process", color: "#a3e635" },
      { x: 82, y: 30, label: "Workflow", color: "#34d399" },
      { x: 92, y: 50, label: "Insights", color: "#a3e635" },
    ],
    []
  );

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
  ];

  const pathD = connections
    .map(([from, to]) => {
      const x1 = `${nodes[from].x}%`;
      const y1 = `${nodes[from].y}%`;
      const x2 = `${nodes[to].x}%`;
      const y2 = `${nodes[to].y}%`;
      const cx1 = `${(nodes[from].x + nodes[to].x) / 2}%`;
      const cy1 = `${(nodes[from].y + nodes[to].y) / 2 - 10}%`;
      return `M${x1},${y1} Q${cx1},${cy1} ${x2},${y2}`;
    })
    .join(" ");

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border)] bg-[var(--color-bg-card)] sm:h-80">
      <svg
        viewBox="0 0 100 80"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="pipeline-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#a3e635" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background grid */}
        <pattern
          id="grid"
          width="10"
          height="10"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 10 0 L 0 0 0 10"
            fill="none"
            stroke="#10b981"
            strokeOpacity="0.05"
            strokeWidth="0.5"
          />
        </pattern>
        <rect width="100" height="80" fill="url(#grid)" />

        {/* Connection paths */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#pipeline-grad)"
          strokeWidth="0.8"
        />

        {/* Animated dots along paths */}
        {shouldReduceMotion
          ? null
          : connections.map(([from, to], i) => {
              const x1 = nodes[from].x;
              const y1 = nodes[from].y;
              const x2 = nodes[to].x;
              const y2 = nodes[to].y;
              return (
                <motion.circle
                  key={i}
                  r="1.2"
                  fill="#a3e635"
                  filter="url(#glow)"
                  animate={{
                        cx: [x1, x2],
                        cy: [y1, y2],
                      }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              );
            })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={i}>
            {!shouldReduceMotion && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="6"
                fill={node.color}
                fillOpacity="0.15"
                animate={{ r: [6, 8, 6] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r="3"
              fill={node.color}
              filter="url(#glow)"
            />
            <text
              x={node.x}
              y={node.y + 10}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="4"
              fontFamily="var(--font-sans, sans-serif)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}