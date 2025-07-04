import Container from '../../../components/Container/Container.components';
import './About.css'

function AboutPage() {
  return (
    <Container>
      <section className="sobre-page py-5">
        <header className="text-center mb-5 fade-in">
          <h1 className="display-5 fw-bold">Sobre o Blog</h1>
          <p className="lead text-secondary">
            Um espaço para aprender, evoluir e se conectar com o universo da tecnologia.
          </p>
        </header>

        <div className="row g-5 align-items-center">
          <div className="col-md-6 fade-in">
            <img
              src="https://source.unsplash.com/random/700x500?technology,code"
              alt="Imagem ilustrativa do blog"
              className="img-fluid rounded shadow"
            />
          </div>

          <div className="col-md-6 fade-in">
            <h2 className="fw-bold mb-3">O que é este blog?</h2>
            <p className="fs-5 text-secondary">
              Este blog é um projeto criado para compartilhar conteúdos relevantes, práticos e atualizados sobre o mundo da tecnologia.
              Aqui você encontrará artigos sobre desenvolvimento de software, frameworks modernos, boas práticas, tendências de mercado,
              inteligência artificial, mobile, ferramentas úteis e muito mais.
            </p>

            <h3 className="mt-4 fw-semibold">Por que acompanhar?</h3>
            <ul className="list-unstyled fs-5 text-secondary mt-3">
              <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Conteúdo técnico e acessível</li>
              <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Foco em desenvolvimento e inovação</li>
              <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Atualizações frequentes e práticas</li>
              <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Ideal para iniciantes e profissionais</li>
            </ul>

            <a href="/artigos" className="btn btn-primary mt-4">
              <i className="bi bi-journal-text me-1"></i> Ver artigos
            </a>
          </div>
        </div>

        <footer className="text-center mt-5 small text-muted fade-in">
          <i className="bi bi-code-slash me-1"></i>
          Blog de Tecnologia — Compartilhando conhecimento desde {new Date().getFullYear()}
        </footer>
      </section>
    </Container>
  );
}

export default AboutPage;
