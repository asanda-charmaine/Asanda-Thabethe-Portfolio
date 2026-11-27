import { useRef } from 'react'
import { cv, site } from '../data/content'
import { asset, scrollToSection } from '../lib/motion'
import { ResumeSection } from './Resume'
import { CloseIcon, DownloadIcon } from './Icons'

const buttonClass =
  'group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-all duration-300 ease-[var(--ease-expo)] hover:-translate-y-0.5 hover:bg-rose'

/**
 * CV download. While `cv.file` is empty in content.js, the button opens a
 * friendly "coming soon" dialog instead of downloading.
 */
export default function CV() {
  const dialog = useRef(null)

  const open = () => dialog.current?.showModal()
  const close = () => dialog.current?.close()
  const goToContact = () => {
    close()
    scrollToSection('contact')
  }

  return (
    <ResumeSection id="cv" heading={cv.heading}>
      <p className="max-w-[48ch] font-display text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-ink">
        {cv.intro}
      </p>

      <div className="mt-7">
        {cv.file ? (
          <a href={asset(cv.file)} download className={buttonClass}>
            <DownloadIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5" />
            {cv.buttonLabel}
          </a>
        ) : (
          <button type="button" onClick={open} className={buttonClass} aria-haspopup="dialog">
            <DownloadIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-y-0.5" />
            {cv.buttonLabel}
          </button>
        )}
      </div>

      {/* "Coming soon" dialog (native <dialog>: traps focus, closes on Esc) */}
      <dialog
        ref={dialog}
        aria-labelledby="cv-dialog-title"
        aria-describedby="cv-dialog-message"
        onClick={(e) => e.target === dialog.current && close()} // click outside closes
        className="cv-dialog m-auto w-[min(92vw,440px)] rounded-[22px] border border-line bg-paper p-0 text-ink"
      >
        <div className="relative p-7 sm:p-8">
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-ink-soft transition hover:bg-ink/5 hover:text-ink"
            aria-label="Close"
          >
            <CloseIcon className="h-[18px] w-[18px]" />
          </button>
          <p className="font-hand text-xl text-ink-muted" aria-hidden="true">
            a little note from {site.name.split(' ')[0]}
          </p>
          <h3 id="cv-dialog-title" className="mt-1 font-display text-3xl font-semibold tracking-[-0.02em]">
            {cv.unavailableTitle}
          </h3>
          <p id="cv-dialog-message" className="mt-3 leading-relaxed text-ink-soft">
            {cv.unavailableMessage}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button type="button" onClick={goToContact} className={buttonClass}>
              {cv.contactLabel}
            </button>
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center rounded-full border border-ink/15 bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ink/30"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </ResumeSection>
  )
}
