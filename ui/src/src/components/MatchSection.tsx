import { Link } from 'react-router-dom'
import MatchCard from './MatchCard'
import './MatchSection.css'

const matches = [
  {
    name: 'Partido dobles nivel medio',
    club: 'Pádel Indoor Barcelona',
    date: '30 jun, 18:00',
    day: 30,
    month: 'JUN',
    time: '18:00',
    level: 'intermediate' as const,
    levelLabel: 'Intermedio',
    spots: 1,
    totalSpots: 4,
  },
  {
    name: 'Partido mañana intensivo',
    club: 'Green Pádel Center',
    date: '1 jul, 09:00',
    day: 1,
    month: 'JUL',
    time: '09:00',
    level: 'advanced' as const,
    levelLabel: 'Avanzado',
    spots: 2,
    totalSpots: 4,
  },
  {
    name: 'Iniciación al pádel',
    club: 'Pádel&Sport Valencia',
    date: '2 jul, 17:30',
    day: 2,
    month: 'JUL',
    time: '17:30',
    level: 'beginner' as const,
    levelLabel: 'Principiante',
    spots: 3,
    totalSpots: 4,
  },
]

export default function MatchSection() {
  return (
    <section className="match-section">
      <div className="match-section-inner">
        <div className="match-section-header">
          <div className="match-section-header-left">
            <span className="match-section-label">Partidos activos</span>
            <h2 className="match-section-title">Únete a un partido</h2>
            <p className="match-section-subtitle">
              Encuentra jugadores con tu mismo nivel y disfruta del pádel en
              compañía.
            </p>
          </div>
        </div>

        <div className="match-grid">
          {matches.map((match) => (
            <MatchCard key={`${match.club}-${match.date}`} {...match} />
          ))}
        </div>

        <div className="match-section-footer">
          <Link to="/buscar-partidos" className="match-section-btn">
            Ver todos los partidos
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
