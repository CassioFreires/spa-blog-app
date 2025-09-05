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

    // Feedback instantâneo
    setUserLiked((prev) => !prev);
    setLikesCount((prev) => (userLiked ? prev - 1 : prev + 1));

    try {
      const result: any = await likeService.toggle({ user_id: userId, post_id: postId }, token);
      if (result) {
        setUserLiked(result?.liked ?? userLiked);
        setLikesCount(result?.likes_count ?? likesCount);
      }
    } catch (error) {
      console.error("Erro ao atualizar like:", error);
      // Reverte em caso de erro
      setUserLiked((prev) => !prev);
      setLikesCount((prev) => (userLiked ? prev + 1 : prev - 1));
    }
  };

  return { likesCount, userLiked, loading, toggleLike };
}
