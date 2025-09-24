import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../../services/users-service";
import PostService from "../../../services/posts-service";
import type { IUser } from "../../../interfaces/user";
import type { IPost } from "../../../interfaces/post";
import './FriendsProfile.css';
import { formatDateBR } from "../../../utils/date";

const FriendProfilePage = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IUser | null>(null);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userService = new UserService();
    const postService = new PostService();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("Você precisa estar logado para ver o perfil.");
                    return;
                }

                // buscar dados do usuário
                const userResponse = await userService.getById(Number(id), token);
                setUser(userResponse.data);

                // buscar postagens do usuário
                const postsResponse = await postService.getPostsByUser(Number(id), token);
                setPosts(postsResponse.data);
            } catch (err: any) {
                setError(err.message || "Erro ao carregar perfil.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) return <div className="loading-state">Carregando perfil...</div>;
    if (error) return <div className="error-state">{error}</div>;
    if (!user) return <div className="error-state">Usuário não encontrado.</div>;

    return (
        <div className="friend-profile-page">
            <div className="profile-header">
                <img
                    src={user.avatarUrl || "https://i.pravatar.cc/150"}
                    alt={`Avatar de ${user.name}`}
                    className="profile-avatar"
                />
                <div className="profile-info">
                    <h1 className="profile-name">{user.name}</h1>
                    <p className="profile-bio">{user.bio || "Sem biografia"}</p>
                    <p className="profile-date">
                        Membro desde: {user.createdAt ? formatDateBR(user.createdAt) : "Data não disponível"}
                    </p>
                </div>
            </div>

            <div className="profile-actions">
                <button>Desfazer amizade</button>
                <button>Mensagem</button>
                <button>Adicionar aos Favoritos</button>
            </div>

            <div className="profile-posts">
                <h2 className="section-title">Publicações de {user.name}</h2>
                {posts.length === 0 ? (
                    <p>Este usuário ainda não publicou nada.</p>
                ) : (
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <h3 className="post-title">{post.title}</h3>
                                <a href={`/postagens/${post.id}`} className="post-link">
                                    Ver mais
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

};

export default FriendProfilePage;
