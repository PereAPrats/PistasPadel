import { Link } from 'react-router-dom'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div
          className="hero-bg-image"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1920&q=80)',
          }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          La mejor experiencia en pádel
        </div>

        <h1 className="hero-title">
          Reserva tu pista de{' '}
          <span className="hero-title-em">pádel</span>
          <br />
          <span className="hero-title-em">en segundos</span>
        </h1>

        <p className="hero-subtitle">
          Encuentra las mejores pistas cerca de ti, reserva al instante y
          disfruta del pádel sin complicaciones.
        </p>

        <div className="hero-buttons">
          <Link to="/reservar" className="hero-btn-primary">
            Reservar pista
          </Link>
          <Link to="/pistas" className="hero-btn-secondary">
            Ver pistas disponibles
          </Link>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="hero-scroll-arrow">
          <svg viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  )
}
