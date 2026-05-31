const SectionSeparator = () => {
  return (
    <div aria-hidden="true" className="relative h-10 sm:h-12 lg:h-14">
      <div className="absolute inset-x-0 top-1/2 h-8 -translate-y-1/2 bg-gradient-to-b from-transparent via-brand-primary/8 to-transparent blur-sm" />
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-primary/18 to-transparent" />
    </div>
  )
}

export default SectionSeparator
