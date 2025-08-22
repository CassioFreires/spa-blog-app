import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import Container from "../../../components/Container/Container.components";
import PostService from "../../../services/posts-service";
import CategoriesService from "../../../services/categories-service";
import type { ICategory } from "../../../interfaces/category"; // ajuste o path se necessário
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import "./CreateMyPost.css";

// --- Schema de validação com Zod ---
const createPostSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres."),
  subtitle: z.string().min(5, "O subtítulo deve ter pelo menos 5 caracteres."),
  category_id: z.string().nonempty("Selecione uma categoria."),
  content: z.string().min(20, "O conteúdo deve ter pelo menos 20 caracteres."),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export default function CreateMyPostPage() {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const postService = useMemo(() => new PostService(), []);
  const categoriesService = useMemo(() => new CategoriesService(), []);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      category_id: "",
      content: "",
    },
  });

  // --- Carrega categorias do backend (ex: primeira página com 100 itens)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        setCategoriesError(null);

        // se seu backend retorna { data, page, total }, ajuste a leitura abaixo:
        const res = await categoriesService.getAll(1, 100);

        // casos comuns de resposta:
        // 1) { data: ICategory[] }    -> use res.data
        // 2) ICategory[] diretamente  -> use res
        const list: ICategory[] = Array.isArray(res) ? res : (res?.data ?? []);
        setCategories(list);
      } catch (err: any) {
        const message = err?.message || "Erro ao carregar categorias.";
        setCategoriesError(message);
        toast.error(message);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    loadCategories();
  }, [categoriesService]);

  const onSubmit = async (data: CreatePostFormData) => {
    if (!user || !token) {
      toast.error("Você precisa estar logado para criar um artigo.");
      return;
    }

    try {
      await postService.createPostByUser(String(token), {
        ...data,
        id: user.id,
        category_id: Number(data.category_id), // garante número
      });

      toast.success("Artigo criado com sucesso!");
      navigate("/painel/perfil/minhas-postagens");
    } catch (err: any) {
      console.error("Erro ao criar artigo:", err);
      toast.error(err?.message || "Erro ao criar o artigo. Tente novamente.");
    }
  };

  return (
    <Container>
      <section className="create-article-page">
        <div className="header-actions mb-5 d-flex justify-content-between align-items-center">
          <h2>Nova Postagem</h2>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            <FaTimes className="me-2" /> Cancelar
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* TÍTULO */}
          <div className="form-group mb-3">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              className="form-control"
              placeholder="Digite um título claro e impactante"
              {...register("title")}
            />
            {errors.title && (
              <small className="text-danger">{errors.title.message}</small>
            )}
          </div>

          {/* SUBTÍTULO */}
          <div className="form-group mb-3">
            <label htmlFor="subtitle">Subtítulo</label>
            <input
              id="subtitle"
              className="form-control"
              placeholder="Adicione um subtítulo que complemente a ideia principal"
              {...register("subtitle")}
            />
            {errors.subtitle && (
              <small className="text-danger">{errors.subtitle.message}</small>
            )}
          </div>

          {/* CATEGORIA (dinâmico do backend) */}
          <div className="form-group mb-3">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              className="form-control"
              disabled={isLoadingCategories || !!categoriesError}
              {...register("category_id")}
            >
              <option value="">
                {isLoadingCategories
                  ? "Carregando categorias..."
                  : categoriesError
                  ? "Erro ao carregar categorias"
                  : "Selecione uma categoria"}
              </option>

              {categories?.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors.category_id && (
              <small className="text-danger">{errors.category_id.message}</small>
            )}

            {!isLoadingCategories && !categoriesError && categories.length === 0 && (
              <small className="text-muted d-block mt-1">
                Nenhuma categoria disponível.
              </small>
            )}

            {categoriesError && (
              <small className="text-danger d-block mt-1">
                {categoriesError}
              </small>
            )}
          </div>

          {/* CONTEÚDO */}
          <div className="form-group mb-4">
            <label htmlFor="content">Conteúdo</label>
            <textarea
              id="content"
              className="form-control"
              rows={8}
              placeholder="Escreva aqui o conteúdo do artigo..."
              {...register("content")}
            ></textarea>
            {errors.content && (
              <small className="text-danger">{errors.content.message}</small>
            )}
          </div>

          {/* BOTÕES */}
          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Enviando...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" /> Publicar
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </Container>
  );
}

