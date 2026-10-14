// Four stroke directions (indexed by flow angle), then a cross for the densest cells.
const GLYPHS = ['-', '\\', '|', '/', '+']
const LEVELS = 8

/**
 * Canvas background of monospace glyphs whose direction follows a slowly drifting flow field,
 * with sparse bands between denser regions. Cells near the pointer brighten into the accent color.
 *
 * Glyphs are pre-rendered once per size into an atlas (one row per brightness level, plain and
 * accent variants side by side), so each frame is only drawImage calls on whole device pixels.
 * The field is a sum of sines of (column + row) phases; splitting each with sin(a + b) =
 * sin a·cos b + cos a·sin b keeps the trigonometry per row/column instead of per cell.
 */
export function createGlyphField(
  canvas,
  { cell = [9, 13], color = '161 161 170', accent = '167 139 250', maxAlpha = 0.6, fps = 24, radius = 150 } = {},
) {
  const ctx = canvas.getContext('2d')
  const atlas = document.createElement('canvas')
  const atlasCtx = atlas.getContext('2d')
  const pointer = { x: -1e4, y: -1e4 }
  // Cells fully under an opaque element (in CSS px, relative to the canvas) aren't drawn.
  let exclusion = null
  let cellW = 0
  let cellH = 0
  let cols = 0
  let rows = 0
  let dpr = 1
  let frame = 0
  let lastDraw = 0
  let running = false
  let colTerms = null
  let rowTerms = null

  const buildAtlas = () => {
    atlas.width = cellW * GLYPHS.length * 2
    atlas.height = cellH * LEVELS
    atlasCtx.clearRect(0, 0, atlas.width, atlas.height)
    atlasCtx.font = `${Math.round(cell[1] * 0.78 * dpr)}px "Geist Mono", ui-monospace, monospace`
    atlasCtx.textAlign = 'center'
    atlasCtx.textBaseline = 'middle'
    for (let level = 0; level < LEVELS; level++) {
      const alpha = (maxAlpha * (level + 1)) / LEVELS
      GLYPHS.forEach((glyph, i) => {
        const y = level * cellH + cellH / 2
        atlasCtx.fillStyle = `rgb(${color} / ${alpha})`
        atlasCtx.fillText(glyph, i * cellW + cellW / 2, y)
        atlasCtx.fillStyle = `rgb(${accent} / ${Math.min(1, alpha * 2.2)})`
        atlasCtx.fillText(glyph, (GLYPHS.length + i) * cellW + cellW / 2, y)
      })
    }
  }

  // Row phases don't depend on time, so they're computed once per size.
  const buildRowTerms = () => {
    rowTerms = Array.from({ length: rows }, (_, r) => {
      const ny = r * 0.11
      return {
        sinQ: Math.sin(-ny * 0.9),
        cosQ: Math.cos(-ny * 0.9),
        sinS: Math.sin(ny * 0.45),
        cosS: Math.cos(ny * 0.45),
        sinV: Math.sin(ny * 0.6),
        cosV: Math.cos(ny * 0.6),
        drift: ny * 1.3,
      }
    })
    colTerms = Array.from({ length: cols }, () => ({}))
  }

  const draw = (time) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const t = time * 0.001
    for (let c = 0; c < cols; c++) {
      const nx = c * 0.075
      const term = colTerms[c]
      term.sinP = Math.sin(nx * 0.55 + t * 0.13)
      term.cosP = Math.cos(nx * 0.55 + t * 0.13)
      term.sinR = Math.sin(nx * 0.21 - t * 0.09)
      term.cosR = Math.cos(nx * 0.21 - t * 0.09)
      term.sinU = Math.sin(nx * 0.6 + t * 0.11)
      term.cosU = Math.cos(nx * 0.6 + t * 0.11)
      term.flow = Math.sin(nx + t * 0.21)
    }

    const px = pointer.x * dpr
    const py = pointer.y * dpr
    const reach = radius * dpr
    const ex = exclusion && {
      left: Math.ceil((exclusion.x * dpr) / cellW),
      right: Math.floor(((exclusion.x + exclusion.width) * dpr) / cellW) - 1,
      top: Math.ceil((exclusion.y * dpr) / cellH),
      bottom: Math.floor(((exclusion.y + exclusion.height) * dpr) / cellH) - 1,
    }

    for (let r = 0; r < rows; r++) {
      const row = rowTerms[r]
      const rowFlow = Math.sin(row.drift - t * 0.17)
      const y = r * cellH
      const dy = y + cellH / 2 - py
      const rowNearPointer = Math.abs(dy) < reach
      const rowExcluded = ex && r >= ex.top && r <= ex.bottom

      for (let c = 0; c < cols; c++) {
        if (rowExcluded && c >= ex.left && c <= ex.right) continue
        const col = colTerms[c]
        const x = c * cellW

        let boost = 0
        if (rowNearPointer) {
          const dx = x + cellW / 2 - px
          if (Math.abs(dx) < reach) boost = Math.max(0, 1 - Math.hypot(dx, dy) / reach)
        }

        // Density bands: low values leave the cell empty.
        const band =
          0.6 * (col.sinP * row.cosQ + col.cosP * row.sinQ) + 0.4 * (col.sinR * row.cosS + col.cosR * row.sinS)
        if (band < -0.55 && boost < 0.2) continue

        const angle = col.flow + rowFlow + (col.sinU * row.cosV + col.cosU * row.sinV)
        const glyph = band > 0.55 ? 4 : Math.floor(((angle / 3 + 1) / 2) * 3.999)
        const base = Math.max(0, (band + 0.55) / 1.55)
        const level = Math.min(LEVELS - 1, Math.floor((0.25 + base * 0.6 + boost * 0.9) * LEVELS))
        const variant = boost > 0.35 ? GLYPHS.length : 0
        ctx.drawImage(atlas, (variant + glyph) * cellW, level * cellH, cellW, cellH, x, y, cellW, cellH)
      }
    }
  }

  const tick = (time) => {
    frame = requestAnimationFrame(tick)
    if (time - lastDraw < 1000 / fps) return
    lastDraw = time
    draw(time)
  }

  return {
    resize() {
      const { width, height } = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      cellW = Math.round(cell[0] * dpr)
      cellH = Math.round(cell[1] * dpr)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      cols = Math.ceil(canvas.width / cellW)
      rows = Math.ceil(canvas.height / cellH)
      buildAtlas()
      buildRowTerms()
      draw(lastDraw || performance.now())
    },
    /** Re-renders the atlas, e.g. once the monospace web font has loaded. */
    refresh() {
      buildAtlas()
      draw(lastDraw || performance.now())
    },
    setExclusion(rect) {
      exclusion = rect
    },
    setPointer(x, y) {
      pointer.x = x
      pointer.y = y
    },
    start() {
      if (running) return
      running = true
      frame = requestAnimationFrame(tick)
    },
    stop() {
      running = false
      cancelAnimationFrame(frame)
    },
  }
}
