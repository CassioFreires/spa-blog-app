// src/components/ui/Section.tsx
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export default function Section({ children, className = "" }: SectionProps) {
  return <section className={className}>{children}</section>;
}
