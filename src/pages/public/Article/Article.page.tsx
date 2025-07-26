import { Link } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import PostService from '../../../services/post/post.service';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import RequireLogin from '../../../shared/components/RequireLogin/RequireLogin.shared';
import type { IPost } from '../../../interfaces/Post/IPost.interface';
import type { IReturnListResponse } from '../../../interfaces/Post/IApiResponse.interface';
import './Article.css';

export function ArticlePage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [pagination, setPagination] = useState<IReturnListResponse['pagination'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, postId: number) {
    if (!user) {
      event.preventDefault();
      setShowLoginModal(true);
      return;
    }
  }

  function closeModal() {
    setShowLoginModal(false);
  }

  useEffect(() => {
    const postService = new PostService();
    let isMounted = true;

    setLoading(true);
    setError(null);

    postService.getAll(currentPage)
      .then((response) => {
        if (!isMounted) return;
        setPosts(response.data);
        setPagination(response.pagination);
      })
      .catch(() => {
        if (!isMounted) return;
        setError('Erro ao carregar os posts.');
        setPosts([]);
        setPagination(null);
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  function goToNextPage() {
    if (pagination?.hasNextPage && pagination.nextPage) {
      setCurrentPage(pagination.nextPage);
    }
  }

  function goToPreviousPage() {
    if (pagination?.hasPreviousPage && pagination.previousPage) {
      setCurrentPage(pagination.previousPage);
    }
  }

  return (
    <Container>
      {showLoginModal && <RequireLogin onClose={closeModal} />}
      <section className="posts-page">
        <header className="text-center mb-5">
          <h1 className="display-4 fw-bold">Todos os Posts</h1>
          <p className="lead text-secondary">Confira todos os artigos e conteúdos disponíveis.</p>
        </header>

        <div className="row g-4">
          {loading && (
            <div className="text-center">
              <p>Carregando posts...</p>
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-danger">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center">
              <p>Nenhum post encontrado.</p>
            </div>
          )}

          {!loading && posts.map((post) => (
            <article key={post.id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text flex-grow-1">{post.content?.substring(0, 80)}...</p>
                  <Link
                    onClick={(e) => handleClick(e, post.id)}
                    to={`/artigos/${post.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Ler mais
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Paginação */}
        <div className="d-flex justify-content-center gap-3 mt-4 mb-5">
          <button
            className="btn btn-outline-primary"
            onClick={goToPreviousPage}
            disabled={!pagination?.hasPreviousPage}
          >
            &laquo; Anterior
          </button>

          <span className="align-self-center">
            Página {pagination?.currentPage ?? 0} de {pagination?.totalPages ?? 0}
          </span>

          <button
            className="btn btn-outline-primary"
            onClick={goToNextPage}
            disabled={!pagination?.hasNextPage}
          >
            Próximo &raquo;
          </button>
        </div>
      </section>
    </Container>
  );
}

export default ArticlePage;
