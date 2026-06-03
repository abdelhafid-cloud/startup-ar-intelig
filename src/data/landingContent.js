import {
  Bot,
  BrainCircuit,
  MessageSquareText,
  AppWindow,
  ShieldCheck,
  Gauge,
  Scaling,
} from 'lucide-react'

export const navigationLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const services = [
  {
    title: 'AI Agents',
    description:
      'Intelligent autonomous agents that execute workflows, support teams, and reduce repetitive operations.',
    icon: Bot,
  },
  {
    title: 'RAG Knowledge Systems',
    description:
      'Secure retrieval-augmented solutions that turn your documents into instant, reliable business intelligence.',
    icon: BrainCircuit,
  },
  {
    title: 'WhatsApp Automation',
    description:
      'Conversational automation for acquisition, support, and bookings across the world\'s most used messaging channel.',
    icon: MessageSquareText,
  },
  {
    title: 'Custom AI Platforms',
    description:
      'End-to-end AI products designed around your architecture, business model, and long-term growth goals.',
    icon: AppWindow,
  },
]

export const technologies = [
  { name: 'React', logo: '/stack-logos/3840px-React-icon.svg.png' },
  { name: 'Vite', logo: '/stack-logos/3840px-Vitejs-logo.svg.png' },
  { name: 'Spring Boot', logo: '/stack-logos/Springboot.jpg' },
  { name: 'Python', logo: '/stack-logos/3840px-Python-logo-notext.svg.png' },
  { name: 'OpenAI', logo: '/stack-logos/chatgpt-seeklogo.png' },
  { name: 'Cohere', logo: '/stack-logos/cohere-icon-seeklogo.png' },
  { name: 'Qdrant', logo: '/stack-logos/qdrant-icon-seeklogo.png' },
  { name: 'PostgreSQL', logo: '/stack-logos/postgre-sql-seeklogo.png' },
  { name: 'Docker', logo: '/stack-logos/docker-seeklogo.png' },
  { name: 'AWS', logo: '/stack-logos/amazon-web-services-aws-seeklogo.png' },
]

export const advantages = [
  {
    title: 'AI Expertise',
    description:
      'Senior specialists in applied AI, automation architecture, and production-grade model integration.',
    icon: BrainCircuit,
  },
  {
    title: 'Secure Infrastructure',
    description:
      'Enterprise-ready standards across data governance, deployment security, and observability.',
    icon: ShieldCheck,
  },
  {
    title: 'Fast Deployment',
    description:
      'From discovery to launch in weeks with clear milestones and measurable impact from day one.',
    icon: Gauge,
  },
  {
    title: 'Scalable Architecture',
    description:
      'Systems engineered to evolve with demand, teams, and AI maturity without costly rewrites.',
    icon: Scaling,
  },
]

export const stats = [
  { value: '98%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'AI Availability' },
  { value: '10x', label: 'Faster Knowledge Access' },
]

export const projectShowcase = [
  {
    title: 'AI Appointment Assistant',
    description:
      'Automates appointment booking through WhatsApp and synchronizes data with Google Sheets.',
    icon: '/projet-picture/image.png',
  },
  {
    title: 'Enterprise RAG Platform',
    description:
      'Automates Upload documents and instantly chat with company knowledge.',
    icon: '/projet-picture/tag.png',
  },
]
