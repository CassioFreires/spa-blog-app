import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from '../../../components/Container/Container.components';
import PostService from '../../../services/posts-service'; // Garanta que o caminho de importação esteja correto
import type { IPost } from '../../../interfaces/post';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';



export default function EditeMyPostPage() {
    // useParams para pegar o ID da URL
    const { id } = useParams<{ id: string }>();
    // useNavigate para redirecionar o usuário após o update
    const navigate = useNavigate();

    const { user, token } = useAuth()

    // Estado para armazenar os dados do post
    const [post, setPost] = useState<IPost | null>(null);
    // Estado para armazenar a cópia inicial do post para comparação
    const [initialPost, setInitialPost] = useState<IPost | null>(null);
    // Estados para controle de UI
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    // Instância do serviço para requisições
    const postService = new PostService();

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) {
                setError("ID do artigo não fornecido.");
                setLoading(false);
                return;
            }

            try {
                const response = await postService.getById(id);

                const fetchedPost = response.post.data;

                if (fetchedPost) {
                    // Checa se o post pertence ao usuário logado
                    if (fetchedPost.user_id !== user?.id) {
                        setError("Você não tem permissão para acessar este artigo.");
                        setPost(null);
                    } else {
                        setPost(fetchedPost);
                        setInitialPost(fetchedPost); // Salva a cópia inicial
                    }
                } else {
                    setError("Artigo não encontrado.");
                }
            } catch (err: any) {
                console.error('Erro ao buscar artigo:', err);
                setError("Erro ao carregar o artigo. Tente novamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, user?.id]);


    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (post) {
            setPost({ ...post, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!post || !id) return;

        try {
            setSaving(true);

            const formData = new FormData();
            formData.append("title", post.title);
            formData.append("subtitle", post.subtitle);
            formData.append("content", post.content);

            // só manda se tiver imagem nova
            if ((post as any).image) {
                formData.append("image", (post as any).image);
            }

            await postService.updatePostByUser(String(token), id, formData);

            toast.success("Artigo atualizado com sucesso!");
            setTimeout(() => navigate("/painel/perfil/minhas-postagens"), 1200);
        } catch (err: any) {
            console.error("Erro ao atualizar artigo:", err);
            toast.error(err.message || "Erro ao salvar o artigo. Tente novamente.");
        } finally {
            setSaving(false);
        }
    };

    // Verifica se o post foi alterado
    const hasChanged = () => {
        if (!initialPost || !post) return false;

        const textChanged =
            post.title !== initialPost.title ||
            post.subtitle !== initialPost.subtitle ||
            post.content !== initialPost.content;

        const imageChanged = Boolean((post as any).image);

        return textChanged || imageChanged;
    };

    if (loading) {
        return (
            <Container>
                <div className="text-center mt-5"><p>Carregando formulário...</p></div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <div className="text-center mt-5"><p className="text-danger">{error}</p></div>
            </Container>
        );
    }


    if (!post) {
        return (
            <Container>
                <div className="text-center mt-5"><p>Nenhum artigo encontrado para edição.</p></div>
            </Container>
        );
    }

    return (
        <Container>
            <section className="my-articles-page">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Editar Artigo</h2>
                    <Link to="/painel/perfil/minhas-postagens" className="btn btn-secondary">
                        Voltar para Meus Artigos
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={post.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subtitle" className="form-label">Subtítulo</label>
                        <input
                            type="text"
                            className="form-control"
                            id="subtitle"
                            name="subtitle"
                            value={post.subtitle}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Conteúdo</label>
                        <textarea
                            className="form-control"
                            id="content"
                            name="content"
                            rows={10}
                            value={post.content}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Imagem Atual</label>
                        {post.image_url ? (
                            <div>
                                <img
                                    src={`http://localhost:3000/${post.image_url.replace(/\\/g, "/")}`}
                                    alt="Imagem do post"
                                    style={{ maxWidth: "200px", marginBottom: "10px" }}
                                />
                            </div>
                        ) : (
                            <p>Nenhuma imagem cadastrada.</p>
                        )}

                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    const file = e.target.files[0];
                                    setPost({ ...post, image: file } as any); // adiciona arquivo no estado
                                }
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving || !hasChanged()}
                    >
                        {saving ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </form>
            </section>
        </Container>
    );
}