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
  initialLikes?: number; // Quantidade inicial de likes
};

export default function PostCard({
  post,
  onReadMore,
  onCommentAccess,
  initialLikes = 0
}: PostCardProps) {

  // Variáveis auxiliares para deixar JSX mais limpo
  const author = post.user_name || post.author || 'Autor desconhecido';
  const categoryDesc = post.category_description ? truncate(post.category_description, 60) : '';
  const imageSrc = post.imageUrl || `https://source.unsplash.com/400x200/?${encodeURIComponent(post.category_name || 'technology')}`;
  const likes = initialLikes;
  const userLiked = post.userLiked || false;

  return (
    <article>
      <Card>
        <img
          src={imageSrc}
          className="card-img-top"
          alt={post.title}
          loading="lazy"
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{post.title}</h5>

          <p className="text-muted small mb-2">
            Por {author} • {formatDateBR(post.createdAt)}
          </p>

          <p className="card-text flex-grow-1">{truncate(post.content, 100)}</p>

          {categoryDesc && (
            <p className="text-secondary small fst-italic mb-3">{categoryDesc}</p>
          )}

          <Button
            variant="gradient"
            className="mt-auto"
            onClick={() => onReadMore(post.id)}
          >
            Ler mais
          </Button>

          <PostCommented
            postId={post.id}
            onCommentAccess={onCommentAccess}
            initialLikes={likes}
            initialUserLiked={userLiked}
          />
        </div>
      </Card>
    </article>
  );
}
