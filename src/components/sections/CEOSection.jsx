import { motion } from 'framer-motion'
import { BadgeCheck, Info } from 'lucide-react'
import SectionHeading from '../shared/SectionHeading'

const CEOSection = () => {
  return (
    <section id="ceo" className="relative bg-transparent py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="A Message from the CEO"
          description="We help ambitious teams turn AI strategy into measurable operational advantage."
        />

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mt-12 overflow-hidden rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-brand-darkest/8 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-7 lg:grid-cols-[280px_1fr] lg:gap-10">
            <div>
              <div className="overflow-hidden rounded-2xl border border-brand-primary/20 bg-white shadow-lg shadow-brand-darkest/10">
                <img
                  src="/ceo-picture/ceo.jpeg"
                  alt="Abdelhafid Raouf, Founder and CEO of AR Intelligence"
                  className="aspect-[4/5] w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 overflow-hidden rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-white via-brand-primary/5 to-violet-50 px-5 py-4 text-brand-darkblue shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-brand-ink">RAOUF Abdelhafid</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-brand-darkblue/70">Software & AI Engineer</p>
                  </div>

                  <span className="inline-flex rounded-full border border-brand-primary/20 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-secondary">
                    CEO
                  </span>
                </div>

                <div className="mt-4 h-px bg-gradient-to-r from-brand-primary/40 via-brand-primary/10 to-transparent" />

                <p className="mt-3 text-xs leading-relaxed text-slate-600">Founder & CEO, AR Intelligence</p>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-darkblue/75">Biography</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Abdelhafid Raouf is the Founder & CEO of AR Intelligence, specializing in AI-powered solutions,
                  RAG systems, and business automation. He is dedicated to helping organizations leverage artificial
                  intelligence to improve efficiency, innovation, and growth.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-sm shadow-brand-darkest/5 sm:p-6">
                <div className="flex items-center gap-3">
                  <Info className="text-brand-primary" size={28} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-darkblue/70">Our Story</p>
                    <p className="mt-1 text-sm font-semibold text-brand-ink">Strategic AI built for real business impact</p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-darkblue/75">Our Mission</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      At AR Intelligence, our mission is to help businesses unlock the full potential of Artificial
                      Intelligence by delivering innovative, accessible, and high-performance solutions.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-darkblue/75">Our Vision</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      To become a leading Artificial Intelligence company in Africa and empower businesses worldwide
                      through intelligent, secure, and scalable technologies that accelerate digital transformation.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-darkblue/75">Our Goals</p>
                    <ul className="mt-3 grid gap-3 text-sm leading-relaxed text-slate-600 sm:grid-cols-2">
                      <li className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Develop AI solutions tailored to real business needs.</li>
                      <li className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Automate repetitive tasks to improve productivity and operational efficiency.</li>
                      <li className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Enable seamless access to knowledge through advanced RAG technologies.</li>
                      <li className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Build intelligent assistants capable of natural and meaningful interactions.</li>
                      <li className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Support SMEs and large enterprises in their digital transformation journey.</li>
                      <li className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">Create a globally recognized AI SaaS platform delivering measurable business value.</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/10 via-white to-violet-50 px-4 py-4 sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-darkblue/75">Our Ambition</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      Our ambition is to position AR Intelligence as a pioneering technology company that bridges the
                      gap between Artificial Intelligence and real-world business challenges, while contributing to a
                      sustainable and innovative digital ecosystem.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

export default CEOSection
