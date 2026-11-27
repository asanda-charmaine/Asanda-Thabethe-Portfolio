import { useEffect, useRef } from 'react'
import { cursorFlowers } from '../data/content'
import { prefersReducedMotion } from '../lib/motion'

/** A five-petal flower with a golden centre. */
function Flower({ color }) {
  return (
    <svg viewBox="0 0 40 40" className="h-full w-full" aria-hidden="true">
      <g fill={color}>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="20" cy="10.5" rx="7.2" ry="9.5" transform={`rotate(${a} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="5.2" fill="#F6C343" />
      <circle cx="18.4" cy="18.6" r="1.6" fill="#FFF3C4" />
    </svg>
  )
}

// How tightly each flower follows the one ahead of it (first follows the cursor)
const FOLLOW = [0.3, 0.2, 0.15]
// Resting gap from the thing it follows, so the flowers trail down-right of the pointer
const GAP = [
  [20, 22],
  [22, 18],
  [18, 15],
]

/**
 * Three pink flowers that trail the mouse pointer, biggest nearest the cursor.
 * Desktop only (needs a mouse); hidden for reduced-motion users.
 */
export default function CursorFlowers() {
  const els = useRef([])

  useEffect(() => {
    if (!cursorFlowers.enabled) return
    // Any mouse counts, even on touchscreen laptops where touch is the "primary" input
    const hasMouse = window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches
    if (!hasMouse || prefersReducedMotion()) return

    const mouse = { x: -200, y: -200 }
    const pts = FOLLOW.map(() => ({ x: -200, y: -200, spin: Math.random() * 360 }))
    let visible = false
    let raf = 0
    let running = false

    const show = (on) => {
      visible = on
      els.current.forEach((el) => el && (el.style.opacity = on ? '1' : '0'))
    }

    const tick = () => {
      let moving = false
      pts.forEach((p, i) => {
        const lead = i === 0 ? mouse : pts[i - 1]
        const tx = lead.x + GAP[i][0]
        const ty = lead.y + GAP[i][1]
        const dx = tx - p.x
        const dy = ty - p.y
        p.x += dx * FOLLOW[i]
        p.y += dy * FOLLOW[i]
        const speed = Math.abs(dx) + Math.abs(dy)
        p.spin += 0.4 + speed * 0.25
        if (speed > 0.3) moving = true
        const el = els.current[i]
        if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${p.spin}deg)`
      })
      if (moving) raf = requestAnimationFrame(tick)
      else running = false
    }
    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') {
        if (visible) show(false) // finger or pen: hide the flowers
        return
      }
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        // Appear right where the pointer is, instead of flying in from a corner
        pts.forEach((p, i) => {
          p.x = mouse.x + GAP[i][0] * (i + 1)
          p.y = mouse.y + GAP[i][1] * (i + 1)
        })
        show(true)
      }
      start()
    }
    const onLeave = (e) => {
      if (!e.relatedTarget) show(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onLeave)
    }
  }, [])

  if (!cursorFlowers.enabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[300]" aria-hidden="true">
      {cursorFlowers.sizes.map((size, i) => (
        <div
          key={i}
          ref={(el) => (els.current[i] = el)}
          className="cursor-flower absolute left-0 top-0"
          style={{ width: size, height: size, opacity: 0, zIndex: 3 - i }}
        >
          <Flower color={cursorFlowers.colors[i % cursorFlowers.colors.length]} />
        </div>
      ))}
    </div>
  )
}
