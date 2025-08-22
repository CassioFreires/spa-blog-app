import Container from '../../../components/Container/Container.components';
import './Profile.css';
import { useAuth } from '../../../context/AuthContext';
import type { IUser } from '../../../interfaces/user';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const { user } = useAuth() as { user: IUser | null };
  const avatar = 'https://i.pravatar.cc/150?img=11';

  if (!user) {
    return (
      <Container>
        <section className="profile-container">
          <div className="profile-not-logged-in animate-fade-in">
            <h2 className="title-placeholder">Ops!</h2>
            <p className="subtitle-placeholder">Você precisa fazer login para acessar esta página.</p>
            <Link to="/login" className="btn-placeholder">
              Ir para o Login
            </Link>
          </div>
        </section>
      </Container>
    );
  }

  return (
    <Container>
      <section className="profile-container">
        <div className="profile-card animate-card-entry">
          <div className="profile-header">
            <img
              src={user.avatarUrl || avatar}
              alt={`Avatar de ${user.name}`}
              className="profile-avatar animate-avatar-entry"
            />
            <h3 className="user-name">{user.name}</h3>
            <p className="user-email">{user.email}</p>
          </div>

          <div className="profile-bio-box">
            {user.bio ? (
              <p className="user-bio">{user.bio}</p>
            ) : (
              <p className="no-bio-text">Adicione uma biografia para personalizar seu perfil.</p>
            )}
          </div>

          <div className="profile-actions">
            <Link to={`editar`} className="btn-edit-profile">
              <i className="bi bi-pencil-square me-2"></i>
              Editar Perfil
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProfilePage;