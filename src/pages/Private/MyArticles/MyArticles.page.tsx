import Container from '../../../components/Container/Container.components';
import { Link } from 'react-router-dom';
import './MyArticles.css'
import { useEffect, useState } from 'react';
import type { IPost } from '../../../interfaces/post';
import PostService from '../../../services/posts-service';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

function MyArticlesPage() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();
  const postService = new PostService();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await postService.getAllPostsByUser(String(token));
        if (response && response.data) {
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
  }, [token]);

  const handleDelete = async (idPost: number) => {
    const confirm = window.confirm("Tem certeza que deseja deletar este post?");
    if (!confirm) return;

    try {
      await postService.deletPostByUser(String(token), idPost);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== idPost));
      toast.success("Post deletado com sucesso!");
    } catch (err: any) {
      console.error('Erro ao deletar post:', err);
      toast.error(err.message || "Erro ao deletar post.");
    }
  };

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
          <Link to="/painel/perfil/criar-meu-artigo" className="btn btn-primary">
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
                  <td>{artigo.content.substring(0, 80)}...</td>
                  <td>
                    <Link to={`editar/${artigo.id}`} className="btn btn-sm btn-outline-secondary me-2">
                      Editar
                    </Link>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleDelete(artigo.id)}
                    >
                      Excluir
                    </button>
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
