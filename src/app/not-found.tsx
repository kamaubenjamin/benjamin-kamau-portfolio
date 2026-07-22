import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Container className="text-center">
        <p className="mb-4 text-8xl font-bold text-[var(--color-emerald)]">404</p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-[var(--color-text)]">
          Page not found
        </h1>
        <p className="mb-8 text-lg text-[var(--color-text-muted)]">
          The page you are looking for does not exist or has been moved.
        </p>
        <Button href="/" variant="primary" size="lg">
          Back to Home
        </Button>
      </Container>
    </div>
  );
}