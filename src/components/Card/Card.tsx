// components/ui/Card.tsx
import type { ReactNode } from 'react';
import './Card.css'; // se precisar

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`card shadow-sm h-100 border-0 ${className}`}>
      {children}
    </div>
  );
}
