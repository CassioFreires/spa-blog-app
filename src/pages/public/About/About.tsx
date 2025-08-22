import Container from '../../../components/Container/Container.components';
import './About.css'

function AboutPage() {
  return (
    <Container>
      <section className="about-page">
        <header className="page-header">
          <h1 className="title">Sobre o Blog</h1>
          <p className="subtitle">
            Um espaço para aprender, evoluir e se conectar com o universo da tecnologia.
          </p>
        </header>

        <div className="content-section">
          <div className="image-container">
            <img
              src="/assets/images/img-sobre.jpg"
              alt="Imagem ilustrativa de uma pessoa codificando em um notebook, simbolizando a criação do blog."
              className="about-image"
            />
          </div>

          <div className="text-container">
            <article className="article-block fade-in-up">
              <h2 className="block-title">O que é este blog?</h2>
              <p className="block-text">
                Este blog é um projeto criado para compartilhar conteúdos relevantes, práticos e atualizados sobre o mundo da tecnologia. Aqui você encontrará postagens sobre desenvolvimento de software, frameworks modernos, boas práticas, tendências de mercado, inteligência artificial, mobile, ferramentas úteis e muito mais.
              </p>
            </article>

            <article className="article-block fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="block-subtitle">Por que acompanhar?</h3>
              <ul className="info-list">
                <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Conteúdo técnico e acessível</li>
                <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Foco em desenvolvimento e inovação</li>
                <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Atualizações frequentes e práticas</li>
                <li><i className="bi bi-check-circle-fill text-primary me-2"></i> Ideal para iniciantes e profissionais</li>
              </ul>
            </article>
          </div>
        </div>

        <section className="mission-section fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="mission-content">
            <h2 className="block-title">Nossa Missão</h2>
            <p className="block-text">
              Acreditamos que o conhecimento é a chave para a evolução. Nossa missão é desmistificar a tecnologia, tornando-a acessível a todos, independentemente do nível de experiência. Queremos inspirar a comunidade, incentivando a curiosidade e o aprendizado contínuo para construir um futuro mais conectado.
            </p>
            <a href="/postagens" className="btn-cta">
              <i className="bi bi-journal-text me-1"></i> Ver postagens
            </a>
          </div>
        </section>

        <footer className="page-footer fade-in-up" style={{ animationDelay: '0.6s' }}>
          <i className="bi bi-code-slash me-1"></i>
          Blog de Tecnologia — Compartilhando conhecimento desde {new Date().getFullYear()}
        </footer>
      </section>
    </Container>
  );
}

export default AboutPage;