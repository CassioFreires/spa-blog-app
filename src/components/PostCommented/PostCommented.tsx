import { Link } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
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
    <div className="d-flex justify-content-start align-items-center mt-3 gap-4">
      {/* Botão de Curtir */}
      <button
        onClick={toggleLike}
        className={`d-flex align-items-center gap-2 border-0 bg-transparent fw-semibold 
          ${userLiked ? "text-primary" : "text-muted"}
        `}
      >
        <BiSolidLike size={20} />
        <span>{likesCount}</span>
      </button>

      {/* Botão de Comentários */}
      {isAuthenticated ? (
        <Link
          to={`/postagens/${postId}`}
          className="d-flex align-items-center gap-2 text-muted text-decoration-none fw-semibold"
        >
          <FaRegCommentDots size={20} />
          <span>Comentários</span>
        </Link>
      ) : (
        <button
          onClick={() => onCommentAccess(postId)}
          className="d-flex align-items-center gap-2 border-0 bg-transparent text-muted fw-semibold"
        >
          <FaRegCommentDots size={20} />
          <span>Comentários</span>
        </button>
      )}
    </div>
  );
}
