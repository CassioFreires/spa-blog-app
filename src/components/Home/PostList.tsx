import PostCard from '../PostCard/PostCard';
import type { Post } from '../../interfaces/post-interface';

interface PostListProps {
    posts: Post[];
    likes?: Record<number, number>; // Novo: quantidade de likes por post
    onReadMore: (id: number) => void;
    onCommentAccess: (id: number) => void;
    isAuthenticated: boolean; // 👈 Novo
}
export default function PostList({ posts, likes, onReadMore, onCommentAccess, isAuthenticated }: PostListProps) {

    if (!posts || posts.length === 0) {
        return <p className="text-center text-muted my-5">Ainda não há posts por aqui. Volte em breve!</p>;
    }

   return (
        <div className="row justify-content-center g-5"> {/* Aumentamos o g-4 para g-5 para mais espaçamento vertical */}
            {posts.map(post => (
                // 🔑 MUDANÇA CRUCIAL: col-12 força 100% da largura em todas as telas
                <div key={post.id} className='col-12'> 
                    <PostCard
                        post={post}
                        onReadMore={onReadMore}
                        onCommentAccess={onCommentAccess}
                        initialLikes={likes?.[post.id] ?? 0}
                        isAuthenticated={isAuthenticated}
                    />
                </div>
            ))}
        </div>
    );
}
