import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/content'
import { prefersReducedMotion } from '../lib/motion'
import DragScroller from './DragScroller'
import DragHint from './DragHint'
import Img from './Img'
import { ArrowRight, ArrowUpRight } from './Icons'

// Card tints and tilts cycle so the row feels hand-placed, like a scrapbook.
const tints = ['bg-[#FBEBD6]', 'bg-[#E3EDEF]', 'bg-[#EFE7F0]', 'bg-[#E6EEDD]']
const thumbTints = ['bg-peach', 'bg-sky', 'bg-blush', 'bg-sage']
const tilts = ['-rotate-[1.2deg]', 'rotate-[1deg]', '-rotate-[0.8deg]', 'rotate-[1.4deg]']
const tapes = ['', 'tape--blush', 'tape--sage', '']

/** True when the gallery is wider than its container (so dragging is useful). */
function useOverflow(ref) {
  const [overflowing, setOverflowing] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => setOverflowing(el.scrollWidth > el.clientWidth + 4)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    return () => ro.disconnect()
  }, [ref])
  return overflowing
}

export default function Projects() {
  const scroller = useRef(null)
  const overflowing = useOverflow(scroller)

  const nudge = (dir) => {
    const el = scroller.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 24 : 400
    el.scrollBy({ left: dir * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <section id="work" tabIndex={-1} aria-labelledby="work-heading" className="pb-6 md:pb-10">
      <div className="mx-auto max-w-[920px] px-4 sm:px-6">
        <div data-reveal className="grid gap-5 border-t border-line pt-12 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:pt-16">
          <h2 id="work-heading" className="section-label md:pt-1.5">
            {projects.heading}
          </h2>
          <div className="flex min-h-9 flex-wrap items-center justify-between gap-4">
            <p className="font-hand text-2xl text-ink-soft">{projects.note}</p>
            {overflowing && (
              <div className="flex items-center gap-3">
                <DragHint />
                <div className="hidden gap-1.5 sm:flex">
                  <button
                    type="button"
                    onClick={() => nudge(-1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-ink-soft transition hover:scale-110 hover:text-ink"
                    aria-label="Scroll projects left"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => nudge(1)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-ink-soft transition hover:scale-110 hover:text-ink"
                    aria-label="Scroll projects right"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <DragScroller ref={scroller} label="Projects gallery" className="mt-8">
        <ul
          data-reveal-stagger
          className="flex w-max gap-6 px-4 pb-14 pt-8 sm:px-6 md:pl-[max(1.5rem,calc((100vw-920px)/2+1.5rem))] md:pr-[max(1.5rem,calc((100vw-920px)/2+1.5rem))]"
        >
          {projects.items.map((p, i) => {
            const external = p.link?.startsWith('http')
            const contain = p.imageFit === 'contain'
            return (
              <li key={p.title} className="w-[min(86vw,420px)] shrink-0">
                <article className={`work-card tape ${tapes[i % 4]} ${tints[i % 4]} ${tilts[i % 4]} relative flex h-full flex-col`}>
                  <div className={`thumb relative overflow-hidden rounded-t-[13px] ${contain ? `${thumbTints[i % 4]} py-4` : ''}`}>
                    <Img
                      src={p.image}
                      alt={p.imageAlt}
                      className={`aspect-[16/10] w-full ${contain ? 'object-contain drop-shadow-[0_10px_18px_rgb(43_36_32/0.25)]' : 'object-cover'}`}
                      style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
                      tint={thumbTints[i % 4]}
                      loading="lazy"
                    />
                    <span className="absolute left-2.5 top-2.5 rounded-md bg-paper/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-soft backdrop-blur-sm">
                      {p.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-[1.65rem] font-medium leading-tight tracking-[-0.02em] text-ink">
                        {p.link ? (
                          <a
                            href={p.link}
                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                            className="after:absolute after:inset-0 after:rounded-[14px] after:content-[''] focus-visible:outline-none"
                          >
                            {p.title}
                          </a>
                        ) : (
                          p.title
                        )}
                      </h3>
                      <span className="shrink-0 font-hand text-lg text-ink-muted">{p.year}</span>
                    </div>
                    {p.subtitle && <p className="mt-0.5 text-sm font-medium text-ink-muted">{p.subtitle}</p>}
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{p.description}</p>

                    {p.highlights?.length > 0 && (
                      <div className="mt-4">
                        {p.roleLabel && <p className="font-hand text-xl text-terracotta">{p.roleLabel}</p>}
                        <ul className="mt-1.5 space-y-1.5 text-[0.9rem] leading-relaxed text-ink-soft">
                          {p.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-terracotta/70"
                            >
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {p.link && (
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-terracotta" aria-hidden="true">
                        {p.linkLabel}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </DragScroller>
    </section>
  )
}
