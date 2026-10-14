import { useState } from 'react'
import { Send } from 'lucide-react'
import { profile } from '../../data/profile'
import { Button } from '../ui/Button'

const { email: recipient, formEndpoint } = profile.contact
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const STATUS_MESSAGES = {
  sending: 'Sending your message…',
  sent: 'Thanks — your message was sent. I’ll get back to you soon.',
  error: `Something went wrong. Please try again or email ${recipient} directly.`,
  opened: 'Your email app should now be open with the message prefilled. Just hit send.',
}

function validate({ name, email, message }) {
  const errors = {}
  if (!name.trim()) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address.'
  if (message.trim().length < 10) errors.message = 'Please write at least a short message (10+ characters).'
  return errors
}

const inputClasses =
  'w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-[15px] text-zinc-100 placeholder:text-zinc-600 transition-[border-color,box-shadow] duration-300 focus:border-accent-400/70 focus:shadow-[0_0_0_4px_rgb(139_92_246/0.15)] focus:outline-none'

function Field({ id, label, error, multiline, ...props }) {
  const Control = multiline ? 'textarea' : 'input'
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-zinc-300">
        {label}
      </label>
      <Control
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${inputClasses} ${error ? 'border-rose-400/60' : 'border-white/10'} ${multiline ? 'min-h-36 resize-y' : ''}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-rose-300">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const values = Object.fromEntries(new FormData(form))
    const nextErrors = validate(values)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      form.elements[firstInvalid]?.focus()
      return
    }

    if (!formEndpoint) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`)
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`
      setStatus('opened')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) throw new Error(`Request failed with ${response.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="glass rounded-3xl p-6 sm:p-8" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="text-lg font-medium text-zinc-50">
        Send a message
      </h3>
      <p className="mt-1 text-sm text-zinc-500">
        {formEndpoint
          ? 'I usually reply within a couple of days.'
          : 'Submitting opens your email app with this message prefilled.'}
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" placeholder="Jane Doe" error={errors.name} required />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="jane@company.com"
          error={errors.email}
          required
        />
      </div>
      <div className="mt-5">
        <Field
          id="message"
          label="Message"
          multiline
          rows={5}
          placeholder="Tell me about your project, team or idea…"
          error={errors.message}
          required
        />
      </div>

      <div className="mt-7 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p role="status" aria-live="polite" className={`text-sm ${status === 'error' ? 'text-rose-300' : 'text-zinc-400'}`}>
          {STATUS_MESSAGES[status] ?? ''}
        </p>
        <Button type="submit" disabled={status === 'sending'} className="shrink-0">
          {formEndpoint ? 'Send message' : 'Compose email'}
          <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </Button>
      </div>
    </form>
  )
}
