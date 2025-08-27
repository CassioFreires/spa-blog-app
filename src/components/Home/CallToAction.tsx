import { Link } from 'react-router-dom';

export default function CallToAction() {
    return (
        <section className="text-center py-5 d-flex flex-column align-items-center">
            <h3 className="mb-3">Tem um projeto em mente?</h3>
            <Link to="/contato" className="btn btn-primary btn-lg w-25 justify-content-center">
                Entre em contato
            </Link>
        </section>
    );
}
