import { motion } from 'framer-motion'
import SectionHeading from '../shared/SectionHeading'
import { services } from '../../data/landingContent'

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Solutions Designed for Modern Businesses"
          description="From strategy to deployment, we build AI solutions that improve execution speed, customer experience, and decision quality."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-6 shadow-md shadow-brand-darkest/5 backdrop-blur-xl"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-darkblue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-secondary transition group-hover:bg-brand-secondary group-hover:text-white">
                  <Icon size={22} />
                </span>
                <h3 className="text-lg font-semibold text-brand-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
