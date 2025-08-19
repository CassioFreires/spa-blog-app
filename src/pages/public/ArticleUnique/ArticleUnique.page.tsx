import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../../components/Container/Container.components";
import PostService from "../../../services/posts-service";
import type { IArticle } from "../../../interfaces/article";
import { LoaderSocial } from "../../../components/LoaderSocial/LoaderSocial";
import { NotFound } from "../../../components/NotFound/NotFound";
import { ArticleContent } from "../../../components/ArticleContent/ArticleContent";
import "./ArticleUnique.css";

const postService = new PostService();

const ArticleUniquePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<IArticle | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArticle = async (id: string) => {
    setLoading(true);
    try {
      const result = await postService.getById(id);
      setArticle(result.post.data);
    } catch (error: any) {
      console.error("Erro ao buscar artigo:", error.response?.data || error.message);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchArticle(id);
  }, [id]);

  if (loading) return <Container><LoaderSocial /></Container>;
  if (!article) return <Container><NotFound /></Container>;

  return (
    <Container>
      <article className="article-social-page">
        <button className="btn btn-back-social mb-4" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left me-2"></i> Voltar
        </button>

        <ArticleContent article={article} />
      </article>
    </Container>
  );
};

export default ArticleUniquePage;