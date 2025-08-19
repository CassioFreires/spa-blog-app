import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import PostService from '../../../services/posts-service';
import type { IPost } from '../../../interfaces/post';

function ArticleForCategory() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const service = new PostService();
        const response = await service.getPostsByCategories(slug);
        setPosts(response.data.posts); // assumindo que os posts estão em response.data.posts
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug]);

  return (
    <Container>
      <section className="pt-5">
        <button className="btn btn-back-social mb-4" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2"></i> Voltar
        </button>

        <h1 className="display-5 mb-4">Categoria: {slug}</h1>

        {loading && <p>Carregando artigos...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-muted">Nenhum artigo encontrado.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="row g-4">
            {posts.map((post) => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <div className="card h-100 shadow-sm">
                  {post.image && (
                    <img src={post.image} alt={post.title} className="card-img-top" />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5>{post.title}</h5>
                    <p className="flex-grow-1">{post.content.substring(0, 90)}...</p>
                    <a href={`/artigos/${post.id}`} className="btn btn-primary mt-auto">
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
