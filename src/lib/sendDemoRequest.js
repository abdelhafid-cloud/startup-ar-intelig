import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()
const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL?.trim()
const siteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
const logoUrl = import.meta.env.VITE_LOGO_URL?.trim()

const getSiteUrl = () => {
  if (siteUrl) return siteUrl
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'https://arintelligence.ai'
}

/** Gmail requires a public HTTPS image URL (no base64, no localhost). */
export const getLogoUrl = () => {
  if (logoUrl) return logoUrl
  const base = siteUrl || (typeof window !== 'undefined' ? window.location?.origin : '')
  return base ? `${base.replace(/\/$/, '')}/startup-logos/AR.png` : ''
}

let initialized = false

const ensureInit = () => {
  if (!initialized && publicKey) {
    emailjs.init({ publicKey })
    initialized = true
  }
}

const getErrorMessage = (error) => {
  const base =
    error && typeof error === 'object' && 'text' in error && error.text
      ? String(error.text)
      : error instanceof Error
        ? error.message
        : 'Unable to send your request. Please try again.'

  const status = error && typeof error === 'object' && 'status' in error ? error.status : null

  if (status === 422) {
    return `${base} — Vérifiez dans EmailJS : To Email = {{to_email}} et VITE_EMAILJS_TO_EMAIL dans .env`
  }

  if (status === 403) {
    return `${base} — Ajoutez http://localhost:5173 dans EmailJS → Account → Allowed Origins`
  }

  return status ? `${base} (${status})` : base
}

const buildHiddenForm = (fields) => {
  const form = document.createElement('form')
  form.style.display = 'none'

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = name
    input.value = String(value ?? '')
    form.appendChild(input)
  })

  document.body.appendChild(form)
  return form
}

export const isEmailConfigured = () =>
  Boolean(serviceId && templateId && publicKey && toEmail?.includes('@'))

export const sendDemoRequest = async ({
  name,
  email,
  company,
  message,
  projectLabels,
}) => {
  if (!isEmailConfigured()) {
    throw new Error(
      'Email not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY and VITE_EMAILJS_TO_EMAIL in .env',
    )
  }

  ensureInit()

  const fields = {
    to_email: toEmail,
    email: toEmail,
    user_name: name,
    name,
    user_email: email,
    reply_to: email,
    from_name: 'AR Intelligence',
    company: company || '-',
    projects: projectLabels,
    message: message || '-',
    subject: `Demo request — ${projectLabels}`,
    site_url: getSiteUrl(),
    logo_url: getLogoUrl(),
  }

  const form = buildHiddenForm(fields)

  try {
    const result = await emailjs.sendForm(serviceId, templateId, form, { publicKey })

    if (result.status !== 200) {
      throw { status: result.status, text: result.text }
    }

    return result
  } catch (error) {
    throw new Error(getErrorMessage(error))
  } finally {
    form.remove()
  }
}
