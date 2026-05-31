import { motion } from 'framer-motion'
import HeroSection from './components/sections/HeroSection'
import ServicesSection from './components/sections/ServicesSection'
import TechnologiesSection from './components/sections/TechnologiesSection'
import WhyChooseUsSection from './components/sections/WhyChooseUsSection'
import ProjectShowcaseSection from './components/sections/ProjectShowcaseSection'
import CEOSection from './components/sections/CEOSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <HeroSection />
        <ServicesSection />
        <div className="bg-gradient-to-b from-violet-50/90 via-white to-violet-50/70">
          <TechnologiesSection />
          <WhyChooseUsSection />
        </div>
        <ProjectShowcaseSection />
        <div className="bg-gradient-to-b from-violet-50/90 via-white to-violet-50/70">
          <CEOSection />
          <ContactSection />
        </div>
      </motion.main>
    </div>
  )
}

export default App
