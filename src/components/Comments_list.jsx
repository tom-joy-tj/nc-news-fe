import { useEffect, useState } from "react";
import { fetchCommentsByArticle } from "../api/api.js";
import Post_comment from "./Post_comment.jsx"

export default function Comments_list({ article_id }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    const addComment = (newComment) => {
        setComments((currComments) => [newComment, ...currComments])  //adds the new comment to top of the array of current state of comments
    }

    const replaceOptimisticComment = (tempId, realComment) => {
        setComments((curr) =>
            curr.map((comment) =>
                comment.comment_id === tempId ? realComment : comment
            )
        )
    }

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

    return (
        <section>
            <Post_comment article_id={article_id} 
            addComment={addComment} 
            replaceOptimisticComment={replaceOptimisticComment}
            />

            {comments.length === 0 ? (
                <p>This article has no comments yet.</p>
            ) : ( 
                <ul className="comments-list">
                {comments.map((eachComment) => (
                    <li key={eachComment.comment_id} className="comment-card">
                        <p>{new Date(eachComment.created_at).toLocaleString()}</p>
                        <p><strong>{eachComment.author}</strong>:</p>
                        <p>{eachComment.body}</p>
                        <p>👍 Votes: {eachComment.votes}</p>
                    </li>
                ))}
            </ul>
            )}
        </section>
    );
}