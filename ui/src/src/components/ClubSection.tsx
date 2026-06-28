import { Link } from 'react-router-dom'
import ClubCard from './ClubCard'
import './ClubSection.css'

const clubs = [
  {
    name: 'Pádel Indoor Barcelona',
    location: 'Barcelona, Zona Gràcia',
    rating: 4.8,
    courtCount: 6,
    imageGradient: 'linear-gradient(135deg, #1B5E20, #43A047)',
  },
  {
    name: 'Green Pádel Center',
    location: 'Madrid, Chamberí',
    rating: 4.6,
    courtCount: 8,
    imageGradient: 'linear-gradient(135deg, #0D47A1, #42A5F5)',
  },
  {
    name: 'Pádel&Sport Valencia',
    location: 'Valencia, El Cabanyal',
    rating: 4.7,
    courtCount: 5,
    imageGradient: 'linear-gradient(135deg, #E65100, #FF8A65)',
  },
]

export default function ClubSection() {
  return (
    <section className="club-section">
      <div className="club-section-inner">
        <div className="club-section-header">
          <span className="club-section-label">Clubes</span>
          <h2 className="club-section-title">Descubre clubes de pádel</h2>
          <p className="club-section-subtitle">
            Explora las mejores instalaciones, compara servicios y elige tu club
            ideal para jugar al pádel.
          </p>
        </div>

        <div className="club-grid">
          {clubs.map((club) => (
            <ClubCard key={club.name} {...club} />
          ))}
        </div>

        <div className="club-section-footer">
          <Link to="/buscar-clubes" className="club-section-btn">
            Ver todos los clubes
            <svg viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
