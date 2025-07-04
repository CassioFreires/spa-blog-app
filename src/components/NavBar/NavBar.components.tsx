import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <nav className="container-fluid">
        <div className="navbar-brand text-white">
          <Link to="/" className="text-white text-decoration-none">LOGO</Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Links à esquerda */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/artigos">Artigos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/categorias">Categorias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/servicos">Serviços</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/sobre">Sobre</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contato">Contato</Link>
            </li>
          </ul>

          {/* Login/Cadastro à direita */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cadastra-se">Cadastra-se</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
