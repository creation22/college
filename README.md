# college

Premium, cinematic redesign of the official PCFSM website — Parmanand College of Fire Engineering & Safety Management (https://pcfsm.org/).

Dark, industrial design system — fire orange on near-black, huge Archivo typography, WebGL 3D, and scroll-driven storytelling. All content (programs, centers, placements, facilities, contact) is sourced from the existing pcfsm.org website.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- React Three Fiber + Three.js
- GSAP ScrollTrigger
- Motion (Framer Motion)
- Lenis smooth scrolling

## Project

```
pcfsm/
  src/
    app/          # layout, page, globals.css (design tokens)
    components/   # all homepage sections + shared UI primitives
    lib/          # content data (source of truth: pcfsm.org) + hooks
    three/        # R3F scenes — hero sculpture, industrial safety corridor
  public/images/  # real PCFSM imagery, optimized to WebP
```

## Run

```bash
cd pcfsm
npm install
npm run dev     # develop
npm run build   # production build
npm start       # serve
```

---

DESIGNED FOR THE PEOPLE WHO PROTECT THE WORLD.
