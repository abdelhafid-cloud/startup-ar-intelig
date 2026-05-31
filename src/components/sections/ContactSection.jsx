import { motion } from 'framer-motion'
import { ArrowUpRight, Link2, Mail } from 'lucide-react'

const footerLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Email', href: 'mailto:hello@arintelligence.ai' },
  { label: 'Privacy Policy', href: '#privacy' },
]

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative bg-transparent pb-16 pt-20 sm:pb-20 sm:pt-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-brand-darkblue to-brand-darkest p-7 text-white shadow-2xl shadow-brand-darkest/20 sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            <div>
              <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-light">
                Contact & CTA
              </p>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to Transform Your Business?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-violet-100">
                Let&apos;s build intelligent solutions together.
              </p>
            </div>

            <form className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-lg sm:p-6" aria-label="Contact form">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-sm font-medium text-violet-50 sm:col-span-1">
                  Name
                  <input
                    type="text"
                    name="name"
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
                    autoComplete="organization"
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-violet-100/70 focus:border-brand-primary focus:outline-none"
                    placeholder="Company name"
                  />
                </label>
                <label className="text-sm font-medium text-violet-50 sm:col-span-2">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-blue-100/70 focus:border-brand-primary focus:outline-none"
                    placeholder="Tell us about your project"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-darkblue transition hover:bg-brand-light"
              >
                Schedule Consultation
              </button>
            </form>
          </div>
        </motion.div>

        <footer className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200/70 bg-white/80 px-5 py-5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-brand-ink">AR Intelligence</p>
          <p>Copyright {new Date().getFullYear()} AR Intelligence. All rights reserved.</p>
          <ul className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
            <li>
              <a className="inline-flex items-center gap-1 hover:text-brand-darkblue" href={footerLinks[0].href}>
                <Link2 size={14} />
                {footerLinks[0].label}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-1 hover:text-brand-darkblue" href={footerLinks[1].href}>
                <ArrowUpRight size={14} />
                {footerLinks[1].label}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-1 hover:text-brand-darkblue" href={footerLinks[2].href}>
                <Mail size={14} />
                {footerLinks[2].label}
              </a>
            </li>
            <li>
              <a id="privacy" className="hover:text-brand-darkblue" href={footerLinks[3].href}>
                {footerLinks[3].label}
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </section>
  )
}

export default ContactSection
