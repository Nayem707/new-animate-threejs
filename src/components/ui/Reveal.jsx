import { motion } from 'motion/react'
import { EASE_OUT_EXPO } from './motionPresets'

export function Reveal({ as = 'div', delay = 0, y = 24, className, children, ...props }) {
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay }}
      {...props}
    >
      {children}
    </Component>
  )
}
