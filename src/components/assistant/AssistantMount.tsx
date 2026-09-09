"use client";

import dynamic from "next/dynamic";

const BenkaiAssistant = dynamic(
  () => import("./BenkaiAssistant").then((module) => module.BenkaiAssistant),
  { ssr: false },
);

export function AssistantMount() {
  return <BenkaiAssistant />;
}