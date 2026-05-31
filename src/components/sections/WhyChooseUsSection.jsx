import { motion } from 'framer-motion'
import SectionHeading from '../shared/SectionHeading'
import { advantages, stats } from '../../data/landingContent'

const WhyChooseUsSection = () => {
  return (
    <section
      id="why-us"
      className="relative bg-transparent py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why AR Intelligence"
          title="Why Businesses Choose AR Intelligence"
          description="We combine deep AI expertise with production discipline so your initiatives move from prototype to measurable ROI."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon
              return (
                <motion.article
                  key={advantage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="rounded-2xl border border-violet-200/70 bg-white/80 p-5 shadow-sm"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-brand-secondary">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brand-ink">{advantage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{advantage.description}</p>
                </motion.article>
              )
            })}
          </div>

          <div className="space-y-4">
            {stats.map((stat, index) => (
              <motion.article
                key={stat.label}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-violet-200/70 bg-gradient-to-br from-white to-violet-50 p-5 shadow-sm"
              >
                <p className="text-3xl font-semibold text-brand-darkblue">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
