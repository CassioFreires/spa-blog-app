import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { useAuth } from "../../context/AuthContext";

type PostCommentedProps = {
  postId: number;
  onCommentAccess: (id: number) => void; // Adiciona a nova prop
};

export default function PostCommented({ postId, onCommentAccess }: PostCommentedProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="d-flex gap-2 mt-5">
      {/* Condição para renderizar o link ou o botão */}
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
      <Button variant="outline">Curtir</Button>
    </div>
  );
}