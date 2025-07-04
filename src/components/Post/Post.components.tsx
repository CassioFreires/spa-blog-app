import { useParams } from "react-router-dom";
import { posts } from "../../data/post.mocks";

function PostPage() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return <p className="text-center">Post não encontrado.</p>;
  }

  return (
    <article className="post-page container py-4">
      <h1 className="mb-3">{post.title}</h1>
      <img src={post.image} alt={post.title} className="img-fluid rounded mb-4" />
      <p className="text-muted mb-2"><strong>Categoria:</strong> {post.category}</p>
      <p>{post.content}</p>
    </article>
  );
}

export default PostPage;
