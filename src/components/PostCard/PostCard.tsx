// components/PostCard/PostCard.tsx
import { useCallback } from 'react';
import Card from '../Card/Card';
import PostCommented from '../PostCommented/PostCommented';
import PostHeaderNostalgic from '../PostHeaderNostalgic/PostHeaderNostalgic';
import type { Post } from '../../interfaces/post-interface';
import { truncate } from '../../utils/text';
import { formatDateBR } from '../../utils/date';
import './PostCard.css';

// PaywallPlaceholder (para referência)
function PaywallPlaceholder() {
    return (
        <div className="paywall-placeholder text-center mt-3 p-3">
            <i className="bi bi-lock-fill text-primary" style={{ fontSize: '1.5rem' }}></i>
            <p className="fw-semibold mb-1 mt-2">Acesso exclusivo para membros.</p>
            <p className="text-secondary small mb-0">
                <a href="/login" className="fw-bold">Faça Login</a> ou <a href="/registro">Registre-se</a> para ver o conteúdo e interagir.
            </p>
        </div>
    );
}

type PostCardProps = {
  post: Post;
  onReadMore: (id: number) => void;
  onCommentAccess: (id: number) => void;
  initialLikes?: number;
  isAuthenticated: boolean;
};


export default function PostCard({
  post,
  onReadMore,
  onCommentAccess,
  initialLikes,
  isAuthenticated,
}: PostCardProps) {
  const author = post.user_name || post.author || 'Autor desconhecido';
  const categoryDesc = post.category_description || 'Geral';
  
  const formattedDate = formatDateBR(post.createAt); 

  const handleCardClick = useCallback(() => {
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
      <Card className="nostalgic-card">
        
        {/* 1. HEADER NOSTÁLGICO */}
        <PostHeaderNostalgic 
          author={author} 
          createAt={formattedDate} 
          category={categoryDesc}
        />
        
        {/* 2. CORPO CLICÁVEL (para Ler Mais) */}
        <div 
          className="post-content-area card-body d-flex flex-column p-0"
          onClick={isAuthenticated ? handleCardClick : undefined}
          style={{ cursor: isAuthenticated ? 'pointer' : 'default' }}
        >
            
          {/* Imagem em destaque */}
          <div className="post-image-wrapper">
            <img
              src={`http://localhost:3000${post.image_url}`}
              className="post-img"
              alt={post.title}
              loading="lazy"
            />
          </div>

          {/* Área de Texto */}
          <div className="text-section p-3 flex-grow-1">
            <h5 className="card-title post-title mb-2">{post.title}</h5>
            
            <p className="card-text post-teaser">{truncate(post.content, 100)}</p>
          </div>
        </div>

        {/* 3. INTERAÇÕES - SÓ SE AUTENTICADO */}
        {isAuthenticated ? (
            <div className="card-footer d-flex align-items-center justify-content-between nostalgic-footer">
                <PostCommented
                    postId={post.id}
                    onCommentAccess={handleCommentAccessClick}
                    initialLikes={initialLikes ?? 0}
                    initialUserLiked={post.userLiked ?? false}
                />
                 {/* Link para incentivar o clique no feed */}
                <span className='read-more-link small' onClick={handleCardClick}>
                    Ver Post Completo →
                </span>
            </div>
        ) : (
             <div className="p-3">
                <PaywallPlaceholder />
            </div>
        )}
        
      </Card>
    </article>
  );
}