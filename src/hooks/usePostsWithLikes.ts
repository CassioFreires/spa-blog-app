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
    const [searchQuery, setSearchQuery] = useState('');
    const [statusMessage, setStatusMessage] = useState(''); // para posts/filtro
    const [categoryQuery, setCategoryQuery] = useState('');
    const [sortQuery, setSortQuery] = useState('');

    // Função para buscar posts e likes, agora com os novos parâmetros de filtro
    const fetchPosts = useCallback(async (page: number, limit: number = 6, query = '', category = '', sort = '') => {
        setLoading(true);
        setMessage(''); // Limpar mensagens de erro anteriores
        setStatusMessage(''); // Limpar mensagens de status

        try {
            // Chamada à API com todos os parâmetros de filtro
            const result = await postService.getAll(page, limit, query, category, sort);
            const postsData = result.data || [];

            setPosts(postsData);
            setCurrentPage(result.pagination.currentPage || 1);
            setTotalPages(result.pagination.totalPages || 1);

            if (postsData.length === 0) {
                setStatusMessage(query || category ? "Nenhum post encontrado para este filtro." : "Não há posts disponíveis no momento.");
            }

            // Buscar likes apenas se houver token e posts
            if (token && postsData.length) {
                const postIds = postsData.map((p: any) => p.id);
                const likesResult: any = await likeService.countByMultiplePosts(postIds, token);
                setLikes(likesResult);
            }

        } catch (error: any) {
            if (error.response?.status === 404) {
                setPosts([]); // Garante que a lista de posts está vazia
                setStatusMessage("Nenhum post encontrado.");
            } else {
                setMessage('Não foi possível carregar as postagens.');
            }
            console.error('Erro ao buscar posts:', error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // O useEffect agora passa todos os parâmetros de filtro para a função fetchPosts
    useEffect(() => {
        fetchPosts(currentPage, 6, searchQuery, categoryQuery, sortQuery);
    }, [currentPage, searchQuery, categoryQuery, sortQuery, fetchPosts]);


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
    }, [token, posts.map(p => p.id).join(',')]);


    return {
        posts,
        likes,
        loading,
        message,
        statusMessage,
        currentPage,
        totalPages,
        searchQuery,
        setSearchQuery,
        setCategoryQuery, // <- exportando para o PostPage
        setSortQuery, // <- exportando para o PostPage
        setCurrentPage,
        setMessage
    };
}