/**
 * Visitor-controlled motion preference, stored on <html data-motion> and in localStorage.
 * Animations play by default; the footer switch lets anyone turn them off.
 */

import { useSyncExternalStore } from "react";

export type Motion = "full" | "reduced";

export function subscribeMotion(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => observer.disconnect();
}

export function getMotion(): Motion {
  return document.documentElement.dataset.motion === "reduced" ? "reduced" : "full";
}

export function getServerMotion(): Motion {
  return "full";
}

export function setMotion(next: Motion) {
  document.documentElement.dataset.motion = next;
  try {
    localStorage.setItem("motion", next);
  } catch {
    // Storage blocked: the choice lasts for this page view only.
  }
}

/** True when the visitor turned motion off with the footer switch. */
export function useMotionReduced(): boolean {
  return useSyncExternalStore(subscribeMotion, getMotion, getServerMotion) === "reduced";
}
