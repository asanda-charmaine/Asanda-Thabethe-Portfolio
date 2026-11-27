import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { intro, site } from '../data/content'
import { asset, gsap, prefersReducedMotion } from '../lib/motion'
import stickerList from '../data/stickers.json'

const PRELOAD_TIMEOUT = 5000 // ms to wait for a single image before skipping it
const placeholderTints = ['#F9D5E1', '#D6DFC4', '#F6E3A1', '#F2D3CA', '#D5E5EA', '#ECDCC3']

const rand = (min, max) => min + Math.random() * (max - min)
const clamp = (v, min, max) => Math.min(max, Math.max(min, v))

/** Shuffles a copy of an array (Fisher–Yates). */
function shuffled(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Preloads the generated stickers (see scripts/prepare-stickers.mjs), keeping the ones that load. */
function preloadStickers() {
  const list = intro.shuffle ? shuffled(stickerList) : stickerList
  return Promise.all(
    list.map(
      ({ src: path, ratio }) =>
        new Promise((resolve) => {
          const src = asset(path)
          const img = new Image()
          const timer = setTimeout(() => resolve(null), PRELOAD_TIMEOUT)
          img.onload = () => {
            clearTimeout(timer)
            resolve({ src, ratio: ratio || img.naturalHeight / img.naturalWidth || 1 })
          }
          img.onerror = () => {
            clearTimeout(timer)
            resolve(null)
          }
          img.src = src
        }),
    ),
  ).then((list) => {
    const found = list.filter(Boolean)
    if (found.length) return found
    // No cartoon images yet: show labelled placeholders so the intro still plays.
    return Array.from({ length: 16 }, (_, i) => ({
      placeholder: true,
      label: `sticker ${i + 1}`,
      tint: placeholderTints[i % placeholderTints.length],
      ratio: 1,
    }))
  })
}

/** Scatters stickers left → right along a loose wave, like a hand-placed trail. */
function layout(list) {
  const W = window.innerWidth
  const H = window.innerHeight
  const n = list.length
  const narrow = W < 640
  const base = clamp((W * 1.8) / n, narrow ? 84 : 80, narrow ? 130 : 230)
  const amp = H * (narrow ? 0.045 : 0.07)
  const jitter = H * (narrow ? 0.025 : 0.05)
  const phase = rand(0, Math.PI * 2)
  return list.map((s, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    const width = base * rand(0.8, 1.15)
    return {
      ...s,
      width,
      x: base * 0.6 + t * (W - base * 1.2),
      y: H * 0.5 + Math.sin(t * Math.PI * 2.4 + phase) * amp + rand(-1, 1) * jitter,
      rotate: rand(-12, 12),
    }
  })
}

export default function IntroLoader({ onReveal }) {
  const [items, setItems] = useState(null)
  const [finished, setFinished] = useState(false)
  const overlay = useRef(null)
  const counter = useRef(null)
  const tl = useRef(null)
  const exiting = useRef(false)

  // Lock page scroll while the intro is on screen
  useEffect(() => {
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    let alive = true
    preloadStickers().then((list) => alive && setItems(layout(list)))
    return () => {
      alive = false
    }
  }, [])

  const exit = useCallback(
    (fast = false) => {
      if (exiting.current) return
      exiting.current = true
      tl.current?.kill()
      const out = gsap.timeline({ onComplete: () => setFinished(true) })
      if (prefersReducedMotion()) {
        // Calm exit: just fade the overlay away
        out.to(overlay.current, {
          opacity: 0,
          duration: 0.6,
          onStart: () => {
            document.documentElement.style.overflow = ''
            onReveal?.()
          },
        })
        return
      }
      out
        .to('[data-intro-sticker]', {
          y: -30,
          opacity: 0,
          duration: fast ? 0.25 : 0.45,
          ease: 'power2.in',
          stagger: { each: fast ? 0.005 : 0.02, from: 'start' },
        })
        .to(overlay.current, {
          yPercent: -100,
          duration: fast ? 0.7 : 1.1,
          ease: 'expo.inOut',
          onStart: () => {
            document.documentElement.style.overflow = ''
            onReveal?.()
          },
        }, fast ? 0.1 : '-=0.2')
    },
    [onReveal],
  )

  // Build the sticker-by-sticker timeline once positions are known
  useLayoutEffect(() => {
    if (!items) return
    const ctx = gsap.context(() => {
      const n = items.length
      const calm = prefersReducedMotion()
      const total = calm ? clamp(n * 0.2, 3, 5) : clamp(n * 0.4, intro.minSeconds, intro.maxSeconds)
      const step = total / n
      const count = { v: 0 }

      tl.current = gsap.timeline({ onComplete: () => exit() })
      gsap.utils.toArray('[data-intro-sticker]').forEach((el, i) => {
        const r = items[i].rotate
        if (calm) {
          // Reduced motion: stickers simply fade in, one by one
          gsap.set(el, { rotate: r })
          tl.current.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, i * step)
        } else {
          tl.current.fromTo(
            el,
            { scale: 0, opacity: 0, rotate: r + rand(-25, 25), y: 30 },
            { scale: 1, opacity: 1, rotate: r, y: 0, duration: 0.55, ease: 'back.out(2.2)' },
            i * step,
          )
        }
      })
      tl.current
        .to(count, {
          v: 100,
          duration: total,
          ease: 'none',
          onUpdate: () => {
            if (counter.current) counter.current.textContent = Math.round(count.v)
          },
        }, 0)
        .to({}, { duration: 0.7 }) // short pause to admire the trail
    }, overlay)
    return () => ctx.revert()
  }, [items, exit])

  // Esc skips the intro
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && exit(true)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [exit])

  if (finished) return null

  return (
    <div
      ref={overlay}
      role="status"
      aria-label={`Loading ${site.name}'s portfolio`}
      className="fixed inset-0 z-[100] overflow-hidden bg-cream"
    >
      {/* Sticker trail */}
      <div aria-hidden="true">
        {items?.map((s, i) => (
          <div
            key={i}
            data-intro-sticker
            className="absolute opacity-0"
            style={{
              left: s.x,
              top: s.y,
              width: s.width,
              marginLeft: -s.width / 2,
              marginTop: (-s.width * s.ratio) / 2,
              zIndex: i,
            }}
          >
            {s.placeholder ? (
              <div
                className="grid aspect-square w-full place-items-center rounded-full border-4 border-white text-center shadow-[0_6px_16px_-8px_rgb(43_36_32/0.35)]"
                style={{ background: s.tint }}
              >
                <span className="px-2 font-hand text-sm leading-tight text-ink-muted">{s.label}</span>
              </div>
            ) : (
              <img
                src={s.src}
                alt=""
                draggable="false"
                className="block h-auto w-full drop-shadow-[0_6px_10px_rgb(43_36_32/0.18)]"
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom bar: name + counter */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-8">
        <p className="font-hand text-xl text-ink-muted sm:text-2xl">
          setting up {site.name.split(' ')[0]}’s little world…
        </p>
        <p className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-ink sm:text-7xl">
          <span ref={counter}>0</span>
          <span className="text-rose">%</span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => exit(true)}
        className="absolute right-4 top-4 rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-ink-soft transition hover:-translate-y-0.5 hover:text-ink sm:right-6 sm:top-6"
      >
        {intro.skipLabel}
      </button>
    </div>
  )
}
