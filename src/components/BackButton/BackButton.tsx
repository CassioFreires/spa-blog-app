// src/components/ui/BackButton.tsx
import type { MouseEventHandler, ReactNode } from "react";

type BackButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
  className?: string;
};

export default function BackButton({
  onClick,
  children = "Voltar",
  className = "",
}: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-outline-secondary mb-4 d-flex align-items-center ${className}`}
    >
      <i className="bi bi-arrow-left me-2"></i>
      {children}
    </button>
  );
}
