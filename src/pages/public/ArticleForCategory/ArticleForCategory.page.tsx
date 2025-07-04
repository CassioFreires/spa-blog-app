import { useParams } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import { artigos } from '../../../data/artigos.mocks';

function ArticleForCategory() {
  const { slug } = useParams<{ slug: string }>();
  const artigosFiltrados = artigos.filter(
    (artigo) => artigo.category.toLowerCase() === slug?.toLowerCase()
  );

  return (
    <Container>
      <section className="pt-5">
        <h1 className="display-5 mb-4">Categoria: {slug}</h1>

        {artigosFiltrados.length === 0 ? (
          <p className="text-muted">Nenhum artigo encontrado.</p>
        ) : (
          <div className="row g-4">
            {artigosFiltrados.map((artigo) => (
              <div className="col-md-6 col-lg-4" key={artigo.id}>
                <div className="card h-100 shadow-sm">
                  <img src={artigo.image} alt={artigo.title} className="card-img-top" />
                  <div className="card-body d-flex flex-column">
                    <h5>{artigo.title}</h5>
                    <p className="flex-grow-1">{artigo.content.substring(0, 90)}...</p>
                    <a href={`/artigos/${artigo.id}`} className="btn btn-primary mt-auto">
                      Ler mais
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}

export default ArticleForCategory;
