import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import { useFetch } from '../hooks/useFetch'
import { fetchProductById } from '../services/api'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const { data: product, loading, error } = useFetch(
    () => fetchProductById(id),
    [id]
  )

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch(addToCart(product))
    }
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="detail-page">
        <div className="spinner-wrap">
          <div className="spinner" />
          <p>Chargement du produit...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="detail-page">
        <div className="error-box">
          <h2>Produit introuvable</h2>
          <p>{error || 'Ce produit n\'existe pas.'}</p>
          <Link to="/products" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
            ← Retour au catalogue
          </Link>
        </div>
      </div>
    )
  }

  const stars = product.rating?.rate || 4
  const count = product.rating?.count || 0

  return (
    <div className="detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span>/</span>
          <Link to="/products">Catalogue</Link>
          <span>/</span>
          <span className="breadcrumb-current">{product.title}</span>
        </nav>

        <div className="detail-layout">
          {/* Image */}
          <div className="detail-img-wrap">
            <div className="detail-img-inner">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="detail-img-badge">
              {product.category}
            </div>
          </div>

          {/* Info */}
          <div className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.title}</h1>

            <div className="detail-rating">
              <span className="stars">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={i <= Math.round(stars) ? 'star filled' : 'star'}>★</span>
                ))}
              </span>
              <span className="rating-val">{stars.toFixed(1)}</span>
              <span className="rating-count">({count} avis)</span>
            </div>

            <div className="detail-price">
              <span className="price-main">{product.price.toFixed(2)} $</span>
              <span className="price-tax">TPS/TVQ incluses</span>
            </div>

            <div className="detail-divider" />

            <p className="detail-desc">{product.description}</p>

            <div className="detail-divider" />

            {/* Stock badge */}
            <div className="detail-stock">
              <span className="stock-dot" />
              En stock — livraison en 24-48h
            </div>

            {/* Quantity + Add to cart */}
            <div className="detail-actions">
              <div className="qty-control">
                <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>

              <button
                className={`btn-add-cart ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ Ajouté au panier !' : `Ajouter au panier — ${(product.price * qty).toFixed(2)} $`}
              </button>
            </div>

            {/* Quick nav */}
            <div className="detail-nav">
              <button className="btn-outline" onClick={() => navigate(-1)}>
                ← Retour
              </button>
              <Link to="/cart" className="btn-outline">
                Voir le panier →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
