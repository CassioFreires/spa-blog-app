import PostCard from '../PostCard/PostCard';
import type { Post } from '../../interfaces/post-interface';

interface PostListProps {
    posts: Post[];
    likes?: Record<number, number>; // Novo: quantidade de likes por post
    onReadMore: (id: number) => void;
    onCommentAccess: (id: number) => void;
}

export default function PostList({ posts, likes = {}, onReadMore, onCommentAccess }: PostListProps) {
    if (!posts || posts.length === 0) {
        return <p className="text-center text-muted my-5">Ainda não há posts por aqui. Volte em breve!</p>;
    }

    return (
        <div className="row g-4">
            {posts.map(post => (
                <div key={post.id} className='col-md-6 col-lg-4'>
                    <PostCard
                        post={post}
                        initialLikes={likes[post.id] || 0}
                        onReadMore={onReadMore}
                        onCommentAccess={onCommentAccess}
                    />
                </div>
            ))}
        </div>
    );
}
