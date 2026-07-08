import { User, BriefcaseBusiness, Images, Phone, FileText } from "lucide-react";

import Profile from "../apps/Profile";
import Projects from "../apps/Projects";
import Gallery from "../apps/Gallery";
import Contact from "../apps/Contact";
import Resume from "../apps/Resume";

export const appRegistry = [
  { id: "profile", label: "Profile", icon: User, component: Profile },
  {
    id: "projects",
    label: "Projects",
    icon: BriefcaseBusiness,
    component: Projects,
  },
  { id: "gallery", label: "Gallery", icon: Images, component: Gallery },
  { id: "contact", label: "Contact", icon: Phone, component: Contact },
  { id: "resume", label: "Resume", icon: FileText, component: Resume },
];

export function getAppById(id) {
  return appRegistry.find((app) => app.id === id);
}
