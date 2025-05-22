import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className="site-header">
            <h1>The Daily Bugle</h1>
            <nav>
                <ul className="nav-links">
                    <li><Link to="/">Newsroom</Link></li>
                    {/* Add more links here later */}
                </ul>
            </nav>
        </header>
    )
}