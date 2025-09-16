import Container from '../../../components/Container/Container.components';
import { Link } from 'react-router-dom';
import './MyPosts.css';
import { useEffect, useState } from 'react';
import type { IPost } from '../../../interfaces/post';
import PostService from '../../../services/posts-service';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { artigos } from '../../../data/artigos.mocks';


function MyPostsPage() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [postToDeleteId, setPostToDeleteId] = useState<number | null>(null);

    const { token } = useAuth();
    const postService = new PostService();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const response = await postService.getAllPostsByUser(String(token));

                // Se o array de posts estiver vazio, 'response.data' pode ser a mensagem de erro.
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                    setError(null);
                } else {
                    setPosts([]);
                    setError(response.message || 'Nenhum artigo encontrado.');
                }

            } catch (err: any) {
                console.error('Erro ao buscar artigos:', err);
                setError(err.message || 'Erro ao carregar os artigos. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchPosts();
        }
    }, [token]);

    const handleDeleteClick = (idPost: number) => {
        setPostToDeleteId(idPost);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (postToDeleteId === null) return;
        try {
            await postService.deletPostByUser(String(token), postToDeleteId);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postToDeleteId));
            toast.success("Post deletado com sucesso!");
        } catch (err: any) {
            console.error('Erro ao deletar post:', err);
            toast.error(err.message || "Erro ao deletar post.");
        } finally {
            setPostToDeleteId(null);
            setShowConfirmModal(false);
        }
    };

    const handleCancelDelete = () => {
        setPostToDeleteId(null);
        setShowConfirmModal(false);
    };

    const EmptyState = () => (
        <div className="empty-state text-center fade-in">
            <i className="bi bi-journal-plus display-2 mb-3 text-muted"></i>
            <h3>Você ainda não tem artigos.</h3>
            <p className="text-muted">Comece a escrever e compartilhe suas ideias com o mundo!</p>
            <Link to="/painel/perfil/add-postagem" className="btn btn-primary btn-lg mt-3">
                <i className="bi bi-plus-circle me-2"></i>
                Criar meu primeiro artigo
            </Link>
        </div>
    );

    const LoadingState = () => (
        <div className="loading-state text-center fade-in">
            <div className="spinner-border text-primary mb-3" role="status">
                <span className="visually-hidden">Carregando...</span>
            </div>
            <p>Carregando seus artigos...</p>
        </div>
    );

    const ErrorState = () => (
        <div className="error-state text-center fade-in">
            <i className="bi bi-exclamation-triangle display-2 mb-3 text-danger"></i>
            <h3>Ocorreu um erro</h3>
            <p className="text-danger">{error}</p>
        </div>
    );

    return (
        <Container>
            <section className="my-articles-page animate-fade-in">
                <div className="page-header">
                    <h2 className="page-title">Minhas postagens</h2>
                    <Link to="/painel/perfil/add-postagem" className="btn btn-primary new-article-btn">
                        <i className="bi bi-plus-circle me-2"></i>
                        Nova postagem
                    </Link>
                </div>

                {loading && <LoadingState />}
                {error && !loading && <EmptyState />}
                {!loading && !error && posts.length === 0 && <EmptyState />}

                {!loading && !error && posts.length > 0 && (
                    <div className="articles-grid">
                        {posts.map((artigo) => (
                            <div key={artigo.id} className="article-card animate-card-entry">
                                <div className="article-image-container">
                                    <img
                                        src={`http://localhost:3000/${artigo.image_url}`}
                                        alt={artigo.title}
                                        className="article-image"
                                    />
                                </div>
                                <div className="card-content">
                                    <div className="card-header">
                                        <h5 className="card-title">{artigo.title}</h5>
                                        <small className="text-muted">
                                            <i className="bi bi-calendar me-1"></i>
                                            {artigo.createAt ? new Date(artigo.createAt).toLocaleDateString() : 'N/A'}
                                        </small>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{artigo.content.substring(0, 100)}...</p>
                                    </div>
                                </div>
                                <div className="card-actions">
                                    <Link to={`editar/${artigo.id}`} className="btn btn-sm btn-outline-secondary">
                                        <i className="bi bi-pencil-square"></i> Editar
                                    </Link>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeleteClick(artigo.id)}
                                    >
                                        <i className="bi bi-trash"></i> Excluir
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {showConfirmModal && (
                <div className="confirmation-modal-backdrop">
                    <div className="confirmation-modal animate-modal-entry">
                        <i className="bi bi-question-circle text-warning display-4 mb-3"></i>
                        <h4>Tem certeza?</h4>
                        <p>Esta ação não poderá ser desfeita.</p>
                        <div className="modal-buttons">
                            <button className="btn btn-secondary me-2" onClick={handleCancelDelete}>
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={handleConfirmDelete}>
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default MyPostsPage;