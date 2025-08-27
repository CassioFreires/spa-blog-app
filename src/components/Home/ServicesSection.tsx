import Card from '../Card/Card';

export default function ServicesSection() {
    return (
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
    );
}
