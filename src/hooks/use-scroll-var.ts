import { useSyncExternalStore, type RefObject } from "react";
import { useScroll, useTransform } from "motion/react";

type Offset = NonNullable<Parameters<typeof useScroll>[0]>["offset"];

// Desktop-only scroll choreography; phones and reduced motion get natural flow.
export const PIN_QUERY = "(min-width: 1100px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
export const PAN_QUERY = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

/** Scroll progress of `target` (0..1) as a string, ready for a `--p` CSS custom property. */
export function useScrollVar(target: RefObject<HTMLElement>, offset: Offset) {
  const { scrollYProgress } = useScroll({ target, offset });
  return useTransform(scrollYProgress, (v) => v.toFixed(4));
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => matchMedia(query).matches,
    () => false,
  );
}
