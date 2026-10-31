import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { ArrowUpRight } from "lucide-react";
import {
  SiAngular, SiDjango, SiDocker, SiDrizzle, SiGraphql, SiHtml5, SiHtmx, SiJavascript, SiMedusa, SiNextdotjs, SiPayloadcms,
  SiPostgresql, SiPython, SiReact, SiReactquery, SiReactrouter, SiRedis, SiRubyonrails, SiShopify, SiSqlite, SiStrapi,
  SiTypescript, SiZod,
} from "react-icons/si";
import orbitWorkspace from "../assets/projects/orbit-workspace.webp";
import orbitRevenue from "../assets/projects/orbit-revenue.webp";
import peopleflow from "../assets/projects/peopleflow.webp";
import stockroom from "../assets/projects/stockroom.webp";
import meridian from "../assets/projects/meridian.webp";
import atelier from "../assets/projects/atelier.webp";
import glow from "../assets/projects/glow.webp";
import summit from "../assets/projects/summit.webp";
import still from "../assets/projects/still.webp";

export type Tech = [name: string, Icon: IconType, color: string];
type Build = { title: string; kicker: string; summary: string; image: string; alt: string; accent: string; stack: Tech[]; demo?: string; address: string };

const base = import.meta.env.BASE_URL;
const builds: Build[] = [
  {
    title: "Orbit Workspace", kicker: "RUBY ON RAILS API + REACT", accent: "#c9b6e4", image: orbitWorkspace, demo: `${base}demos/orbit-workspace/`, address: "orbit / overview",
    alt: "Orbit Workspace overview with project cards, progress and focused work",
    summary: "A project command center for independent creatives: projects, tasks, a work board and an activity stream, with optimistic updates, Ctrl/Cmd+K search, and Rails plus Vitest test suites.",
    stack: [["Ruby on Rails", SiRubyonrails, "#D30001"], ["React 19", SiReact, "#61DAFB"], ["TypeScript", SiTypescript, "#3178C6"], ["TanStack Query", SiReactquery, "#FF4154"], ["SQLite", SiSqlite, "#7CC4E8"], ["Docker", SiDocker, "#2496ED"]],
  },
  {
    title: "Stockroom", kicker: "PYTHON + DJANGO + HTMX", accent: "#8f84ff", image: stockroom, address: "stockroom / overview",
    alt: "Stockroom warehouse dashboard with inventory totals and a restock queue",
    summary: "Warehouse inventory on server-rendered Django templates: live HTMX search and filters, replenishment alerts, a persistent catalog, and a product entry form.",
    stack: [["Python", SiPython, "#3776AB"], ["Django", SiDjango, "#44B78B"], ["HTMX", SiHtmx, "#5C8DF6"], ["SQLite", SiSqlite, "#7CC4E8"]],
  },
  {
    title: "Orbit Revenue", kicker: "ANGULAR SAAS CONCEPT", accent: "#7c6cff", image: orbitRevenue, demo: `${base}demos/orbit-revenue/`, address: "orbit.revenue",
    alt: "Orbit Revenue landing page reading Turn signals into revenue",
    summary: "A customer-success SaaS concept with a marketing story, a sample workspace, and an account review flow: search, health filters and sorting. All accounts are fictional.",
    stack: [["Angular 20", SiAngular, "#DD0031"], ["TypeScript", SiTypescript, "#3178C6"]],
  },
  {
    title: "PeopleFlow", kicker: "VANILLA HTML, CSS & JS", accent: "#b9d96a", image: peopleflow, demo: `${base}demos/peopleflow/`, address: "peopleflow / overview",
    alt: "PeopleFlow HRM overview with team stats, a growth chart and onboarding",
    summary: "An HRM dashboard for growing teams: people, time off and hiring in one dependency-free page. No framework, no build step, just the platform.",
    stack: [["HTML", SiHtml5, "#E34F26"], ["JavaScript", SiJavascript, "#F7DF1E"]],
  },
  {
    title: "Meridian CMS", kicker: "SECURE HEADLESS COMMERCE", accent: "#6f63ff", image: meridian, address: "meridian / sign-in",
    alt: "Meridian CMS sign-in screen beside a revenue preview",
    summary: "A headless commerce CMS with a versioned Storefront API. Argon2id passwords, hashed revocable sessions, role-based access, login throttling and audit logging.",
    stack: [["Next.js", SiNextdotjs, "#F1F0E9"], ["TypeScript", SiTypescript, "#3178C6"], ["PostgreSQL", SiPostgresql, "#4169E1"], ["Drizzle ORM", SiDrizzle, "#C5F74F"], ["Zod", SiZod, "#408AFF"]],
  },
];

