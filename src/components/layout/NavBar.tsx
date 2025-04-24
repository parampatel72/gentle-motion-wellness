
import { Home, Calendar, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      label: "Home",
      icon: <Home size={24} />,
      href: "/dashboard",
      active: location.pathname === "/dashboard",
    },
    {
      label: "Workouts",
      icon: <Calendar size={24} />,
      href: "/workouts",
      active: location.pathname.startsWith("/workouts"),
    },
    {
      label: "Profile",
      icon: <User size={24} />,
      href: "/profile",
      active: location.pathname === "/profile",
    },
    {
      label: "Settings",
      icon: <Settings size={24} />,
      href: "/settings",
      active: location.pathname === "/settings",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border py-2 px-4 shadow-soft z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className={cn(
              "flex flex-col items-center px-3 py-2 rounded-xl transition-colors",
              item.active
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {item.icon}
            <span className="text-sm font-medium mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
