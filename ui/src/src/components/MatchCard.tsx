import './MatchCard.css'

interface MatchCardProps {
  name: string
  club: string
  date: string
  day: number
  month: string
  time: string
  level: 'beginner' | 'intermediate' | 'advanced'
  levelLabel: string
  spots: number
  totalSpots: number
}

const levelLabels: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
}

export default function MatchCard({ name, club, date, day, month, time, level, levelLabel, spots, totalSpots }: MatchCardProps) {
  const isFull = spots === 0
  const spotsClass = isFull ? 'full' : spots <= 1 ? 'danger' : ''

  return (
    <article className="match-card">
      <div className="match-card-top">
        <h3 className="match-card-name">{name}</h3>
        <span className={`match-card-level ${level}`}>
          {levelLabels[level] || levelLabel}
        </span>
      </div>

      <div className="match-card-divider" />

      <div className="match-card-info">
        <div className="match-card-info-row">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {club}
        </div>

        <div className="match-card-info-row">
          <svg viewBox="0 0 24 24" className="stroke">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {date}
          <div className={`match-card-spots ${spotsClass}`}>
            <svg viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            {spots}/{totalSpots}
          </div>
        </div>
      </div>

      <div className="match-card-divider" />

      <div className="match-card-footer">
        <div className="match-card-date">
          <span className="match-card-date-day">{day}</span>
          <span className="match-card-date-month">{month}</span>
        </div>
        <div className="match-card-time">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {time}
        </div>
        <button className={`match-card-join-btn${isFull ? ' full' : ''}`} disabled={isFull}>
          {isFull ? 'Completo' : 'Unirse'}
        </button>
      </div>
    </article>
  )
}
