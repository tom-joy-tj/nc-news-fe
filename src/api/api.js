import axios from "axios"

const newsAPI = axios.create({
    baseURL: "https://nc-news-9q8v.onrender.com/api/"
})

export const fetchArticles = () => {
    return newsAPI.get("articles")
    .then((articles) => {
        return(articles.data)
    })
}

export const fetchSingleArticle = (article_id) => {
    return newsAPI.get(`articles/${article_id}`)
    .then((article) => {
        console.log(article)
        return(article.data)
        
    })
}

export const fetchCommentsByArticle = (article_id) => {
    return newsAPI.get(`articles/${article_id}/comments`)
    .then((comments) => {
        return(comments.data)
    })
}

export const patchArticleVotes = (article_id, voteChange) => {
    return newsAPI
      .patch(`/articles/${article_id}`, { inc_votes: voteChange })
      .then((res) => res.data);
  }

  export const postComment = (article_id, username, body) => {
    return newsAPI.post(`articles/${article_id}/comments`, {
        username,
        body,
        })
        .then((res) => res.data)
    };