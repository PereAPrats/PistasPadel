import { useState, type FormEvent, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import './RegisterForm.css'

interface FormData {
  name: string
  lastName: string
  email: string
  password: string
}

interface FormErrors {
  name?: string
  lastName?: string
  email?: string
  password?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}

  if (!data.name.trim()) {
    errors.name = 'El nom és obligatori'
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nom ha de tenir almenys 2 caràcters'
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'El cognom és obligatori'
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'El cognom ha de tenir almenys 2 caràcters'
  }

  if (!data.email.trim()) {
    errors.email = 'El correu electrònic és obligatori'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'El correu electrònic no és vàlid'
  }

  if (!data.password) {
    errors.password = 'La contrasenya és obligatòria'
  } else if (data.password.length < 8) {
    errors.password = 'La contrasenya ha de tenir almenys 8 caràcters'
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
    errors.password = 'Ha d\'incloure majúscula, minúscula i número'
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
  name: <User size={17} />,
  lastName: <User size={17} />,
  email: <Mail size={17} />,
  password: <Lock size={17} />,
}

function RegisterForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    lastName: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState<Set<string>>(new Set())

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
    setTouched(new Set(['name', 'lastName', 'email', 'password']))

    if (Object.keys(validation).length > 0) return

    setIsSubmitting(true)

    // Simulated API call — connect to POST /api/register when backend is ready
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert('Registre completat! Benvingut/da a PistasPadel 🎾')
      setForm({ name: '', lastName: '', email: '', password: '' })
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
    const classes = ['register-form-input']
    if (fieldError(field)) classes.push('register-form-input--error')
    else if (fieldValid(field)) classes.push('register-form-input--valid')
    if (field === 'password') classes.push('register-form-input--password')
    return classes.join(' ')
  }

  function renderInputIcon(field: string): React.ReactNode {
    return (
      <span className="register-form-input-icon" aria-hidden="true">
        {fieldIcons[field]}
      </span>
    )
  }

  function renderStatusIcon(field: keyof FormErrors): React.ReactNode | null {
    if (!touched.has(field)) return null
    if (fieldError(field)) {
      return (
        <span className="register-form-input-status" aria-hidden="true">
          <AlertCircle size={17} color="#ef4444" />
        </span>
      )
    }
    if (fieldValid(field)) {
      return (
        <span className="register-form-input-status" aria-hidden="true">
          <CheckCircle size={17} color="#22c55e" />
        </span>
      )
    }
    return null
  }

  return (
    <motion.div
      className="register-form-wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="register-form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="register-form-header">
          <div className="register-form-padel-icon">
            <PadelLogo />
          </div>
          <h1 className="register-form-title">Crea el teu compte</h1>
          <p className="register-form-subtitle">
            Registra't per reservar pistes i unir-te a partits de pádel
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="register-form-fields">
            <div className="register-form-field">
              <label className="register-form-label" htmlFor="name">
                Nom
              </label>
              <div className="register-form-input-wrapper">
                {renderInputIcon('name')}
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={inputClass('name')}
                  placeholder="Ex: Marc"
                  value={form.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="given-name"
                />
                {renderStatusIcon('name')}
              </div>
              {fieldError('name') && (
                <span className="register-form-error">
                  <AlertCircle size={13} />
                  {fieldError('name')}
                </span>
              )}
            </div>

            <div className="register-form-field">
              <label className="register-form-label" htmlFor="lastName">
                Cognom
              </label>
              <div className="register-form-input-wrapper">
                {renderInputIcon('lastName')}
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className={inputClass('lastName')}
                  placeholder="Ex: López"
                  value={form.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="family-name"
                />
                {renderStatusIcon('lastName')}
              </div>
              {fieldError('lastName') && (
                <span className="register-form-error">
                  <AlertCircle size={13} />
                  {fieldError('lastName')}
                </span>
              )}
            </div>

            <div className="register-form-field">
              <label className="register-form-label" htmlFor="email">
                Correu electrònic
              </label>
              <div className="register-form-input-wrapper">
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
                <span className="register-form-error">
                  <AlertCircle size={13} />
                  {fieldError('email')}
                </span>
              )}
            </div>

            <div className="register-form-field">
              <label className="register-form-label" htmlFor="password">
                Contrasenya
              </label>
              <div className="register-form-input-wrapper">
                {renderInputIcon('password')}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={inputClass('password')}
                  placeholder="Mínim 8 caràcters"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="register-form-toggle-password"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Amagar contrasenya' : 'Mostrar contrasenya'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                {renderStatusIcon('password')}
              </div>
              {fieldError('password') && (
                <span className="register-form-error">
                  <AlertCircle size={13} />
                  {fieldError('password')}
                </span>
              )}
            </div>
          </div>

          <motion.button
            type="submit"
            className={`register-form-submit${isSubmitting ? ' register-form-submit--loading' : ''}`}
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : undefined}
            whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {!isSubmitting && (
              <>
                Crear compte
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="register-form-divider">
          <div className="register-form-divider-content">
            <span className="register-form-divider-or">O</span>
            <span className="register-form-login-text">Ja tens compte?</span>
            <a href="/login" className="register-form-link">
              Inicia sessió
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default RegisterForm
