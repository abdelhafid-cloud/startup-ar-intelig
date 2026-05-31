import { motion } from 'framer-motion'

const SectionHeading = ({ eyebrow, title, description, center = true }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}
    >
      {eyebrow && (
        <p className="mb-4 inline-flex rounded-full border border-slate-300/60 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-darkblue shadow-sm backdrop-blur-md">
          {eyebrow}
        </p>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-slate-700 sm:text-lg">
          {description}
        </p>
      )}
    </motion.header>
  )
}

export default SectionHeading