const stores: { name: string; platform: string; Icon: IconType; image: string }[] = [
  { name: "Atelier", platform: "Strapi 5", Icon: SiStrapi, image: atelier },
  { name: "Glow Dept.", platform: "Payload 3", Icon: SiPayloadcms, image: glow },
  { name: "Summit Supply", platform: "Medusa 2", Icon: SiMedusa, image: summit },
  { name: "Still Coffee", platform: "Shopify Hydrogen", Icon: SiShopify, image: still },
];
const commerceStack: Tech[] = [["Next.js 16", SiNextdotjs, "#F1F0E9"], ["React Router 7", SiReactrouter, "#F44250"], ["GraphQL", SiGraphql, "#E10098"], ["PostgreSQL", SiPostgresql, "#4169E1"], ["Redis", SiRedis, "#FF4438"], ["Docker", SiDocker, "#2496ED"]];

export function Stack({ items }: { items: Tech[] }) {
  return (
    <ul className="build-stack" aria-label="Built with">
      {items.map(([name, Icon, color]) => <li key={name} style={{ "--c": color } as CSSProperties}><Icon aria-hidden="true" />{name}</li>)}
    </ul>
  );
}

// Mouse-only tilt; touch and reduced-motion visitors get the flat card.
function tilt(event: React.PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const box = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--tx", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
  event.currentTarget.style.setProperty("--ty", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
}
const untilt = (event: React.PointerEvent<HTMLElement>) => { event.currentTarget.style.removeProperty("--tx"); event.currentTarget.style.removeProperty("--ty"); };

export default function Builds() {
  return (
    <div className="builds">
      <div className="builds-heading">
        <h3>Full-stack builds, <em>every layer.</em></h3>
        <p>Ruby, Python, TypeScript and plain JavaScript, each paired with the framework that suits the job. Live demos run on sample data in your browser.</p>
      </div>
      <div className="builds-grid">
        {builds.map((build) => (
          <article key={build.title} className="build-card-lg" style={{ "--accent": build.accent } as CSSProperties} onPointerMove={tilt} onPointerLeave={untilt}>
            <div className="browser-frame">
              <div className="browser-bar" aria-hidden="true"><i /><i /><i /><span>{build.address}</span></div>
              <img src={build.image} alt={build.alt} loading="lazy" width="1200" height="750" />
            </div>
            <div className="build-body">
              <span className="mono eyebrow">{build.kicker}</span>
              <h4>{build.title}</h4>
              <p>{build.summary}</p>
              <Stack items={build.stack} />
              {build.demo
                ? <a className="build-demo" href={build.demo} target="_blank" rel="noreferrer">Open live demo <ArrowUpRight size={16} /><span className="sr-only"> (opens in a new tab)</span></a>
                : <span className="build-local mono">SCREENS FROM A LOCAL BUILD</span>}
            </div>
          </article>
        ))}
      </div>
      <article className="commerce-lab">
        <div className="commerce-copy">
          <span className="mono eyebrow">COMMERCE LAB</span>
          <h4>Four storefronts. <em>Four platforms.</em></h4>
          <p>Production-shaped commerce demos, each with its own brand, data integration and setup guide: a Strapi content backend, Payload embedded in Next.js, a Medusa server with its admin, and Shopify Hydrogen on the Oxygen runtime. Every store falls back to a preview catalog until its backend is connected.</p>
          <Stack items={commerceStack} />
        </div>
        <ul className="commerce-mosaic">
          {stores.map(({ name, platform, Icon, image }) => (
            <li key={name}>
              <img src={image} alt={`${name} storefront home page`} loading="lazy" width="1200" height="750" />
              <span><Icon aria-hidden="true" /><b>{name}</b> {platform}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
