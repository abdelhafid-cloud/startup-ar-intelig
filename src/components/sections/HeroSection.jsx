import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, Sparkles, X, Brain } from 'lucide-react'
import { navigationLinks } from '../../data/landingContent'

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMenuOpen(false)

  return (
    <section id="home" className="relative isolate overflow-hidden pb-20 pt-4 sm:pt-8 lg:pb-24">
      <div className="mx-auto max-w-[104rem] px-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-40 mb-20 rounded-[1.75rem] border border-white/50 bg-white/75 px-4 py-2 shadow-lg shadow-brand-darkest/5 backdrop-blur-xl sm:px-8 lg:px-14">
          <nav className="flex items-center justify-between gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-4" aria-label="Primary">
            <a href="#home" className="inline-flex items-center gap-3 justify-self-start" aria-label="AR Intelligence home">
              <img src="/startup-logos/AR.png" alt="AR Intelligence" className="h-10 w-10 shrink-0 sm:h-12 sm:w-12" />
              <div className="hidden sm:block">
                <p className="text-base font-semibold leading-tight text-brand-ink sm:text-[1.05rem]">
                  AR Intelligence
                </p>
                <p className="max-w-[18rem] text-[10px] font-medium uppercase tracking-[0.16em] text-brand-primary sm:text-[11px]">
                  Transforming Business Through Artificial Intelligence
                </p>
              </div>
            </a>

            <ul className="hidden items-center justify-center gap-3 rounded-full border border-slate-200 bg-white/80 px-4 py-1.5 md:flex md:justify-self-center lg:gap-4 lg:px-5 md:min-w-[46rem] lg:min-w-[52rem]">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded-full px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-900 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 md:justify-self-end">
              <a
                href="#contact"
                className="hidden items-center gap-2 rounded-full bg-brand-secondary px-7 py-2 text-sm font-semibold text-white transition hover:bg-brand-darkblue sm:inline-flex"
              >
                Book a Demo
                <ArrowRight size={16} />
              </a>

              <button
                type="button"
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-menu"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-darkblue transition hover:bg-slate-50 md:hidden"
              >
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </nav>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-nav-menu"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="mt-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-lg md:hidden"
              >
                <ul className="flex flex-col gap-1">
                  {navigationLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={closeMobileMenu}
                        className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-brand-primary/10 hover:text-brand-darkblue"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-darkblue"
                >
                  Book a Demo
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className="mt-20 grid items-center gap-10 lg:mt-28 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-darkblue">
              <Brain size={15} />
              Transforming Business Through Artificial Intelligence
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl lg:text-6xl">
              AI Solutions Built for the Future
            </h1>
            <p className="mt-6 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
              AR Intelligence helps businesses automate operations, leverage AI agents, implement RAG systems,
              deploy WhatsApp automation, and accelerate digital transformation through cutting-edge AI solutions.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-secondary/20 transition hover:-translate-y-0.5 hover:bg-brand-darkblue"
              >
                Book a Demo
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl border border-brand-secondary/30 bg-white px-6 py-3 text-sm font-semibold text-brand-darkblue transition hover:border-brand-secondary hover:bg-brand-secondary/5"
              >
                Explore Solutions
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
            className="relative mx-auto w-full max-w-[30rem]"
          >
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-primary/20 via-white/20 to-brand-secondary/20 blur-2xl" />
            <div className="rounded-[2rem] border border-white/70 bg-white/65 p-4 shadow-2xl shadow-brand-darkest/10 backdrop-blur-xl sm:p-5">
              {/* AI Hero Image Placeholder */}
              <div className="flex aspect-[5/4] items-center justify-center rounded-2xl border border-dashed border-brand-primary/35 bg-gradient-to-br from-brand-light to-white">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-darkblue/70 sm:text-sm">
                    AI Dashboard Illustration
                  </p>
                  <p className="mt-2 text-xs text-slate-600 sm:text-sm">Image placeholder area</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
