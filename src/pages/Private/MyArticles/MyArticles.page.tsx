import Container from '../../../components/Container/Container.components';
import { Link } from 'react-router-dom';
import './MyArticles.css'
import { useEffect, useState } from 'react';
import type { IPost } from '../../../interfaces/post';
import PostService from '../../../services/posts-service';
import { useAuth } from '../../../context/AuthContext';

function MyArticlesPage() {
  const [posts, setPosts] = useState<IPost[]>([]); // Muda o estado para um array vazio
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {user, token} = useAuth()
  // Instância do serviço para usar na requisição
  const postService = new PostService();

  useEffect(() => {
    // Função assíncrona para buscar os posts
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Chama a API para obter os posts do usuário.
        const response = await postService.getAllPostsByUser(String(token));
        
        if (response && response.data) {
          // Usa os dados da API para atualizar o estado
          setPosts(response.data);
          setError(null);
        } else {
          setPosts([]);
          setError(response.message || 'Nenhum artigo encontrado.');
        }
      } catch (err: any) {
        console.error('Erro ao buscar artigos:', err);
        setError(err.message || 'Erro ao carregar os artigos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="text-center mt-5">
          <p>Carregando artigos...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center mt-5">
          <p className="text-danger">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="my-articles-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Meus Artigos</h2>
          <Link to="/painel/artigos/novo" className="btn btn-primary">
            + Novo Artigo
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-center">Você ainda não tem artigos. Comece a escrever um!</p>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Título</th>
                <th>Criado em</th>
                <th>Autor</th>
                <th>Conteúdo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((artigo) => (
                <tr key={artigo.id}>
                  <td>{artigo.title}</td>
                  <td>{artigo.createAt ? new Date(artigo.createAt).toLocaleDateString() : 'N/A'}</td>
                  <td>{artigo.user_name}</td>
                  <td>{artigo.last_name}</td>
                  <td>{artigo.content.substring(0, 80)}...</td>
                  <td>
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      <Link to={`editar/${artigo.id}`}>Editar</Link>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </Container>
  );
}

export default MyArticlesPage;