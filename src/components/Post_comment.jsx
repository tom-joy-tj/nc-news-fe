import { useEffect, useState } from "react"
import { postComment } from "../api/api.js"

export default function Post_comment({ article_id, addComment, replaceOptimisticComment}) {
    const [commentBody, setCommentBody] = useState("")
    const [isPosting, setIsPosting] = useState(false)
    const [postError, setPostError] = useState(null)


    const handlePostComment = (e) => {
        e.preventDefault()
        setIsPosting(true)
        setPostError(null)

    if (!commentBody.trim()) {
        setPostError("Cannot submit blank comment.")
        setIsPosting(false)
        return
    }

    const username = "butter_bridge" 
    const body = commentBody
    const tempID = Date.now()

    const optimisticComment = {
        comment_id: tempID,
        author: username, 
        body: commentBody, 
        created_at: new Date().toISOString(), 
        votes: 0, 
        isOptimistic: true
    }

    addComment(optimisticComment)
    setCommentBody("");

    //post to server
    postComment(article_id, username, body)
        .then(( comment ) => {
            //in the .then this will be the successfull post comment returned form the server 
            replaceOptimisticComment(tempID, comment)
            setCommentBody("")
        })
        .catch((err) => {
            console.error(err)
            setPostError("Failed to post comment.")
        })
        .finally(() => {
            setIsPosting(false)
        })
}

return (
    <form onSubmit={handlePostComment} className="post-comment-form">
        <textarea
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Write your comment..."
            rows={4}
            disabled={isPosting}
        />
        <button type="submit" disabled={isPosting}>
            {isPosting ? "Posting..." : "Post Comment"}
        </button>
        {postError && <p className="error-msg">{postError}</p>}
    </form>
);
}

