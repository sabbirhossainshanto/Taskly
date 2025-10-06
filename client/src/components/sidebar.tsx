import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";
import { Separator } from "./ui/separator";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-sidebar p-4 w-full">
      <WorkspaceSwitcher />
      <Separator className="my-4" />
      <Navigation />
      <Separator className="my-4" />
      <Projects />
    </aside>
  );
};
