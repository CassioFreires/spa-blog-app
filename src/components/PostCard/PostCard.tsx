import Card from '../Card/Card';
import Button from '../Button/Button';
import type { Post } from '../../interfaces/post-interface';
import './PostCard.css'

type PostCardProps = {
  post: Post;
  onReadMore: (id: number) => void;
};

function truncate(text: string | undefined, max: number) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

function formatDateBR(dateISO: string | Date) {
  return new Date(dateISO).toLocaleDateString('pt-BR');
}

export default function PostCard({ post, onReadMore }: PostCardProps) {
  const fallbackImg = `https://source.unsplash.com/400x200/?${encodeURIComponent(
    post.category_name || 'technology'
  )}`;

  return (
    <article className="col-md-6 col-lg-4">
      <Card>
        <img
          src={post.imageUrl || fallbackImg}
          className="card-img-top"
          alt={post.title}
          loading="lazy"
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-primary mb-2">{post.category_name}</span>
          <h5 className="card-title">{post.title}</h5>
          <p className="text-muted small mb-2">
            Por {post.user_name || post.author || 'Autor desconhecido'} •{' '}
            {formatDateBR(post.createdAt)}
          </p>
          <p className="card-text flex-grow-1">
            {truncate(post.content, 100)}
          </p>
          {post.category_description && (
            <p className="text-secondary small fst-italic mb-3">
              {truncate(post.category_description, 60)}
            </p>
          )}
          <Button
            variant="gradient"
            className="mt-auto"
            onClick={() => onReadMore(post.id)}
          >
            Ler mais
          </Button>
        </div>
      </Card>
    </article>
  );
}
