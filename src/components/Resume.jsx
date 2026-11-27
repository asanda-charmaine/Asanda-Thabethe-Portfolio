import { aboutPortfolio, aboutMe, experience, skills, education, events, contact } from '../data/content'
import Img from './Img'
import { ArrowUpRight, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons'

/**
 * Notion-style resume row: small uppercase label on the left (desktop),
 * content on the right. Stacks on mobile.
 */
export function ResumeSection({ id, heading, children, className = '' }) {
  const headingId = `${id ?? heading.toLowerCase().replace(/\s+/g, '-')}-heading`
  return (
    <section
      id={id}
      tabIndex={id ? -1 : undefined}
      aria-labelledby={headingId}
      className={`mx-auto max-w-[920px] px-4 sm:px-6 ${className}`}
    >
      <div data-reveal className="grid gap-5 border-t border-line py-12 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-16">
        <h2 id={headingId} className="section-label md:pt-1.5">
          {heading}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  )
}

export function AboutPortfolio() {
  return (
    <ResumeSection id="about-portfolio" heading={aboutPortfolio.heading}>
      <p className="max-w-[62ch] font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.65rem)] leading-snug tracking-[-0.01em] text-ink">
        {aboutPortfolio.text}
      </p>
    </ResumeSection>
  )
}

export function AboutMe() {
  return (
    <ResumeSection id="about" heading={aboutMe.heading}>
      <div className="grid items-start gap-8 sm:grid-cols-[minmax(0,1fr)_220px]">
        <div className="space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
          {aboutMe.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="sticker-frame tape tape--sage mx-auto w-[220px] rotate-2 hover:-rotate-1 hover:scale-[1.03] sm:mx-0">
          <Img
            src={aboutMe.image}
            alt={aboutMe.imageAlt}
            className="aspect-[4/3] w-full rounded-[12px] object-cover"
            tint="bg-sage"
            loading="lazy"
          />
        </div>
      </div>
    </ResumeSection>
  )
}

function Entry({ title, date, meta, children }) {
  return (
    <article className="group relative">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-ink">{title}</h3>
        <span className="whitespace-nowrap text-sm text-ink-muted">{date}</span>
      </div>
      <p className="mt-0.5 text-sm text-ink-muted">{meta}</p>
      {children}
    </article>
  )
}

export function Experience() {
  return (
    <ResumeSection id="experience" heading={experience.heading}>
      <ol className="space-y-10">
        {experience.entries.map((job, i) => (
          <li key={i}>
            <Entry title={job.role} date={job.date} meta={`${job.company} · ${job.location}`}>
              {job.summary && (
                <p className="mt-3 max-w-[62ch] text-[1.02rem] leading-relaxed text-ink">{job.summary}</p>
              )}
              {job.bullets?.length > 0 && (
                <ul className="mt-3 space-y-2 text-[0.975rem] leading-relaxed text-ink-soft">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-terracotta/70">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </Entry>
          </li>
        ))}
      </ol>
      <p className="mt-8 font-hand text-xl text-ink-muted" aria-hidden="true">
        more chapters loading…
      </p>
    </ResumeSection>
  )
}

export function Skills() {
  return (
    <ResumeSection id="skills" heading={skills.heading}>
      <div className="space-y-6">
        {skills.groups.map((g) => (
          <div key={g.label}>
            <h3 className="mb-2.5 font-hand text-xl text-ink-soft">{g.label}</h3>
            <ul className="flex flex-wrap gap-2" aria-label={g.label}>
              {g.items.map((s) => (
                <li key={s} className="tag">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ResumeSection>
  )
}

export function Education() {
  return (
    <ResumeSection id="education" heading={education.heading}>
      <div className="space-y-8">
        {education.entries.map((e, i) => (
          <Entry key={i} title={e.qualification} date={e.date} meta={e.institution}>
            {e.description && <p className="mt-3 max-w-[60ch] text-[0.975rem] leading-relaxed text-ink-soft">{e.description}</p>}
          </Entry>
        ))}
      </div>
    </ResumeSection>
  )
}

export function Events() {
  return (
    <ResumeSection id="events" heading={events.heading}>
      <ol className="space-y-10">
        {events.entries.map((ev, i) => (
          <li key={i}>
            <Entry title={ev.title} date={ev.date} meta={ev.place}>
              {ev.tag && (
                <span className="mt-3 inline-block rounded-full bg-butter/70 px-3 py-0.5 font-hand text-lg leading-snug text-ink">
                  {ev.tag}
                </span>
              )}
              <div className="mt-3 max-w-[62ch] space-y-3 text-[0.975rem] leading-relaxed text-ink-soft">
                {ev.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </Entry>
          </li>
        ))}
      </ol>
    </ResumeSection>
  )
}

export function Contact() {
  const links = [
    { label: contact.email, href: `mailto:${contact.email}`, Icon: MailIcon },
    { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedInIcon, external: true },
    { label: 'GitHub', href: contact.github, Icon: GitHubIcon, external: true },
    { label: contact.phone, href: `tel:${contact.phoneHref}`, Icon: PhoneIcon },
  ]
  return (
    <ResumeSection id="contact" heading={contact.heading}>
      <p className="max-w-[48ch] font-display text-[clamp(1.4rem,1.1rem+1vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-ink">
        {contact.intro}
      </p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {links.map(({ label, href, Icon, external }) => (
          <li key={href}>
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-paper px-4 py-3.5 text-ink transition-all duration-300 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-terracotta/40 hover:shadow-[0_10px_24px_-14px_rgb(43_36_32/0.35)]"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-cream text-ink-soft transition-colors group-hover:bg-terracotta group-hover:text-paper">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="min-w-0 truncate text-[0.95rem] font-medium">{label}</span>
              {external && <span className="sr-only">(opens in a new tab)</span>}
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-terracotta" />
            </a>
          </li>
        ))}
      </ul>
    </ResumeSection>
  )
}
