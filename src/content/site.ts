// All site content lives here. Edit this file to update the page;
// components only render what is defined below.
// Lines marked REVIEW were drafted from the repos. Check them before launch.

export type LinkKind = "github" | "linkedin" | "email" | "resume";

export interface SocialLink {
  kind: LinkKind;
  label: string;
  /** null hides the link until a value exists. */
  href: string | null;
}

export interface Project {
  slug: string;
  name: string;
  /** Small label on the card, e.g. "Open-source tool". */
  category: string;
  tagline: string;
  description: string;
  /** Longer overview shown in the project detail view. */
  overview: string;
  highlights: string[];
  /** Design decisions worth calling out, shown in the detail view. */
  designNotes?: string[];
  /** For team projects: what I personally built. */
  contributions?: string[];
  /** Badge on the card. Defaults to "Live". */
  status?: "Live" | "Beta";
  role: string;
  year: string;
  liveUrl: string;
  /** null for private repos: the GitHub link is not shown. */
  repoUrl: string | null;
  tech: string[];
}

export interface StackGroup {
  title: string;
  items: string[];
}

export interface Education {
  school: string;
  degree: string;
  status: string;
  expected: string;
  thesis: { title: string; summary: string; points: string[] };
}

export const profile = {
  name: "Christian Esquillo",
  fullName: "Christian Gerald Emmanuel Esquillo",
  role: "Full-Stack Developer, frontend focus",
  // REVIEW: headline, pitch, now and offline lines
  headline: "I design and build interfaces people enjoy using.",
  pitch: "A Computer Science student building full-stack web apps, frontend first.",
  now: "Shipping free, open-source browser tools and finishing my thesis, TaskBuddy.",
  offline: "Exploring new things and turning ideas into side projects.",
  location: "Philippines",
  timeZone: "Asia/Manila",
  // Your photo lives in public/. Replace the file to update it.
  photo: "/profile.jpg",
  githubUser: "Christian-11a",
} as const;

