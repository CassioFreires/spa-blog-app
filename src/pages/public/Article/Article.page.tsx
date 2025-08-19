import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container.components";
import { useAuth } from "../../../context/AuthContext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import PostService from "../../../services/posts-service";

import ArticleCard from "../../../components/ArticleCard/ArticleCard";
import Pagination from "../../../components/Pagination/Pagination";
import AlertMessage from "../../../components/AlertMessage/AlertMessage";

const postService = new PostService();

function ArticlePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const result = await postService.getAll(page);
      setPosts(result.posts.data);
      setCurrentPage(result.posts.pagination.currentPage);
      setTotalPages(result.posts.pagination.totalPages);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  const handleReadMore = useCallback((id: number) => {
    if (!isAuthenticated) {
      setMessage('Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login...');
      setTimeout(() => navigate('/login'), 4000);
    } else {
      navigate(`/artigos/${id}`);
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <section className="artigos-page">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold">Todos os Artigos</h1>
          <p className="lead text-secondary">
            Explore conteúdos sobre tecnologia, desenvolvimento e inovação — inspirando você a criar.
          </p>
        </header>

        <AlertMessage message={message} />

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 fs-5">Carregando artigos...</p>
          </div>
        ) : (
          <div className="row g-4">
            {posts.map((post: any) => (
              <ArticleCard key={post.id} post={post} onReadMore={handleReadMore} disabled={!!message} />
            ))}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </section>
    </Container>
  );
}

export default ArticlePage;
