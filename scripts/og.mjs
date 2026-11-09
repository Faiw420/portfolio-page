// Generates public/og.png (1200×630), the preview image shown when the site is shared.
// Run with `npm run og` after changing name, role or portrait, then commit the PNG.
import { readFile, writeFile } from 'node:fs/promises'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const font = (pkg, file) => readFile(new URL(`../node_modules/@fontsource/${pkg}/files/${file}`, import.meta.url))
const [sans400, sans600, mono400, portrait] = await Promise.all([
  font('geist-sans', 'geist-sans-latin-400-normal.woff'),
  font('geist-sans', 'geist-sans-latin-600-normal.woff'),
  font('geist-mono', 'geist-mono-latin-400-normal.woff'),
  readFile(new URL('../public/assets/me.jpeg', import.meta.url))
])

const C = { bg: '#fcfcfb', fg: '#18181b', muted: '#52525b', faint: '#71717a', line: '#e7e7e4', accent: '#2563eb' }
const h = (type, style, ...children) => ({ type, props: { style: { display: 'flex', ...style }, children } })
const text = (s, style) => h('div', style, s)

const bars = [38, 52, 46, 70, 64, 88, 110].map((height, i) =>
  h('div', { width: 22, height, borderRadius: 4, background: C.accent, opacity: 0.35 + i * 0.1 })
)

const tree = h(
  'div',
  // satori adds padding outside width/height: 1040 + 2×80 = 1200, 486 + 2×72 = 630
  { width: 1040, height: 486, background: C.bg, padding: '72px 80px', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Geist' },
  h(
    'div',
    { width: 1040, justifyContent: 'space-between', alignItems: 'flex-start' },
    h(
      'div',
      { flexDirection: 'column', gap: 18 },
      text('Mannheim, Germany', { fontFamily: 'Geist Mono', fontSize: 24, color: C.faint }),
      text('Tim Darmstaedter', { fontSize: 84, fontWeight: 600, color: C.fg, letterSpacing: -3, lineHeight: 1 }),
      text('Data Analyst · M.Sc. Data Science', { fontSize: 36, color: C.muted })
    ),
    {
      type: 'img',
      props: {
        src: `data:image/jpeg;base64,${portrait.toString('base64')}`,
        width: 200,
        height: 200,
        style: { flexShrink: 0, borderRadius: 32, width: 200, height: 200, objectFit: 'cover', border: `2px solid ${C.line}` }
      }
    }
  ),
  h(
    'div',
    { width: 1040, justifyContent: 'space-between', alignItems: 'flex-end', borderTop: `2px solid ${C.line}`, paddingTop: 36 },
    text('Power BI · SQL · Python', { fontFamily: 'Geist Mono', fontSize: 28, color: C.muted }),
    h('div', { alignItems: 'flex-end', gap: 10 }, ...bars)
  )
)

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: 'Geist', data: sans400, weight: 400 },
    { name: 'Geist', data: sans600, weight: 600 },
    { name: 'Geist Mono', data: mono400, weight: 400 }
  ]
})
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng()
await writeFile(new URL('../public/og.png', import.meta.url), png)
console.log(`public/og.png written (${(png.length / 1024).toFixed(0)} KB)`)
