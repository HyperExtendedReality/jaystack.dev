---
version: alpha
name: JayStack
description: A product-minded engineer's portfolio, built around an interactive software factory.
colors:
  primary: "#c8ff4a"
  background: "#10120f"
  foreground: "#f1f0e9"
  muted: "#92978b"
  surface: "#1b2017"
  contact-paper: "#e8ecdf"
  contact-ink: "#182019"
  contact-muted: "#53604d"
  contact-error: "#9a3029"
typography:
  sans:
    fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif'
  display:
    fontFamily: 'Georgia, "Times New Roman", serif'
  mono:
    fontFamily: '"Cascadia Code", "SFMono-Regular", Consolas, monospace'
rounded:
  panel: "20px"
  field: "9px"
  pill: "50px"
spacing:
  page-max: "1480px"
  desktop-gutter: "4.4%"
  mobile-gutter: "6%"
omitted:
  - section: components
    reason: Component states are documented below; runtime CSS is authoritative.
---

# JayStack Design System

## Overview

### Creative North Star

A miniature engineering workbench: thoughtful machinery turns an idea into a product. Retain the established lime, near-black, and green surfaces. The factory is the signature; supporting sections should make the work easy to inspect.

### Product context and register

Brand/content register. Recruiters, engineering teams, and potential collaborators need to understand Jay's range, inspect real projects, and make contact. English content; desktop and phone browsers. README.md and src/data/portfolio-knowledge.json provide the professional context. Avoid unsupported metrics, employment claims, or release claims for projects marked in development.

Runtime ownership: src/pages/portfolio.css is the canonical portfolio token source. Its .portfolio variables supply typography, dark surfaces, accent, and the light contact surface. This document mirrors that source; it does not generate CSS. src/index.css owns document scrollbars and reduced motion; src/components/portfolio-assistant.css owns Pip geometry. No external font requests or font loading shifts.

## Colors

The lime accent identifies primary actions, selected stages, and focus on dark surfaces. Foreground and muted text give two levels of hierarchy. Project illustrations retain their individual green, violet, and blue palettes. The contact surface is pale sage with dark green text and a darker focus outline. Errors always include text as well as color. Forced colors retains system-operable scrollbars.

## Typography

System sans for content and controls; Georgia italic for restrained emphasis in display headings; system monospace for categories and small technical captions. Desktop hero type is capped at 116px. Body copy is approximately 15–17px with generous leading; form inputs are 16px on phones. Technical labels are secondary, not the sole source of useful information.

## Layout

Shared 1480px maximum, 4.4% desktop gutters, 6% phone gutters. Two-column hero, project grid, expertise and contact become one column at 760px. The factory keeps a reserved frame while loading. Images sit in bounded artwork panels. Form errors reserve space below each field; busy buttons retain their dimensions. Document scrolling remains natural.

## Elevation & Depth

Subtle borders and tonal surfaces carry hierarchy. Three-dimensional factory and project art provide expression. Use shadows sparingly. The demo and assistant use native modal dialogs, with their own scrolling and background isolation.

## Shapes

20px panel corners, smaller field corners, pill actions. Circular icon controls remain at least 44px where changed. Keep the factory frame quiet so the artwork remains the focal point.

## Components

### Foundational visual states

Native links navigate, native buttons act. Hover reinforces affordances; keyboard focus uses a visible offset outline. Selected factory stages use text and state attributes alongside color. Disabled submission controls stay visibly unavailable. Delivery feedback remains inline.

### Buttons and actions

Lime primary action on dark surfaces; dark green primary action on contact paper. Secondary links have text labels. Keep status changes within the same button geometry. No invented response-time promises.

### Navigation and data display

Anchor navigation to work, about, expertise and contact. Mobile navigation focuses the first link when opened and restores the toggle on Escape. Project artwork and titles both link to source; project status stays visible. No filtering or pagination is needed for this small curated selection.

### Forms and overlays

Contact fields use labels, inline validation, aria-invalid, associated correction hints, and focus on the first error. Entered values survive failures, and direct email is always available. Preserve the existing EmailJS delivery integration. Test delivery only with a controlled stub or explicit approval for a real message. FungEye's native dialog locks background scrolling and restores its trigger on close.

### Iconography

Lucide icons, usually 15–20px, alongside action text. Purely decorative project art does not create extra focus stops.

### Motion

The factory is the main animated element. Keep existing pause, stage selection, and reduced-motion support. Scroll reveals are progressive enhancement. CSS animation and transitions respect prefers-reduced-motion; no information depends on animation.

Scroll choreography (scrollcraft/builds/jaystack/BRIEF.md): each section exposes one `--p` scroll progress from src/hooks/use-scroll-var.ts and portfolio.css does the math. Hero: four parallax planes (grid, outlined code braces, factory, code chips) plus pointer tilt. Work: the three project cards assemble from an exploded view with a build line; pinned at 300vh on desktop (`PIN_QUERY`), per-card on scroll elsewhere. About: heading wipe and turning orbits. Expertise: horizontal rail driven by vertical scroll on desktop (`PAN_QUERY`), a card grid otherwise. Contact: the paper panel rises and the headline lands line by line. Every transform sits under `prefers-reduced-motion: no-preference`; with reduced motion, nothing pins and every card shows its finished state. html/body use `overflow-x: clip` because `hidden` would break the sticky stages.

## Accessibility

Semantic headings, skip link, visible focus, readable contrast, useful link labels, keyboard-operable disclosure and dialogs. Pip becomes a compact labeled pill on phones to limit content obstruction. Reserve footer space for its floating launcher.
