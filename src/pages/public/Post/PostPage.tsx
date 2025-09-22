import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import Container from "../../../components/Container/Container.components";
import Section from "../../../components/Section/Section";
import PostList from "../../../components/Home/PostList";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";
import EmptyState from "../../../components/EmptyStateProps/EmptyStateProps";
import { usePostsWithLikes } from "../../../hooks/usePostsWithLikes";
import PostFilters from "../../../components/PosterFilter/PosterFilter";

// Função de debounce para evitar múltiplas requisições
function debounce<F extends (...args: any[]) => void>(fn: F, delay = 500) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function PostPage() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();

  // Estados locais para a interface de filtro
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [search, setSearch] = useState("");

  // Hook centraliza posts + likes + paginação + loading + mensagens
  const {
    posts,
    likes,
    loading,
    currentPage,
    totalPages,
    setSearchQuery,
    setCategoryQuery,
    setSortQuery,
    setCurrentPage,
    setMessage,
    statusMessage,
  } = usePostsWithLikes(String(token));

  // Função para aplicar os filtros no hook
  const applyFilters = useCallback(() => {
    setSearchQuery(search);
    setCategoryQuery(selectedCategory);
    setSortQuery(sortBy);
    setCurrentPage(1); // Reseta a página para a primeira
  }, [search, selectedCategory, sortBy, setSearchQuery, setCategoryQuery, setSortQuery, setCurrentPage]);

  // Função de debounce para atualizar busca por texto automaticamente
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 500),
    [setSearchQuery, setCurrentPage]
  );

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
      <Section className="posts-page mt-5 mb-5">
        <header className="text-center mb-5">
          <h1 className="display-5 fw-bold">Todas postagens</h1>
          <p className="lead text-secondary">
            Explore conteúdos sobre tecnologia, desenvolvimento e inovação — inspirando você a criar.
          </p>
        </header>

       {/* Filtro */}
        <PostFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showAdvancedFilters={showAdvancedFilters}
          setShowAdvancedFilters={setShowAdvancedFilters}
          applyFilters={applyFilters}
          handleSearchChange={handleSearchChange}
        />

        {/* Mensagem de status */}
        {statusMessage && <div className="text-center text-muted my-4">{statusMessage}</div>}

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