import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: "LayoutDashboard", label: "Главная" },
  { path: "/clients", icon: "Users", label: "Клиенты" },
  { path: "/projects", icon: "Building2", label: "Проекты" },
  { path: "/configurator", icon: "Settings2", label: "Конфигуратор" },
  { path: "/drawings", icon: "PenTool", label: "Чертежи" },
  { path: "/profiles", icon: "Layers", label: "Профили" },
  { path: "/reports", icon: "BarChart3", label: "Отчёты" },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col transition-transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Icon name="Hexagon" size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">GlassPro</h1>
              <p className="text-xs text-sidebar-foreground/60">Остекление домов</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-white"
                )
              }
              end={item.path === "/"}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Менеджер</p>
              <p className="text-xs text-sidebar-foreground/50">Администратор</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-sm border-b flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-muted"
          >
            <Icon name="Menu" size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-muted relative">
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-muted">
              <Icon name="Search" size={20} className="text-muted-foreground" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
