import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, Draggable)

export { gsap, ScrollTrigger, Draggable }

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null

/** Starts Lenis smooth scrolling, synced to GSAP's ticker. Returns a cleanup fn. */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
    smoothWheel: true,
  })
  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

const HEADER_OFFSET = -88

/** Smooth-scrolls to a section by id, then moves keyboard focus to it. */
export function scrollToSection(id, { immediate = false } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const focus = () => el.focus({ preventScroll: true })

  if (lenis) {
    lenis.scrollTo(id === 'home' ? 0 : el, { offset: HEADER_OFFSET, immediate, onComplete: focus })
  } else {
    const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET
    window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' })
    focus()
  }
  history.replaceState(null, '', `#${id}`)
}

/** Resolves a path in /public against Vite's base URL. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
