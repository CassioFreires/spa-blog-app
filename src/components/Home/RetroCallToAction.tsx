// components/Home/RetroCallToAction.tsx
import './RetroCallToAction.css'; // Vamos criar um CSS simples para isso

export default function RetroCallToAction() {
    return (
        <div className="retro-cta p-4 my-5 text-center">
            <h3 className="retro-title">Atenção, Visitante!</h3>
            <p className="retro-text">
                Parece que você ainda não faz parte da nossa comunidade.
                Para ter acesso completo aos **posts**, **comentar** e **curtir**,
                você precisa se registrar ou fazer login!
            </p>
            <div className="d-flex justify-content-center gap-3 mt-4">
                <a href="/login" className="btn btn-dark retro-button">
                    <i className="bi bi-box-arrow-in-right me-2"></i> Entrar
                </a>
                <a href="/cadastra-se" className="btn btn-outline-dark retro-button">
                    <i className="bi bi-person-add me-2"></i> Registrar (Grátis!)
                </a>
            </div>
        </div>
    );
}