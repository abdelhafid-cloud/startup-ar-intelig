import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim()
const ceoNotificationTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim()
const clientConfirmationTemplateId =
  import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID?.trim()
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim()

/** Inbox du CEO — reçoit chaque demande de démo */
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
  const base =
    error && typeof error === 'object' && 'text' in error && error.text
      ? String(error.text)
      : error instanceof Error
        ? error.message
        : 'Unable to send your request. Please try again.'

  const status = error && typeof error === 'object' && 'status' in error ? error.status : null
  return status ? `${base} (${status})` : base
}

const sendTemplate = async (templateId, templateParams) => {
  const result = await emailjs.send(serviceId, templateId, templateParams, { publicKey })
  if (result.status !== 200) {
    throw { status: result.status, text: result.text }
  }
  return result
}

export const isEmailConfigured = () =>
  Boolean(
    serviceId &&
      ceoNotificationTemplateId &&
      clientConfirmationTemplateId &&
      publicKey &&
      ceoEmail?.includes('@'),
  )

/** Params pour le mail CEO — pas de champ "email" (souvent utilisé par erreur comme destinataire) */
const buildCeoNotificationParams = ({
  name,
  clientEmail,
  company,
  projectLabels,
  message,
}) => ({
  site_url: getSiteUrl(),
  logo_url: getLogoUrl(),
  to_email: ceoEmail,
  user_name: name,
  name,
  user_email: clientEmail,
  company: company || '—',
  projects: projectLabels,
  message: message || '—',
  reply_to: clientEmail,
  from_name: 'AR Intelligence Website',
  subject: `Demo request — ${projectLabels}`,
})

/** Params pour la confirmation client */
const buildClientConfirmationParams = ({
  name,
  clientEmail,
  company,
  projectLabels,
}) => ({
  site_url: getSiteUrl(),
  logo_url: getLogoUrl(),
  user_name: name,
  name,
  user_email: clientEmail,
  email: clientEmail,
  to_email: clientEmail,
  company: company || '—',
  projects: projectLabels,
  reply_to: ceoEmail,
  from_name: 'AR Intelligence',
  subject: 'Your demo request is confirmed — AR Intelligence',
})

/**
 * 1. E-mail au CEO (nouvelle demande de démo)
 * 2. E-mail de confirmation au client (prospect)
 */
export const sendDemoRequest = async ({
  name,
  email: clientEmail,
  company,
  message,
  projectLabels,
}) => {
  if (!isEmailConfigured()) {
    throw new Error(
      'Email not configured. Set VITE_EMAILJS_CEO_EMAIL (or TO_EMAIL), both template IDs, and PUBLIC_KEY in .env.',
    )
  }

  ensureInit()

  try {
    await sendTemplate(
      ceoNotificationTemplateId,
      buildCeoNotificationParams({
        name,
        clientEmail,
        company,
        projectLabels,
        message,
      }),
    )

    await sendTemplate(
      clientConfirmationTemplateId,
      buildClientConfirmationParams({
        name,
        clientEmail,
        company,
        projectLabels,
      }),
    )
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
