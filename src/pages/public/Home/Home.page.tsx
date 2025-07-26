import { Link } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import './Home.css';
import PostService from '../../../services/post/post.service';
import { useState, useEffect } from 'react';
import type { IPost } from '../../../interfaces/Post/IPost.interface';
import { useAuth } from '../../../contexts/AuthContext';
import RequireLogin from '../../../shared/components/RequireLogin/RequireLogin.shared';

function HomePage() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);

    function handleClick(event: React.MouseEvent<HTMLAnchorElement>, postId: number) {
        if (!user) {
            event.preventDefault();
            setShowLoginModal(true);
            return;
        }
    }

    useEffect(() => {
        const postService = new PostService();
        let isMounted = true;

        postService.getTop()
            .then((data) => {
                if (isMounted) {
                    console.log('Recebido da API:', data);
                    setPosts(data);
                    setError(null);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setError('Erro ao carregar os posts.');
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Container>
            {/* Modal para exigir login */}
            {showLoginModal && (
                <RequireLogin onClose={() => setShowLoginModal(false)} />
            )}

            <section className="home-page">
                <header className="text-center mb-5">
                    <h1 className="display-4 fw-bold">Bem-vindo ao Meu Blog</h1>
                    <p className="lead text-secondary">Conteúdos interessantes e atualizados para você!</p>
                </header>

                <section className="hero-section text-center text-light mb-5">
                    <div className="overlay d-flex flex-column justify-content-center align-items-center">
                        <h1 className="display-3 fw-bold mb-3 animate-title">Soluções em Tecnologia</h1>
                        <p className="lead mb-4">Desenvolvimento moderno, rápido e personalizado.</p>
                        <Link to="/servicos" className="btn btn-outline-light btn-lg">
                            Conheça os serviços
                        </Link>
                    </div>
                </section>

                <div className="row g-4">
                    {loading && (
                        <div className="text-center">
                            <p>Carregando posts...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-center text-danger">
                            <p>{error}</p>
                        </div>
                    )}

                    {!loading && posts.length === 0 && (
                        <div className="text-center">
                            <p>Nenhum post encontrado.</p>
                        </div>
                    )}

                    {!loading &&
                        posts.map((post) => (
                            <article key={post.id} className="col-md-6 col-lg-4">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text flex-grow-1">
                                            {post.content?.substring(0, 80)}...
                                        </p>
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
            </section>

            <section className="mt-5 mb-5">
                <h2 className="text-center mb-4">Serviços de Desenvolvimento</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4 shadow-sm">
                            <i className="bi bi-code-slash display-4 text-primary mb-3"></i>
                            <h5>Desenvolvimento Web</h5>
                            <p>Sites, blogs e sistemas web modernos, com foco em performance e SEO.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4 shadow-sm">
                            <i className="bi bi-phone display-4 text-success mb-3"></i>
                            <h5>Aplicações Responsivas</h5>
                            <p>Interfaces que se adaptam a qualquer dispositivo com ótima usabilidade.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4 shadow-sm">
                            <i className="bi bi-cloud-arrow-down display-4 text-info mb-3"></i>
                            <h5>APIs e Integrações</h5>
                            <p>Criação de APIs RESTful e integrações com bancos de dados e sistemas.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="text-center py-5">
                <h3 className="mb-3">Tem um projeto em mente?</h3>
                <Link to="/contato" className="btn btn-primary btn-lg">Entre em contato</Link>
            </section>
        </Container>
    );
}

export default HomePage;
