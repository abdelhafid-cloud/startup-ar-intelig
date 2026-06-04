# AR Intelligence — Landing

## Email professionnel (EmailJS — seule solution)

Le formulaire envoie des notifications **HTML branded** via [EmailJS](https://www.emailjs.com). Template : `email-templates/demo-request.html`.

### 1. Compte & service Gmail

1. Créez un compte sur [emailjs.com](https://www.emailjs.com).
2. **Email Services → Add New Service → Gmail** → connectez le compte Google qui enverra les mails.
3. Notez le **Service ID** (ex. `service_abc123`).

### 2. Template HTML (important)

1. **Email Templates → Create New Template** — nommez-le par ex. `AR Demo Request` (ne pas réutiliser un ancien template « Welcome »).
2. Collez tout le HTML de `email-templates/demo-request.html`.
3. Logo dans le template : `src="{{logo_url}}"`. **Plan gratuit EmailJS** = pas d’upload d’image chez EmailJS → hébergez le logo ailleurs (voir ci-dessous).
4. **Settings** du template :

| Champ | Valeur |
|--------|--------|
| **To Email** | `{{to_email}}` |
| **From Name** | `AR Intelligence` |
| **Reply-To** | `{{user_email}}` |
| **Subject** | `Demo request — {{projects}}` |

5. Notez le **Template ID** → `VITE_EMAILJS_TEMPLATE_ID`.

### 2b. Template confirmation client (auto-reply)

1. **Email Templates → Create New Template** — nom : `AR Demo Confirmation`.
2. Collez le HTML de `email-templates/demo-confirmation.html`.
3. **Settings** :

| Champ | Valeur |
|--------|--------|
| **To Email** | `{{user_email}}` ← le client qui a rempli le formulaire |
| **From Name** | `AR Intelligence` |
| **Reply-To** | votre e-mail ou `hello@arintelligence.ai` |
| **Subject** | `Your demo request is confirmed — AR Intelligence` |

4. Même `{{logo_url}}` que le template admin (imgbb ou Vercel).
5. Notez le **Template ID** → `VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID`.

À chaque envoi du formulaire : **vous** recevez la demande + **le client** reçoit la confirmation automatique.

### 3. Variables `.env`

Copiez `.env.example` vers `.env` :

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxx
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=template_auto_xxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxx
VITE_EMAILJS_TO_EMAIL=votre@gmail.com
```

- **Public Key** : EmailJS → Account → API Keys.
- **TO_EMAIL** : la boîte Gmail où vous recevez les demandes de démo (souvent la même que le compte connecté au service).
- **VITE_SITE_URL** (optionnel) : URL du site pour le lien header `{{site_url}}`.

### Logo avec plan gratuit EmailJS (sans upload EmailJS)

Gmail ne peut pas charger `localhost`. Choisissez **une** option :

| Option | Étapes |
|--------|--------|
| **A. Vercel (recommandé)** | `npm run build` → déployez sur [vercel.com](https://vercel.com) (gratuit) → `VITE_SITE_URL=https://votre-projet.vercel.app` — le logo sera `.../startup-logos/AR.png` automatiquement |
| **B. Hébergeur d’images** | Uploadez `AR.png` sur [imgbb.com](https://imgbb.com) ou [postimages.org](https://postimages.org) → copiez le lien **direct** `.png` → `VITE_LOGO_URL=https://...` dans `.env` |
| **C. GitHub public** | Si le repo est public : `VITE_LOGO_URL=https://raw.githubusercontent.com/VOTRE_USER/VOTRE_REPO/main/public/startup-logos/AR.png` |

Dans EmailJS, le `src` du logo doit être **`{{logo_url}}`** (pas `localhost`).

Redémarrez `npm run dev`, testez le formulaire, vérifiez Gmail (spam / Promotions si besoin).

### Dépannage

- Erreur **422** : `To Email` = `{{to_email}}` dans le template + `VITE_EMAILJS_TO_EMAIL=votre@gmail.com` dans `.env`, puis redémarrer `npm run dev`.
- Erreur **403** : EmailJS → Account → **Allowed Origins** → ajoutez `http://localhost:5173` (ou votre port Vite).
- Historique **OK** mais rien dans Gmail : mauvais Template ID dans `.env`, ou e-mails filtrés — utilisez le template créé à l’étape 2, pas « Welcome ».
- **Test It** dans EmailJS : si le test arrive mais pas le site, les IDs dans `.env` ne correspondent pas au bon template.

Les liens `#contact?projects=enterprise-rag` pré-sélectionnent un projet dans le formulaire.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
