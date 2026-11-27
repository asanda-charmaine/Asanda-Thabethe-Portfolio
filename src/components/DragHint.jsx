import { ArrowRight } from './Icons'

/** "Drag to explore" on mouse devices, "Swipe to explore" on touch. */
export default function DragHint({ mouse = 'Drag to explore', touch = 'Swipe to explore', className = '' }) {
  return (
    <span className={`drag-hint ${className}`} aria-hidden="true">
      <ArrowRight />
      <span className="hint-mouse">{mouse}</span>
      <span className="hint-touch">{touch}</span>
    </span>
  )
}
