# MotorParts — Boutique de Pièces Automobiles

Projet de session — 420-4W6-VL Technologies Web Client (Hiver 2026)

## Description

Application web monopage (SPA) de vente de pièces automobiles développée avec la stack React + Redux Toolkit. L'application permet de parcourir un catalogue de pièces, consulter les détails d'un produit, gérer un panier d'achat et envoyer un message via le formulaire de contact.

## Démo en ligne

🔗 [URL de déploiement ici]

## Stack technique

- **Frontend** : React 18 (Vite)
- **Routing** : React Router DOM v6
- **État global** : Redux Toolkit
- **Requêtes API** : Axios + hook personnalisé `useFetch`
- **API** : FakeStoreAPI (https://fakestoreapi.com)
- **Style** : CSS Modules par composant
- **Déploiement** : Vercel

## Fonctionnalités

- ✅ Catalogue de produits avec recherche en temps réel et filtrage par catégorie
- ✅ Tri par prix, note et nom
- ✅ Page de détail produit (route dynamique `/products/:id`)
- ✅ Panier géré avec Redux Toolkit (ajouter, modifier quantité, supprimer)
- ✅ Formulaire de contact avec validation côté client
- ✅ États de chargement et d'erreur visibles
- ✅ Design responsive (mobile + desktop)

## Exigences du cours respectées

| Exigence | Statut |
|---|---|
| Vite + JavaScript | ✅ |
| Composants fonctionnels + Hooks | ✅ |
| useState + useEffect | ✅ |
| 3+ routes dont 1 dynamique | ✅ (`/`, `/products`, `/products/:id`, `/cart`, `/contact`) |
| Interaction API + états loading/error | ✅ FakeStoreAPI via Axios |
| Formulaire contrôlé + validation | ✅ Page Contact |
| Redux Toolkit (état global) | ✅ Panier |
| Style CSS | ✅ CSS custom par composant |
| Déploiement | ✅ Vercel |

## Structure du projet

```
src/
├── components/     # Navbar, ProductCard, Footer
├── pages/          # Home, Products, ProductDetail, Cart, Contact
├── store/          # store.js + cartSlice.js (Redux)
├── services/       # api.js (Axios + FakeStoreAPI)
├── hooks/          # useFetch.js
└── App.jsx         # Routing principal
```

## Installation locale

```bash
npm install
npm run dev
```

## Déploiement (Vercel)

```bash
npm run build
# Connecter le repo GitHub à Vercel
# Build command: npm run build
# Output directory: dist
```

## Auteurs

- [Votre nom]
- [Nom du coéquipier]
