import { Link } from "react-router-dom";
import type { ICategoryCardProps } from "../../interfaces/categoryCard";

const CategoryCard: React.FC<ICategoryCardProps> = ({ name, description, slug, icon }) => {
  return (
    <div className="col-md-6 col-lg-4 fade-in">
      <div className="card text-center shadow-sm p-4 categoria-card h-100 d-flex flex-column">
        <i className={`bi ${icon} display-4 text-primary mb-3`}></i>
        <h5 className="fw-bold">{name}</h5>
        <p className="text-secondary flex-grow-1">{description || "Descrição indisponível"}</p>
        <Link to={`/categorias/${slug}`} className="btn btn-outline-primary mt-2">
          Ver artigos
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
