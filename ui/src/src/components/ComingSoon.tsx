import './ComingSoon.css'

export default function ComingSoon() {
  return (
    <section className="coming-soon">
      <div className="coming-soon-inner">
        <div className="coming-soon-icon">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        <h2 className="coming-soon-title">Próximamente</h2>
        <p className="coming-soon-subtitle">
          Estamos preparando nuevas funcionalidades para mejorar tu experiencia.
          Muy pronto podrás disfrutar de todo lo que tenemos preparado.
        </p>

        <div className="coming-soon-placeholder">
          <span className="coming-soon-placeholder-text">
            Espacio reservado para futuras funcionalidades
          </span>
        </div>
      </div>
    </section>
  )
}
