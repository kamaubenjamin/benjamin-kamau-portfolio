import { Container } from "@/components/ui/Container";

export default function Loading() {
  return (
    <Container className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-emerald)] border-t-transparent" />
        <p className="text-sm text-[var(--color-text-muted)]">Loading...</p>
      </div>
    </Container>
  );
}