import { useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import PostService from '../../../services/posts-service';
import { useAuth } from '../../../context/AuthContext';

import Alert from '../../../components/Alert/Alert';
import Loader from '../../../components/Loader/Loader';
import PostCard from '../../../components/PostCard/PostCard';
import Card from '../../../components/Card/Card';
import type { Post } from '../../../interfaces/post-interface';

import './Home.css';



function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const postService = useMemo(() => new PostService(), []);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const redirectTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        let active = true;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await postService.getTop();
                if (!active) return;
                setPosts(result.posts.data || []);
            } catch {
                if (!active) return;
                setError('Não foi possível carregar os posts no momento.');
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => {
            active = false;
            if (redirectTimeoutRef.current) {
                window.clearTimeout(redirectTimeoutRef.current);
            }
        };
    }, [postService]);

    const handleReadMore = useCallback(
        (id: number) => {
            if (!isAuthenticated) {
                setMessage(
                    'Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login...'
                );
                redirectTimeoutRef.current = window.setTimeout(
                    () => navigate('/login'),
                    4000
                );
                return;
            }
            navigate(`/postagens/${id}`);
        },
        [isAuthenticated, navigate]
    );

    return (
        <Container>
            {/* Header principal */}
            <section className="home-page">
                <header className="text-center mb-5">
                    <h1 className="display-4 fw-bold">Bem-vindo ao Meu Blog</h1>
                    <p className="lead text-secondary">
                        Conteúdos interessantes e atualizados para você!
                    </p>
                </header>

                {/* Hero */}
                <section className="hero-section text-center text-light mb-5">
                    <div className="overlay d-flex flex-column justify-content-center align-items-center">
                        <h1 className="display-3 fw-bold mb-3 animate-title">Soluções em Tecnologia</h1>
                        <p className="lead mb-4">Desenvolvimento moderno, rápido e personalizado.</p>
                        <Link to="/servicos" className="btn btn-outline-light btn-lg">
                            Conheça os serviços
                        </Link>
                    </div>
                </section>

                {/* Mensagem de autenticação */}
                {message && <Alert type="warning">{message}</Alert>}

                {/* Estados de carregamento / erro / vazio */}
                {loading && <Loader />}
                {!loading && error && <Alert type="danger">{error}</Alert>}
                {!loading && !error && posts.length === 0 && (
                    <p className="text-center text-muted my-5">
                        Ainda não há posts por aqui. Volte em breve!
                    </p>
                )}

                {/* Lista de posts */}
                {!loading && !error && posts.length > 0 && (
                    <div className="row g-4">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} onReadMore={handleReadMore} />
                        ))}
                    </div>
                )}
            </section>

            {/* Seção de serviços */}
            <section className="mt-5 mb-5">
                <h2 className="text-center mb-4">Serviços de Desenvolvimento</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <Card className="text-center p-4">
                            <i className="bi bi-code-slash display-4 text-primary mb-3"></i>
                            <h5>Desenvolvimento Web</h5>
                            <p>Sites, blogs e sistemas web modernos, com foco em performance e SEO.</p>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card className="text-center p-4">
                            <i className="bi bi-phone display-4 text-success mb-3"></i>
                            <h5>Aplicações Responsivas</h5>
                            <p>Interfaces que se adaptam a qualquer dispositivo com ótima usabilidade.</p>
                        </Card>
                    </div>
                    <div className="col-md-4">
                        <Card className="text-center p-4">
                            <i className="bi bi-cloud-arrow-down display-4 text-info mb-3"></i>
                            <h5>APIs e Integrações</h5>
                            <p>Criação de APIs RESTful e integrações com bancos de dados e sistemas.</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="text-center py-5 d-flex flex-column align-items-center">
                <h3 className="mb-3">Tem um projeto em mente?</h3>
                <Link to="/contato" className="btn btn-primary btn-lg w-25 justify-content-center">
                    Entre em contato
                </Link>
            </section>
        </Container>
    );
}

export default HomePage;
