import { Link } from "@tanstack/react-router";
import { Bell, ChevronDown, Settings, User, LogOut } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/shared/components/shadcn/avatar";
import { Button } from "@/shared/components/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/shadcn/dropdown-menu";
import { useAuth } from "@/shared/hooks/use-auth";

import { LanguageSwitcher } from "./language-switcher";

interface NavbarProps {
  variant?: "full" | "minimal";
}

export const Navbar = ({ variant = "full" }: NavbarProps) => {
  const [activeLink, setActiveLink] = useState("/courses");

  const auth = useAuth();

  return (
    <nav className="w-full border-b border-border bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center gap-1 font-medium">
              <img src="/logo.svg" alt="logo" className="w-[24.43px] h-6" />
              <img src="/educado.svg" alt="educado" className="h-6" />
            </div>
          </div>
        </Link>

        {/* Navigation Links - Only show in full variant */}
        {variant === "full" && (
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/courses"
              onClick={() => {
                setActiveLink("/courses");
              }}
            >
              Courses
            </Link>
          </div>
        )}

        {/* User Section - Only show in full variant */}
        {variant === "full" && (
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-secondary"
                >
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      User Name
                    </div>
                    <div className="text-xs text-muted-foreground">
                      user@email.com
                    </div>
                  </div>
                  <Avatar className="h-8 w-8 bg-accent">
                    <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
                      UN
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2 w-full">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center gap-2 w-full">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <LanguageSwitcher />
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    auth.logout();
                  }}
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Language Switcher for minimal variant */}
        {variant === "minimal" && (
          <div className="text-sm text-muted-foreground">EN</div>
        )}
      </div>

      {/* Mobile Navigation - Only show in full variant */}
      {variant === "full" && (
        <div className="md:hidden mt-4 flex gap-4 overflow-x-auto">
          <Link
            to="/courses"
            className={`whitespace-nowrap py-2 px-3 rounded-md text-sm font-medium ${
              activeLink === "/courses"
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-foreground hover:text-primary"
            }`}
            onClick={() => {
              setActiveLink("/courses");
            }}
          >
            Courses
          </Link>
        </div>
      )}
    </nav>
  );
};
