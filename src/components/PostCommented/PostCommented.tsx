import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { useAuth } from "../../context/AuthContext";
import { usePostLike } from "../../hooks/usePostLike";

type PostCommentedProps = {
  postId: number;
  onCommentAccess: (id: number) => void;
  initialLikes?: number;
  initialUserLiked?: boolean;
};

export default function PostCommented({
  postId,
  onCommentAccess,
  initialLikes,
  initialUserLiked,
}: PostCommentedProps) {
  const { token, user, isAuthenticated } = useAuth();

  const { likesCount, userLiked, loading, toggleLike } = usePostLike({
    postId,
    userId: user?.id,
    token: token ?? undefined,
    initialLikes,
    initialUserLiked,
  });

  if (loading) return null;

  return (
    <div className="d-flex gap-3 mt-3 align-items-center">
      {isAuthenticated ? (
        <Link to={`/postagens/${postId}`} className="btn btn-outline-primary">
          Comentários
        </Link>
      ) : (
        <button onClick={() => onCommentAccess(postId)} className="btn btn-outline-primary">
          Comentários
        </button>
      )}

      <button
        onClick={toggleLike}
        className={`d-flex align-items-center gap-1 border-0 bg-transparent ${userLiked ? "text-primary fw-bold" : "text-muted"
          }`}
      >
        <BiSolidLike size={20} />
        <span>{likesCount}</span>
      </button>
    </div>
  );
}
