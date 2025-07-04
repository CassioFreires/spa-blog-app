import { Link } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import { artigos } from '../../../data/artigos.mocks';
import './Article.css'

function ArticlePage() {
  return (
    <Container>
      <section className="artigos-page">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold">Todos os Artigos</h1>
          <p className="lead text-secondary">Explore nossos conteúdos sobre tecnologia, desenvolvimento e inovação.</p>
        </header>

        <div className="row g-4">
          {artigos.map((artigo) => (
            <article key={artigo.id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <img
                  src={artigo.image}
                  className="card-img-top"
                  alt={artigo.title}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{artigo.title}</h5>
                  <p className="card-text flex-grow-1">
                    {artigo.content.substring(0, 80)}...
                  </p>
                  <Link to={`/artigos/${artigo.id}`} className="btn btn-primary mt-auto">
                    Ler mais
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}

export default ArticlePage;
