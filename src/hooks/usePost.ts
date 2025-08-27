import { useState, useEffect } from 'react';
import type { Post } from '../interfaces/post-interface';
import PostService from '../services/posts-service';

export function usePosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        const service = new PostService();

        (async () => {
            try {
                setLoading(true);
                const result = await service.getTop();
                if (active) setPosts(result.posts.data || []);
            } catch {
                if (active) setError('Não foi possível carregar os posts no momento.');
            } finally {
                if (active) setLoading(false);
            }
        })();

        return () => { active = false };
    }, []);

    return { posts, loading, error };
}
