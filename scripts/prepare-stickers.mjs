/**
 * Turns the images in /sticker-originals into die-cut stickers for the intro.
 *
 *   npm run stickers
 *
 * For each image it:
 *   1. removes the plain white/light background (flood-fill from the edges),
 *   2. trims and resizes it,
 *   3. adds an even white sticker outline,
 *   4. saves it as a small transparent .webp in /public/assets/stickers/.
 * It then writes src/data/stickers.json, which the intro reads.
 *
 * Runs automatically before `npm run dev` and `npm run build`. Images that are
 * already processed (and unchanged) are skipped, so it is quick.
 */
import sharp from 'sharp'
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const SRC = join(ROOT, 'sticker-originals')
const OUT = join(ROOT, 'public', 'assets', 'stickers')
const MANIFEST = join(ROOT, 'src', 'data', 'stickers.json')

const MAX_SIZE = 520 // longest side of the artwork, in px
const OUTLINE = 12 // white outline thickness, in px

const slug = (name) =>
  basename(name, extname(name))
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40)
    .replace(/-+$/, '') || 'sticker'

/** Flood-fills light, low-saturation pixels connected to the image border. */
function removeBackground(data, width, height) {
  const isBg = (p) => {
    const r = data[p], g = data[p + 1], b = data[p + 2]
    const mn = Math.min(r, g, b)
    const mx = Math.max(r, g, b)
    return mn >= 160 && mx - mn <= 22
  }
  const seen = new Uint8Array(width * height)
  const stack = []
  const push = (x, y) => {
    const i = y * width + x
    if (seen[i]) return
    seen[i] = 1
    if (isBg(i * 4)) stack.push(i)
  }
  for (let x = 0; x < width; x++) {
    push(x, 0)
    push(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    push(0, y)
    push(width - 1, y)
  }
  while (stack.length) {
    const i = stack.pop()
    data[i * 4 + 3] = 0
    const x = i % width
    const y = (i - x) / width
    if (x > 0) push(x - 1, y)
    if (x < width - 1) push(x + 1, y)
    if (y > 0) push(x, y - 1)
    if (y < height - 1) push(x, y + 1)
  }
}

async function processImage(file, outFile) {
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  removeBackground(data, info.width, info.height)

  const cut = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer()
  const art = await sharp(cut)
    .trim({ threshold: 1 })
    .resize({ width: MAX_SIZE, height: MAX_SIZE, fit: 'inside', withoutEnlargement: true })
    .extend({ top: OUTLINE + 4, bottom: OUTLINE + 4, left: OUTLINE + 4, right: OUTLINE + 4, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer({ resolveWithObject: true })

  const { width, height } = art.info
  // Grow the silhouette to make the white outline
  const mask = await sharp(art.data)
    .extractChannel(3)
    .blur(OUTLINE * 0.5)
    .threshold(4)
    .blur(0.8)
    .raw()
    .toBuffer()
  const white = Buffer.alloc(width * height * 4, 255)
  for (let i = 0; i < width * height; i++) white[i * 4 + 3] = mask[i]

  await sharp(white, { raw: { width, height, channels: 4 } })
    .composite([{ input: art.data }])
    .webp({ quality: 86, alphaQuality: 90, effort: 5 })
    .toFile(outFile)

  return { width, height }
}

if (!existsSync(SRC)) {
  console.log('[stickers] no sticker-originals/ folder, keeping existing stickers')
  process.exit(0)
}

const sources = readdirSync(SRC)
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  .sort()

if (!sources.length) {
  console.log('[stickers] sticker-originals/ is empty, keeping existing stickers')
  process.exit(0)
}

mkdirSync(OUT, { recursive: true })
const manifest = []
const used = new Set()

for (const f of sources) {
  const base = slug(f)
  let name = base
  for (let n = 2; used.has(name); n++) name = `${base}-${n}`
  used.add(name)
  const input = join(SRC, f)
  const output = join(OUT, `${name}.webp`)
  const fresh = existsSync(output) && statSync(output).mtimeMs >= statSync(input).mtimeMs
  let size
  if (fresh) {
    size = await sharp(output).metadata()
  } else {
    size = await processImage(input, output)
    console.log(`[stickers] ✓ ${f}`)
  }
  manifest.push({ src: `assets/stickers/${name}.webp`, ratio: +(size.height / size.width).toFixed(4) })
}

// Remove stickers whose originals were deleted
for (const f of readdirSync(OUT)) {
  if (f.endsWith('.webp') && !used.has(basename(f, '.webp'))) rmSync(join(OUT, f))
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`[stickers] ${manifest.length} stickers ready`)
