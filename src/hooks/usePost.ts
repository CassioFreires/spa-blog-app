import { useState, useEffect } from 'react';
import type { Post } from '../interfaces/post-interface';
import PostService from '../services/posts-service';
import LikeService from '../services/like-service';
import { useAuth } from '../context/AuthContext';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const postService = new PostService();
  const likeService = new LikeService();

  // Busca os posts
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        setLoading(true);
        const result = await postService.getTop();
        if (active) {
          setPosts(result.posts.data || []);
        }
      } catch {
        if (active) setError('Não foi possível carregar os posts no momento.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Busca os likes correspondentes aos posts
  useEffect(() => {
    async function getAllLikes() {
      if (posts.length === 0) return;

      try {
        const ids = posts.map(item => item.id);

        // Se não tiver token, tenta buscar de forma pública
        const result = token
          ? await likeService.countByMultiplePosts(ids, token)
          : await likeService.countByMultiplePosts(ids); // sem token

        if (result?.data) {
          setLikes(result.data);
        }
      } catch (err) {
        console.error('Erro ao buscar likes:', err);
      }
    }

    getAllLikes();
  }, [posts, token]);

  return { posts, likes, loading, error };
}
