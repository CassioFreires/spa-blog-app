import { FaRegUserCircle, FaPaperPlane } from "react-icons/fa";

type CommentFormProps = {
  newComment: string;
  setNewComment: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function CommentForm({ newComment, setNewComment, onSubmit }: CommentFormProps) {
  return (
    <form onSubmit={onSubmit} className="comment-form d-flex align-items-center mb-4">
      <FaRegUserCircle size={36} className="text-muted me-3" />
      <input
        type="text"
        className="form-control me-2"
        placeholder="Adicionar um comentário..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" disabled={!newComment.trim()}>
        <FaPaperPlane />
      </button>
    </form>
  );
}
