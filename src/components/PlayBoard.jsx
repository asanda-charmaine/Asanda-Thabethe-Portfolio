import { useLayoutEffect, useRef } from 'react'
import { stickers } from '../data/content'
import { Draggable, gsap } from '../lib/motion'
import DragHint from './DragHint'

const colors = {
  terracotta: 'bg-terracotta text-paper',
  butter: 'bg-butter',
  sage: 'bg-sage',
  blush: 'bg-blush',
  sky: 'bg-sky',
  sand: 'bg-sand',
}

/** A dotted "canvas" of stickers you can drag around (GSAP Draggable). */
export default function PlayBoard() {
  const board = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.sticker', board.current)
      Draggable.create(items, {
        bounds: board.current,
        zIndexBoost: true,
        onPress() {
          gsap.to(this.target, { scale: 1.12, rotate: '+=4', duration: 0.25, ease: 'back.out(3)' })
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.45)' })
        },
      })
    }, board)
    return () => ctx.revert()
  }, [])

  return (
    <div className="mx-auto max-w-[920px] px-4 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-hand text-2xl text-ink-soft">a little playground, move things around</p>
        <DragHint mouse="Drag the stickers" touch="Drag the stickers" />
      </div>
      <div
        ref={board}
        data-reveal
        aria-label="Decorative sticker board. Stickers can be dragged with a mouse or finger."
        role="group"
        className="play-board relative h-[400px] overflow-hidden rounded-[22px] border border-line sm:h-[340px]"
      >
        {stickers.map((s, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={`sticker sticker--${s.shape} ${colors[s.color] ?? 'bg-sand'}`}
            style={{
              left: `min(${s.x}%, calc(100% - 130px))`,
              top: `min(${s.y}%, calc(100% - 100px))`,
              rotate: `${s.rotate}deg`,
            }}
          >
            {s.text}
          </div>
        ))}
      </div>
    </div>
  )
}
