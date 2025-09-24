import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './NavBar.css'

function NavBar() {
  const { user, logout } = useAuth();

  const NavLinks = () => (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link text-white" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/postagens">Postagens</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/categorias">Categorias</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/servicos">Serviços</Link>
      </li>
       <li className="nav-item">
        <Link className="nav-link text-white" to="/#">Comunidades</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/sobre">Sobre</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link text-white" to="/contato">Contato</Link>
      </li>
    </ul>
  );

  const UserMenu = () => (
    user ? (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/painel/perfil">Perfil</Link>
        </li>
        <li className="nav-item">
          <button className="nav-link btn btn-link text-white" onClick={logout}>Sair</button>
        </li>
      </ul>
    ) : (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-white" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-white" to="/cadastra-se">Cadastra-se</Link>
        </li>
      </ul>
    )
  );

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <nav className="container-fluid">
        <Link to="/" className="navbar-brand logo d-flex align-items-center">
          <span className="logo-text">
            Meu <span className="highlight">Blog</span>
          </span>
        </Link>

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
          <NavLinks />
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
