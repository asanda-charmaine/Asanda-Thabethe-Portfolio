import { useEffect, useState } from 'react'
import { nav, site, hero } from '../data/content'
import { asset, scrollToSection } from '../lib/motion'
import Img from './Img'
import { HomeIcon, WorkIcon, PlayIcon, UserIcon, MailIcon } from './Icons'

const mobileIcons = { home: HomeIcon, work: WorkIcon, play: PlayIcon, about: UserIcon, contact: MailIcon }

// Résumé-style sections all count as "About" in the nav.
const sectionToNav = {
  'about-portfolio': 'about',
  experience: 'about',
  skills: 'about',
  education: 'about',
  events: 'about',
}

/** Tracks which nav item matches the section currently in view. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = document.querySelectorAll('main section[id]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const target = sectionToNav[e.target.id] ?? e.target.id
          if (ids.includes(target)) setActive(target)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const ids = nav.map((n) => n.target)
const logoMask = `url(${asset('assets/logo.png')}) center / contain no-repeat`

export default function Header() {
  const active = useActiveSection(ids)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, target) => {
    e.preventDefault()
    scrollToSection(target)
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ${
          scrolled ? 'bg-cream/70 backdrop-blur-md' : ''
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-6">
          {/* Bow logo (public/assets/logo.png), drawn as a mask so it takes the ink colour */}
          <a
            href="#home"
            onClick={(e) => go(e, 'home')}
            className="group flex items-center gap-2"
            aria-label={`${site.name}, back to top`}
          >
            <span
              aria-hidden="true"
              className="block h-12 w-9 origin-top bg-ink transition-[transform,background-color] duration-500 ease-[var(--ease-expo)] group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-terracotta"
              style={{ WebkitMask: logoMask, mask: logoMask }}
            />
            <span className="hidden font-hand text-xl text-ink-soft sm:inline">{site.name.split(' ')[0]}</span>
          </a>

          {/* Desktop / tablet pill nav */}
          <nav aria-label="Main" className="pill-surface hidden items-center gap-1 p-1.5 md:flex">
            {nav.map((item) => {
              const isActive = active === item.target
              return (
                <a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => go(e, item.target)}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-[10px] px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    isActive ? 'bg-ink text-paper' : 'text-ink-soft hover:bg-ink/5 hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          {/* Avatar: jumps to About */}
          <a
            href="#about"
            onClick={(e) => go(e, 'about')}
            className="h-10 w-10 overflow-hidden rounded-full border-2 border-ink/10 transition-all duration-300 ease-[var(--ease-expo)] hover:scale-110 hover:border-terracotta hover:shadow-[0_2px_12px_rgb(200_100_59/0.3)]"
            aria-label="About me"
          >
            <Img src={hero.image} alt="" className="h-full w-full object-cover" tint="bg-peach" />
          </a>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav
        aria-label="Main mobile"
        className="pill-surface fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 items-center gap-0.5 p-1.5 md:hidden"
      >
        {nav.map((item) => {
          const Icon = mobileIcons[item.target] ?? HomeIcon
          const isActive = active === item.target
          return (
            <a
              key={item.target}
              href={`#${item.target}`}
              onClick={(e) => go(e, item.target)}
              aria-current={isActive ? 'true' : undefined}
              className={`flex w-[58px] flex-col items-center gap-0.5 rounded-[10px] py-1.5 text-[10px] font-medium transition-colors ${
                isActive ? 'bg-ink text-paper' : 'text-ink-soft'
              }`}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </a>
          )
        })}
      </nav>
    </>
  )
}
