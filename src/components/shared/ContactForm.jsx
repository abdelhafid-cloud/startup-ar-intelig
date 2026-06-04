import { useEffect, useState } from 'react'
import { demoProjectOptions } from '../../data/landingContent'
import {
  getMissingEmailEnvKeys,
  isEmailConfigured,
  sendDemoRequest,
} from '../../lib/sendDemoRequest'

const parseProjectsFromUrl = () => {
  const params = new URLSearchParams(window.location.search)
  const raw = params.get('projects') ?? params.get('project') ?? ''
  const ids = raw.split(',').map((s) => s.trim()).filter(Boolean)
  const valid = new Set(demoProjectOptions.map((p) => p.id))
  return ids.filter((id) => valid.has(id))
}

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [selectedProjects, setSelectedProjects] = useState([])
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fromUrl = parseProjectsFromUrl()
    if (fromUrl.length > 0) {
      setSelectedProjects(fromUrl)
    }
  }, [])

  const toggleProject = (projectId) => {
    setSelectedProjects((current) =>
      current.includes(projectId)
        ? current.filter((id) => id !== projectId)
        : [...current, projectId],
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    const trimmedEmail = email.trim()

    if (!name.trim() || !trimmedEmail) {
      setErrorMessage('Please enter your name and email.')
      setStatus('error')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.')
      setStatus('error')
      return
    }

    if (selectedProjects.length === 0) {
      setErrorMessage('Please select at least one project for the demo.')
      setStatus('error')
      return
    }

    if (!isEmailConfigured()) {
      const missing = getMissingEmailEnvKeys().join(', ')
      setErrorMessage(
        missing
          ? `Email not configured (missing: ${missing}). On Vercel: add these variables and Redeploy.`
          : 'Email not configured. Set all VITE_EMAILJS_* variables in .env (see README).',
      )
      setStatus('error')
      return
    }

    const projectLabels = demoProjectOptions
      .filter((p) => selectedProjects.includes(p.id))
      .map((p) => p.label)
      .join(' · ')

    setStatus('loading')

    try {
      await sendDemoRequest({
        name: name.trim(),
        email: trimmedEmail,
        company: company.trim(),
        message: message.trim(),
        projectLabels,
      })

      setStatus('success')
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
      setSelectedProjects([])
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <form
      className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-lg sm:p-6"
      aria-label="Contact form"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-violet-50 sm:col-span-1">
          Name
          <input
            type="text"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-violet-100/70 focus:border-brand-primary focus:outline-none"
            placeholder="Your name"
          />
        </label>
        <label className="text-sm font-medium text-violet-50 sm:col-span-1">
          Email
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-violet-100/70 focus:border-brand-primary focus:outline-none"
            placeholder="you@company.com"
          />
        </label>
        <label className="text-sm font-medium text-violet-50 sm:col-span-2">
          Company
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            autoComplete="organization"
            className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-violet-100/70 focus:border-brand-primary focus:outline-none"
            placeholder="Company name"
          />
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-violet-50">
            Project(s) for demo <span className="text-violet-200/90">(select one or both)</span>
          </legend>
          <ul className="mt-3 flex flex-col gap-2.5">
            {demoProjectOptions.map((project) => {
              const checked = selectedProjects.includes(project.id)
              return (
                <li key={project.id}>
                  <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 transition hover:border-brand-primary/50 has-[:checked]:border-brand-primary has-[:checked]:bg-white/15">
                    <input
                      type="checkbox"
                      name="projects"
                      value={project.id}
                      checked={checked}
                      onChange={() => toggleProject(project.id)}
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/30 accent-brand-primary"
                    />
                    <span className="text-sm text-violet-50">{project.label}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>

        <label className="text-sm font-medium text-violet-50 sm:col-span-2">
          Message
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-2 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-violet-100/70 focus:border-brand-primary focus:outline-none"
            placeholder="Tell us about your needs or preferred demo date"
          />
        </label>
      </div>

      {status === 'error' && errorMessage && (
        <p className="mt-4 rounded-xl border border-red-300/40 bg-red-500/15 px-3 py-2 text-sm text-red-100" role="alert">
          {errorMessage}
        </p>
      )}

      {status === 'success' && (
        <p className="mt-4 rounded-xl border border-emerald-300/40 bg-emerald-500/15 px-3 py-2 text-sm text-emerald-50" role="status">
          Thank you! Your demo request was sent. A confirmation email has been sent to your inbox — we will contact you shortly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-5 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-darkblue transition hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'loading' ? 'Sending…' : 'Book a Demo'}
      </button>
    </form>
  )
}

export default ContactForm
