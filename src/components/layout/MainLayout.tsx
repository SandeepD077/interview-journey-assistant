
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
  LayoutDashboard
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userRoutes = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Resume Builder", path: "/resume-builder" },
    { name: "Practice Tests", path: "/practice" },
    { name: "Study Resources", path: "/resources" },
  ];

  const orgRoutes = [
    { name: "Dashboard", path: "/organization-dashboard" },
    { name: "Candidates", path: "/candidates" },
    { name: "Analytics", path: "/analytics" },
  ];

  const routes = currentUser?.role === "organization" ? orgRoutes : userRoutes;

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b sticky top-0 z-50 w-full bg-white">
        <div className="container px-4 mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary">
              Interview Express
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {!currentUser ? (
              <>
                <Link 
                  to="/features"
                  className={cn(
                    "nav-link",
                    isActive("/features") && "active"
                  )}
                >
                  Features
                </Link>
                <Link 
                  to="/pricing" 
                  className={cn(
                    "nav-link",
                    isActive("/pricing") && "active"
                  )}
                >
                  Pricing
                </Link>
                <Link 
                  to="/about"
                  className={cn(
                    "nav-link",
                    isActive("/about") && "active"
                  )}
                >
                  About
                </Link>
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </>
            ) : (
              <>
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "nav-link",
                      isActive(route.path) && "active"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <UserIcon className="h-4 w-4" />
                      {currentUser.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(currentUser.role === "organization" ? "/organization-dashboard" : "/dashboard")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
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
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 space-y-2 border-t">
            {!currentUser ? (
              <>
                <Link 
                  to="/features"
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/pricing" 
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  to="/about"
                  className="block py-2 text-base font-medium hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="pt-2 space-y-2">
                  <Link 
                    to="/login"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link 
                    to="/register"
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full">Sign up</Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className="block py-2 text-base font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {route.name}
                  </Link>
                ))}
                <div className="pt-2 border-t">
                  <Link
                    to="/profile"
                    className="block py-2 text-base font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block py-2 text-base font-medium hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="mt-2 w-full text-left flex items-center py-2 text-base font-medium text-red-600 hover:text-red-700"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="py-8 bg-gray-50 border-t">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Interview Express</h3>
              <p className="text-gray-600">
                Helping job seekers ace their interviews and land their dream jobs.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase text-gray-500 mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="text-gray-600 hover:text-primary">Features</Link></li>
                <li><Link to="/pricing" className="text-gray-600 hover:text-primary">Pricing</Link></li>
                <li><Link to="/testimonials" className="text-gray-600 hover:text-primary">Testimonials</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase text-gray-500 mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="text-gray-600 hover:text-primary">Help Center</Link></li>
                <li><Link to="/blog" className="text-gray-600 hover:text-primary">Blog</Link></li>
                <li><Link to="/contact" className="text-gray-600 hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium uppercase text-gray-500 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-600 hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Interview Express. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
