import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cartSlice'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const dispatch = useDispatch()

  const handleAdd = (e) => {
    e.preventDefault()
    dispatch(addToCart(product))
  }

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="card-img-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
        <div className="card-overlay">
          <span className="card-view">Voir détails →</span>
        </div>
      </div>

      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <h3 className="card-title">{product.title}</h3>

        <div className="card-footer">
          <span className="card-price">{product.price.toFixed(2)} $</span>
          <button className="card-add-btn" onClick={handleAdd} title="Ajouter au panier">
            + Panier
          </button>
        </div>

        <div className="card-rating">
          {'★'.repeat(Math.round(product.rating?.rate || 4))}
          {'☆'.repeat(5 - Math.round(product.rating?.rate || 4))}
          <span>({product.rating?.count || 0})</span>
        </div>
      </div>
    </Link>
  )
}
