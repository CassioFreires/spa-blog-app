import { useCallback, useEffect, useState } from 'react';
import Container from '../../../components/Container/Container.components';
import Alert from '../../../components/Alert/Alert';
import HeroSection from '../../../components/Home/HeroSection';
import PostList from '../../../components/Home/PostList';
import ServicesSection from '../../../components/Home/ServicesSection';
import CallToAction from '../../../components/Home/CallToAction';
import { usePosts } from '../../../hooks/usePost';
import { useAuthRedirect } from '../../../hooks/authRedirect';
import Loader from '../../../components/Loader/Loader';
import './Home.css';

function HomePage() {
    const { posts, loading, error, likes } = usePosts();
    const { isAuthenticated, message, redirect } = useAuthRedirect();

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

                <PostList
                    posts={posts}
                    onReadMore={handleReadMore}
                    onCommentAccess={handleCommentAccess}
                    likes={likes}
                />

                <ServicesSection />

                <CallToAction />
            </section>
        </Container>
    );
}

export default HomePage;
