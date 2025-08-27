// src/components/CategoryList/CategoryList.tsx
import type { ICategory } from "../../interfaces/category";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useNavigate } from "react-router-dom";

type CategoryListProps = {
    categories: ICategory[];
    iconsMap?: Record<string, string>;
};

export default function CategoryList({ categories, iconsMap = {} }: CategoryListProps) {
    const navigate = useNavigate();
    return (
        <div className="row g-4">
            {categories.map((category) => (
                <div key={category.id} className="col-md-4 col-lg-4">
                     <CategoryCard
                        title={category.name}
                        description={category.description}
                        icon={iconsMap[category.slug?.toLowerCase()] || "bi-folder"}
                        onClick={() => navigate(`/categorias/${category.slug}`)}
                    />
                </div>
            ))}
        </div>
    );
}
