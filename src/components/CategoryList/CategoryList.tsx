import CategoryCard from "../CategoryCard/CategoryCard";
import type { ICategoryListProps } from "../../interfaces/categoryListProps";

const CategoryList: React.FC<ICategoryListProps> = ({ categories, iconsMap }) => {
    return (
        <div className="row g-4 mb-5">
            {categories.map((cat: any) => {
                const icon = iconsMap[cat.slug] || "bi-folder";
                return <CategoryCard
                    key={cat.id}
                    name={cat.name}
                    description={cat.description}
                    slug={cat.slug} 
                    icon={icon} />;
            })}
        </div>
    );
};

export default CategoryList;