export const links: SocialLink[] = [
  { kind: "github", label: "GitHub", href: "https://github.com/Christian-11a" },
  { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/christianesquillo" },
  { kind: "email", label: "Email", href: "mailto:christianesquillo01@gmail.com" },
  // Built from cv/resume.html with `npm run cv` (public copy, no phone number).
  { kind: "resume", label: "Resume", href: "/resume.pdf" },
];

// REVIEW: descriptions, highlights and roles
export const projects: Project[] = [
  {
    slug: "taskbuddy",
    name: "TaskBuddy",
    category: "Thesis, full-stack",
    tagline: "Home-services marketplace with ML matching.",
    description:
      "Clients post jobs, providers apply, and a Random Forest model invites the best-matched providers when a job goes unfilled.",
    overview:
      "A Philippine home-services marketplace for plumbing, cleaning, handyman and beauty jobs. What makes it more than a job board is the matching: when a job sits unfilled past its urgency deadline, a trained model scores every eligible provider and invites the best fits.",
    highlights: [
      "Recommendation engine scores providers on 14 features and invites the top 8 by notification.",
      "Escrow payments through Xendit (test mode), released to GCash, Maya or bank when the client confirms the job.",
      "Job checklists with proof photos, plus complaints that freeze funds until an admin resolves them.",
      "Web app, mobile app, API and ML service deployed as separate services.",
    ],
    role: "Lead frontend developer, top contributor (600+ commits)",
    contributions: [
      "Built most of the React Native app: client and provider flows, payments, earnings, messages and the Get verified steps.",
      "Built the marketing website and wired the admin console to the backend.",
      "Produced the 60 second promo film and 17 narrated guide videos with Remotion.",
      "Shipped backend pieces too: Google Sign-In, certificate checks before hiring, and locking the fee at hire.",
    ],
    year: "2026",
    liveUrl: "https://taskbuddy-nine-zeta.vercel.app",
    repoUrl: "https://github.com/Christian-11a/taskbuddy",
    tech: ["Next.js", "React Native", "Python", "PostgreSQL", "Xendit"],
  },
  {
    slug: "clam",
    name: "Clam",
    category: "Solo, full-stack",
    status: "Beta",
    tagline: "A Filipino-first calorie and water tracker.",
    description:
      "An installable app with an orange-cat guide. It works offline, keeps every diary on the device, and puts Filipino food first.",
    overview:
      "A calorie and water tracker built for Filipino food, with an orange-cat guide. It runs as a web app you add to your phone's Home Screen, with native Android and iOS apps planned after launch.",
    highlights: [
      "Local-first: every diary stays on the device in SQLite, with no accounts and no sync.",
      "A Cloudflare Worker serves the app, proxies food search and runs AI photo scans without storing user data.",
      "Filipino food data (FNRI) first, then USDA and barcode lookup through Open Food Facts.",
      "Works offline, and prompts you when a new version is ready.",
    ],
    designNotes: [
      "Health rules built in: 18+ only, a minimum calorie limit, and an option to hide numbers.",
      "Honest numbers: unknown nutrients stay unknown instead of showing 0, and every food shows its source.",
    ],
    role: "Design and development, solo",
    year: "2026",
    liveUrl: "https://clam.discipleat.workers.dev",
    repoUrl: null,
    tech: ["Expo", "React Native Web", "TypeScript", "SQLite", "Cloudflare Workers"],
  },
  {
    slug: "imageprep",
    name: "ImagePrep",
    category: "Open-source tool",
    tagline: "Small files. Big possibilities.",
    description:
      "Resize and convert images one by one or in batches, entirely in your browser. Nothing is uploaded.",
    overview:
      "A free browser tool for preparing images before you upload them anywhere. Pick a format, maximum size and quality, then download one file or a ZIP of everything.",
    highlights: [
      "Converts JPEG, PNG and WebP while keeping proportions and never enlarging images.",
      "Before and after preview so you can compare the original with the prepared file.",
      "Shows real exported sizes, including when a file gets bigger.",
      "Runs fully on your device: no account, no server, no uploads.",
    ],
    role: "Design and development",
    year: "2026",
    liveUrl: "https://imageprep.pages.dev",
    repoUrl: "https://github.com/Christian-11a/imageprep",
    tech: ["React", "TypeScript", "Vite", "JSZip"],
  },
  {
    slug: "pagekit",
    name: "PageKit",
    category: "Open-source tool",
    tagline: "A local-first PDF page organizer.",
    description:
      "Combine PDFs, reorder, rotate and remove pages, then split or export. Everything is processed on your device.",
    overview:
      "A workspace for organizing PDF pages without uploading documents anywhere. Combine files, arrange pages, fix sideways scans and export exactly the pages you need.",
    highlights: [
      "Select, reorder, rotate and remove pages with full undo and redo.",
      "Export everything, selected pages, page ranges or individual pages as a ZIP.",
      "Clear safeguards on file count and size, with helpful import errors.",
      "End-to-end tests in real browsers.",
    ],
    role: "Design and development",
    year: "2026",
    liveUrl: "https://pagekit-bdy.pages.dev",
    repoUrl: "https://github.com/Christian-11a/pagekit",
    tech: ["React", "TypeScript", "pdf-lib", "PDF.js"],
  },
  {
    slug: "amara-bakery",
    name: "Amara Bakery",
    category: "Frontend and design",
    tagline: "A cozy bakery storefront.",
    description:
      "A fictional bakery shop with a full demo ordering flow, accessible dialogs and scroll-driven GSAP storytelling.",
    overview:
      "A storefront built to show a complete, warm brand experience: browse twelve products, choose quantities, save an order and finish a demo checkout.",
    highlights: [
      "Category filters, quantity limits, live totals and undo on remove.",
      "Order state that survives reloads and validates saved data before using it.",
      "Optimized responsive images and locally served fonts.",
    ],
    designNotes: [
      "Lora headings, DM Sans body and a shared token system carry one warm identity across every page.",
      "Motion respects system settings, and visitors can turn it up or down themselves.",
    ],
    role: "Design and development",
    year: "2026",
    liveUrl: "https://amara-bakery-iota.vercel.app",
    repoUrl: "https://github.com/Christian-11a/amara-bakery",
    tech: ["Next.js", "TypeScript", "GSAP", "Radix UI"],
  },
  {
    slug: "stillframe",
    name: "Stillframe",
    category: "Frontend and design",
    tagline: "An editorial photography portfolio.",
    description:
      "Six photo collections with URL-backed filters, a keyboard-accessible fullscreen viewer and a scroll-linked photo story.",
    overview:
      "A quiet, image-led portfolio concept. Visitors move from the home page through collections and a fullscreen viewer to an inquiry form.",
    highlights: [
      "Collection filters stored in the URL, so every view can be shared.",
      "Fullscreen viewer with a keyboard and pointer accessible thumbnail strip.",
      "Photos served in three sizes with srcset and per-image alt text.",
    ],
    designNotes: [
      "An editorial layout that lets photography lead, with type kept calm and secondary.",
      "The scroll story has a visible switch to a static version.",
    ],
    role: "Design and development",
    year: "2026",
    liveUrl: "https://stillframe-photography.vercel.app",
    repoUrl: null,
    tech: ["React", "TypeScript", "Motion", "React Router"],
  },
];

// REVIEW: trim anything you don't want to be asked about in an interview
export const stack: StackGroup[] = [
  { title: "Languages", items: ["TypeScript", "JavaScript", "HTML", "CSS", "Python", "C++"] },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Vite", "React Router", "Motion", "GSAP", "Radix UI"],
  },
  { title: "Mobile", items: ["React Native", "Expo"] },
  { title: "Backend & data", items: ["Node.js", "Supabase", "PostgreSQL", "SQLite", "Cloudflare Workers", "Firebase"] },
  { title: "Tools", items: ["Git", "GitHub", "Figma", "Vercel", "Cloudflare", "Vitest", "Playwright"] },
  { title: "Payments", items: ["Stripe", "Xendit"] },
];

// REVIEW: thesis summary and points
export const education: Education = {
  school: "De La Salle Lipa",
  degree: "BS Computer Science",
  status: "4th year",
  expected: "Expected 2027",
  thesis: {
    title: "Thesis: TaskBuddy",
    summary:
      "A Philippine home-services marketplace built by a team of four. I led the frontend: the mobile app, the website and the promo videos.",
    points: [
      "A trained Random Forest model scores eligible providers on 14 features and invites the top matches.",
      "Escrow payments with Xendit (test mode), released to GCash, Maya or bank on completion.",
      "Web app, mobile app, API and ML service deployed as separate services.",
    ],
  },
};

export const principles = [
  {
    title: "Details are the product",
    body: "Spacing, motion and empty states decide how an interface feels, so I design them on purpose.",
  },
  {
    title: "Accessible by default",
    body: "Keyboard support, contrast and clear focus states are part of the first build, not a later fix.",
  },
  {
    title: "Fast and local-first",
    body: "I keep work on the device when I can. It is quicker and more private.",
  },
];
