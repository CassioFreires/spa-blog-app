import { useState, useEffect } from "react";
import LikeService from "../services/like-service";

type UsePostLikeParams = {
  postId: number;
  userId?: number;
  token?: string;
  initialLikes?: number;
  initialUserLiked?: boolean;
};

export function usePostLike({
  postId,
  userId,
  token,
  initialLikes = 0,
  initialUserLiked = false,
}: UsePostLikeParams) {
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [userLiked, setUserLiked] = useState(initialUserLiked);
  const [loading, setLoading] = useState(true);

  const likeService = new LikeService();

  useEffect(() => {
    let isMounted = true;

    const fetchLikes = async () => {
      try {
        setLoading(true);

        if (userId && token) {
          // Usuário logado: pega liked do usuário + contagem total
          const result: any = await likeService.getUserLiked(postId, userId, token);
          if (!isMounted) return;

          setUserLiked(result?.liked ?? initialUserLiked);
          setLikesCount(result?.likes_count ?? initialLikes);
        } else {
          // Usuário deslogado: pega apenas contagem pública
          const result: any = await likeService.countByPost(postId);
          if (!isMounted) return;

          setLikesCount(result?.data ?? initialLikes);
          setUserLiked(false); // não há info do usuário
        }
      } catch (err) {
        console.error("Erro ao buscar likes:", err);
        if (isMounted) setLikesCount(initialLikes);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLikes();

    return () => {
      isMounted = false;
    };
  }, [postId, userId, token, initialLikes, initialUserLiked]);

  const toggleLike = async () => {
    if (!userId || !token) return; // só logados podem dar like

    const newLiked = !userLiked;
    const newCount = newLiked ? likesCount + 1 : Math.max(likesCount - 1, 0);

    setUserLiked(newLiked);
    setLikesCount(newCount);

    try {
      await likeService.toggle({ user_id: userId, post_id: postId }, token);
    } catch (err) {
      console.error("Erro ao atualizar like:", err);
      // reverte caso dê erro
      setUserLiked(userLiked);
      setLikesCount(likesCount);
    }
  };

  return { likesCount, userLiked, loading, toggleLike };
}
