import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const ceoNotificationTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const clientConfirmationTemplateId =
  import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID?.trim()
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

const ceoEmail =
  import.meta.env.VITE_EMAILJS_CEO_EMAIL?.trim() ||
  import.meta.env.VITE_EMAILJS_TO_EMAIL?.trim()

const siteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '')
const logoUrl = import.meta.env.VITE_LOGO_URL?.trim()

const getSiteUrl = () => {
  if (siteUrl) return siteUrl
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'https://arintelligence.ai'
}

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
  const text =
    error && typeof error === 'object' && 'text' in error && error.text
      ? String(error.text)
      : error instanceof Error
        ? error.message
        : 'Unable to send your request. Please try again.'

  const status = error && typeof error === 'object' && 'status' in error ? error.status : null
  return status ? `${text} (${status})` : text
}

/** Champs alignés sur les noms EmailJS (sendForm) */
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

const sendTemplate = async (templateId, fields, stepLabel) => {
  const form = buildHiddenForm(fields)
  try {
    const result = await emailjs.sendForm(serviceId, templateId, form, { publicKey })
    if (result.status !== 200) {
      throw { status: result.status, text: result.text }
    }
    return result
  } catch (error) {
    const detail = getErrorMessage(error)
    throw new Error(`${stepLabel}: ${detail}`)
  } finally {
    form.remove()
  }
}

export const isEmailConfigured = () =>
  Boolean(
    serviceId &&
      ceoNotificationTemplateId &&
      clientConfirmationTemplateId &&
      publicKey &&
      ceoEmail?.includes('@'),
  )

const baseFields = ({ name, clientEmail, company, projectLabels }) => ({
  site_url: getSiteUrl(),
  logo_url: getLogoUrl(),
  user_name: name,
  name,
  company: company || '—',
  projects: projectLabels,
})

/**
 * Mail 1 → CEO
 * To Email dans EmailJS : {{to_email}} OU {{email}} (les deux = inbox CEO)
 * Ne pas mettre {{user_email}} dans To sur ce template.
 */
const buildCeoNotificationFields = ({
  name,
  clientEmail,
  company,
  projectLabels,
  message,
}) => ({
  ...baseFields({ name, clientEmail, company, projectLabels }),
  to_email: ceoEmail,
  email: ceoEmail,
  user_email: clientEmail,
  message: message || '—',
  reply_to: clientEmail,
  from_name: 'AR Intelligence Website',
  subject: `Demo request — ${projectLabels}`,
})

/**
 * Mail 2 → client (auto-reply)
 * To Email dans EmailJS : {{email}} ou {{user_email}}
 */
const buildClientConfirmationFields = ({
  name,
  clientEmail,
  company,
  projectLabels,
}) => ({
  ...baseFields({ name, clientEmail, company, projectLabels }),
  to_email: clientEmail,
  email: clientEmail,
  user_email: clientEmail,
  reply_to: ceoEmail,
  from_name: 'AR Intelligence',
  subject: 'Your demo request is confirmed — AR Intelligence',
})

export const sendDemoRequest = async ({
  name,
  email: clientEmail,
  company,
  message,
  projectLabels,
}) => {
  if (!isEmailConfigured()) {
    throw new Error(
      'Email not configured. Set VITE_EMAILJS_TO_EMAIL (CEO inbox) and all VITE_EMAILJS_* keys in .env — also on Vercel if deployed.',
    )
  }

  if (!ceoEmail?.includes('@')) {
    throw new Error('CEO email missing. Set VITE_EMAILJS_TO_EMAIL in .env and redeploy.')
  }

  ensureInit()

  await sendTemplate(
    ceoNotificationTemplateId,
    buildCeoNotificationFields({
      name,
      clientEmail,
      company,
      projectLabels,
      message,
    }),
    'CEO notification',
  )

  await sendTemplate(
    clientConfirmationTemplateId,
    buildClientConfirmationFields({
      name,
      clientEmail,
      company,
      projectLabels,
    }),
    'Client confirmation',
  )
}
