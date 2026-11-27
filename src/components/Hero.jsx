import { hero } from '../data/content'
import { scrollToSection } from '../lib/motion'
import Img from './Img'
import { ArrowRight } from './Icons'

export default function Hero() {
  return (
    <section
      id="home"
      tabIndex={-1}
      aria-labelledby="hero-name"
      className="relative mx-auto flex min-h-[100svh] max-w-[1180px] items-center px-4 pb-20 pt-28 sm:px-6"
    >
      <div className="grid w-full items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        {/* Profile sticker */}
        <div className="relative mx-auto w-[min(78vw,360px)] md:mx-0 md:w-full md:max-w-[400px]">
          <div data-hero="sticker" className="sticker-frame tape tape--blush -rotate-3 hover:rotate-0 hover:scale-[1.02]">
            <Img
              src={hero.image}
              alt={hero.imageAlt}
              className="aspect-square w-full rounded-[14px] object-cover"
              tint="bg-peach"
              fetchPriority="high"
            />
          </div>
          <p
            data-hero="note"
            className="absolute -bottom-9 -right-2 rotate-[-6deg] font-hand text-2xl text-terracotta sm:-right-8"
            aria-hidden="true"
          >
            ↖ {hero.stickerNote}
          </p>
        </div>

        {/* Copy */}
        <div className="text-center md:text-left">
          <p data-hero="line" className="font-hand text-2xl text-ink-muted sm:text-[1.7rem]">
            {hero.greeting}
          </p>
          <h1
            id="hero-name"
            data-hero="line"
            className="mt-1 font-display text-[clamp(2.75rem,2rem+4.2vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-ink"
          >
            {hero.name}
          </h1>
          <p
            data-hero="line"
            className="mt-5 font-display text-[clamp(1.5rem,1.2rem+1.4vw,2.4rem)] font-medium leading-tight tracking-[-0.02em] text-ink-soft"
          >
            {hero.tagline} <span className="marker text-ink">{hero.highlightWord}</span>
          </p>
          <p data-hero="line" className="mt-5 text-base font-medium tracking-wide text-ink-muted sm:text-lg">
            {hero.subtitle}
          </p>
          <div data-hero="line" className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('work')
              }}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-all duration-300 ease-[var(--ease-expo)] hover:-translate-y-0.5 hover:bg-terracotta"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('contact')
              }}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 ease-[var(--ease-expo)] hover:-translate-y-0.5 hover:border-ink/30"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero="line"
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 font-hand text-lg text-ink-muted md:flex"
      >
        scroll
        <span className="block h-8 w-px animate-pulse bg-ink/30" />
      </div>
    </section>
  )
}
