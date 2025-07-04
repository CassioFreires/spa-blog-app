import Container from '../../../components/Container/Container.components';
import { Link } from 'react-router-dom';
import './MyArticles.css'

const meusArtigos = [
  {
    id: 1,
    title: 'Como criar um blog do zero com React',
    status: 'Publicado',
    createdAt: '2024-06-01',
  },
  {
    id: 2,
    title: '5 dicas de performance com Node.js',
    status: 'Rascunho',
    createdAt: '2024-06-10',
  },
];

function MyArticlesPage() {
  return (
    <Container>
      <section className="my-articles-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Meus Artigos</h2>
          <Link to="/painel/artigos/novo" className="btn btn-primary">
            + Novo Artigo
          </Link>
        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th>Título</th>
              <th>Status</th>
              <th>Criado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {meusArtigos.map((artigo) => (
              <tr key={artigo.id}>
                <td>{artigo.title}</td>
                <td>
                  <span className={`badge bg-${artigo.status === 'Publicado' ? 'success' : 'secondary'}`}>
                    {artigo.status}
                  </span>
                </td>
                <td>{artigo.createdAt}</td>
                <td>
                  <button className="btn btn-sm btn-outline-secondary me-2">Editar</button>
                  <button className="btn btn-sm btn-outline-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Container>
  );
}

export default MyArticlesPage;
