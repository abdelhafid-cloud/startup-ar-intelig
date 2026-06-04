import emailjs from '@emailjs/browser'

/** Lu à chaque appel — valeurs figées au build Vite (obligatoire sur Vercel avant deploy). */
const readEnv = () => ({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '',
  ceoNotificationTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '',
  clientConfirmationTemplateId:
    import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID?.trim() ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '',
  ceoEmail:
    import.meta.env.VITE_EMAILJS_CEO_EMAIL?.trim() ||
    import.meta.env.VITE_EMAILJS_TO_EMAIL?.trim() ||
    '',
  siteUrl: import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '') ?? '',
  logoUrl: import.meta.env.VITE_LOGO_URL?.trim() ?? '',
})

const ENV_KEYS = [
  { key: 'VITE_EMAILJS_SERVICE_ID', get: (e) => e.serviceId },
  { key: 'VITE_EMAILJS_TEMPLATE_ID', get: (e) => e.ceoNotificationTemplateId },
  { key: 'VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID', get: (e) => e.clientConfirmationTemplateId },
  { key: 'VITE_EMAILJS_PUBLIC_KEY', get: (e) => e.publicKey },
  {
    key: 'VITE_EMAILJS_TO_EMAIL (or VITE_EMAILJS_CEO_EMAIL)',
    get: (e) => e.ceoEmail,
    isEmail: true,
  },
]

export const getMissingEmailEnvKeys = () => {
  const env = readEnv()
  return ENV_KEYS.filter(({ get, isEmail }) => {
    const value = get(env)
    if (!value) return true
    if (isEmail) return !value.includes('@')
    return false
  }).map(({ key }) => key)
}

const getSiteUrl = (siteUrl) => {
  if (siteUrl) return siteUrl
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }
  return 'https://arintelligence.ai'
}

const getLogoUrl = (siteUrl, logoUrl) => {
  if (logoUrl) return logoUrl
  const base = siteUrl || (typeof window !== 'undefined' ? window.location?.origin : '')
  return base ? `${base.replace(/\/$/, '')}/startup-logos/AR.png` : ''
}

let initialized = false

const ensureInit = (publicKey) => {
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

const assertRecipients = (fields, requiredKeys, stepLabel, deployHint) => {
  const empty = requiredKeys.filter((key) => !String(fields[key] ?? '').includes('@'))
  if (empty.length > 0) {
    throw new Error(
      `${stepLabel}: recipient empty (${empty.join(', ')}). ${deployHint}`,
    )
  }
}

const sendTemplate = async ({ serviceId, publicKey, templateId, fields, stepLabel }) => {
  const form = buildHiddenForm(fields)
  try {
    const result = await emailjs.sendForm(serviceId, templateId, form, { publicKey })
    if (result.status !== 200) {
      throw { status: result.status, text: result.text }
    }
    return result
  } catch (error) {
    const detail = getErrorMessage(error)
    const deployHint =
      detail.includes('422') || detail.toLowerCase().includes('recipient')
        ? ' On Vercel: add all VITE_EMAILJS_* variables (especially VITE_EMAILJS_TO_EMAIL), then Redeploy.'
        : ''
    throw new Error(`${stepLabel}: ${detail}${deployHint}`)
  } finally {
    form.remove()
  }
}

export const isEmailConfigured = () => getMissingEmailEnvKeys().length === 0

const baseFields = ({ name, clientEmail, company, projectLabels, siteUrl, logoUrl }) => ({
  site_url: getSiteUrl(siteUrl),
  logo_url: getLogoUrl(siteUrl, logoUrl),
  user_name: name,
  name,
  company: company || '—',
  projects: projectLabels,
})

const buildCeoNotificationFields = (params, ceoEmail) => ({
  ...baseFields(params),
  to_email: ceoEmail,
  email: ceoEmail,
  user_email: params.clientEmail,
  message: params.message || '—',
  reply_to: params.clientEmail,
  from_name: 'AR Intelligence Website',
  subject: `Demo request — ${params.projectLabels}`,
})

const buildClientConfirmationFields = (params, ceoEmail) => ({
  ...baseFields(params),
  to_email: params.clientEmail,
  email: params.clientEmail,
  user_email: params.clientEmail,
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
  const missing = getMissingEmailEnvKeys()
  if (missing.length > 0) {
    throw new Error(
      `Email not configured (missing at build time): ${missing.join(', ')}. ` +
        'Add them in Vercel → Settings → Environment Variables, then Redeploy (not just Restart).',
    )
  }

  const env = readEnv()
  ensureInit(env.publicKey)

  const params = {
    name,
    clientEmail,
    company,
    projectLabels,
    message,
    siteUrl: env.siteUrl,
    logoUrl: env.logoUrl,
  }

  const ceoFields = buildCeoNotificationFields(params, env.ceoEmail)
  assertRecipients(
    ceoFields,
    ['to_email', 'email'],
    'CEO notification',
    'Set VITE_EMAILJS_TO_EMAIL on Vercel and Redeploy.',
  )

  await sendTemplate({
    serviceId: env.serviceId,
    publicKey: env.publicKey,
    templateId: env.ceoNotificationTemplateId,
    fields: ceoFields,
    stepLabel: 'CEO notification',
  })

  const clientFields = buildClientConfirmationFields(params, env.ceoEmail)
  assertRecipients(
    clientFields,
    ['email', 'user_email'],
    'Client confirmation',
    'Check the client email in the form.',
  )

  await sendTemplate({
    serviceId: env.serviceId,
    publicKey: env.publicKey,
    templateId: env.clientConfirmationTemplateId,
    fields: clientFields,
    stepLabel: 'Client confirmation',
  })
}
