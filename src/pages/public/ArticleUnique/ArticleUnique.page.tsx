import { useParams, useNavigate } from 'react-router-dom';
import { artigos } from '../../../data/artigos.mocks';
import Container from '../../../components/Container/Container.components';
import './ArticleUnique.css'

function ArticleUniquePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artigo = artigos.find((item) => item.id === Number(id));

  if (!artigo) {
    return (
      <Container>
        <div className="text-center text-danger mt-5">
          <i className="bi bi-exclamation-triangle-fill fs-1 mb-3"></i>
          <h2>Artigo não encontrado.</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <article className="article-page fade-in pt-5">
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
          <i className="bi bi-arrow-left me-2"></i> Voltar
        </button>

        <header className="mb-4 text-center">
          <h1 className="display-5 fw-bold mb-2">{artigo.title}</h1>
          <p className="text-muted">
            <i className="bi bi-tag me-1"></i> {artigo.category}
          </p>
        </header>

        <img
          src={artigo.image}
          alt={`Imagem de ${artigo.title}`}
          className="img-fluid rounded shadow mb-4 animated-image"
        />

        <section className="fs-5 lh-lg">
          {artigo.content}
        </section>

        <footer className="mt-5 text-center text-muted small">
          <i className="bi bi-clock-history me-1"></i>
          Última atualização: Julho 2025
        </footer>
      </article>
    </Container>
  );
}

export default ArticleUniquePage;
