# F1-PPT Slides Application Setup Plan

## Context

Create a modern slides/presentation application using Next.js 16.1.6 and React 19. The user wants to:
1. Import initial slide designs from Figma and convert to React components
2. Create bulk slide content using Markdown files
3. Navigate presentations with keyboard (left/right arrows)
4. Export presentations to PDF

This is a personal presentation tool focused on simplicity - no authentication, collaboration, or complex features in MVP.

## Tech Stack

- Next.js 16.1.6 (App Router)
- React 19
- TypeScript 5.9.3
- Tailwind v4
- Playwright 1.58.2
- Turborepo 2.8.2
- pnpm 10.28.2
- MCP Servers: Figma Desktop MCP, Playwright MCP

## Project Structure

Simplified monorepo with core slide logic separated from UI:

```
F1-PPT/
├── .claude/
│   └── CLAUDE.md                   # Project documentation (optional)
├── package.json                    # Root with Turborepo
├── pnpm-workspace.yaml
├── turbo.json
├── app/                            # Main Next.js app
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── playwright.config.ts
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── slides/[id]/page.tsx   # Slide viewer
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   └── slides/
│   │       ├── SlideViewer.tsx    # Core viewer component
│   │       └── MDSlide.tsx        # Markdown slide renderer
│   ├── lib/
│   │   ├── utils.ts
│   │   └── pdf-export.ts          # PDF export logic
│   ├── data/
│   │   └── slides/                # Markdown slide files
│   └── public/
├── packages/
│   └── slides-core/               # Shared slide types & utilities
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── types.ts           # Slide interfaces
│           ├── keyboard.ts        # Navigation logic
│           └── markdown.ts        # MD parser
└── .gitignore
```

## Critical Files

