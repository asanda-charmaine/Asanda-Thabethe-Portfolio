import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { decorStickers } from '../data/content'
import stickerList from '../data/stickers.json'
import { asset, gsap, prefersReducedMotion } from '../lib/motion'

const CONTENT_WIDTH = 920 // matches the max width of the résumé column
const MIN_GUTTER = 150 // below this margin width, switch to small "title" stickers
const MOBILE_SIZE = 58

const ratioOf = Object.fromEntries(
  stickerList.map((s) => [s.src.replace('assets/stickers/', '').replace('.webp', ''), s.ratio]),
)

/** Works out where each sticker goes, based on where its section sits on the page. */
function measure() {
  const vw = document.documentElement.clientWidth
  const gutter = (vw - CONTENT_WIDTH) / 2
  const wide = gutter >= MIN_GUTTER
  const out = []
  for (const d of decorStickers) {
    if (!wide && !d.mobile) continue
    const section = document.getElementById(d.section)
    if (!section) continue
    const ratio = ratioOf[d.sticker] ?? 1
    const top = section.getBoundingClientRect().top + window.scrollY
    if (wide) {
      const width = Math.min(d.size, gutter - 36)
      const cx = d.side === 'left' ? gutter / 2 : vw - gutter / 2
      out.push({
        ...d,
        width,
        left: cx - width / 2,
        top: top + d.at * section.offsetHeight - (width * ratio) / 2,
      })
    } else {
      // Phones / tablets: a small sticker at the right end of the section's top row
      const width = MOBILE_SIZE / Math.max(1, ratio) // keep tall stickers short
      const rect = section.getBoundingClientRect()
      const pad = vw < 640 ? 16 : 24
      out.push({ ...d, width, left: rect.right - pad - width, top: top + 6 })
    }
  }
  return out
}

// Little dances, picked at random on each click
export const dances = [
  (el) =>
    gsap.timeline().to(el, {
      keyframes: { rotate: [0, -16, 13, -9, 6, -3, 0] },
      duration: 0.7,
      ease: 'power1.inOut',
    }),
  (el) =>
    gsap
      .timeline()
      .to(el, { scaleY: 0.82, scaleX: 1.12, y: 6, duration: 0.12, ease: 'power2.out' })
      .to(el, { scaleY: 1.1, scaleX: 0.92, y: -46, duration: 0.3, ease: 'power2.out' })
      .to(el, { scaleY: 1, scaleX: 1, y: 0, duration: 0.55, ease: 'bounce.out' }),
  (el) =>
    gsap
      .timeline()
      .to(el, { rotate: '+=360', scale: 1.15, duration: 0.6, ease: 'back.inOut(1.6)' })
      .to(el, { scale: 1, duration: 0.3, ease: 'power2.out' })
      .set(el, { rotate: 0 }),
  (el) =>
    gsap
      .timeline()
      .to(el, { scale: 1.28, duration: 0.15, ease: 'power2.out' })
      .to(el, { scale: 1, duration: 0.9, ease: 'elastic.out(1.1, 0.3)' }),
  (el) =>
    gsap.timeline().to(el, {
      keyframes: { x: [0, -10, 10, -8, 8, -4, 0], rotate: [0, -4, 4, -3, 3, 0, 0] },
      duration: 0.55,
      ease: 'none',
    }),
]

/** Tiny pink hearts that pop out when a sticker is clicked. */
export function burst(host) {
  const colors = ['#EC5C93', '#F48FB1', '#F6C343', '#D9467F']
  for (let i = 0; i < 7; i++) {
    const s = document.createElement('span')
    s.textContent = '♥'
    s.className = 'decor-heart'
    s.style.color = colors[i % colors.length]
    host.appendChild(s)
    const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.5
    const dist = 55 + Math.random() * 35
    gsap.fromTo(
      s,
      { x: 0, y: 0, scale: 0.4, opacity: 1 },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 20,
        scale: 1 + Math.random() * 0.6,
        rotate: Math.random() * 60 - 30,
        opacity: 0,
        duration: 0.9,
        ease: 'power2.out',
        onComplete: () => s.remove(),
      },
    )
  }
}

function Sticker({ s }) {
  const outer = useRef(null)
  const mover = useRef(null)
  const last = useRef(-1)
  const [shown, setShown] = useState(false)

  // Pop in when scrolled into view
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { rootMargin: '0px 0px -10% 0px' })
    io.observe(outer.current)
    return () => io.disconnect()
  }, [])

  const dance = () => {
    const el = mover.current
    if (!el || gsap.isTweening(el)) return
    burst(outer.current)
    if (prefersReducedMotion()) return
    let i
    do i = Math.floor(Math.random() * dances.length)
    while (i === last.current && dances.length > 1)
    last.current = i
    dances[i](el)
  }

  return (
    <div
      ref={outer}
      className={`decor-sticker absolute ${shown ? 'is-shown' : ''}`}
      style={{ left: s.left, top: s.top, width: s.width, '--tilt': `${s.rotate ?? 0}deg` }}
      aria-hidden="true"
      onClick={dance}
    >
      <div ref={mover}>
        <div className="decor-float" style={{ animationDelay: `${(s.left + s.top) % 3000}ms` }}>
          <img src={asset(`assets/stickers/${s.sticker}.webp`)} alt="" draggable="false" loading="lazy" className="block h-auto w-full" />
        </div>
      </div>
    </div>
  )
}

/** Cartoon stickers sprinkled in the page margins. Click one to make it dance. */
export default function DecorStickers() {
  const [items, setItems] = useState([])
  const frame = useRef(0)

  const update = useCallback(() => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => setItems(measure()))
  }, [])

  useLayoutEffect(() => {
    update()
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    window.addEventListener('resize', update)
    document.fonts?.ready.then(update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      cancelAnimationFrame(frame.current)
    }
  }, [update])

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0">
      {items.map((s) => (
        <Sticker key={`${s.section}-${s.sticker}`} s={s} />
      ))}
    </div>
  )
}
