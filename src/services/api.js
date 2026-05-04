import { carParts, categories } from '../data/parts'

// Simulate async API calls with local data
const delay = (ms = 300) => new Promise(res => setTimeout(res, ms))

export const fetchAllProducts = async () => {
  await delay()
  return carParts
}

export const fetchProductById = async (id) => {
  await delay()
  const product = carParts.find(p => p.id === parseInt(id))
  if (!product) throw new Error('Produit introuvable')
  return product
}

export const fetchCategories = async () => {
  await delay()
  return categories
}

export const fetchProductsByCategory = async (category) => {
  await delay()
  if (category === 'Tous') return carParts
  return carParts.filter(p => p.category === category)
}
