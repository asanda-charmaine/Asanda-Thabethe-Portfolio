import { notebook } from '../data/content'
import Img from './Img'
import PlayBoard from './PlayBoard'

const tints = ['bg-petal', 'bg-sage', 'bg-butter', 'bg-blush', 'bg-sky']

/** The "Play" section: sticker board + a notebook-page editorial (recipe-style). */
export default function Notebook() {
  const n = notebook
  return (
    <section id="play" tabIndex={-1} aria-labelledby="play-heading" className="pb-12 md:pb-16">
      <div className="mx-auto max-w-[920px] px-4 sm:px-6">
        <div className="border-t border-line pt-12 md:pt-16" />
      </div>

      <PlayBoard />

      <div className="mx-auto mt-14 max-w-[760px] px-4 sm:px-6">
        <article data-reveal className="notebook relative px-6 pb-14 pt-12 sm:pl-20 sm:pr-12">
          {/* Ring holes */}
          <div className="notebook-rings pointer-events-none absolute left-6 top-14 hidden flex-col gap-20 sm:flex" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          {/* Margin note */}
          <p
            aria-hidden="true"
            className="absolute right-6 top-8 hidden rotate-[6deg] whitespace-pre-line text-right font-hand text-xl leading-tight text-rose md:block"
          >
            {n.marginNote}
          </p>

          {/* Title */}
          <header className="mb-8">
            <p className="font-hand text-xl text-ink-muted">{n.eyebrow}</p>
            <h3 id="play-heading" className="scribble-underline font-hand text-[clamp(2.6rem,2rem+3vw,3.8rem)] font-bold leading-none text-ink">
              {n.title}
            </h3>
            <p className="mt-5 whitespace-pre-line font-hand text-xl leading-snug text-ink-soft">{n.subtitleNote}</p>
          </header>

          <p className="max-w-[56ch] border-l-2 border-rose/40 pl-4 italic leading-relaxed text-ink-soft">{n.intro}</p>

          {/* List */}
          <div className="mt-10">
            <h4 className="font-hand text-[1.75rem] font-bold text-ink">{n.listHeading}</h4>
            <ul className="mt-3 space-y-1.5">
              {n.list.map((item, i) => (
                <li key={i} className="flex flex-wrap items-baseline gap-x-2 text-ink-soft">
                  <span className="min-w-[4.5rem] font-hand text-xl font-bold text-rose">{item.qty}</span>
                  <span>{item.item}</span>
                  {item.aside && <span className="font-hand text-lg text-ink-muted">{item.aside}</span>}
                </li>
              ))}
            </ul>
            {n.listScribble && <p className="mt-3 -rotate-1 font-hand text-lg text-ink-muted">{n.listScribble}</p>}
          </div>

          {/* Divider doodle */}
          <svg className="my-10 h-3 w-48 text-ink-muted/60" viewBox="0 0 200 12" fill="none" aria-hidden="true">
            <path d="M4 6 Q20 2 40 6 Q60 10 80 6 Q100 2 120 6 Q140 10 160 6 Q180 2 196 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>

          {/* Steps */}
          <h4 className="font-hand text-[1.75rem] font-bold text-ink">{n.stepsHeading}</h4>
          <ol id="steps" className="mt-6 space-y-10">
            {n.steps.map((step, i) => {
              const flip = i % 2 === 1
              return (
                <li
                  key={i}
                  data-reveal
                  className={`step flex flex-col gap-5 sm:items-start sm:gap-7 ${flip ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
                >
                  <div
                    className={`step-illustration sticker-frame w-[150px] shrink-0 self-center sm:w-[169px] sm:self-start ${
                      flip ? 'rotate-[3deg]' : '-rotate-[3deg]'
                    }`}
                  >
                    <Img
                      src={step.image}
                      alt={step.imageAlt}
                      className="aspect-square w-full rounded-[12px] object-cover"
                      style={step.imagePosition ? { objectPosition: step.imagePosition } : undefined}
                      tint={tints[i % tints.length]}
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="font-hand text-3xl font-bold leading-none text-rose" aria-hidden="true">
                      {i + 1}.
                    </span>
                    <h4 className="mt-1 font-display text-xl font-medium tracking-[-0.01em] text-ink">
                      <span className="sr-only">Step {i + 1}: </span>
                      {step.heading}
                    </h4>
                    <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
                    <aside className="mt-3 -rotate-[0.6deg] font-hand text-xl lowercase leading-snug text-ink-muted">
                      {step.aside}
                    </aside>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* Closing */}
          <div className="mt-14 border-t border-dashed border-ink/15 pt-8 text-center">
            <p className="font-display text-lg italic text-ink-soft">{n.closing}</p>
            <p className="mt-2 font-hand text-3xl text-rose">{n.sign}</p>
          </div>
        </article>
      </div>
    </section>
  )
}
