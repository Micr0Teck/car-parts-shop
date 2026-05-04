import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { fetchAllProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import './Home.css'

const CATEGORIES = [
  { label: 'Moteur & Transmission', icon: '⚙️', desc: 'Filtres, courroies, bougies, huiles moteur' },
  { label: 'Freinage', icon: '🔴', desc: 'Plaquettes, disques, liquide de frein' },
  { label: 'Suspension & Direction', icon: '🔧', desc: 'Amortisseurs, rotules, ressorts' },
  { label: 'Électronique & Diagnostic', icon: '🔌', desc: 'Batteries, scanners OBD2, capteurs' },
  { label: 'Filtration', icon: '🌀', desc: 'Filtres à air, carburant, habitacle' },
  { label: 'Accessoires & Éclairage', icon: '💡', desc: 'LED, tapis, câbles de démarrage' },
]

export default function Home() {
  const { data: products, loading, error } = useFetch(fetchAllProducts, [])

  const featured = products?.slice(0, 4) || []

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid" />
          <div className="hero-glow" />
        </div>

        <div className="container hero-content">
          

          <h1 className="hero-title">
            PIÈCES AUTO<br />
            <span className="hero-accent">DE CONFIANCE</span>
          </h1>

          <p className="hero-desc">
            Plus de 200 pièces automobiles disponibles. Qualité garantie,
            prix compétitifs. Votre véhicule mérite le meilleur.
          </p>

          <div className="hero-actions">
            <Link to="/products" className="btn-primary">
              Voir le catalogue →
            </Link>
            <Link to="/contact" className="btn-outline">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>


      {/* Featured Products */}
      <section className="section-featured">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">PRODUITS EN <span>VEDETTE</span></h2>
            <div className="section-line" />
          </div>

          {loading && (
            <div className="spinner-wrap">
              <div className="spinner" />
              <p>Chargement...</p>
            </div>
          )}

          {error && (
            <div className="error-box">
              <h2>Erreur de chargement</h2>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="featured-grid">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="section-cta">
            <Link to="/products" className="btn-primary">
              Voir tous les produits →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
