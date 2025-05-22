import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Article_list from './components/Article_list'
import Single_article from './components/Single_article'

function App() {
  
  return (

    <Router>
      <Header /> 

      <main>
        <Routes>
          <Route path="/" element={<Article_list/>} />
          <Route path = "/articles/:article_id" element={<Single_article />}  />
        </Routes>
      </main>
      
      <Footer />
    </Router>
  )
}
 
export default App
