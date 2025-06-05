import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchSingleArticle } from "../api/api.js"
import Comments_list from "./Comments_list.jsx"
import { patchArticleVotes } from "../api/api.js"

export default function Single_article () {
    const { article_id } = useParams()
    const [article, setArticle] = useState(null)
    const [error, setError] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const [isVoting, setIsVoting] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)


    useEffect(() => {
        fetchSingleArticle(article_id)
            .then((data) => {
                setArticle(data.article)
            })
            .catch((err) => {
                console.log(err);
                setError("Failed to fetch article.");
            });
    }, [article_id]);

    const handleVoteToggle = () => {
        if (!article || isVoting) return;
        const voteChange = hasVoted ? -1 : 1
        setIsVoting(true)

        setArticle((currArticle) => ({
            ...currArticle,
            votes: currArticle.votes + voteChange
        }))
        setHasVoted((prev) => !prev)

        patchArticleVotes(article.article_id, voteChange)
            .catch((err) => {
                console.error("Vote update failed:", err)
                
                setArticle((currArticle) => ({
                    ...currArticle,
                    votes: currArticle.votes - voteChange
                }))
                setHasVoted((prev) => !prev)
                setError("Failed to update vote.")
            })
            .finally(() => {
                setIsVoting(false)
            });
    }

    if (error) return <p>{error}</p>;
    if (!article) return <p>Loading...</p>

    return (
        <section className="single-article-card"> 
            <h2>{article.title}</h2>
            <p>Written by: {article.author}</p>
            <p>{new Date(article.created_at).toLocaleString()}</p>
            <img src={article.article_img_url} alt={`Image for ${article.title}`}/>
            <p>{article.body}</p>

            <p
                onClick={handleVoteToggle}
                style={{
                    cursor: isVoting ? "not-allowed" : "pointer",
                    color: hasVoted ? "green" : "black",
                    fontWeight: "bold",
                    userSelect: "none",
                    display: "inline-block",
                    marginBottom: "1rem"
                }}
                title={hasVoted ? "Remove vote" : "Upvote"}
            >
            👍 Votes: {article.votes}
            </p>

            <p><strong>💬 Comments:</strong> {article.comment_count} </p>
            <button onClick={() => setShowComments((prev) => !prev)}>
                {showComments ? "Hide Comments:" : "Show Comments:"}
            </button>

            {showComments && (
                <Comments_list article_id={article.article_id} /> 
            )}

        </section>
    )
}
