import Container from '../../../components/Container/Container.components';
import './Profile.css';
import { useAuth } from '../../../context/AuthContext';
import type { IUser } from '../../../interfaces/user';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const { user } = useAuth() as { user: IUser | null };
  const avatar= 'https://i.pravatar.cc/150?img=11';
  if (!user) {
    return (
      <Container>
        <section className="perfil-page text-center py-5">
          <h2 className="mb-3">Você não está logado</h2>
          <p className="text-muted">Faça login para acessar seu perfil.</p>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="perfil-page">
        <div className="card perfil-card shadow-sm p-4">
          {/* Capa */}
          <div className="perfil-banner rounded-top"></div>

          {/* Avatar e informações */}
          <div className="d-flex flex-column align-items-center text-center mt-n5">
            <img
              src={avatar}
              alt={user.name}
              className="perfil-avatar border border-3 border-white shadow-sm"
            />
            <h3 className="mt-3">{user.name}</h3>
            <p className="text-secondary mb-1">{user.email}</p>
            {user.bio && <p className="text-muted small">{user.bio}</p>}

            <Link to={`editar`} >
              Editar Perfil
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProfilePage;
