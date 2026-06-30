import './TimePickerPopup.css'

interface TimePickerPopupProps {
  onSelect: (time: string) => void
  onClose: () => void
}

function generateSlots(): string[] {
  const slots: string[] = []
  for (let h = 0; h < 24; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`)
    slots.push(`${String(h).padStart(2, '0')}:30`)
  }
  return slots
}

const TIME_SLOTS = generateSlots()

export default function TimePickerPopup({ onSelect, onClose }: TimePickerPopupProps) {
  return (
    <>
      <div className="timepicker-overlay" onClick={onClose} />
      <div className="timepicker-popup">
        {TIME_SLOTS.map((time) => (
          <button
            key={time}
            className="timepicker-slot"
            onClick={() => {
              onSelect(time)
              onClose()
            }}
          >
            {time}
          </button>
        ))}
      </div>
    </>
  )
}
