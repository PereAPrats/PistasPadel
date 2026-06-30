import './ClubCard.css'

interface ClubCardProps {
  name: string
  location: string
  rating: number
  courtCount: number
  imageGradient: string
}

export default function ClubCard({ name, location, rating, courtCount, imageGradient }: ClubCardProps) {
  return (
    <article className="club-card">
      <div className="club-card-image">
        <div
          className="club-card-image-bg"
          style={{ background: imageGradient }}
        />
        <div className="club-card-image-overlay" />
        <div className="club-card-rating">
          <svg viewBox="0 0 20 20">
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
          </svg>
          {rating.toFixed(1)}
        </div>
      </div>

      <div className="club-card-body">
        <h3 className="club-card-name">{name}</h3>
        <div className="club-card-location">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {location}
        </div>
        <div className="club-card-footer">
          <button className="club-card-btn">
            Ver club — {courtCount} pistas
          </button>
        </div>
      </div>
    </article>
  )
}
