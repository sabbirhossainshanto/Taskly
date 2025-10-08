import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";
import { Separator } from "./ui/separator";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-sidebar w-full">
      <WorkspaceSwitcher />
      <Separator className="mt-1.5 mb-2.5" />
      <Navigation />
      <Separator className="my-4" />
      <Projects />
    </aside>
  );
};
