import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Sidebar() {
  const { user } = useAuth();
  console.log(user)
  return (
    <aside className="sidebar bg-dark text-white p-3">
      <h4 className="mb-4">Painel</h4>
      <ul className="nav flex-column">
        {/* Dashboard só aparece para admin */}
        {user?.role_name === 'admin' && (
          <li className="nav-item">
            <Link to="/painel" className="nav-link text-white">Dashboard</Link>
          </li>
        )}

        {/* Links para todos os usuários */}
        <li className="nav-item">
          <Link to="/painel/perfil" className="nav-link text-white">Perfil</Link>
        </li>
        <li className="nav-item">
          <Link to="/painel/perfil/minhas-postagens" className="nav-link text-white">Minhas postagens</Link>
        </li>
        <li className="nav-item mt-3">
          <Link to="/" className="btn btn-sm btn-outline-light">Sair</Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
