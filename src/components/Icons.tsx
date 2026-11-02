import {
  EnvelopeSimpleIcon,
  FileTextIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import type { LinkKind } from "@/content/site";

export const linkIcons: Record<LinkKind, Icon> = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  email: EnvelopeSimpleIcon,
  resume: FileTextIcon,
};
