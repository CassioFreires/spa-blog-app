import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import LikeService from "../../services/like-service";

type PostCommentedProps = {
  postId: number;
  onCommentAccess: (id: number) => void;
  initialLikes?: number;
  initialUserLiked?: boolean;
};

export default function PostCommented({
  postId,
  onCommentAccess,
  initialLikes = 0,
  initialUserLiked = false,
}: PostCommentedProps) {
  const { isAuthenticated, user, token } = useAuth();
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [userLiked, setUserLiked] = useState(initialUserLiked);

  const likeService = new LikeService();

  // Sincroniza estado quando props mudam
  useEffect(() => {
    setLikesCount(initialLikes);
    setUserLiked(initialUserLiked);
  }, [initialLikes, initialUserLiked]);

  // Função para alternar like
  const toggleLike = async () => {
    if (!isAuthenticated || !user || !token) {
      onCommentAccess(postId);
      return;
    }

    const newLikeState = !userLiked;

    // Atualização otimista
    setUserLiked(newLikeState);
    setLikesCount(prev => (newLikeState ? prev + 1 : prev - 1));

    try {
      await likeService.toggle(
        { user_id: Number(user.id), post_id: Number(postId) },
        String(token)
      );
    } catch (error) {
      console.error("Falha ao registrar like/unlike:", error);

      // Rollback em caso de erro
      setUserLiked(prev => !prev);
      setLikesCount(prev => (newLikeState ? prev - 1 : prev + 1));
    }
  };

  return (
    <div className="d-flex gap-3 mt-3 align-items-center">
      {/* Botão de comentários */}
      {isAuthenticated ? (
        <Link to={`/postagens/${postId}`} className="btn btn-outline-primary">
          Comentários
        </Link>
      ) : (
        <button
          onClick={() => onCommentAccess(postId)}
          className="btn btn-outline-primary"
        >
          Comentários
        </button>
      )}

      {/* Botão de like */}
      <button
        onClick={toggleLike}
        className={`d-flex align-items-center gap-1 border-0 bg-transparent ${
          userLiked ? "text-primary fw-bold" : "text-muted"
        }`}
      >
        <BiSolidLike size={20} />
        <span>{likesCount}</span>
      </button>
    </div>
  );
}
