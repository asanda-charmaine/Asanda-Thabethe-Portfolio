import { forwardRef, useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion'

const CLICK_THRESHOLD = 5 // px moved before a press counts as a drag
const DECAY = 0.92 // inertia friction per frame

/**
 * Horizontal gallery: mouse users drag it (with inertia), touch users swipe
 * natively, and keyboard users can Tab into it and use the arrow keys.
 */
const DragScroller = forwardRef(function DragScroller({ children, className = '', label, ...rest }, outerRef) {
  const ref = useRef(null)
  const state = useRef({ down: false, moved: false, startX: 0, startScroll: 0, lastX: 0, lastT: 0, v: 0, raf: 0 })

  useEffect(() => {
    if (typeof outerRef === 'function') outerRef(ref.current)
    else if (outerRef) outerRef.current = ref.current
  }, [outerRef])

  useEffect(() => () => cancelAnimationFrame(state.current.raf), [])

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const s = state.current
    cancelAnimationFrame(s.raf)
    Object.assign(s, {
      down: true,
      moved: false,
      startX: e.clientX,
      startScroll: ref.current.scrollLeft,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
    })
  }

  const onPointerMove = (e) => {
    const s = state.current
    if (!s.down) return
    const dx = e.clientX - s.startX
    if (!s.moved && Math.abs(dx) > CLICK_THRESHOLD) {
      s.moved = true
      ref.current.setPointerCapture(e.pointerId)
      ref.current.classList.add('is-dragging')
    }
    if (!s.moved) return
    ref.current.scrollLeft = s.startScroll - dx
    const now = performance.now()
    const dt = Math.max(1, now - s.lastT)
    s.v = ((e.clientX - s.lastX) / dt) * 16 // px per frame
    s.lastX = e.clientX
    s.lastT = now
  }

  const end = (e) => {
    const s = state.current
    if (!s.down) return
    s.down = false
    ref.current.classList.remove('is-dragging')
    if (ref.current.hasPointerCapture?.(e.pointerId)) ref.current.releasePointerCapture(e.pointerId)
    if (!s.moved || prefersReducedMotion()) return
    const glide = () => {
      s.v *= DECAY
      ref.current.scrollLeft -= s.v
      if (Math.abs(s.v) > 0.4) s.raf = requestAnimationFrame(glide)
    }
    s.raf = requestAnimationFrame(glide)
  }

  // Swallow the click that follows a drag so cards don't open accidentally.
  const onClickCapture = (e) => {
    if (state.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      state.current.moved = false
    }
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={`drag-scroller overflow-x-auto ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
      onClickCapture={onClickCapture}
      onDragStart={(e) => e.preventDefault()}
      {...rest}
    >
      {children}
    </div>
  )
})

export default DragScroller
