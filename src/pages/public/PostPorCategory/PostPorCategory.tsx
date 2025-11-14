import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "../../../components/Container/Container.components";
import { useAuth } from "../../../context/AuthContext";
import PostCard from "../../../components/PostCard/PostCard";
import Alert from "../../../components/Alert/Alert";
import Loader from "../../../components/Loader/Loader";
import BackButton from "../../../components/BackButton/BackButton";
import { usePostsByCategoryWithLikes } from "../../../hooks/usePostsByCategoryWithLikes";
// 🚨 NOVO IMPORT
import RetroCallToAction from "../../../components/Home/RetroCallToAction"; 

export default function PostPorCategory() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useAuth();
    const redirectTimeoutRef = useRef<number | null>(null);
    const [message, setMessage] = useState<string | null>("");

    // Usando hook para posts e likes
    const { posts, likes, loading } = usePostsByCategoryWithLikes(slug || "", token || "");

    // Função para acessar comentários
    const handleCommentAccess = useCallback((postId: number) => {
        if (isAuthenticated) {
            // Se autenticado, navega para o post
            navigate(`/postagens/${postId}`);
        } else {
            // Se NÃO autenticado, exibe alerta e redireciona
            setMessage("Você precisa estar autenticado para comentar. Redirecionando para a página de login...");
            setTimeout(() => navigate("/login"), 3000);
        }
    }, [isAuthenticated, navigate]);

    // Função para ler mais
    const handleReadMore = useCallback((id: number) => {
        if (!isAuthenticated) {
            // Se NÃO autenticado, exibe alerta e redireciona
            setMessage("Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login...");
            redirectTimeoutRef.current = window.setTimeout(() => navigate("/login"), 4000);
            return;
        }
        // Se autenticado, navega para o post
        navigate(`/postagens/${id}`);
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        return () => {
            if (redirectTimeoutRef.current) {
                window.clearTimeout(redirectTimeoutRef.current);
            }
        };
    }, []);

    if (loading) return <Container><Loader message="Carregando postagens..." /></Container>;
    
    // 🚨 Removido o retorno imediato de "Nenhum artigo encontrado"
    // Ele será tratado DENTRO do bloco condicional de autenticação abaixo,
    // garantindo que o cabeçalho da categoria seja exibido mesmo sem posts.

    return (
        <Container>
            <section className="pt-5">
                <BackButton onClick={() => navigate(-1)} />
                <h1 className="display-5 mb-4">Categoria: {slug}</h1>
                {message && <Alert type="warning">{message}</Alert>}

                {/* 🔑 LÓGICA DE PROTEÇÃO DE ROTA POR RENDERIZAÇÃO */}
                {isAuthenticated ? (
                    // 1. USUÁRIO AUTENTICADO: Exibe a lista de posts ou mensagem de vazio
                    posts && posts.length > 0 ? (
                        <div className="row g-4 mb-5">
                            {posts.map(post => (
                                <div key={post.id} className="col-md-6 col-lg-4">
                                    <PostCard 
                                        post={post} 
                                        // A validação de autenticação é feita nos handlers, mas o PostCard precisa do estado para esconder as interações
                                        isAuthenticated={isAuthenticated} 
                                        initialLikes={likes[post.id] || 0}
                                        onReadMore={handleReadMore} 
                                        onCommentAccess={handleCommentAccess} 
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-5 text-muted">Nenhum artigo encontrado nesta categoria.</p>
                    )
                ) : (
                    // 2. USUÁRIO NÃO AUTENTICADO: Oculta a lista de posts e exibe o CTA Retrô
                    <RetroCallToAction />
                )}
            </section>
        </Container>
    );
}