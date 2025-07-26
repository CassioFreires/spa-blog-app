import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostService from '../../../services/post/post.service';
import type { IPost } from '../../../interfaces/Post/IPost.interface';
import Container from '../../../components/Container/Container.components';
import './ArticleUnique.css';

function ArticleUniquePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [artigo, setArtigo] = useState<IPost>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        if (!id) return;
        const post = await new PostService().getById(Number(id));
        setArtigo(post);
      } catch (error) {
        console.error('Erro ao carregar artigo:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <p className="text-center mt-5">Carregando...</p>
      </Container>
    );
  }

  if (!artigo) {
    return (
      <Container>
        <div className="text-center text-danger mt-5">
          <i className="bi bi-exclamation-triangle-fill fs-1 mb-3"></i>
          <h2>Artigo não encontrado.</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <article className="article-page fade-in pt-5">
        <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4">
          <i className="bi bi-arrow-left me-2"></i> Voltar
        </button>

        <header className="mb-4 text-center">
          <h1 className="display-5 fw-bold mb-2">{artigo.title}</h1>
          <p className="text-muted">
            <i className="bi bi-tag me-1"></i> {artigo.title || 'Sem categoria'}
          </p>
        </header>

        <section className="fs-5 lh-lg">
          {artigo.content}
        </section>

        <footer className="mt-5 text-center text-muted small">
          <i className="bi bi-clock-history me-1"></i>
          Última atualização:{' '}
          {new Date(artigo.updatAt).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'America/Sao_Paulo' // força o fuso horário de Brasília
          })}
        </footer>
      </article>
    </Container>
  );
}

export default ArticleUniquePage;
