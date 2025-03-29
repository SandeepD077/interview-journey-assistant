
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  ChevronDown, 
  Menu, 
  X, 
  LogOut, 
  User as UserIcon,
  Settings,
  FileText,
  BookOpen,
  Code,
  Mic,
  Home,
  BarChart,
  Users,
  Award
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const userRoutes = [
    { name: "Dashboard", path: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Resume Builder", path: "/resume-builder", icon: <FileText className="h-5 w-5" /> },
    { name: "Aptitude Tests", path: "/practice/aptitude", icon: <BookOpen className="h-5 w-5" /> },
    { name: "DSA Practice", path: "/practice/dsa", icon: <Code className="h-5 w-5" /> },
    { name: "Mock Interviews", path: "/practice/interview", icon: <Mic className="h-5 w-5" /> },
    { name: "Study Resources", path: "/resources", icon: <Award className="h-5 w-5" /> },
  ];

  const orgRoutes = [
    { name: "Dashboard", path: "/organization-dashboard", icon: <Home className="h-5 w-5" /> },
    { name: "Candidates", path: "/candidates", icon: <Users className="h-5 w-5" /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
  ];

  const routes = currentUser?.role === "organization" ? orgRoutes : userRoutes;

  const isActive = (path: string) => {
    if (path === "/dashboard" || path === "/organization-dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r">
        <div className="flex flex-col flex-1 overflow-y-auto">
          <div className="flex items-center h-16 px-4 border-b">
            <Link to="/" className="text-xl font-bold text-primary">
              Interview Express
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
                  isActive(route.path) && "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {route.icon}
                <span>{route.name}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full flex items-center justify-between">
                  <div className="flex items-center">
                    <UserIcon className="h-4 w-4 mr-2" />
                    <span className="truncate max-w-[140px]">
                      {currentUser?.name || "User"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b">
        <button
          className="p-2 rounded-md"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/" className="text-xl font-bold text-primary">
          Interview Express
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="px-2">
              <UserIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="flex justify-between items-center h-16 px-4 border-b">
              <span className="text-lg font-medium">Menu</span>
              <button
                className="p-2 rounded-md"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors mb-1",
                    isActive(route.path) && "bg-primary text-white hover:bg-primary/90"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {route.icon}
                  <span>{route.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 md:pl-64">
        <div className="py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
