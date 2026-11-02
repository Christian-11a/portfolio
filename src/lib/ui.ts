/** Page column shared by every section. */
export const container = "mx-auto w-full max-w-[1080px] px-5 sm:px-8";

/** Sections linked from the navigation, in page order. */
export const navSections = [
  { id: "work", label: "Work" },
  { id: "craft", label: "Craft" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
