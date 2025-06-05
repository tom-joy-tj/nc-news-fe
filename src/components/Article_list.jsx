import { useEffect, useState } from "react"
import { fetchArticles } from "../api/api.js"
import { Link } from "react-router-dom"

export default function Article_list() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchArticles()
            .then(({ articles }) => {

                setArticles(articles)
            })
            .catch(console.log)
    }, [])

    return (
        <section>
            <ul className="article-list">
            <h2>Latest News</h2>
                {articles.map((singleArticle) => (
                    <li key={singleArticle.article_id} className="article-card">
                        <Link to={`/articles/${singleArticle.article_id}`}>
                            <h3>{singleArticle.title}</h3>
                            <img src={singleArticle.article_img_url} alt={`Thumbnail for ${singleArticle.title}`} />
                            <p>Author: {singleArticle.author}</p>
                            <p>💬 {singleArticle.comment_count}</p>
                            <p>👍 {singleArticle.votes}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}



    