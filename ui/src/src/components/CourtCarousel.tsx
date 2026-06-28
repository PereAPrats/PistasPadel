import { useRef } from 'react'
import CourtCard from './CourtCard'
import './CourtCarousel.css'

const courts = [
  {
    name: 'Pista Central',
    location: 'Club Pádel Barcelona',
    price: 18,
    rating: 4.8,
    imageGradient: 'linear-gradient(135deg, #1B5E20, #388E3C)',
  },
  {
    name: 'Pista VIP Cubierta',
    location: 'Pádel Indoor Madrid',
    price: 25,
    rating: 4.9,
    imageGradient: 'linear-gradient(135deg, #0D47A1, #1976D2)',
  },
  {
    name: 'Pista Panorámica',
    location: 'Pádel Club Valencia',
    price: 15,
    rating: 4.6,
    imageGradient: 'linear-gradient(135deg, #E65100, #FF6D00)',
  },
  {
    name: 'Pista Jardín',
    location: 'Green Pádel Sevilla',
    price: 12,
    rating: 4.5,
    imageGradient: 'linear-gradient(135deg, #33691E, #689F38)',
  },
  {
    name: 'Pista Premium',
    location: 'Pádel Marbella Club',
    price: 30,
    rating: 4.9,
    imageGradient: 'linear-gradient(135deg, #4A148C, #7B1FA2)',
  },
  {
    name: 'Pista Beach',
    location: 'Pádel Costa Brava',
    price: 20,
    rating: 4.7,
    imageGradient: 'linear-gradient(135deg, #004D40, #00897B)',
  },
]

export default function CourtCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const amount = 324
    trackRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="carousel-section">
      <div className="carousel-section-inner">
        <div className="carousel-header">
          <div className="carousel-header-left">
            <span className="carousel-label">Pistas destacadas</span>
            <h2 className="carousel-title">Descubre nuestras pistas</h2>
            <p className="carousel-subtitle">
              Explora las mejores pistas de pádel disponibles cerca de ti.
            </p>
          </div>

          <div className="carousel-controls">
            <button
              className="carousel-arrow"
              onClick={() => scroll('left')}
              aria-label="Anterior"
            >
              <svg viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              className="carousel-arrow"
              onClick={() => scroll('right')}
              aria-label="Siguiente"
            >
              <svg viewBox="0 0 24 24">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-fade-left" />
          <div className="carousel-track" ref={trackRef}>
            {courts.map((court) => (
              <CourtCard key={court.name} {...court} />
            ))}
          </div>
          <div className="carousel-fade-right" />
        </div>
      </div>
    </section>
  )
}
