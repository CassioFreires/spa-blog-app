import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import PostService from '../../../services/posts-service'; // Garanta que o caminho de importação esteja correto
import type { IPost } from '../../../interfaces/post';

function EditMyArticles() {
  // useParams para pegar o ID da URL
  const { id } = useParams<{ id: string }>();
  // useNavigate para redirecionar o usuário após o update
  const navigate = useNavigate();

  // Estado para armazenar os dados do post
  const [post, setPost] = useState<IPost | null>(null);
  // Estado para armazenar a cópia inicial do post para comparação
  const [initialPost, setInitialPost] = useState<IPost | null>(null);
  // Estados para controle de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Instância do serviço para requisições
  const postService = new PostService();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("ID do artigo não fornecido.");
        setLoading(false);
        return;
      }

      try {
        const response = await postService.getById(id);
        console.log(response)
        if (response && response.post) {
          setPost(response.post.data);
          setInitialPost(response.post.data); // Salva a cópia inicial
        } else {
          setError("Artigo não encontrado.");
        }
      } catch (err: any) {
        console.error('Erro ao buscar artigo:', err);
        setError("Erro ao carregar o artigo. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]); 

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (post) {
      setPost({ ...post, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !id) return;
    
    try {
      setSaving(true);
      await postService.update(id, post);
      alert('Artigo atualizado com sucesso!');
      navigate('/painel/artigos');
    } catch (err: any) {
      console.error('Erro ao atualizar artigo:', err);
      setError(err.message || "Erro ao salvar o artigo. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  // Verifica se o post foi alterado
  const hasChanged = () => {
    if (!initialPost || !post) return false;
    return post.title !== initialPost.title ||
           post.subtitle !== initialPost.subtitle ||
           post.content !== initialPost.content;
  };

  if (loading) {
    return (
      <Container>
        <div className="text-center mt-5"><p>Carregando formulário...</p></div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="text-center mt-5"><p className="text-danger">{error}</p></div>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <div className="text-center mt-5"><p>Nenhum artigo encontrado para edição.</p></div>
      </Container>
    );
  }

  return (
    <Container>
      <section className="my-articles-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Editar Artigo</h2>
          <Link to="/painel/perfil/meus-artigos" className="btn btn-secondary">
            Voltar para Meus Artigos
          </Link>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Título</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name="title" 
              value={post.title} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="subtitle" className="form-label">Subtítulo</label>
            <input 
              type="text" 
              className="form-control" 
              id="subtitle" 
              name="subtitle" 
              value={post.subtitle} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">Conteúdo</label>
            <textarea 
              className="form-control" 
              id="content" 
              name="content" 
              rows={10} 
              value={post.content} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={saving || !hasChanged()}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      </section>
    </Container>
  );
}

export default EditMyArticles;