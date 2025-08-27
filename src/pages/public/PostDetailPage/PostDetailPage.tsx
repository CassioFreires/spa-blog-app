import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../../components/Container/Container.components";
import PostService from "../../../services/posts-service";
import type { IComment } from "../../../services/comments-service";
import type { ICreateCommentDto } from "../../../services/comments-service";
import { useAuth } from "../../../context/AuthContext";
import Loader from "../../../components/Loader/Loader";
import { NotFound } from "../../../components/NotFound/NotFound";
import PostContent from "../../../components/PostContent/PostContent";
import Section from "../../../components/Section/Section";
import BackButton from "../../../components/BackButton/BackButton";

import CommentItem from "../../../components/PostDetail/CommentItem";
import CommentForm from "../../../components/PostDetail/CommentForm";
import type { Post } from "../../../interfaces/post-interface";
import CommentService from "../../../services/comments-service";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user, token } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingComments, setIsLoadingComments] = useState<boolean>(true);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  const postService = new PostService();
  const commentService = new CommentService();

  // Buscar post + comentários
  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true);
      try {
        if (!id) return;

        const postResult = await postService.getById(Number(id));
        setPost(postResult.post.data ?? null);

        if (postResult.post.data?.id) {
          setIsLoadingComments(true);
          const commentsResult = await commentService.getAllByPostId(postResult.post.data.id);
          setComments(commentsResult.data.data ?? []);
          setIsLoadingComments(false);
        }
      } catch (error) {
        console.error(error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id]);

  // Adicionar comentário
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated || !newComment.trim() || !post?.id) return;

    try {
      const payload: ICreateCommentDto = {
        content: newComment,
        user_id: Number(user?.id),
        post_id: post.id,
      };

      await commentService.create(payload, token!);
      setNewComment("");

      // Recarregar comentários
      const commentsResult = await commentService.getAllByPostId(post.id);
      setComments(commentsResult.data.data ?? []);
      setShowAllComments(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Editar comentário
  const handleEditComment = (comment: IComment) => {
    setEditingCommentId(comment.id);
    setEditedCommentText(comment.content);
  };

  const handleSaveEditedComment = async () => {
    if (!editedCommentText.trim() || !editingCommentId || !post?.id) return;

    try {
      await commentService.update(editingCommentId, { content: editedCommentText }, token!);
      const commentsResult = await commentService.getAllByPostId(post.id);
      setComments(commentsResult.data.data ?? []);
      setEditingCommentId(null);
      setEditedCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este comentário?")) return;

    try {
      await commentService.delete(commentId, token!);
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikeComment = (commentId: number) => {
    alert("Você curtiu esse comentário!");
  };

  if (isLoading) return <Container><Loader /></Container>;
  if (!post) return <Container><NotFound /></Container>;

  const visibleComments = showAllComments ? comments : comments.slice(-2);

  return (
    <Container>
      <Section className="post-detail-page mt-5">
        <BackButton onClick={() => navigate(-1)} />
        <PostContent post={post} />

        {isAuthenticated && (
          <CommentForm newComment={newComment} setNewComment={setNewComment} onSubmit={handleAddComment} />
        )}

        {isLoadingComments ? (
          <Loader />
        ) : (
          visibleComments.map(comment => (
            <CommentItem
              key={comment.id}
              comment={comment}
              isAuthenticated={isAuthenticated}
              currentUserId={user?.id}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
              onLike={handleLikeComment}
              editingCommentId={editingCommentId}
              editedCommentText={editedCommentText}
              setEditedCommentText={setEditedCommentText}
              onSaveEdit={handleSaveEditedComment}
              onCancelEdit={handleCancelEdit}
            />
          ))
        )}

        {comments.length > 2 && (
          <button className="view-comments-toggle" onClick={() => setShowAllComments(!showAllComments)}>
            {showAllComments ? "Ver menos 🔼" : `Ver todos os ${comments.length} comentários 🔽`}
          </button>
        )}
      </Section>
    </Container>
  );
}
