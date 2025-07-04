import Container from '../../../components/Container/Container.components';
import './Profile.css'

function ProfilePage() {
  const user = {
    nome: 'Cassio Souza',
    email: 'cassio@email.com',
    bio: 'Desenvolvedor fullstack apaixonado por tecnologia e inovação.',
    avatar: 'https://i.pravatar.cc/150?img=11',
  };

  return (
    <Container>
      <section className="perfil-page">
        <h2 className="mb-4">Meu Perfil</h2>
        <div className="card shadow-sm p-4 d-flex flex-row align-items-center gap-4">
          <img src={user.avatar} alt={user.nome} className="perfil-avatar" />
          <div>
            <h4>{user.nome}</h4>
            <p className="text-secondary">{user.email}</p>
            <p>{user.bio}</p>
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
