import { useState } from 'react'
import './Contact.css'

const INITIAL_FORM = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

const INITIAL_ERRORS = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = { ...INITIAL_ERRORS }
    let valid = true

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères.'
      valid = false
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Veuillez entrer une adresse courriel valide.'
      valid = false
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Veuillez sélectionner un sujet.'
      valid = false
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères.'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm(INITIAL_FORM)
    }, 1500)
  }

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1 className="contact-title">NOUS <span>CONTACTER</span></h1>
          <p className="contact-subtitle">Une question sur une pièce ? Besoin d'un devis ? On est là.</p>
        </div>
      </div>

      <div className="container contact-layout">
        {/* Info cards */}
        <div className="contact-info">
          <h2 className="info-heading">Informations</h2>

          <div className="info-card">
            <span className="info-icon">📍</span>
            <div>
              <strong>Adresse</strong>
              <p>1234 Rue des Mécaniciens<br />Montréal, QC H2X 1Y4</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">📞</span>
            <div>
              <strong>Téléphone</strong>
              <p>(514) 555-0199</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">✉️</span>
            <div>
              <strong>Courriel</strong>
              <p>info@motorparts.ca</p>
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">🕐</span>
            <div>
              <strong>Heures d'ouverture</strong>
              <p>Lundi–Vendredi: 8h–18h<br />Samedi: 9h–15h</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="contact-form-wrap">
          {submitted ? (
            <div className="form-success">
              <span>✓</span>
              <h2>Message envoyé !</h2>
              <p>Merci pour votre message. Notre équipe vous répondra dans les 24 heures.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)}>
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <h2 className="form-title">Envoyer un message</h2>

              <div className="form-row">
                <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
                  <label htmlFor="name">Nom complet *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jean Tremblay"
                    autoComplete="name"
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
                  <label htmlFor="email">Courriel *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jean@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Téléphone (optionnel)</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(514) 555-0000"
                    autoComplete="tel"
                  />
                </div>

                <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
                  <label htmlFor="subject">Sujet *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="">Sélectionner un sujet...</option>
                    <option value="commande">Question sur une commande</option>
                    <option value="produit">Information produit</option>
                    <option value="devis">Demande de devis</option>
                    <option value="retour">Retour / Remboursement</option>
                    <option value="autre">Autre</option>
                  </select>
                  {errors.subject && <span className="field-error">{errors.subject}</span>}
                </div>
              </div>

              <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande en détail..."
                />
                <div className="char-count">
                  {form.message.length} caractères {form.message.length < 10 && '(min. 10)'}
                </div>
                {errors.message && <span className="field-error">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <span className="btn-loading">
                    <span className="btn-spinner" />
                    Envoi en cours...
                  </span>
                ) : 'Envoyer le message →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
