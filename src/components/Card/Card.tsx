import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = '' }: CardProps) {
  // Removendo 'shadow-sm' para um visual mais flat como o Facebook
  return (
    <div className={`card h-100 ${className}`}>
      {children}
    </div>
  );
}