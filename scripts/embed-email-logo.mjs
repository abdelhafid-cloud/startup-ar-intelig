import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

/**
 * Restaure {{logo_url}} dans le template (Gmail ne supporte pas data:image base64).
 * Pour le logo : uploadez AR.png dans EmailJS → Insert Image → copiez l’URL dans VITE_LOGO_URL
 */
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const htmlPath = path.join(root, 'email-templates/demo-request.html')

let html = fs.readFileSync(htmlPath, 'utf8')
html = html.replace(/src="data:image\/png;base64,[^"]+"/, 'src="{{logo_url}}"')
html = html.replace(
  /Logo : AR\.png intégré en base64.*/,
  'Logo : {{logo_url}} — URL publique (VITE_LOGO_URL ou VITE_SITE_URL)',
)

fs.writeFileSync(htmlPath, html)
console.log('Template restored with {{logo_url}}')
