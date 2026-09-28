# Budge Dictionary — Raw Extraction (sprite-packed)

Provisional dataset extracted from both volumes of E. A. Wallis Budge's *An Egyptian Hieroglyphic
Dictionary* (1067 scanned pages total, both columns per page).

## Contents — only 32 files total, no git needed

- `entries.json` — 29,188 entries, one per dictionary entry (re-segmented and hand-checked; Vol. II re-rendered from the PDF at higher resolution).
- `sheets/` — **29 sprite-sheet JPEGs** (each 7–14MB). Every entry's little crop is packed into one
  of these instead of being its own file, purely so this is easy to upload — GitHub's web "Add file →
  Upload files" page handles 32 files fine; it could never handle 37,000.
- `index.html` — a static search/browse page. Works as-is once hosted, no build step.

Each `entries.json` record now looks like:
```json
{
  "id": "bk0003L0",
  "book": 3,
  "vol": "v1",
  "pdf_page": 158,
  "text": "raw OCR text for this entry",
  "sheet": 0,
  "sx": 552, "sy": 2206, "sw": 532, "sh": 388
}
```
`sheet` is the index into `sheets/sheet_NNN.jpg`; `sx,sy,sw,sh` is the pixel rectangle within that
sheet holding this entry's crop. `index.html` renders it with a plain CSS
`background-position` trick — no canvas, no JS image slicing library.

## How to publish this (no git required)

1. Go to `https://github.com/rennefer/H-Sv3`.
2. Delete the existing files (old backup, per rennefer — confirmed OK to remove).
3. **Add file → Upload files**, then drag in all 32 files from this folder (`entries.json`,
   `index.html`, `README.md`, and the 29 files inside `sheets/` — keep the `sheets` folder structure,
   most browsers preserve it when you drag the whole folder in).
4. Commit.
5. If GitHub Pages is enabled on the repo, it's live at `https://rennefer.github.io/H-Sv3/` within a
   minute or two.

## Status

This is **raw pipeline output**, not a verified dictionary:

- OCR quality is uneven, especially where hieroglyphic signs, transliteration diacritics, Coptic,
  and Latin text are interleaved on the same line — expect garbled fragments in `text`.
- Entries were segmented automatically by a hanging-indent/column heuristic; occasionally two
  entries may be merged or one entry split across two records.
- No headword, transliteration, or definition has been individually parsed out of the raw text yet,
  and none of this has been checked against the real printed book (unlike the companion Moldenke
  glossary work, which went through a full page-by-page verification pass).

Use `index.html`'s search as a way to locate a word's likely page and eyeball the crop, not as a
citation-accurate reference yet.
