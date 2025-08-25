// PostPage.jsx
import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container.components";
import { useAuth } from "../../../context/AuthContext";
import PostService from "../../../services/posts-service";

import PostCard from "../../../components/PostCard/PostCard";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import EmptyState from "../../../components/EmptyStateProps/EmptyStateProps";
import AuthRedirectMessage from "../../../components/AuthRedirect/AuthRedirect";
import Section from "../../../components/Section/Section";

import type { Post } from "../../../interfaces/post-interface";

export default function PostPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const postService = useRef(new PostService()).current;

  const fetchPosts = useCallback(
    async (page: number) => {
      setIsLoading(true);
      try {
        // CORREÇÃO: Acessando 'data' e 'pagination' aninhados na resposta
        const result = await postService.getAll(page);
        setPosts(result.data || []);
        setCurrentPage(result.pagination.currentPage || 1);
        setTotalPages(result.pagination.totalPages || 1);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
        // Opcional: Lidar com o erro de forma mais visível para o usuário
        setMessage("Não foi possível carregar as postagens.");
      } finally {
        setIsLoading(false);
      }
    },
    [postService]
  );

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  const handleReadMore = useCallback(
    (id: number) => {
      if (!isAuthenticated) {
        setMessage(
          "Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login..."
        );
        return;
      }
      navigate(`/postagens/${id}`);
    },
    [isAuthenticated, navigate]
  );

  return (
    <Container>
      <Section className="posts-page mt-5">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold">Todas postagens</h1>
          <p className="lead text-secondary">
            Explore conteúdos sobre tecnologia, desenvolvimento e inovação —
            inspirando você a criar.
          </p>
        </header>

        {message && !isAuthenticated && (
          <AuthRedirectMessage message={message} redirectTo="/login" />
        )}

        {isLoading ? (
          <Loader />
        ) : posts.length > 0 ? (
          <div className="row g-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onReadMore={handleReadMore}
              />
            ))}
          </div>
        ) : (
          <EmptyState message="Não há posts disponíveis no momento." />
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Section>
    </Container>
  );
}