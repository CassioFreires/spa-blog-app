import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../../components/Container/Container.components";
import PostService from "../../../services/posts-service";
import type { Post } from "../../../interfaces/post-interface";
import { useAuth } from "../../../context/AuthContext";

import Loader from "../../../components/Loader/Loader";
import { NotFound } from "../../../components/NotFound/NotFound";
import PostContent from "../../../components/PostContent/PostContent";
import Section from "../../../components/Section/Section";
import BackButton from "../../../components/BackButton/BackButton";
import { FaRegUserCircle, FaPaperPlane } from "react-icons/fa";
import "./PostDetailPage.css";

import CommentService from "../../../services/comments-service";
import type { IComment } from "../../../services/comments-service";
import type { ICreateCommentDto } from "../../../services/comments-service";
import { timeAgo } from "../../../utils/timeAgo";
import LikeService from "../../../services/like-service";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user, token } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>("");

  const [showAllComments, setShowAllComments] = useState(false);

  const [commentLikes, setCommentLikes] = useState<Record<number, number>>({});


  const postService = new PostService();
  const commentService = new CommentService();
  const likeService = new LikeService();


  const likesData: Record<number, number> = {};
  
  const fetchComments = async (postId: number | string) => {
    setIsLoadingComments(true);
    try {
      const commentsResult = await commentService.getAllByPostId(Number(postId));
      setComments(commentsResult.data.data);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const fetchPostAndComments = async (postId: number | string) => {
    setIsLoading(true);
    try {
      const postResult = await postService.getById(postId);
      setPost(postResult.post.data || null);

      if (postResult.post.data?.id) {
        await fetchComments(postResult.post.data.id);
      }
    } catch (error: any) {
      console.error("Erro ao buscar dados:", error.response?.data || error.message);
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !newComment.trim() || !post?.id) return;

    try {
      const payload: ICreateCommentDto = {
        content: newComment,
        user_id: Number(user?.id),
        post_id: post.id,
      };

      await commentService.create(payload, String(token));
      setNewComment("");
      if (post?.id) {
        fetchComments(post.id);
        setShowAllComments(true); // mostra todos após adicionar
      }
    } catch (error) {
      console.error("Erro ao adicionar comentário:", error);
    }
  };

  const handleEditComment = (comment: IComment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.content);
  };

  const handleSaveEditedComment = async () => {
    if (!editedCommentText.trim() || !editingCommentId) return;

    try {
      await commentService.update(
        editingCommentId,
        { content: editedCommentText },
        String(token)
      );
      if (post?.id) await fetchComments(post.id);
      setEditingCommentId(null);
      setEditedCommentText("");
    } catch (err) {
      console.error("Erro ao salvar comentário editado:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este comentário?");
    if (!confirmDelete) return;

    try {
      await commentService.delete(Number(commentId), String(token));
      setComments((prevComments) => prevComments.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Erro ao excluir comentário:", err);
    }
  };

  const handleLikeComment = (commentId: number) => {
    console.log(`Like enviado para comentário ${commentId}`);
    alert("Você curtiu esse comentário!");
  };

  useEffect(() => {
    if (id) fetchPostAndComments(id);
  }, [id]);

  if (isLoading) return <Container><Loader /></Container>;
  if (!post) return <Container><NotFound /></Container>;

  const visibleComments = showAllComments ? comments : comments.slice(-2);

  return (
    <Container>
      <Section className="post-detail-page mt-5">
        <BackButton onClick={() => navigate(-1)} />
        <PostContent post={post} />

        <div className="comments-section mt-5">
          <h3 className="mb-4">Comentários</h3>

          {isAuthenticated && (
            <form onSubmit={handleAddComment} className="comment-form d-flex align-items-center mb-4">
              <FaRegUserCircle size={36} className="text-muted me-3" />
              <input
                type="text"
                className="form-control me-2"
                placeholder="Adicionar um comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!newComment.trim()}
              >
                <FaPaperPlane />
              </button>
            </form>
          )}

          {isLoadingComments ? (
            <Loader />
          ) : comments.length > 0 ? (
            <div className="comments-list">
              {visibleComments.map((comment) => {
                const createdAt = comment.createAt ? new Date(comment.createAt) : null;
                const isMyComment = comment.user_id === user?.id;

                return (
                  <div key={comment.id ?? `${comment.user_id}-${Math.random()}`} className="comment-item mb-4">
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
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleEditComment(comment)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
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
                          <button
                            className="btn btn-sm btn-success"
                            onClick={handleSaveEditedComment}
                          >
                            Salvar
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={handleCancelEdit}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="comment-text">{comment.content}</p>
                    )}

                    <div className="comment-footer mt-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        👍 Curtir
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Botões "Ver todos" / "Ver menos" */}
              {comments.length > 2 && (
                <div className="mt-2">
                  {!showAllComments ? (
                    <button
                      className="view-comments-toggle"
                      onClick={() => setShowAllComments(true)}
                    >
                      Ver todos os {comments.length} comentários 🔽
                    </button>
                  ) : (
                    <button
                      className="view-comments-toggle"
                      onClick={() => setShowAllComments(false)}
                    >
                      Ver menos 🔼
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
          )}
        </div>
      </Section>
    </Container>
  );
}