import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiAngular, SiCplusplus, SiDjango, SiDocker, SiDotnet, SiGo, SiGraphql, SiJavascript, SiLua, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiPython, SiReact, SiRubyonrails, SiRuby, SiRust, SiShopify, SiSvelte, SiTensorflow, SiThreedotjs,
  SiTypescript, SiWebassembly,
} from "react-icons/si";

type Tool = [name: string, Icon: IconType, color: string];
// Two rows travelling in opposite directions; languages lead the top row.
const rows: Tool[][] = [
  [["TypeScript", SiTypescript, "#3178C6"], ["Python", SiPython, "#3776AB"], ["Ruby", SiRuby, "#CC342D"], ["Rust", SiRust, "#F46623"], ["C++", SiCplusplus, "#00599C"], ["C# / .NET", SiDotnet, "#7C4DFF"], ["Lua", SiLua, "#5B6CFF"], ["JavaScript", SiJavascript, "#F7DF1E"], ["Go", SiGo, "#00ADD8"], ["SQL", SiPostgresql, "#4169E1"], ["GraphQL", SiGraphql, "#E10098"]],
  [["React", SiReact, "#61DAFB"], ["Next.js", SiNextdotjs, "#F1F0E9"], ["Angular", SiAngular, "#DD0031"], ["Svelte", SiSvelte, "#FF3E00"], ["Rails", SiRubyonrails, "#D30001"], ["Django", SiDjango, "#44B78B"], ["Node.js", SiNodedotjs, "#5FA04E"], ["Three.js", SiThreedotjs, "#F1F0E9"], ["WebAssembly", SiWebassembly, "#654FF0"], ["TensorFlow", SiTensorflow, "#FF6F00"], ["Docker", SiDocker, "#2496ED"], ["Shopify Hydrogen", SiShopify, "#95BF47"]],
];

export default function StackMarquee() {
  return (
    <div className="stack-marquee" role="region" aria-label="Languages and tools used in these projects">
      {rows.map((row, index) => (
        <div className={`marquee-row${index ? " is-reverse" : ""}`} key={index}>
          {/* The track repeats once so the loop is seamless; only the first copy is announced. */}
          {[0, 1].map((copy) => (
            <ul className="marquee-track" key={copy} aria-hidden={copy === 1 || undefined}>
              {row.map(([name, Icon, color]) => (
                <li key={name} style={{ "--c": color } as CSSProperties}><Icon aria-hidden="true" />{name}</li>
              ))}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
