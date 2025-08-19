import type { IArticleCardProps } from "../../interfaces/articleCard";

export default function ArticleCard({ post, onReadMore, disabled }: IArticleCardProps) {
  const contentPreview = post.content ? `${post.content.substring(0, 120)}...` : "Sem descrição disponível";
  const createdAt = post.createAt
    ? new Date(post.createAt).toLocaleDateString("pt-BR")
    : "Data não disponível";

  return (
    <article className="col-md-6 col-lg-4">
      <div className="card h-100 shadow-lg border-0 rounded-4 overflow-hidden animate-card">
        <div className="card-img-wrapper">
          {post.image ? (
            <img src={post.image} className="card-img-top" alt={post.title || "Imagem do artigo"} />
          ) : (
            <div className="placeholder-image bg-secondary text-white d-flex align-items-center justify-content-center">
              Sem imagem
            </div>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{post.subtitle || "Sem subtítulo"}</h5>
          <p className="card-text flex-grow-1 text-muted">{contentPreview}</p>
          <p className="text-secondary small mb-3">
            Criado por <span className="fw-semibold">{post.user_name || "Autor desconhecido"}</span> em {createdAt}
          </p>
          <button
            onClick={() => onReadMore(post.id)}
            className="btn btn-gradient mt-auto fw-bold"
            disabled={disabled}
          >
            Ler mais
          </button>
        </div>
      </div>
    </article>
  );
}
