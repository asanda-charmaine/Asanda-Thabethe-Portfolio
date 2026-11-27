import { contact, tools, footer, site } from '../data/content'
import { scrollToSection } from '../lib/motion'
import DragHint from './DragHint'
import Img from './Img'
import { ArrowUp, GitHubIcon, GmailIcon, LinkedInIcon } from './Icons'

export default function Footer() {
  const dock = [
    { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedInIcon, external: true },
    { label: 'GitHub', href: contact.github, Icon: GitHubIcon, external: true },
    { label: 'Gmail', href: `mailto:${contact.email}`, Icon: GmailIcon },
  ]

  return (
    <footer id="site-footer" className="mx-auto max-w-[920px] px-4 pb-28 pt-10 sm:px-6 md:pb-12">
      <div className="flex flex-col items-center gap-8 border-t border-line pt-14 text-center">
        <p className="font-display text-[clamp(1.6rem,1.2rem+1.6vw,2.6rem)] font-medium leading-tight tracking-[-0.02em] text-ink">
          Let’s build something <span className="marker">good</span>.
        </p>

        {/* Social dock */}
        <nav aria-label="Social links">
          <ul className="pill-surface flex items-end gap-1 px-3 py-2">
            {dock.map(({ label, href, Icon, external }) => (
              <li key={label} className="dock-item">
                <a
                  href={href}
                  className="dock-link"
                  data-tooltip={label}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Tools row */}
        <div className="flex flex-col items-center gap-3">
          <p className="section-label">Tools I use</p>
          <ul className="pill-surface flex items-center gap-0.5 px-2 py-1.5" aria-label="Tools I use">
            {tools.map((t, i) =>
              t.divider ? (
                <li key={`d${i}`} aria-hidden="true" className="mx-1 h-6 w-px bg-ink/10" />
              ) : (
                <li key={t.name} className="tool-item" data-tooltip={t.name}>
                  <Img src={t.image} alt={t.name} tint="bg-sand" className="h-[30px] w-[30px] rounded-[7px] text-[0px]" />
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Interaction hints */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <DragHint mouse="Drag to explore the work" touch="Swipe to explore the work" />
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-sm font-medium text-ink-soft transition hover:-translate-y-0.5 hover:text-ink"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>

        <div className="space-y-1">
          <p className="font-hand text-xl text-ink-muted">{footer.madeWith}</p>
          <p className="text-xs text-ink-muted">
            {footer.copyright} · {site.role}
          </p>
        </div>
      </div>
    </footer>
  )
}
