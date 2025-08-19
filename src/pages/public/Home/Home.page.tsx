import Container from '../../../components/Container/Container.components';
import './Home.css';
import { Link } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import PostService from '../../../services/posts-service';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [posts, setPosts] = useState<any[]>([]);
    const postService = new PostService();
    const { isAuthenticated } = useAuth();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function getTopPosts() {
            const result = await postService.getTop();
            setPosts(result.posts.data); // pega os posts retornados
        }
        getTopPosts();
    }, []);

    const handleReadMore = useCallback(
        (id: number) => {
            if (!isAuthenticated) {
                setMessage('Você precisa estar autenticado para acessar este conteúdo. Redirecionando para login...');
                setTimeout(() => navigate('/login'), 4000);
            } else {
                navigate(`/artigos/${id}`);
            }
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

                {/* Hero section */}
                <section className="hero-section text-center text-light mb-5">
                    <div className="overlay d-flex flex-column justify-content-center align-items-center">
                        <h1 className="display-3 fw-bold mb-3 animate-title">
                            Soluções em Tecnologia
                        </h1>
                        <p className="lead mb-4">
                            Desenvolvimento moderno, rápido e personalizado.
                        </p>
                        <Link to="/servicos" className="btn btn-outline-light btn-lg">
                            Conheça os serviços
                        </Link>
                    </div>
                </section>

                {/* Mensagem de autenticação */}
                {message && (
                    <div className="alert alert-warning text-center my-3" role="alert">
                        {message}
                    </div>
                )}

                {/* Posts */}
                <div className="row g-4">
                    {posts.map((post) => (
                        <article key={post.id} className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100 border-0">
                                <img
                                    src={
                                        post.image ||
                                        `https://source.unsplash.com/400x200/?${post.category_name}`
                                    }
                                    className="card-img-top"
                                    alt={post.title}
                                />
                                <div className="card-body d-flex flex-column">
                                    <span className="badge bg-primary mb-2">
                                        {post.category_name}
                                    </span>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="text-muted small mb-2">
                                        Por {post.user_name} |{' '}
                                        {new Date(post.createAt).toLocaleDateString('pt-BR')}
                                    </p>
                                    <p className="card-text flex-grow-1">
                                        {post.content.length > 100
                                            ? post.content.substring(0, 100) + '...'
                                            : post.content}
                                    </p>
                                    <p className="text-secondary small fst-italic mb-3">
                                        {post.category_description.length > 60
                                            ? post.category_description.substring(0, 60) + '...'
                                            : post.category_description}
                                    </p>
                                    <button
                                        onClick={() => handleReadMore(post.id)}
                                        className="btn btn-gradient mt-auto fw-bold"
                                    >
                                        Ler mais
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Seção de serviços */}
            <section className="mt-5 mb-5">
                <h2 className="text-center mb-4">Serviços de Desenvolvimento</h2>
                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4 shadow-sm">
                            <i className="bi bi-code-slash display-4 text-primary mb-3"></i>
                            <h5>Desenvolvimento Web</h5>
                            <p>
                                Sites, blogs e sistemas web modernos, com foco em performance e SEO.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4 shadow-sm">
                            <i className="bi bi-phone display-4 text-success mb-3"></i>
                            <h5>Aplicações Responsivas</h5>
                            <p>
                                Interfaces que se adaptam a qualquer dispositivo com ótima usabilidade.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4 shadow-sm">
                            <i className="bi bi-cloud-arrow-down display-4 text-info mb-3"></i>
                            <h5>APIs e Integrações</h5>
                            <p>
                                Criação de APIs RESTful e integrações com bancos de dados e sistemas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to action */}
            <section className="text-center py-5">
                <h3 className="mb-3">Tem um projeto em mente?</h3>
                <Link to="/contato" className="btn btn-primary btn-lg">
                    Entre em contato
                </Link>
            </section>
        </Container>
    );
}

export default HomePage;
