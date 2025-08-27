import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container.components";
import PostService from "../../../services/posts-service";
import type { Post } from "../../../interfaces/post-interface";
import { useAuth } from "../../../context/AuthContext";
import PostCard from "../../../components/PostCard/PostCard";
import Alert from "../../../components/Alert/Alert";
import Loader from "../../../components/Loader/Loader";
import BackButton from "../../../components/BackButton/BackButton";

export default function PostPorCategory() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const postService = useRef(new PostService()).current;
  const redirectTimeoutRef = useRef<number | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>("");

  const fetchPosts = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      const response = await postService.getPostsByCategories(slug);
      setPosts(response.data.posts || []);
    } catch (err: any) {
      setError(err.message || "Erro ao buscar posts");
    } finally {
      setLoading(false);
    }
  }, [slug, postService]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

   const handleCommentAccess = useCallback((postId: number) => {
    if (isAuthenticated) {
      // Se autenticado, navega para a página de comentários
      navigate(`/postagens/${postId}`);
    } else {
      // Se não autenticado, mostra a mensagem e redireciona
      setMessage("Você precisa estar autenticado para comentar. Redirecionando para a página de login...");
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redireciona após 3 segundos
    }
  }, [isAuthenticated, navigate]);

  const handleReadMore = useCallback(
    (id: number) => {
      if (!isAuthenticated) {
        setMessage("Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login...");
        redirectTimeoutRef.current = window.setTimeout(() => navigate("/login"), 4000);
        return;
      }
      navigate(`/postagens/${id}`);
    },
    [isAuthenticated, navigate]
  );

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        window.clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  if (loading) return <Container><Loader message="Carregando postagens..." /></Container>;
  if (error) return <Container><Alert type="danger">{error}</Alert></Container>;
  if (posts.length === 0) return <Container><p className="text-center py-5 text-muted">Nenhum artigo encontrado.</p></Container>;

  return (
    <Container>
      <section className="pt-5">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="display-5 mb-4">Categoria: {slug}</h1>
        {message && <Alert type="warning">{message}</Alert>}

        <div className="row g-4 mb-5">
          {posts.map(post => (
            <div key={post.id} className="col-md-6 col-lg-4">
              <PostCard key={post.id} post={post} onReadMore={handleReadMore} onCommentAccess={handleCommentAccess} />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
