import { useState } from 'react'
import { asset } from '../lib/motion'

/**
 * Image that falls back to a soft labelled placeholder box if the file
 * is missing. Drop a file with the same name into /public/assets to replace it.
 */
export default function Img({ src, alt, className = '', tint = 'bg-sand', ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center text-center ${tint} ${className}`}
      >
        <span className="px-3 font-hand text-lg leading-tight text-ink-muted">
          {alt}
          <span className="block font-body text-[11px] tracking-wide opacity-70">/{src}</span>
        </span>
      </div>
    )
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      className={className}
      draggable="false"
      onError={() => setFailed(true)}
      {...rest}
    />
  )
}
