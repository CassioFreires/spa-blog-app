// src/components/ui/EmptyState.tsx
type EmptyStateProps = {
  message?: string;
};

export default function EmptyState({ message = "Nenhum item encontrado." }: EmptyStateProps) {
  return (
    <p className="text-center text-muted my-5">{message}</p>
  );
}
