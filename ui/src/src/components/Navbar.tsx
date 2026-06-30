import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { useAuth } from './AuthContext';

type UserRole = 'player' | 'club' | null

// Tres conjunts d'enllaços segons el rol: visitant, jugador o club
// Quan l'autenticació estigui llesta, substituir `userRole` (avui null) pel valor real

const guestLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Buscar clubes', to: '/buscar-clubes' },
  { label: 'Buscar partidos', to: '/buscar-partidos' },
]

const playerLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Buscar clubes', to: '/buscar-clubes' },
  { label: 'Buscar partidos', to: '/buscar-partidos' },
  { label: 'Mis reservas', to: '/mis-reservas' },
  { label: 'Mis partidos', to: '/mis-partidos' },
  { label: 'Perfil', to: '/perfil' },
]

const clubLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Mis pistas', to: '/mis-pistas' },
  { label: 'Mis reservas', to: '/mis-reservas' },
  { label: 'Gestión de partidos', to: '/gestion-partidos' },
  { label: 'Estadísticas', to: '/estadisticas' },
  { label: 'Perfil del club', to: '/perfil-club' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const { auth, logout } = useAuth();
  // El rol vindrà de l'estat d'autenticació
  const userRole = auth.role as UserRole

  const closeMobile = useCallback(() => setMobileOpen(false), [])

  const navLinks = userRole === 'player'
    ? playerLinks
    : userRole === 'club'
      ? clubLinks
      : guestLinks

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    closeMobile()
  }, [location.pathname, closeMobile])

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo">PP</div>
            <span className="navbar-brand-text">
              Pistas<span>Padel</span>
            </span>
          </Link>

          <div className="navbar-nav">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`navbar-link${isActive(link.to) ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="navbar-right">
            {/*
             * Quan l'usuari estigui autenticat, aquí es mostrarà:
             * - player: avatar + "Cerrar sesión"
             * - club:   avatar + "Cerrar sesión"
             * - guest:  "Iniciar sesión" + "Reservar ahora" (ja implementat)
             */}
            {!userRole && (
              <>
                <Link to="/login" className="navbar-login">
                  Iniciar sesión
                </Link>
                <Link to="/reservar" className="navbar-cta">
                  Reservar ahora
                </Link>
              </>
            )}
            {userRole === 'player' && (
              <>
                <Link to="/perfil" className="navbar-user">
                  <span className="navbar-user-avatar">J</span>
                </Link>
                <button className="navbar-logout" onClick={logout}>Cerrar sesión</button>
              </>
            )}
            {userRole === 'club' && (
              <>
                <Link to="/perfil-club" className="navbar-user">
                  <span className="navbar-user-avatar">C</span>
                </Link>
                <button className="navbar-logout" onClick={logout}>Cerrar sesión</button>
              </>
            )}
          </div>

          <button
            className="navbar-hamburger"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menú de navegación"
            aria-expanded={mobileOpen}
          >
            <svg viewBox="0 0 24 24">
              {mobileOpen ? (
                <>
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div className={`navbar-mobile${mobileOpen ? ' open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`navbar-link${isActive(link.to) ? ' active' : ''}`}
            onClick={closeMobile}
          >
            {link.label}
          </Link>
        ))}
        <div className="navbar-mobile-divider" />
        {/*
         * Mateixa lògica que al navbar-right: guest veu login/cta, player/club veu tancar sessió
         */}
        {!userRole && (
          <>
            <Link to="/login" className="navbar-login" onClick={closeMobile}>
              Iniciar sesión
            </Link>
            <Link to="/reservar" className="navbar-cta" onClick={closeMobile}>
              Reservar ahora
            </Link>
          </>
        )}
        {userRole && (
          <button className="navbar-logout-mobile" onClick={closeMobile}>
            Cerrar sesión
          </button>
        )}
      </div>
    </>
  )
}