1. **app/components/slides/SlideViewer.tsx** - Main slide rendering with keyboard navigation
2. **app/lib/pdf-export.ts** - PDF export functionality
3. **packages/slides-core/src/markdown.ts** - Markdown to slide parser
4. **app/app/globals.css** - Tailwind v4 configuration and slide styles
5. **app/data/slides/** - Markdown content storage

## Implementation Steps

### Phase 1: Project Initialization

1. **Initialize project structure**
   ```bash
   cd /Users/arneshmandal/Documents/Projects/F1-PPT
   git init
   ```

2. **Create configuration files**
   - `package.json` - Root package with Turborepo 2.8.2
   - `pnpm-workspace.yaml` - Workspace config
   - `turbo.json` - Turborepo build pipeline
   - `.gitignore` - Standard Next.js + pnpm ignores
   - **Note**: MCP config goes in `/Users/arneshmandal/.claude.json`, not in project

3. **Create directory structure**
   ```bash
   mkdir -p .claude
   mkdir -p app/{app/{slides,api},components/{ui,slides},lib,data/slides,public}
   mkdir -p packages/slides-core/src
   ```

4. **Install root dependencies**
   ```bash
   pnpm install
   ```

### Phase 2: Next.js App Setup

5. **Configure app/package.json**
   - Dependencies: next@16.1.6, react@^19.0.0, react-dom@^19.0.0
   - Additional: framer-motion, @tailwindcss/postcss@^4.1.18, tailwindcss@^4.1.18
   - MDX: @next/mdx, @mdx-js/loader, @mdx-js/react
   - PDF: html2canvas, jspdf
   - Dev: typescript@5.9.3, @playwright/test@^1.58.2

6. **Configure TypeScript**
   - `app/tsconfig.json` - Next.js App Router config
   - Path aliases: `@/*` for app, `@slides/core` for packages

7. **Configure Next.js**
   - `app/next.config.ts` - MDX support, transpilePackages
   - Enable static export option for presentations

8. **Configure Tailwind v4**
   - `app/postcss.config.js` - @tailwindcss/postcss plugin
   - `app/app/globals.css` - Tailwind imports + slide theme tokens

9. **Install dependencies**
   ```bash
   cd app && pnpm install
   ```

### Phase 3: Slides Core Package

10. **Configure packages/slides-core/package.json**
    - Minimal dependencies, TypeScript only

11. **Create type definitions** (`packages/slides-core/src/types.ts`)
    ```typescript
    interface Slide {
      id: string
      content: string | React.ReactNode
      background?: string
      notes?: string
    }

    interface SlideDeck {
      id: string
      title: string
      slides: Slide[]
    }
    ```

12. **Create keyboard controller** (`packages/slides-core/src/keyboard.ts`)
    - Listen for ArrowLeft, ArrowRight, Home, End, Escape
    - Call handlers for next/prev/first/last slide

13. **Create markdown parser** (`packages/slides-core/src/markdown.ts`)
    - Parse MD files with `---` separator between slides
    - Extract frontmatter (title, background, notes)
    - Convert markdown to HTML/React

14. **Install package dependencies**
    ```bash
    cd packages/slides-core && pnpm install
    ```

### Phase 4: shadcn/ui Setup

15. **Initialize shadcn**
    ```bash
    cd app
    pnpm dlx shadcn@latest init
    # Select: TypeScript, Default style, Slate color, CSS variables, @/components
    ```

16. **Install essential components**
    ```bash
    pnpm dlx shadcn@latest add button card progress
    ```

### Phase 5: Core Components

17. **Create SlideViewer component** (`app/components/slides/SlideViewer.tsx`)
    - Accept `slides: Slide[]` prop
    - Manage current slide index state
    - Integrate keyboard navigation from @slides/core
    - Render current slide with framer-motion transitions
    - Show slide counter (e.g., "3 / 12")

18. **Create MDSlide component** (`app/components/slides/MDSlide.tsx`)
    - Accept parsed markdown content
    - Render with proper typography classes
    - Support code highlighting (if needed)

19. **Create PDF export utility** (`app/lib/pdf-export.ts`)
    - Use html2canvas to capture each slide as image
    - Combine into PDF with jspdf
    - Export with proper dimensions (16:9 aspect ratio)

### Phase 6: Pages & Routing

20. **Create home page** (`app/app/page.tsx`)
    - List available presentations
    - Links to each slide deck

21. **Create slide viewer page** (`app/app/slides/[id]/page.tsx`)
    - Load slide deck by ID (from markdown files)
    - Render SlideViewer component
    - Add export to PDF button

22. **Create layout** (`app/app/layout.tsx`)
    - Load Google Fonts (Inter, Fira Code)
    - Apply global styles

### Phase 7: MCP Configuration

23. **Configure MCP servers in `/Users/arneshmandal/.claude.json`**

    MCP servers are configured in the global `.claude.json` file, NOT in the project directory.

    Add the following to the F1-PPT project's `mcpServers` section in `.claude.json`:

    ```json
    "projects": {
      "/Users/arneshmandal/Documents/Projects/F1-PPT": {
        "mcpServers": {
          "figma-desktop": {
            "type": "http",
            "url": "http://127.0.0.1:3845/mcp"
          },
          "playwright": {
            "type": "stdio",
            "command": "npx",
            "args": ["@playwright/mcp@latest"],
            "env": {
              "HEADLESS": "true"
            }
          }
        }
      }
    }
    ```

    **Note**: This configuration already exists for bajaj-flux project as a reference.

24. **Verify MCP servers are available**
    - Test Figma Desktop MCP: `mcp__figma-desktop__get_screenshot`
    - Test Playwright MCP: `mcp__playwright__browser_navigate`
    - Both should be accessible once configured in `.claude.json`

### Phase 8: Sample Content & Testing

25. **Create sample markdown slides** (`app/data/slides/demo.md`)
    ```markdown
    ---
    title: Demo Presentation
    ---

    # Welcome to F1-PPT

    ---

    ## Built with Next.js 16

    ---

    ## Powered by React 19
    ```

26. **Configure Playwright** (`app/playwright.config.ts`)
    - Test directory: `./tests`
    - Output: `./test-output`
    - Base URL: http://localhost:3000

27. **Create basic test** (`app/tests/slides.spec.ts`)
    - Navigate to /slides/demo
    - Test keyboard navigation
    - Verify slide transitions
    - Screenshot each slide

### Phase 9: Figma Integration Workflow

28. **Import first slides from Figma**
    - User provides Figma URL with slide designs
    - Use `mcp__figma-desktop__get_design_context` to extract design
    - Convert Figma design to React components
    - Use as template for subsequent markdown slides

29. **Create slide templates**
    - Based on Figma designs, create reusable React components
    - Store in `app/components/slides/templates/`
    - Reference in markdown files for consistent styling

## Installation Command Sequence

```bash
# 1. Navigate to project
cd /Users/arneshmandal/Documents/Projects/F1-PPT

# 2. Initialize git
git init

# 3. Create all directories
mkdir -p .claude app/{app/{slides,api},components/{ui,slides},lib,data/slides,public} packages/slides-core/src

# 4. Create all configuration files (via Write tool)

# 5. Install root dependencies
pnpm install

# 6. Install app dependencies
cd app && pnpm install

# 7. Install package dependencies
cd ../packages/slides-core && pnpm install

# 8. Return to root
cd /Users/arneshmandal/Documents/Projects/F1-PPT

# 9. Initialize shadcn/ui
cd app && pnpm dlx shadcn@latest init

# 10. Add shadcn components
pnpm dlx shadcn@latest add button card progress

# 11. Verify setup
cd .. && pnpm turbo build --dry-run

# 12. Start dev server
pnpm dev
```

## Dependencies Summary

**Root:**
- turbo@^2.8.2

**app:**
- next@16.1.6, react@^19.0.0, react-dom@^19.0.0
- @tailwindcss/postcss@^4.1.18, tailwindcss@^4.1.18, postcss@^8.5.6
- framer-motion@^12.1.0 (transitions)
- @next/mdx, @mdx-js/loader, @mdx-js/react (markdown)
- html2canvas@^1.4.1, jspdf@^2.5.2 (PDF export)
- class-variance-authority, clsx, tailwind-merge (utilities)
- lucide-react (icons)
- shadcn@^3.8.4
- Dev: typescript@5.9.3, @playwright/test@^1.58.2, @types/*

**packages/slides-core:**
- Dev only: typescript@5.9.3, @types/node

## Verification Steps

After setup, verify:

1. **Dependencies installed**: `pnpm install` completes without errors
2. **TypeScript compiles**: `pnpm --filter app tsc --noEmit`
3. **Dev server starts**: `pnpm dev` and navigate to http://localhost:3000
4. **Tailwind works**: Check styles on home page
5. **Slides render**: Navigate to /slides/demo
6. **Keyboard navigation**: Arrow keys change slides
7. **PDF export**: Export button generates PDF
8. **Tests run**: `pnpm --filter app test`
9. **MCP servers**:
   - Verify configuration in `/Users/arneshmandal/.claude.json`
   - Both Figma and Playwright MCPs should be accessible in Claude Code
   - Test with `mcp__figma-desktop__get_screenshot` and `mcp__playwright__browser_navigate`

## Post-Setup Next Steps

1. **Get Figma slide designs**: User provides Figma URL for initial slides
2. **Extract with Figma MCP**: Use `mcp__figma-desktop__get_design_context`
3. **Convert to React templates**: Create reusable slide components
4. **Create markdown content**: Write slides in `app/data/slides/`
5. **Test with Playwright**: Verify navigation and rendering
6. **Export to PDF**: Test PDF generation functionality
7. **Polish styling**: Fine-tune Tailwind theme and transitions

## Key Design Decisions

- **Monorepo**: Simplified structure vs bajaj-flux, focused on slides functionality
- **Content**: Hybrid approach - Figma for templates, Markdown for content
- **Navigation**: Simple arrow key controls, no fancy gestures in MVP
- **Export**: PDF generation via html2canvas + jspdf
- **Styling**: Tailwind v4 with custom slide theme tokens
- **No auth**: Personal use, shared via static export if needed
- **No database**: File-based markdown storage for simplicity

## Reference Files from Plan Agent

All configuration files detailed in plan agent output sections 2.1-2.20, including:
- package.json files (root, app, packages)
- tsconfig.json files
- Tailwind & PostCSS configs
- Next.js config
- Playwright config
- MCP config
- Sample component code
