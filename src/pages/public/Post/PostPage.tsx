import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import Container from "../../../components/Container/Container.components";
import Section from "../../../components/Section/Section";
import PostList from "../../../components/Home/PostList";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import EmptyState from "../../../components/EmptyStateProps/EmptyStateProps";
import AuthRedirectMessage from "../../../components/AuthRedirect/AuthRedirect";

import { usePostsWithLikes } from "../../../hooks/usePostsWithLikes";

export default function PostPage() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  // Hook centraliza posts + likes + paginação + loading + mensagens
  const {
    posts,
    likes,
    loading,
    message,
    currentPage,
    totalPages,
    setCurrentPage,
    setMessage
  } = usePostsWithLikes(String(token));

  // Função para navegar para detalhes do post
  const handleReadMore = useCallback(
    (id: number) => {
      if (!isAuthenticated) {
        setMessage("Você precisa estar autenticado para acessar este conteúdo.");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }
      navigate(`/postagens/${id}`);
    },
    [isAuthenticated, navigate, setMessage]
  );

  // Função para acessar comentários do post
  const handleCommentAccess = useCallback(
    (id: number) => {
      if (!isAuthenticated) {
        setMessage("Você precisa estar autenticado para comentar.");
        setTimeout(() => navigate("/login"), 3000);
        return;
      }
      navigate(`/postagens/${id}#comments`);
    },
    [isAuthenticated, navigate, setMessage]
  );

  return (
    <Container>
      <Section className="posts-page mt-5">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold">Todas postagens</h1>
          <p className="lead text-secondary">
            Explore conteúdos sobre tecnologia, desenvolvimento e inovação — inspirando você a criar.
          </p>
        </header>

        {message && <AuthRedirectMessage message={message} redirectTo="/login" />}

        {loading ? (
          <Loader />
        ) : posts.length > 0 ? (
          <PostList
            posts={posts}
            likes={likes.data}
            onReadMore={handleReadMore}
            onCommentAccess={handleCommentAccess}
            isAuthenticated={isAuthenticated} 
          />
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
