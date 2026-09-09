import { Card } from "@/components/ui/Card";
import { IconWrapper } from "@/components/ui/IconWrapper";
import { Badge } from "@/components/ui/Badge";
import {
  Database,
  Workflow,
  FileText,
  Scale,
  LayoutDashboard,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Database,
  Workflow,
  FileText,
  Scale,
  LayoutDashboard,
  SearchCheck,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Database;

  return (
    <Card className="flex min-h-full flex-col p-6 hover:shadow-[0_16px_38px_rgba(0,0,0,.25),inset_0_1px_rgba(163,255,199,.04)]">
      <IconWrapper className="mb-4" size="md">
        <Icon size={19} />
      </IconWrapper>
      <h3 className="mb-3 text-lg font-semibold tracking-tight text-[var(--color-text)]">
        {service.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-6 text-[var(--color-text-muted)]">
        {service.description}
      </p>
      <div className="mt-auto flex flex-wrap gap-1.5">
        {service.features.map((feature) => (
          <Badge key={feature}>{feature}</Badge>
        ))}
      </div>
    </Card>
  );
}