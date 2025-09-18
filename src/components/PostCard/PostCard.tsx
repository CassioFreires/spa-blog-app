import { useCallback } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import PostCommented from '../PostCommented/PostCommented';
import type { Post } from '../../interfaces/post-interface';
import { truncate } from '../../utils/text';
import { formatDateBR } from '../../utils/date';
import './PostCard.css';

type PostCardProps = {
  post: Post;
  onReadMore: (id: number) => void;
  onCommentAccess: (id: number) => void;
  initialLikes?: number;
  isAuthenticated: boolean;
};

// Componente para o overlay que aparece para usuários não autenticados
const AuthOverlay = () => (
  <div className="auth-overlay">
    <div className="auth-overlay-content">
      <h5>Conteúdo exclusivo para membros</h5>
      <p>Faça login para ler o post completo e participar da discussão.</p>
      <a href="/login" className="btn btn-warning">Entrar agora</a>
    </div>
  </div>
);

export default function PostCard({
  post,
  onReadMore,
  onCommentAccess,
  initialLikes,
  isAuthenticated,
}: PostCardProps) {
  const author = post.user_name || post.author || 'Autor desconhecido';
  const categoryDesc = post.category_description ? truncate(post.category_description, 60) : '';

  const handleReadMoreClick = useCallback(() => {
    if (isAuthenticated) {
      onReadMore(post.id);
    }
  }, [isAuthenticated, onReadMore, post.id]);

  const handleCommentAccessClick = useCallback(() => {
    if (isAuthenticated) {
      onCommentAccess(post.id);
    }
  }, [isAuthenticated, onCommentAccess, post.id]);

  return (
    <article className='post-card-container'>
      <Card>
        <img
          src={`http://localhost:3000${post.image_url}`}
          className="card-img-top"
          alt={post.title}
          loading="lazy"
        />

        <div className={`card-body d-flex flex-column ${!isAuthenticated ? 'blurred' : ''}`}>
          <h5 className="card-title">{post.title}</h5>

          <p className="text-muted small mb-2 d-flex align-items-center gap-2 mt-3 mb-3">
            <i className="bi bi-person-circle"></i> {author}
            <span>•</span>
            <i className="bi bi-calendar-event"></i> {formatDateBR(post.createAt)}
          </p>

          <p className="card-text flex-grow-1">{truncate(post.content, 100)}</p>

          {categoryDesc && (
            <p className="text-secondary small fst-italic mb-3">{categoryDesc}</p>
          )}

          <Button
            variant="gradient"
            className="mt-auto"
            onClick={handleReadMoreClick}
          >
            Ler mais
          </Button>

          <PostCommented
            postId={post.id}
            onCommentAccess={handleCommentAccessClick}
            initialLikes={initialLikes ?? 0}
            initialUserLiked={post.userLiked ?? false}
          />
        </div>
      </Card>

      {!isAuthenticated && <AuthOverlay />}
    </article>
  );
}