import { useCallback } from 'react';
import Container from '../../../components/Container/Container.components';
import Alert from '../../../components/Alert/Alert';
import HeroSection from '../../../components/Home/HeroSection';
import PostList from '../../../components/Home/PostList';
import ServicesSection from '../../../components/Home/ServicesSection';
import CallToAction from '../../../components/Home/CallToAction';
import { usePosts } from '../../../hooks/usePost';
import { useAuthRedirect } from '../../../hooks/authRedirect';
import Loader from '../../../components/Loader/Loader';
import RetroCallToAction from '../../../components/Home/RetroCallToAction';
import './Home.css';

function HomePage() {
    const { posts, loading, error, likes } = usePosts();
    const { isAuthenticated, message, redirect } = useAuthRedirect();

    // As funções de callback de redirecionamento permanecem as mesmas, garantindo a segurança.
    const handleReadMore = useCallback(
        (id: number) => {
            if (!isAuthenticated) {
                redirect('/login', 'Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login...', 4000);
                return;
            }
            window.location.href = `/postagens/${id}`;
        },
        [isAuthenticated, redirect]
    );

    const handleCommentAccess = useCallback(
        (id: number) => {
            if (!isAuthenticated) {
                redirect('/login', 'Você precisa estar logado para comentar.', 3000);
                return;
            }
            window.location.href = `/postagens/${id}#comments`;
        },
        [isAuthenticated, redirect]
    );

    return (
        <Container>
            <section className="home-page">
                <header className="text-center mb-5">
                    <h1 className="display-4 fw-bold">Bem-vindo ao Meu Blog</h1>
                    <p className="lead text-secondary">Conteúdos interessantes e atualizados para você!</p>
                </header>

                <HeroSection />

                {message && <Alert type="warning">{message}</Alert>}
                {loading && <Loader />}
                {error && <Alert type="danger">{error}</Alert>}

                ---
                
                {/* 🔑 Lógica Principal: Exibir posts ou CTA Retrô */}
                {isAuthenticated ? (
                    // 1. USUÁRIO AUTENTICADO: Exibe a lista de posts completa
                    <PostList
                        posts={posts}
                        onReadMore={handleReadMore}
                        onCommentAccess={handleCommentAccess}
                        likes={likes}
                        isAuthenticated={isAuthenticated}
                    />
                ) : (
                    // 2. USUÁRIO NÃO AUTENTICADO: Oculta a lista de posts e exibe o CTA Retrô
                    <RetroCallToAction />
                )}

                ---

                <ServicesSection />
                <CallToAction />
            </section>
        </Container>
    );
}

export default HomePage;
