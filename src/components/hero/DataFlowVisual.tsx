"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Braces, CheckCircle2, Database, FileText, Gauge, Inbox, Workflow, type LucideIcon } from "lucide-react";

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
              <div className="contents" key={stage.label}>
                <div className="architecture-node">
                  <div className="architecture-node-head"><Icon size={16} /><span>{String(index + 1).padStart(2, "0")}</span></div>
                  <strong>{stage.label}</strong><small>{stage.detail}</small>
                </div>
                {index < stages.length - 1 && (
                  <div className="architecture-connector">
                    <span className="architecture-line" />
                    {!shouldReduceMotion && <motion.span className="architecture-packet" animate={{ left: ["0%", "calc(100% - 4px)"] }} transition={{ duration: 2.4, delay: index * 0.35, repeat: Infinity, ease: "linear" }} />}
                    <ArrowRight size={13} />
                  </div>
                )}
              </div>
            );
          })}
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
