import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="sidebar bg-dark text-white p-3">
      <h4 className="mb-4">Painel</h4>
      <ul className="nav flex-column">
        <li className="nav-item"><Link to="/painel" className="nav-link text-white">Dashboard</Link></li>
        <li className="nav-item"><Link to="/painel/perfil" className="nav-link text-white">Perfil</Link></li>
        <li className="nav-item"><Link to="/painel/perfil/meus-artigos" className="nav-link text-white">Meus Artigos</Link></li>
        <li className="nav-item mt-3"><Link to="/" className="btn btn-sm btn-outline-light">Sair</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
