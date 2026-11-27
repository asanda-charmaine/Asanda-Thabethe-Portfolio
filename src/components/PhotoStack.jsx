import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { asset, Draggable, gsap, prefersReducedMotion } from '../lib/motion'

// Hand-placed feel: each photo keeps its own tilt and nudge in the pile.
const TILTS = [-4, 5, -7, 3, 6, -2, 8]
const NUDGES = [0, 10, -12, 6, -6, 12, -10]
const THROW_DISTANCE = 90 // px dragged before a photo gets tossed to the back

/**
 * A pile of polaroid-style photos. Tap the top photo, swipe it away or press
 * "Shuffle" to send it to the back of the pile.
 */
export default function PhotoStack({ photos, label }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i))
  const cards = useRef([])
  const busy = useRef(false)
  const first = useRef(true)

  const restFor = (photoIndex, depth) => ({
    x: NUDGES[photoIndex % NUDGES.length],
    y: depth * 5,
    rotate: TILTS[photoIndex % TILTS.length],
    scale: 1 - Math.min(depth, 4) * 0.025,
  })

  // Lay the pile out whenever the order changes
  useLayoutEffect(() => {
    const instant = first.current || prefersReducedMotion()
    order.forEach((photoIndex, depth) => {
      const el = cards.current[photoIndex]
      if (!el) return
      gsap.set(el, { zIndex: photos.length - depth })
      if (first.current) gsap.set(el, { xPercent: -50, yPercent: -50 })
      gsap.to(el, { ...restFor(photoIndex, depth), duration: instant ? 0 : 0.7, ease: 'expo.out', overwrite: 'auto' })
    })
    first.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, photos.length])

  // Send the top photo to the back of the pile
  const shuffle = useCallback(
    (dir = 1) => {
      if (busy.current || photos.length < 2) return
      busy.current = true
      const el = cards.current[order[0]]
      const finish = () => {
        gsap.set(el, { zIndex: 0 })
        setOrder((o) => [...o.slice(1), o[0]])
        busy.current = false
      }
      if (prefersReducedMotion()) return finish()
      gsap.to(el, {
        x: dir * 340,
        y: -30,
        rotate: dir * 24,
        duration: 0.38,
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: finish,
      })
    },
    [order, photos.length],
  )

  // Make the top photo draggable (swipe left/right to toss it)
  useEffect(() => {
    const topIndex = order[0]
    const el = cards.current[topIndex]
    if (!el || photos.length < 2) return
    const rest = restFor(topIndex, 0)
    const [drag] = Draggable.create(el, {
      type: 'x',
      allowNativeTouchScrolling: true,
      zIndexBoost: false,
      onDrag() {
        gsap.set(el, { rotate: rest.rotate + (this.x - rest.x) * 0.08 })
      },
      onClick() {
        shuffle(1)
      },
      onDragEnd() {
        const dx = this.x - rest.x
        if (Math.abs(dx) > THROW_DISTANCE) shuffle(Math.sign(dx))
        else gsap.to(el, { x: rest.x, rotate: rest.rotate, duration: 0.7, ease: 'elastic.out(1, 0.5)' })
      },
    })
    return () => drag.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, shuffle, photos.length])

  const current = order[0]

  return (
    <div className="mt-6">
      <div
        role="group"
        aria-roledescription="photo stack"
        aria-label={label}
        className="relative mx-auto h-[360px] w-full max-w-[420px] sm:h-[400px]"
      >
        {photos.map((p, i) => (
          <figure
            key={p.src}
            ref={(el) => (cards.current[i] = el)}
            aria-hidden={i !== current}
            className={`photo-card absolute left-1/2 top-1/2 m-0 select-none rounded-[6px] bg-white p-2 pb-7 ${
              p.portrait ? 'w-[min(46vw,190px)]' : 'w-[min(76vw,320px)]'
            } ${i === current ? 'cursor-grab active:cursor-grabbing' : ''}`}
          >
            <img
              src={asset(p.src)}
              alt={p.alt}
              draggable="false"
              loading="lazy"
              className="block h-auto w-full rounded-[3px]"
            />
          </figure>
        ))}
      </div>

      {photos.length > 1 && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => shuffle(1)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-sm font-medium text-ink-soft transition hover:-translate-y-0.5 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
            Shuffle photos
          </button>
          <span className="font-hand text-lg text-ink-muted" aria-live="polite">
            photo {current + 1} of {photos.length}
          </span>
          <span className="hint-mouse font-hand text-lg text-ink-muted" aria-hidden="true">
            · drag or click the top photo
          </span>
          <span className="hint-touch font-hand text-lg text-ink-muted" aria-hidden="true">
            · swipe the top photo
          </span>
        </div>
      )}
    </div>
  )
}
