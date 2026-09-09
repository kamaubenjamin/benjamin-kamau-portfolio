"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Braces, CheckCircle2, Database, FileText, Gauge, Inbox, Workflow, type LucideIcon } from "lucide-react";

const stages: { label: string; detail: string; icon: LucideIcon }[] = [
  { label: "Input", detail: "Data · Documents", icon: Inbox },
  { label: "Process", detail: "Workflow", icon: Workflow },
  { label: "Validate", detail: "Rules · Review", icon: CheckCircle2 },
  { label: "Structure", detail: "Operational data", icon: Braces },
  { label: "Operate", detail: "Insights · Actions", icon: Gauge },
];

export function DataFlowVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="architecture-panel" role="img" aria-label="Systems orchestration interface showing input, process, validation, structure and operations stages">
      <div className="architecture-toolbar">
        <div className="flex items-center gap-2">
          <span className="status-light" />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">Systems orchestration</span>
        </div>
        <span className="flex items-center gap-1.5 text-[0.65rem] text-[var(--color-mint-muted)]"><CheckCircle2 size={12} /> Operational flow</span>
      </div>
      <div className="architecture-canvas">
        <div className="architecture-flow" aria-hidden="true">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div className="architecture-node" key={stage.label}>
                <div className="architecture-node-head"><Icon size={17} /><span>{String(index + 1).padStart(2, "0")}</span></div>
                <strong>{stage.label}</strong><small>{stage.detail}</small>
              </div>
            );
          })}
          <div className="architecture-route architecture-route-input" />
          <div className="architecture-route architecture-route-process" />
          <div className="architecture-route architecture-route-turn" />
          <div className="architecture-route architecture-route-operate" />
          {!shouldReduceMotion && (
            <motion.span
              className="architecture-packet"
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
            />
          )}
        </div>
        <div className="architecture-routing" aria-hidden="true">
          <div><FileText size={14} /><span>Documents</span></div>
          <div><Database size={14} /><span>Data</span></div>
          <div><Workflow size={14} /><span>Operations</span></div>
        </div>
      </div>
    </div>
  );
}
