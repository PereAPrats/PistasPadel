import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Sun,
  Moon,
  LogIn,
} from 'lucide-react'
import './LoginForm.css'

interface FormData {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.email.trim()) {
    errors.email = 'El correu electrònic és obligatori'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'El correu electrònic no és vàlid'
  }

  if (!data.password) {
    errors.password = 'La contrasenya és obligatòria'
  }

  return errors
}

function PadelLogo() {
  return (
    <svg
      viewBox="0 0 36 44"
      fill="none"
      width="20"
      height="25"
      aria-hidden="true"
    >
      <rect
        x="5" y="1" width="26" height="28" rx="5"
        stroke="currentColor" strokeWidth="1.6"
      />
      <rect
        x="8" y="4" width="20" height="22" rx="3"
        stroke="currentColor" strokeWidth="0.8" opacity="0.4"
      />
      <circle cx="14" cy="9" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="18" cy="9" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="22" cy="9" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="14" cy="14" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="18" cy="14" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="22" cy="14" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="14" cy="19" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="18" cy="19" r="1" fill="currentColor" opacity="0.35" />
      <circle cx="22" cy="19" r="1" fill="currentColor" opacity="0.35" />
      <rect
        x="15.5" y="29" width="5" height="11" rx="2"
        stroke="currentColor" strokeWidth="1.6"
      />
      <line x1="15.5" y1="33" x2="20.5" y2="33" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <line x1="15.5" y1="36" x2="20.5" y2="36" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
      <circle cx="31" cy="7" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M28 7.5c0-1.5 1-2.8 3-3.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M34 7.5c0 1.5-1 2.8-3 3.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}

const fieldIcons: Record<string, React.ReactNode> = {
  email: <Mail size={17} />,
  password: <Lock size={17} />,
}

interface LoginFormProps {
  onSwitchToRegister?: () => void
}

function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [isDark, setIsDark] = useState(() =>
    matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    const next = { ...form, [name]: value }
    setForm(next)

    if (touched.has(name)) {
      setErrors(validate(next))
    }
  }

  function handleBlur(e: ChangeEvent<HTMLInputElement>) {
    const { name } = e.target
    setTouched((prev) => new Set(prev).add(name))
    setErrors(validate(form))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const validation = validate(form)
    setErrors(validation)
    setTouched(new Set(['email', 'password']))

    if (Object.keys(validation).length > 0) return

    setIsSubmitting(true)

    // Simulated API call — connect to POST /api/login when backend is ready
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert('Sessió iniciada! Benvingut/da de nou 🎾')
      setForm({ email: '', password: '' })
      setTouched(new Set())
      setErrors({})
    } finally {
      setIsSubmitting(false)
    }
  }

  function fieldError(field: keyof FormErrors): string | undefined {
    return touched.has(field) && errors[field] ? errors[field] : undefined
  }

  function fieldValid(field: keyof FormErrors): boolean {
    return touched.has(field) && !errors[field] && form[field].toString().trim().length > 0
  }

  function inputClass(field: keyof FormErrors): string {
    const classes = ['login-form-input']
    if (fieldError(field)) classes.push('login-form-input--error')
    else if (fieldValid(field)) classes.push('login-form-input--valid')
    if (field === 'password') classes.push('login-form-input--password')
    return classes.join(' ')
  }

  function renderInputIcon(field: string): React.ReactNode {
    return (
      <span className="login-form-input-icon" aria-hidden="true">
        {fieldIcons[field]}
      </span>
    )
  }

  function renderStatusIcon(field: keyof FormErrors): React.ReactNode | null {
    if (!touched.has(field)) return null
    if (fieldError(field)) {
      return (
        <span className="login-form-input-status" aria-hidden="true">
          <AlertCircle size={17} color="#ef4444" />
        </span>
      )
    }
    if (fieldValid(field)) {
      return (
        <span className="login-form-input-status" aria-hidden="true">
          <CheckCircle size={17} color="#22c55e" />
        </span>
      )
    }
    return null
  }

  return (
    <motion.div
      className={`login-form-wrapper${isDark ? ' login-form-wrapper--dark' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="login-form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          type="button"
          className="login-form-dark-toggle"
          onClick={() => setIsDark((v) => !v)}
          aria-label={isDark ? 'Activar mode clar' : 'Activar mode fosc'}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div className="login-form-header">
          <div className="login-form-padel-icon">
            <PadelLogo />
          </div>
          <h1 className="login-form-title">Inicia sessió</h1>
          <p className="login-form-subtitle">
            Accedeix al teu compte per reservar pistes i unir-te a partits
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="login-form-fields">
            <div className="login-form-field">
              <label className="login-form-label" htmlFor="email">
                Correu electrònic
              </label>
              <div className="login-form-input-wrapper">
                {renderInputIcon('email')}
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={inputClass('email')}
                  placeholder="exemple@correu.com"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="email"
                />
                {renderStatusIcon('email')}
              </div>
              {fieldError('email') && (
                <span className="login-form-error">
                  <AlertCircle size={13} />
                  {fieldError('email')}
                </span>
              )}
            </div>

            <div className="login-form-field">
              <label className="login-form-label" htmlFor="password">
                Contrasenya
              </label>
              <div className="login-form-input-wrapper">
                {renderInputIcon('password')}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={inputClass('password')}
                  placeholder="Introdueix la contrasenya"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-form-toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Amagar contrasenya' : 'Mostrar contrasenya'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {renderStatusIcon('password')}
              </div>
              {fieldError('password') && (
                <span className="login-form-error">
                  <AlertCircle size={13} />
                  {fieldError('password')}
                </span>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            className={`login-form-submit${isSubmitting ? ' login-form-submit--loading' : ''}`}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {!isSubmitting && (
              <>
                Inicia sessió
                <LogIn size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="login-form-divider">
          <div className="login-form-divider-content">
            <span className="login-form-divider-or">O</span>
            <span className="login-form-register-text">No tens compte?</span>
            <button
              type="button"
              className="login-form-link"
              onClick={onSwitchToRegister}
            >
              Crea'n un
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LoginForm
