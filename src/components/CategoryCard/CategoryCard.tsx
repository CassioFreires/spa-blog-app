// src/components/CategoryCard/CategoryCard.tsx
import type { ReactNode } from "react";
import './CategoryCard.css';

type CategoryCardProps = {
  title: string;
  description?: string;
  icon?: string;
  children?: ReactNode;
  onClick?: () => void;
};

export default function CategoryCard({ title, description, icon, children, onClick }: CategoryCardProps) {
  return (
    <div
      className="category-card-wrapper"
      onClick={onClick}
    >
      <div className="category-card shadow-sm h-100 text-center p-4 rounded cursor-pointer fade-in">
        {icon && <i className={`bi ${icon} display-4 mb-3 icon-category`}></i>}
        <h5 className="fw-bold">{title}</h5>
        {description && <p className="text-muted small">{description}</p>}
        {children}
      </div>
    </div>
  );
}
