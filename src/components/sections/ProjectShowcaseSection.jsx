import { motion } from 'framer-motion'
import SectionHeading from '../shared/SectionHeading'
import { projectShowcase } from '../../data/landingContent'

const ProjectShowcaseSection = () => {
  return (
    <section id="projects" className="relative bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Flagship Products"
          title="Our AI Solutions"
          description="Two examples of how we turn practical business friction into scalable AI-enabled workflows."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {projectShowcase.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 shadow-sm"
            >
              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-brand-ink">{project.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>
              </div>
              {/* Project Screenshot Placeholder */}
              <div className="mx-6 mb-6 flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-brand-primary/35 bg-gradient-to-br from-brand-light to-white sm:mx-7 sm:mb-7">
                <div className="text-center">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-darkblue/70">
                    {project.placeholder}
                  </p>
                  <p className="mt-2 text-xs text-slate-500">Screenshot placeholder</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectShowcaseSection
