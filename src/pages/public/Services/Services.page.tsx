import { servicos } from "../../../data/servicos.mocks";
import Container from "../../../components/Container/Container.components";

function ServicesPage() {
    return (
        <Container>
            <section className="servicos-page pt-5">
                <header className="text-center mb-5 fade-in">
                    <h1 className="display-5 fw-bold">Serviços de Desenvolvimento</h1>
                    <p className="lead text-secondary">Ofereço soluções completas para transformar sua ideia em realidade digital.</p>
                </header>

                <div className="row g-4">
                    {servicos.map((servico) => (
                        <div key={servico.id} className="col-md-6 col-lg-4 fade-in">
                            <div className="card h-100 text-center shadow-sm p-4 card-servico">
                                <i className={`bi ${servico.icon} display-4 text-primary mb-3`}></i>
                                <h5 className="fw-bold mb-2">{servico.title}</h5>
                                <p className="text-secondary">{servico.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5 fade-in mb-5">
                    <a href="/contato" className="btn btn-primary btn-lg">
                        <i className="bi bi-chat-dots me-2"></i>
                        Solicite um orçamento
                    </a>
                </div>
            </section>
        </Container>
    );
}

export default ServicesPage;