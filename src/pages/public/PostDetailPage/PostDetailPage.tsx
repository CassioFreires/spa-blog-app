import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../../components/Container/Container.components";
import PostService from "../../../services/posts-service";
import type { Post } from "../../../interfaces/post-interface";

import Loader from "../../../components/Loader/Loader";
import { NotFound } from "../../../components/NotFound/NotFound";
import PostContent from "../../../components/PostContent/PostContent";
import Section from "../../../components/Section/Section";
import BackButton from "../../../components/BackButton/BackButton";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const postService = new PostService();

  const fetchPost = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await postService.getById(id);
      setPost(result.post.data || null);
    } catch (error: any) {
      console.error("Erro ao buscar post:", error.response?.data || error.message);
      setPost(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchPost(id);
  }, [id]);

  if (isLoading) return <Container><Loader /></Container>;
  if (!post) return <Container><NotFound /></Container>;

  return (
    <Container>
      <Section className="post-detail-page mt-5">
        <BackButton onClick={() => navigate(-1)} />
        <PostContent post={post} />
      </Section>
    </Container>
  );
}
