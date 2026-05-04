import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">⚙ MOTOR<strong>PARTS</strong></span>
          <p>Votre source de confiance pour pièces automobiles de qualité. Livraison rapide, garantie assurée.</p>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link to="/">Accueil</Link>
          <Link to="/products">Catalogue</Link>
          <Link to="/cart">Panier</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <h4>Catégories</h4>
          <Link to="/products?cat=Électronique %26 Diagnostic">Électronique</Link>
          <Link to="/products?cat=Accessoires %26 Garnitures">Accessoires</Link>
          <Link to="/products?cat=Équipements %26 Sécurité">Équipements</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MotorParts — Tous droits réservés</p>
      </div>
    </footer>
  )
}
