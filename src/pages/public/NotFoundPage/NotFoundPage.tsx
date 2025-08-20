import Container from '../../../components/Container/Container.components';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function NotFoundPage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  return (
    <Container>
      <section className="text-center py-5">
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>A página que você tentou acessar não existe.</p>
        <Link to={isAuthenticated ? "/painel/perfil" : "/login"}>
          {isAuthenticated ? "Voltar para Perfil" : "Voltar para Login"}
        </Link>
      </section>
    </Container>
  );
}
