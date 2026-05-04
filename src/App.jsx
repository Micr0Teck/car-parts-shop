import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '12rem 2rem' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '6rem', color: 'var(--accent)' }}>404</h1>
              <p style={{ color: 'var(--gray-light)', marginBottom: '2rem' }}>Page introuvable</p>
              <a href="/" className="btn-primary">← Retour à l'accueil</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
