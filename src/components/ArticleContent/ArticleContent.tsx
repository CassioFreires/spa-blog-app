import type { IArticle } from "../../interfaces/article";

interface Props {
  article: IArticle;
}

export const ArticleContent: React.FC<Props> = ({ article }) => {
  const {
    title,
    subtitle,
    content,
    image,
    category,
    user_name,
    createAt,
    updatedAt,
  } = article;

  const formattedCreatedAt = new Date(createAt).toLocaleDateString("pt-BR");
  const formattedUpdatedAt = updatedAt
    ? new Date(updatedAt).toLocaleDateString("pt-BR")
    : "Julho 2025";

  const contentLines = content.split("\n");

  return (
    <div className="card-article-social p-4 shadow-sm rounded-3">
      {category && <span className="badge-category-social">{category}</span>}

      <header className="article-header-social text-center mb-4">
        <h1>{title}</h1>
        <p className="subtitle-social">{subtitle}</p>
        <p className="author-social">
          Criado por <span>{user_name}</span> em {formattedCreatedAt}
        </p>
      </header>

      {image ? (
        <div className="image-wrapper-social mb-4">
          <img src={image} alt={title} className="image-social" />
        </div>
      ) : (
        <div className="placeholder-image bg-secondary text-white d-flex align-items-center justify-content-center mb-4">
          Sem imagem
        </div>
      )}

      <section className="content-social">
        {contentLines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </section>

      <footer className="footer-social mt-4 text-center text-muted small">
        Última atualização: {formattedUpdatedAt}
      </footer>
    </div>
  );
};
