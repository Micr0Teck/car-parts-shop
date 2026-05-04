import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { fetchAllProducts } from '../services/api'
import ProductCard from '../components/ProductCard'
import './Products.css'

const CATEGORIES = [
  'Tous',
  'Moteur & Transmission',
  'Freinage',
  'Suspension & Direction',
  'Électronique & Diagnostic',
  'Filtration',
  'Refroidissement',
  'Échappement',
  'Accessoires & Éclairage',
]

const SORT_OPTIONS = [
  { value: 'default', label: 'Par défaut' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'rating', label: 'Mieux notés' },
  { value: 'name', label: 'A → Z' },
]

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'Tous')
  const [sortBy, setSortBy] = useState('default')

  const { data: products, loading, error } = useFetch(fetchAllProducts, [])

  // Sync category from URL param
  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat) setSelectedCategory(cat)
  }, [searchParams])

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat)
    if (cat === 'Tous') {
      setSearchParams({})
    } else {
      setSearchParams({ cat })
    }
  }

  const filtered = useMemo(() => {
    if (!products) return []

    let result = [...products]

    // Filter by category
    if (selectedCategory !== 'Tous') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by search
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        break
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    return result
  }, [products, search, selectedCategory, sortBy])

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="container">
          <h1 className="products-title">CATALOGUE <span>COMPLET</span></h1>
          <p className="products-subtitle">Toutes nos pièces automobiles disponibles</p>
        </div>
      </div>

      <div className="container products-layout">
        {/* Sidebar / Filters */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h3 className="filter-label">Catégories</h3>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div className="products-main">
          {/* Search & Sort bar */}
          <div className="products-toolbar">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Rechercher une pièce..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search && (
                <button className="search-clear" onClick={() => setSearch('')}>✕</button>
              )}
            </div>

            <select
              className="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Results count */}
          {!loading && !error && (
            <p className="results-count">
              {filtered.length} produit{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
            </p>
          )}

          {/* States */}
          {loading && (
            <div className="spinner-wrap">
              <div className="spinner" />
              <p>Chargement du catalogue...</p>
            </div>
          )}

          {error && (
            <div className="error-box">
              <h2>Erreur de chargement</h2>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="no-results">
              <span>🔩</span>
              <h3>Aucun produit trouvé</h3>
              <p>Essayez de modifier votre recherche ou vos filtres.</p>
            </div>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="products-grid">
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
