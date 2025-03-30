import {
  useState,
  useEffect,
  useRef
} from "react"
import {
  useNavigate
} from "react-router-dom"

import {
  cn
} from "@/lib/utils"
import {
  useAuth
} from "@/contexts/AuthContext"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Button
} from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet"
import {
  SidebarNavItem,
  SidebarNav
} from "@/components/ui/sidebar-nav"
import {
  ModeToggle
} from "@/components/mode-toggle"
import {
  Separator
} from "@/components/ui/separator"
import {
  Skeleton
} from "@/components/ui/skeleton"

import {
  Home,
  FileText,
  BookOpen,
  User,
  Users,
  LineChart,
  Settings,
  LogOut,
  Brain,
  Bot,
  MessageSquare
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const {
    currentUser,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Skeleton className="w-[300px] h-[400px]" />
      </div>
    )
  }

  const userNavigation = [{
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Resume Builder",
      href: "/resume-builder",
      icon: FileText,
    },
    {
      name: "Aptitude Test",
      href: "/practice/aptitude",
      icon: Brain,
    },
    {
      name: "DSA Practice",
      href: "/practice/dsa",
      icon: Brain,
    },
    {
      name: "Mock Interview",
      href: "/practice/interview",
      icon: MessageSquare,
    },
    {
      name: "Study Resources",
      href: "/resources",
      icon: BookOpen,
    },
    {
      name: "AI Assistant",
      href: "/assistant",
      icon: Bot,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  const organizationNavigation = [{
      name: "Home",
      href: "/organization-dashboard",
      icon: Home,
    },
    {
      name: "Candidates",
      href: "/candidates",
      icon: Users,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: LineChart,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  const renderMobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="ml-2">
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="space-y-2.5">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            {currentUser?.role === "user" ?
              "User Dashboard Navigation" :
              "Organization Dashboard Navigation"}
          </SheetDescription>
        </SheetHeader>
        <SidebarNav>
          <div className="flex flex-col space-y-1">
            {(currentUser?.role === "user" ? userNavigation : organizationNavigation).map((item) => (
              <SidebarNavItem key={item.name} title={item.name} href={item.href} icon={item.icon} />
            ))}
          </div>
        </SidebarNav>
        <SheetFooter>
          <Button 
            variant="outline" 
            onClick={() => {
              logout();
              navigate('/login');
            }} 
            className="w-full justify-start"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  const renderDesktopNav = () => (
    <div ref={sidebarRef} className="hidden border-r bg-secondary h-screen w-[280px] py-4 flex-col flex md:flex">
      <div className="px-4 mb-4">
        <ModeToggle />
      </div>
      <Separator />
      <SidebarNav>
        <div className="flex flex-col space-y-1">
          {(currentUser?.role === "user" ? userNavigation : organizationNavigation).map((item) => (
            <SidebarNavItem key={item.name} title={item.name} href={item.href} icon={item.icon} />
          ))}
        </div>
      </SidebarNav>
    </div>
  );

  return (
    <div className="flex h-screen bg-background">
      {renderDesktopNav()}

      <div className="flex-1 flex flex-col">
        <header className="px-4 py-2 border-b h-[60px] flex items-center justify-between">
          <div className="flex items-center">
            {renderMobileNav()}
            <h1 className="text-xl font-semibold">
              {currentUser?.role === "user" ? "User Dashboard" : "Organization Dashboard"}
            </h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={currentUser?.image || "https://github.com/shadcn.png"} 
                    alt={currentUser?.name || "Avatar"} 
                  />
                  <AvatarFallback>{currentUser?.name ? currentUser?.name[0].toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                logout();
                navigate('/login');
              }}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
