import type { Post } from "../../interfaces/post-interface";

interface PostContentProps {
  post: Post;
}

export default function PostContent({ post }: PostContentProps) {
  const {
    title,
    subtitle,
    content,
    imageUrl,
    category_name,
    user_name,
    createdAt,
    updatedAt,
  } = post;

  const formattedCreatedAt = new Date(createdAt).toLocaleDateString("pt-BR");
  const formattedUpdatedAt = updatedAt
    ? new Date(updatedAt).toLocaleDateString("pt-BR")
    : formattedCreatedAt;

  const contentLines = content.split("\n");

  const fallbackImg = `https://source.unsplash.com/800x400/?${encodeURIComponent(
    category_name || "technology"
  )}`;

  return (
    <div className="card-article p-4 shadow-sm rounded-3">
      {category_name && <span className="badge bg-primary mb-3">{category_name}</span>}

      <header className="text-center mb-4">
        <h1 className="display-4 fw-bold">{title}</h1>
        {subtitle && <p className="h5 text-muted">{subtitle}</p>}
        <p className="text-secondary small">
          Criado por <span>{user_name}</span> em {formattedCreatedAt}
        </p>
      </header>

      <div className="mb-4 text-center">
        <img
          src={imageUrl || fallbackImg}
          alt={title}
          className="img-fluid rounded"
          loading="lazy"
        />
      </div>

      <section className="post-content">
        {contentLines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </section>

      <footer className="mt-4 text-center text-muted small">
        Última atualização: {formattedUpdatedAt}
      </footer>
    </div>
  );
}
