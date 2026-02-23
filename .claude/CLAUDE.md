# F1-PPT

F1-themed slide tool. Slides are React Server Components built from Figma designs, content from YAML.

## Stack
Next.js 16.1.6 · React 19 · TypeScript · Tailwind v4 (`@theme` in `globals.css`, no config file) · pnpm

## Key paths
```
app/app/globals.css              # all tokens (@theme), fonts, .slide, typography
app/app/page.tsx                 # Slide One entry point
app/components/slides/           # SlideBackground, SlideHeader, Divider
app/data/slides/slide-one.yaml   # editable content for Slide One
app/lib/slides.ts                # getSlideData<T>(name) — server-only YAML reader
app/public/fonts/                # Formula1 (400/700/900), Michroma, Rubik (variable)
app/public/                      # slide-noise.png, slide-grid.svg, divider.svg
```

`@/*` → `app/*`

## Slide anatomy
```tsx
<div className="slide">           // full-screen, gradient bg, overflow hidden
  <SlideBackground />             // noise + grid layers (z 1–2)
  <SlideHeader title={...} />     // h1 + divider, absolute top-0, z-3, h-83px
  <div className="slide-content"> // main content, z-3
    ...
  </div>
</div>
```
Content comes from `getSlideData<T>('slide-one')` in the Server Component.
Never hardcode values — always use `@theme` tokens from `globals.css`.

## Figma workflow
1. Select frame → `mcp__figma-desktop__get_design_context` + `get_screenshot`
2. If URL provided → use `mcp__claude_ai_Figma__get_design_context`
3. Map all values to existing tokens. Add new tokens to `@theme` if needed.
