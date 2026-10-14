import { Mail } from 'lucide-react'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

const { email, github, linkedin } = profile.contact

const links = [
  github && { label: 'GitHub', href: github, Icon: GithubIcon, external: true },
  linkedin && { label: 'LinkedIn', href: linkedin, Icon: LinkedinIcon, external: true },
  email && { label: 'Email', href: `mailto:${email}`, Icon: Mail, external: false },
].filter(Boolean)

export function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            className="grid size-10 place-items-center rounded-full text-zinc-400 transition-colors duration-300 hover:bg-white/5 hover:text-white"
          >
            <Icon className="size-[18px]" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  )
}
