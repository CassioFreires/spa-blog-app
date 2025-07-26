import Container from '../../../components/Container/Container.components';
import { useAuth } from '../../../contexts/AuthContext';
import './Profile.css';

function ProfilePage() {
  const user = useAuth()
  console.log(user)


  return (
    <Container>
      <section className="perfil-page">
        <h2 className="mb-4">Meu Perfil</h2>
        <div className="card shadow-sm p-4 d-flex flex-row align-items-center gap-4">
          <img src={'https://i.pravatar.cc/150?img=11'} alt={user.user?.name} className="perfil-avatar" />
          <div>
            <h4>{user.user?.name}</h4>
            <p className="text-secondary">{user.user?.email}</p>
            <p>{user.user?.bio}</p>
            <button className="btn btn-outline-primary btn-sm mt-2">
              Editar Perfil
            </button>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProfilePage;
