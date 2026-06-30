import { useState } from 'react'
import './DatePickerPopup.css'

interface DatePickerPopupProps {
  onSelect: (day: number, month: number, year: number) => void
  onClose: () => void
}

const WEEKDAYS = ['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM']

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

export default function DatePickerPopup({ onSelect, onClose }: DatePickerPopupProps) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayIndex = new Date(viewYear, viewMonth, 1).getDay()
  const firstDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1

  const todayDay = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const days: (number | null)[] = []
  for (let i = 0; i < firstDayOffset; i++) {
    days.push(null)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d)
  }
  while (days.length % 7 !== 0) {
    days.push(null)
  }

  const handleDayClick = (day: number) => {
    setSelectedDay(day)
    onSelect(day, viewMonth + 1, viewYear)
    onClose()
  }

  return (
    <>
      <div className="datepicker-overlay" onClick={onClose} />
      <div className="datepicker-popup">
        <div className="datepicker-header">
          <button className="datepicker-nav" onClick={prevMonth} aria-label="Mes anterior">
            <svg viewBox="0 0 24 24">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span className="datepicker-month">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button className="datepicker-nav" onClick={nextMonth} aria-label="Mes siguiente">
            <svg viewBox="0 0 24 24">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        <div className="datepicker-weekdays">
          {WEEKDAYS.map((wd) => (
            <span key={wd} className="datepicker-weekday">{wd}</span>
          ))}
        </div>

        <div className="datepicker-days">
          {days.map((day, i) => {
            const isToday = day !== null && day === todayDay && viewMonth === todayMonth && viewYear === todayYear
            const isSelected = day !== null && day === selectedDay
            return (
              <button
                key={i}
                className={`datepicker-day${day === null ? ' empty' : ''}${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
                disabled={day === null}
                onClick={() => day !== null && handleDayClick(day)}
              >
                {day ?? ''}
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}
