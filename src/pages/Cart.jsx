import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart
} from '../store/cartSlice'
import './Cart.css'

export default function Cart() {
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)
  const dispatch = useDispatch()

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1 className="cart-title">VOTRE <span>PANIER</span></h1>
          <div className="cart-empty">
            <span>🛒</span>
            <h2>Votre panier est vide</h2>
            <p>Ajoutez des pièces depuis notre catalogue pour commencer.</p>
            <Link to="/products" className="btn-primary">
              Voir le catalogue →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 className="cart-title">VOTRE <span>PANIER</span></h1>
          <button
            className="cart-clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            Vider le panier
          </button>
        </div>

        <div className="cart-layout">
          {/* Items list */}
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="cart-item-info">
                  <span className="cart-item-cat">{item.category}</span>
                  <h3 className="cart-item-title">{item.title}</h3>
                  <span className="cart-item-unit">{item.price.toFixed(2)} $ / unité</span>
                </div>

                <div className="cart-item-qty">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>

                <div className="cart-item-subtotal">
                  {(item.price * item.quantity).toFixed(2)} $
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  title="Retirer"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="cart-summary">
            <h2 className="summary-title">RÉSUMÉ</h2>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} $</span>
              </div>
              <div className="summary-line">
                <span>Livraison</span>
                <span className="summary-free">GRATUITE</span>
              </div>
              <div className="summary-line summary-total">
                <span>Total</span>
                <span>{total.toFixed(2)} $</span>
              </div>
            </div>

            <button className="btn-checkout">
              Procéder au paiement →
            </button>

            <Link to="/products" className="btn-outline summary-continue">
              ← Continuer mes achats
            </Link>

            <div className="summary-badges">
              <span>🔒 Paiement sécurisé</span>
              <span>📦 Livraison 24-48h</span>
              <span>↩ Retours gratuits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
