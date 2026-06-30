import './CourtCard.css'

interface CourtCardProps {
  name: string
  location: string
  price: number
  rating: number
  imageGradient: string
}

export default function CourtCard({ name, location, price, rating, imageGradient }: CourtCardProps) {
  return (
    <article className="court-card">
      <div className="court-card-image">
        <div
          className="court-card-image-bg"
          style={{ background: imageGradient }}
        />
        <div className="court-card-image-overlay" />
        <div className="court-card-rating-badge">
          <svg viewBox="0 0 20 20">
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z" />
          </svg>
          {rating.toFixed(1)}
        </div>
      </div>

      <div className="court-card-body">
        <h3 className="court-card-name">{name}</h3>

        <div className="court-card-location">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {location}
        </div>

        <div className="court-card-footer">
          <div className="court-card-price">
            <span className="court-card-price-value">{price.toFixed(0)} €</span>
            <span className="court-card-price-label">por hora</span>
          </div>
          <button className="court-card-btn">Reservar</button>
        </div>
      </div>
    </article>
  )
}
