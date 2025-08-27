import { FaRegUserCircle } from "react-icons/fa";
import type { IComment } from "../../services/comments-service";
import { timeAgo } from "../../utils/timeAgo";

type CommentItemProps = {
  comment: IComment;
  isAuthenticated: boolean;
  currentUserId?: number;
  onEdit: (comment: IComment) => void;
  onDelete: (commentId: number) => void;
  onLike: (commentId: number) => void;
  editingCommentId: number | null;
  editedCommentText: string;
  setEditedCommentText: (text: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
};

export default function CommentItem({
  comment,
  isAuthenticated,
  currentUserId,
  onEdit,
  onDelete,
  onLike,
  editingCommentId,
  editedCommentText,
  setEditedCommentText,
  onSaveEdit,
  onCancelEdit,
}: CommentItemProps) {
  const isMyComment = comment.user_id === currentUserId;
  const createdAt = comment.createAt ? new Date(comment.createAt) : null;

  return (
    <div className="comment-item mb-4">
      <div className="d-flex align-items-center mb-2 justify-content-between">
        <div className="d-flex align-items-center">
          <FaRegUserCircle size={32} className="text-muted me-3" />
          <div className="comment-meta">
            <strong className="d-block">{comment.user_name}</strong>
            <span className="text-muted small">
              {createdAt ? timeAgo(createdAt) : "Data inválida"}
            </span>
          </div>
        </div>

        {isAuthenticated && isMyComment && (
          <div className="comment-actions d-flex gap-2">
            <button className="btn btn-sm btn-outline-secondary" onClick={() => onEdit(comment)}>
              Editar
            </button>
            <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(comment.id)}>
              Excluir
            </button>
          </div>
        )}
      </div>

      {editingCommentId === comment.id ? (
        <div className="w-100">
          <textarea
            className="form-control mb-2"
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
            rows={2}
          />
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-success" onClick={onSaveEdit}>Salvar</button>
            <button className="btn btn-sm btn-secondary" onClick={onCancelEdit}>Cancelar</button>
          </div>
        </div>
      ) : (
        <p className="comment-text">{comment.content}</p>
      )}

      <div className="comment-footer mt-2">
        <button className="btn btn-sm btn-outline-primary" onClick={() => onLike(comment.id)}>
          👍 Curtir
        </button>
      </div>
    </div>
  );
}
