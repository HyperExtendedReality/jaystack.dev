# JayStack

Full-stack software engineer with a product mindset, working across web platforms, mobile apps, applied AI, games, XR, and performance-minded systems.

I turn product ideas into working software across modern web applications, reliable backend systems, mobile products, production AI pipelines, real-time game systems, and interactive 3D experiences. My background includes model training and quantization, inference API delivery, full-stack product development, FiveM server infrastructure, React and TypeScript applications, Lua gameplay systems, database-backed tools, and performance-minded engineering across client and server environments.

## What I Do

- Build full-stack web applications with React, TypeScript, and modern frontend tooling
- Develop backend systems, APIs, database-driven features, and production workflows
- Train, fine-tune, quantize, and deploy AI models through reliable inference APIs
- Build cross-platform mobile apps and on-device machine-learning experiences
- Create FiveM resources, NUI interfaces, server systems, and gameplay infrastructure
- Design interactive experiences using 3D, motion, and game-focused technologies
- Improve performance, reliability, maintainability, and developer experience

## Featured Work

This portfolio highlights selected projects across software, web, and game development, including:

- Lead development for FiveM roleplay and infrastructure projects
- Open-source React Three Fiber physics libraries
- Mobile and web applications with modern UI systems
- Game tooling, server systems, and experimental software projects

## Core Technologies

React, TypeScript, JavaScript, Svelte, Lua, SQL, C#, C++, Rust, Python, Go, Tailwind CSS, Three.js, React Native, Node.js, TensorFlow, YOLO, MariaDB, MongoDB, PostgreSQL, and FiveM/NUI development.

## Professional Focus

I am interested in opportunities where strong engineering and thoughtful product development overlap. I enjoy roles that involve ownership, problem solving, system design, performance optimization, and building tools or experiences that people actually use.

I am especially well-suited for work involving:

- Full-stack application development
- AI/ML engineering, model optimization, and inference systems
- Mobile application development and on-device ML
- Frontend engineering and interface architecture
- Game, XR, or real-time interactive systems
- Backend and database-driven product features
- Developer tools, internal platforms, and technical product work

## Contact

Email: jaystack.dev@gmail.com  
GitHub: https://github.com/HyperExtendedReality  

## Run the portfolio locally

Install dependencies with `bun install`, then run `bun run dev` and open
`http://localhost:8080/jaystack.dev/`. The existing GitHub Pages base path is retained.
Run `bun run build` for a production build, `bun run lint` for lint checks, and
`bunx tsc -p tsconfig.app.json --noEmit` for type checking.

### Design and interaction

- `src/pages/portfolio.css` defines the editorial layout, responsive sizing, and 2D artwork.
- `src/components/AssemblyLine.tsx` builds the Three.js software factory. Scroll or select Design / Connect / Ship to move a product through articulated robot arms. It supports pointer tilt, pause, reduced motion, off-screen rendering suspension and GPU cleanup.
- `src/components/Projects.tsx` contains project copy and links, plus the keyboard-accessible FungEye demo dialog. The demo uses sample screens rather than live camera inference.
- `src/components/Skills.tsx` contains the expandable expertise panels.
- `src/components/Contact.tsx` retains the existing EmailJS contact integration. Local verification does not send real messages.
- Optimized WebP screenshots live alongside the original PNG assets.


### Pip, the portfolio assistant

Pip is the waving robot in the factory and the floating chat launcher. Its native
chat dialog supports keyboard focus, Escape, source links, short multi-turn
conversations and cancellation. Without an AI connection it explicitly shows
saved portfolio notes; those cards are not generated AI answers.

`src/data/portfolio-knowledge.json` is the reviewed knowledge supplied to the model
on every request. Update it when project descriptions or availability change.
`facts` is visible in reference cards; optional `constraints` guides the model.
Unknown salary, work authorization, dates, credentials and project metrics must
be referred to Jay. Prompt instructions reduce hallucinations but cannot guarantee
factual correctness; live model answers still need evaluation.

#### Local AI setup

1. Use Node 22 or newer for the chat commands. Install the existing dependencies.
2. Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY` locally. Never put
   the key in a `VITE_` variable or commit it. No new dependency is required.
3. Run `npm run chat:dev` in one terminal and `npm run dev` in another. Vite proxies
   `/api/chat` to port 8787. Open Pip; the header should say “AI connected”.
4. `npm run test:chat` tests validation, source mapping, errors and limits using a
   stubbed provider. It does not spend API credits or verify live answer quality.

The backend uses OpenAI's [Responses API](https://developers.openai.com/api/docs/guides/text)
with [structured output](https://developers.openai.com/api/docs/guides/structured-outputs),
`gpt-4.1-mini` by default, and `store: false`. The server holds the API key; the
browser receives only answer text and allowlisted source links. It does not log
or persist conversations. Messages are still sent to OpenAI for generation;
provider retention rules apply. Conversation state is held in the current tab.

#### Production with the existing GitHub Pages site

GitHub Pages continues to serve the static site. Deploy `server/chat.mjs` and the
knowledge JSON with the project dependencies to a Node-capable HTTPS host, using
`npm run chat:start`. Set server environment variables:

- `OPENAI_API_KEY` and optionally `OPENAI_MODEL`.
- `HOST=0.0.0.0` and the hosting platform's `PORT`.
- `CHAT_ALLOWED_ORIGINS` to the exact portfolio origin(s), separated by commas,
  with no path or trailing slash. The default only permits local development.

Set the GitHub repository variable `VITE_CHAT_API_URL` to the deployed HTTPS URL
ending in `/api/chat`, then rebuild the frontend. The workflow passes this public
URL into Vite. Do not add the API key to GitHub Pages build variables. Leave the
URL unset to retain reference-only mode.

The endpoint has 24 KB body limits, 1,200-character questions, a 20-second provider
timeout, four concurrent requests, 12 requests per 10 minutes per socket IP, and
120 total requests per hour per process. Forwarding headers are not trusted;
a reverse proxy therefore shares one IP quota. These are modest single-instance
limits, not authentication: configure provider spend limits and host-level abuse
protection before public use, and shared quotas if scaling to multiple replicas.

Before publishing, test real questions about FungEye, full-stack work, XR,
follow-up references, and unknown details such as salary. Confirm that it cites
supporting projects and does not invent a commercial XR release or credentials.
