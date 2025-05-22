import { useEffect, useState } from "react";
import { fetchCommentsByArticle } from "../api/api.js";

export default function Comments_list({ article_id }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!article_id) return
        fetchCommentsByArticle(article_id)
            .then(({ comments }) => {
                setComments(comments);
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to fetch comments.");
            });
    }, [article_id]);

    if (error) return <p>{error}</p>;
    if (!comments.length) return <p>This article has no comments yet...</p>;

    return (
        <section>
            <ul className="comment-list">
                {comments.map((eachComment) => (
                    <li key={eachComment.comment_id} className="comment-card">
                        <p><strong>{eachComment.author}</strong>:</p>
                        <p>{eachComment.body}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}