import { useState } from 'react'
import DatePickerPopup from './DatePickerPopup'
import TimePickerPopup from './TimePickerPopup'
import './SearchBar.css'

export default function SearchBar() {
  const [activeField, setActiveField] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const closeActive = () => setActiveField(null)

  const handleDateSelect = (day: number, month: number, year: number) => {
    const formatted = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
    setSelectedDate(formatted)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  return (
    <section className="search-section">
      <div className="search-section-inner">
        <div className="search-bar">
          <div className="search-bar-field" onClick={() => setActiveField('location')}>
            <svg className="search-bar-field-icon" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            <div className="search-bar-field-content">
              <span className="search-bar-field-label">Ubicación</span>
              <input
                className="search-bar-field-value"
                type="text"
                placeholder="Ciudad o club"
              />
            </div>
          </div>

          <div className="search-bar-divider" />

          <div className={`search-bar-field${activeField === 'date' ? ' active' : ''}`}>
            <svg className="search-bar-field-icon" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <div className="search-bar-field-content" onClick={() => setActiveField(activeField === 'date' ? null : 'date')}>
              <span className="search-bar-field-label">Fecha</span>
              <span className={`search-bar-field-value${!selectedDate ? ' placeholder' : ''}`}>
                {selectedDate ?? 'Seleccionar fecha'}
              </span>
            </div>
            {activeField === 'date' && (
              <DatePickerPopup
                onSelect={handleDateSelect}
                onClose={closeActive}
              />
            )}
          </div>

          <div className="search-bar-divider" />

          <div className={`search-bar-field${activeField === 'time' ? ' active' : ''}`}>
            <svg className="search-bar-field-icon" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div className="search-bar-field-content" onClick={() => setActiveField(activeField === 'time' ? null : 'time')}>
              <span className="search-bar-field-label">Hora</span>
              <span className={`search-bar-field-value${!selectedTime ? ' placeholder' : ''}`}>
                {selectedTime ?? 'Cualquier hora'}
              </span>
            </div>
            {activeField === 'time' && (
              <TimePickerPopup
                onSelect={handleTimeSelect}
                onClose={closeActive}
              />
            )}
          </div>

          <div className="search-bar-divider" />

          <div className="search-bar-field">
            <svg className="search-bar-field-icon" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <div className="search-bar-field-content">
              <span className="search-bar-field-label">Nivel</span>
              <select className="search-bar-field-select" defaultValue="">
                <option value="" disabled>Seleccionar nivel</option>
                <option value="all">Todos los niveles</option>
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
            </div>
          </div>

          <div className="search-bar-divider" />

          <div className="search-bar-field">
            <svg className="search-bar-field-icon" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <div className="search-bar-field-content">
              <span className="search-bar-field-label">Jugadores</span>
              <select className="search-bar-field-select" defaultValue="">
                <option value="" disabled>¿Cuántos sois?</option>
                <option value="1">1 jugador</option>
                <option value="2">2 jugadores</option>
                <option value="3">3 jugadores</option>
                <option value="4">4 jugadores</option>
              </select>
            </div>
          </div>

          <button className="search-bar-btn">
            <svg viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
            Buscar partidos
          </button>
        </div>
      </div>
    </section>
  )
}
