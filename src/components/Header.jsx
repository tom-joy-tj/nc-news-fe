import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="site-header">
            <h1>The Daily Bugle</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">📰 Newsroom</Link></li>
                    <li>⚽️ Football</li>
                    <li>🧑‍🍳 Cooking</li>
                    <li>👾 Coding</li>
                </ul>
            </nav>
        </header>
    )}
