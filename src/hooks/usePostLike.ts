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

  // Busca estado inicial do like
  useEffect(() => {
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchUserLiked = async () => {
      try {
        const result: any = await likeService.getUserLiked(postId, userId, token);
        if (!isMounted) return;

        setUserLiked(result?.liked ?? initialUserLiked);
        setLikesCount(result?.likes_count ?? initialLikes);
      } catch (error) {
        console.error("Erro ao buscar like:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserLiked();

    return () => { isMounted = false; };
  }, [postId, userId, token, initialLikes, initialUserLiked]);

  // Toggle de like/deslike
  const toggleLike = async () => {
    if (!userId || !token) return;

    // calcula o novo estado
    const newLiked = !userLiked;
    const newCount = newLiked
      ? likesCount + 1
      : Math.max(likesCount - 1, 0);

    // aplica o novo estado de forma sincronizada
    setUserLiked(newLiked);
    setLikesCount(newCount);

    try {
      await likeService.toggle({ user_id: userId, post_id: postId }, token);
      // mantém o optimistic update, não sobrescreve
    } catch (error) {
      console.error("Erro ao atualizar like:", error);

      // reverte se deu erro
      setUserLiked(userLiked);
      setLikesCount(likesCount);
    }
  };

  return { likesCount, userLiked, loading, toggleLike };
}
