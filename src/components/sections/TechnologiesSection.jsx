import { motion } from 'framer-motion'
import SectionHeading from '../shared/SectionHeading'
import { technologies } from '../../data/landingContent'

const TechnologiesSection = () => {
  return (
    <section id="technologies" className="relative bg-transparent py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Tech Stack"
          title="Powered by Modern Technologies"
          description="Our platforms combine proven engineering tools with state-of-the-art AI providers for reliability and scale."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {technologies.map((technology, index) => (
            <motion.article
              key={technology.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group rounded-2xl border border-violet-200/70 bg-white/80 p-4 shadow-sm shadow-brand-darkest/5 transition hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg"
            >
              <div className="mb-3 flex h-16 items-center justify-center rounded-xl border border-violet-200/70 bg-white px-3">
                <img
                  src={technology.logo}
                  alt={`${technology.name} logo`}
                  className="max-h-10 w-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-center text-sm font-semibold text-brand-ink">{technology.name}</h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechnologiesSection
