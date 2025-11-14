// components/PostCard/PostHeaderNostalgic.tsx (Final)
import './PostHeaderNostalgic.css';

type PostHeaderNostalgicProps = {
    author: string;
    createAt: string;
    category: string;
};

export default function PostHeaderNostalgic({
    author,
    createAt,
    category
}: PostHeaderNostalgicProps) {

    // URL de um avatar placeholder para a nostalgia
    const avatarId = author.charCodeAt(0) % 100; // Gera um ID único baseado na primeira letra
    const avatarUrl = `https://i.pravatar.cc/150?img=${avatarId}`;

    return (
        <div className="post-header-nostalgic d-flex align-items-center"> {/* Removido o p-3 aqui para controle total no CSS */}
            <img
                src={avatarUrl}
                alt={author}
                className="profile-avatar me-3"
            />
            <div className="post-meta-info">
                <h6 className="author-name mb-0">{author}</h6>
                <div className="post-details small text-muted">
                    <span>{createAt}</span>
                    <span className="separator">•</span>
                    <span className="category-tag">{category}</span>
                </div>
            </div>
        </div>
    );
}