import Container from '../../../components/Container/Container.components';
import './Home.css'
import { Link } from 'react-router-dom';
import { posts } from '../../../data/post.mocks';

function HomePage() {
    return (
        <Container>
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
                    {posts.map((post) => (
                        <article key={post.id} className="col-md-6 col-lg-4">
                            <div className="card shadow-sm h-100">
                                <img
                                    src={post.image}
                                    className="card-img-top"
                                    alt={post.title}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text flex-grow-1">
                                        {post.content.substring(0, 80)}...
                                    </p>
                                    <Link to={`/post/${post.id}`} className="btn btn-primary mt-auto">
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
    )
}

export default HomePage;