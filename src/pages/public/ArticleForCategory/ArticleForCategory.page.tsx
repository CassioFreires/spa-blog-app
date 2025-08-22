import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import PostService from '../../../services/posts-service';
import type { IPost } from '../../../interfaces/post';
import { useAuth } from '../../../context/AuthContext';
import { useCallback } from 'react';

function ArticleForCategory() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>('');

  const { isAuthenticated } = useAuth();

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


  const handleReadMore = useCallback(
    (id: number) => {
      if (!isAuthenticated) {
        setMessage('Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login...');
        setTimeout(() => navigate('/login'), 4000);
      } else {
        navigate(`/postagens/${id}`);
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <Container>
      <section className="pt-5">
        <button className="btn btn-back-social mb-4" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2"></i> Voltar
        </button>

        <h1 className="display-5 mb-4">Categoria: {slug}</h1>

        {/* Renderiza mensagem de autenticação */}
        {message && <p className="alert alert-warning">{message}</p>}

        {loading && <p>Carregando postagens...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="text-muted">Nenhum artigo encontrado.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="row g-4 mb-5">
            {posts.map((post) => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <div className="card h-100 shadow-sm">
                  {post.image && (
                    <img src={post.image} alt={post.title} className="card-img-top" />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5>{post.title}</h5>
                    <p className="flex-grow-1">{post.content.substring(0, 90)}...</p>
                    <button
                      onClick={() => handleReadMore(post.id)}
                      className="btn btn-gradient mt-auto fw-bold"
                    >
                      Ler mais
                    </button>
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
