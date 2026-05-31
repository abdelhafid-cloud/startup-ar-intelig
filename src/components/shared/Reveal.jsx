import { motion } from 'framer-motion'

const defaultVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const Reveal = ({ as: Tag = 'div', children, className = '', delay = 0, variants = defaultVariants }) => {
  return (
    <Tag className={className}>
      <motion.div
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay }}
      >
        {children}
      </motion.div>
    </Tag>
  )
}

export default Reveal
