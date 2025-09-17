import PostService from "../services/posts-service";
import LikeService from "../services/like-service";
import { useEffect, useState } from "react";
import type { Post } from "../interfaces/post-interface";

export function usePostsByCategoryWithLikes(slug: string, token?: string) {
    const postService = new PostService();
    const likeService = new LikeService();

    const [posts, setPosts] = useState<Post[]>([]);
    const [likes, setLikes] = useState<Record<number, number>>({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const result = await postService.getPostsByCategories(slug);
                const postsData = result.data.posts || [];
                setPosts(postsData);

                if (token && postsData.length) {
                    const postIds = postsData.map((p:any) => p.id);
                    const likesResult: any = await likeService.countByMultiplePosts(postIds, token);
                    setLikes(likesResult.data || {});
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [slug, token]);

    return { posts, likes, loading };
}
