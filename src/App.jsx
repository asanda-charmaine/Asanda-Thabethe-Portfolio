import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, initSmoothScroll, scrollToSection, prefersReducedMotion } from './lib/motion'
import { intro } from './data/content'
import IntroLoader from './components/IntroLoader'
import Header from './components/Header'
import Hero from './components/Hero'
import { AboutPortfolio, AboutMe, Experience, Skills, Education, Events, Contact } from './components/Resume'
import Projects from './components/Projects'
import Notebook from './components/Notebook'
import Footer from './components/Footer'

export default function App() {
  const root = useRef(null)

  // The sticker intro plays on a fresh load. It's skipped for reduced-motion
  // users and for deep links like /#contact.
  const [showIntro] = useState(() => intro.enabled && !prefersReducedMotion() && !window.location.hash)
  const [revealed, setRevealed] = useState(!showIntro)
  const onReveal = useCallback(() => setRevealed(true), [])

  useEffect(() => {
    if (!revealed) return
    const cleanup = initSmoothScroll()
    // Honour deep links like /#work once the page has rendered
    const id = decodeURIComponent(window.location.hash.slice(1))
    let t
    if (id && document.getElementById(id)) t = setTimeout(() => scrollToSection(id, { immediate: true }), 60)
    return () => {
      clearTimeout(t)
      cleanup()
    }
  }, [revealed])

  // Hero entrance: runs once the intro overlay starts lifting
  useLayoutEffect(() => {
    if (!revealed) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: showIntro ? 0.35 : 0 })
      tl.from('[data-hero="sticker"]', { scale: 0.6, rotate: -18, opacity: 0, duration: 1.2, ease: 'back.out(1.6)' })
        .from('[data-hero="line"]', { y: 36, opacity: 0, duration: 1, stagger: 0.08 }, '-=0.9')
        .from('[data-hero="note"]', { opacity: 0, x: -12, rotate: -16, duration: 0.8 }, '-=0.5')
    }, root)
    return () => mm.revert()
  }, [revealed, showIntro])

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    // All motion lives inside this query, so reduced-motion users get a static page.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Scroll reveals
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })

      // Staggered children (project cards, tags)
      gsap.utils.toArray('[data-reveal-stagger]').forEach((list) => {
        gsap.from(list.children, {
          y: 60,
          opacity: 0,
          rotate: () => gsap.utils.random(-6, 6),
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.09,
          clearProps: 'transform',
          scrollTrigger: { trigger: list, start: 'top 85%', once: true },
        })
      })

      // Stickers pop in
      gsap.from('.sticker', {
        scale: 0,
        duration: 0.8,
        ease: 'back.out(2)',
        stagger: 0.07,
        scrollTrigger: { trigger: '.play-board', start: 'top 80%', once: true },
      })
    }, root)

    // Recalculate trigger positions once fonts/images settle
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)

    return () => {
      window.removeEventListener('load', refresh)
      mm.revert()
    }
  }, [])

  return (
    <>
      {showIntro && <IntroLoader onReveal={onReveal} />}
      <div ref={root} inert={!revealed}>
        <Header />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <AboutPortfolio />
          <AboutMe />
          <Experience />
          <Skills />
          <Projects />
          <Education />
          <Events />
          <Contact />
          <Notebook />
        </main>
        <Footer />
      </div>
    </>
  )
}
