import { useState, useEffect, useCallback } from 'react';
import PostService from '../services/posts-service';
import LikeService from '../services/like-service';
import type { Post } from '../interfaces/post-interface';

type LikesResponse = {
    data: Record<number, number>;
};

export function usePostsWithLikes(token?: string) {
    const postService = new PostService();
    const likeService = new LikeService();

    const [posts, setPosts] = useState<Post[]>([]);
    const [likes, setLikes] = useState<LikesResponse>({ data: {} });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Função para buscar posts e likes
    const fetchPosts = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const result = await postService.getAll(page);
            const postsData = result.data || [];
            setPosts(postsData);
            setCurrentPage(result.pagination.currentPage || 1);
            setTotalPages(result.pagination.totalPages || 1);

            // Buscar likes apenas se houver token e posts
            if (token && postsData.length) {
                const postIds = postsData.map((p: any) => p.id);
                const likesResult: any = await likeService.countByMultiplePosts(postIds, token);
                setLikes(likesResult);
            }
        } catch (error) {
            console.error('Erro ao buscar posts:', error);
            setMessage('Não foi possível carregar as postagens.');
        } finally {
            setLoading(false);
        }
    }, [token]); // remove postService e likeService das dependências

    // Buscar posts ao mudar de página
    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage, fetchPosts]);

    // Atualizar likes somente quando o token mudar OU os posts mudarem
    useEffect(() => {
        if (!token || posts.length === 0) return;
        const fetchLikes = async () => {
            try {
                const postIds = posts.map(p => p.id);
                const likesResult: any = await likeService.countByMultiplePosts(postIds, token);
                setLikes(likesResult);
            } catch (error) {
                console.error('Erro ao buscar likes:', error);
            }
        };

        fetchLikes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, posts.map(p => p.id).join(',')]); // transforma ids em string para evitar loop infinito

    return {
        posts,
        likes,
        loading,
        message,
        currentPage,
        totalPages,
        setCurrentPage,
        setMessage
    };
}
