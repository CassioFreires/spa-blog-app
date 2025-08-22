// components/ui/Button.tsx
import type { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'gradient' | 'outline';
};

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const base =
    variant === 'gradient'
      ? 'btn btn-gradient'
      : `btn btn-${variant}`;

  return (
    <button {...props} className={`${base} fw-bold ${className}`}>
      {children}
    </button>
  );
}
