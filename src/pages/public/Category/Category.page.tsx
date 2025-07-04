import Container from "../../../components/Container/Container.components";
import { categorias } from "../../../data/categorias.mocks";
import { Link } from "react-router-dom";
import './Category.css'

function CategoryPage() {


  return (
    <Container>
      <section className="categorias-page pt-5">
        <header className="text-center mb-5 fade-in">
          <h1 className="display-5 fw-bold">Categorias</h1>
          <p className="lead text-secondary">Navegue pelos temas mais relevantes do blog.</p>
        </header>

        <div className="row g-4">
          {categorias.map((cat, index) => (
            <div className="col-md-6 col-lg-4 fade-in" key={index}>
              <div className="card text-center shadow-sm p-4 categoria-card">
                <i className={`bi ${cat.icon} display-4 text-primary mb-3`}></i>
                <h5 className="fw-bold">{cat.name}</h5>
                <p className="text-secondary">{cat.description}</p>
                <Link to={`${cat.name.toLowerCase()}`} className="btn btn-outline-primary mt-2">
                  Ver artigos
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

export default CategoryPage;