import { useRef } from 'react'
import { contact, tools, footer, site } from '../data/content'
import { asset, gsap, prefersReducedMotion, scrollToSection } from '../lib/motion'
import { burst, dances } from './DecorStickers'
import { EXPLORE_WORK_EVENT } from './Projects'
import Img from './Img'
import { ArrowRight, ArrowUp, GitHubIcon, GmailIcon, LinkedInIcon } from './Icons'

/** A sticker that keeps moving on its own, and dances when clicked. */
function MovingSticker({ s, className = '', style }) {
  const host = useRef(null)
  const mover = useRef(null)
  const dance = () => {
    burst(host.current)
    if (prefersReducedMotion() || gsap.isTweening(mover.current)) return
    dances[Math.floor(Math.random() * dances.length)](mover.current)
  }
  return (
    <div
      ref={host}
      aria-hidden="true"
      onClick={dance}
      className={`footer-sticker relative cursor-pointer ${className}`}
      style={{ ...style, '--tilt': `${s.rotate ?? 0}deg` }}
    >
      <div ref={mover}>
        <div className={`footer-move footer-move--${s.motion ?? 'bob'}`}>
          <img
            src={asset(`assets/stickers/${s.sticker}.webp`)}
            alt=""
            draggable="false"
            loading="lazy"
            className="block h-auto w-full drop-shadow-[0_10px_14px_rgb(160_40_90/0.22)]"
          />
        </div>
      </div>
    </div>
  )
}

const sparkles = [
  { c: '✦', x: '18%', y: '12%', s: 18, d: 0 },
  { c: '♡', x: '30%', y: '78%', s: 20, d: 0.6 },
  { c: '✦', x: '70%', y: '82%', s: 14, d: 1.2 },
  { c: '♡', x: '62%', y: '10%', s: 16, d: 1.8 },
  { c: '✧', x: '46%', y: '92%', s: 16, d: 0.9 },
  { c: '✦', x: '93%', y: '40%', s: 12, d: 2.1 },
  { c: '♡', x: '3%', y: '45%', s: 14, d: 1.5 },
]

export default function Footer() {
  const dock = [
    { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedInIcon, external: true },
    { label: 'GitHub', href: contact.github, Icon: GitHubIcon, external: true },
    { label: 'Gmail', href: `mailto:${contact.email}`, Icon: GmailIcon },
  ]

  return (
    <footer id="site-footer" className="footer-girly relative mt-16 overflow-hidden pb-28 md:pb-12">
      {/* Scalloped edge where the cream page meets the pink footer */}
      <div className="footer-scallop absolute inset-x-0 top-0 h-5" aria-hidden="true" />

      {/* Twinkling sparkles & hearts */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {sparkles.map((sp, i) => (
          <span
            key={i}
            className="footer-sparkle absolute"
            style={{ left: sp.x, top: sp.y, fontSize: sp.s, animationDelay: `${sp.d}s` }}
          >
            {sp.c}
          </span>
        ))}
      </div>

      {/* Moving stickers: around the content on large screens… */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {footer.stickers.map((s) => (
          <MovingSticker
            key={s.sticker}
            s={s}
            className="pointer-events-auto absolute"
            style={{ left: s.x, top: s.y, width: s.size, translate: '-50% 0' }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[760px] px-4 pt-20 text-center sm:px-6">
        {/* …and in a little row on smaller screens */}
        <div className="mb-6 flex items-end justify-center gap-2 sm:gap-4 lg:hidden">
          {footer.stickers.map((s) => (
            <MovingSticker key={s.sticker} s={s} style={{ width: Math.round(s.size * 0.45) }} />
          ))}
        </div>

        <p className="font-hand text-2xl text-[#D9467F]">{footer.kicker} ♡</p>
        <p className="mt-2 font-display text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
          {footer.heading} <span className="footer-marker">{footer.highlight}</span>
        </p>
        <p className="mx-auto mt-4 max-w-[42ch] text-ink-soft">{footer.note}</p>

        {/* Social dock */}
        <nav aria-label="Social links" className="mt-9 flex justify-center">
          <ul className="flex items-end gap-1 rounded-[18px] border border-white/80 bg-white/80 px-3 py-2 shadow-[0_10px_30px_-12px_rgb(217_70_127/0.45)] backdrop-blur">
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
        <div className="mt-9 flex flex-col items-center gap-3">
          <p className="font-hand text-xl text-[#B83A6B]">tools i love using</p>
          <ul
            className="flex items-center gap-0.5 rounded-[16px] border border-white/80 bg-white/70 px-2 py-1.5 backdrop-blur"
            aria-label="Tools I use"
          >
            {tools.map((t, i) =>
              t.divider ? (
                <li key={`d${i}`} aria-hidden="true" className="mx-1 h-6 w-px bg-[#EC5C93]/25" />
              ) : (
                <li key={t.name} className="tool-item" data-tooltip={t.name}>
                  <Img src={t.image} alt={t.name} tint="bg-sand" className="h-[30px] w-[30px] rounded-[7px] text-[0px]" />
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Interaction hints */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {/* Jumps up to the Work gallery, which then waves hello (see Projects.jsx) */}
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('work', { onDone: () => window.dispatchEvent(new Event(EXPLORE_WORK_EVENT)) })
            }}
            className="drag-hint group border-white/80 bg-white/70 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#D9467F]"
          >
            <ArrowRight className="-rotate-90" />
            <span>Explore my work</span>
          </a>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('home')
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-[#EC5C93] px-4 py-1.5 text-sm font-semibold text-white shadow-[0_8px_18px_-8px_rgb(236_92_147/0.8)] transition hover:-translate-y-0.5 hover:bg-[#D9467F]"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>

        {/* Sign-off */}
        <div className="mt-12 border-t-2 border-dotted border-[#EC5C93]/30 pt-6">
          <p className="font-hand text-xl text-[#B83A6B]">{footer.madeWith}</p>
          <p className="mt-1 text-xs text-ink-soft">
            {footer.copyright} · {site.role}
          </p>
        </div>
      </div>
    </footer>
  )
}
