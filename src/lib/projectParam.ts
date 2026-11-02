/** The open project lives in the URL (?project=slug), so every project view can be shared. */

const PARAM = "project";
const EVENT = "projectchange";

export function readProject(search: string): string | null {
  return new URLSearchParams(search).get(PARAM);
}

/** Returns the URL for the current page with the project param set or removed. */
export function withProject(href: string, slug: string | null): string {
  const url = new URL(href);
  if (slug) url.searchParams.set(PARAM, slug);
  else url.searchParams.delete(PARAM);
  return url.toString();
}

export function subscribeProject(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

export function getProjectSnapshot(): string | null {
  return readProject(window.location.search);
}

export function getProjectServerSnapshot(): string | null {
  return null;
}

export function setProject(slug: string | null) {
  window.history.replaceState(window.history.state, "", withProject(window.location.href, slug));
  window.dispatchEvent(new Event(EVENT));
}
