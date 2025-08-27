import { Link } from 'react-router-dom';

export default function HeroSection() {
    return (
        <section className="hero-section text-center text-light mb-5">
            <div className="overlay d-flex flex-column justify-content-center align-items-center">
                <h1 className="display-3 fw-bold mb-3 animate-title">Soluções em Tecnologia</h1>
                <p className="lead mb-4">Desenvolvimento moderno, rápido e personalizado.</p>
                <Link to="/servicos" className="btn btn-outline-light btn-lg">
                    Conheça os serviços
                </Link>
            </div>
        </section>
    );
}
