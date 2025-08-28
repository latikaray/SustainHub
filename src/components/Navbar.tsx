import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';
import logo from "../assets/logo.png";
import { useIsMobile } from '@/hooks/use-mobile';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img 
              src={logo}
              alt="SustainHub Logo" 
              className="h-8"
            />
            <span className="font-bold text-xl">
              <span className="text-foreground">SUSTAIN</span>
              <span className="text-primary">HUB</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className="px-4 py-2 hover:text-primary cursor-pointer transition-colors"
                      onClick={() => scrollToSection('hero')}
                    >
                      Home
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className="px-4 py-2 hover:text-primary cursor-pointer transition-colors"
                      onClick={() => scrollToSection('workflow')}
                    >
                      How it Works
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className="px-4 py-2 hover:text-primary cursor-pointer transition-colors"
                      onClick={() => scrollToSection('registration')}
                    >
                      Register
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink 
                      className="px-4 py-2 hover:text-primary cursor-pointer transition-colors"
                      onClick={() => scrollToSection('dashboard')}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center space-x-4">
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{user.email}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={signOut} className="flex items-center space-x-2">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.location.href = '/auth'}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    <button
                      className="text-left px-4 py-3 text-lg hover:text-primary transition-colors border-b border-border"
                      onClick={() => scrollToSection('hero')}
                    >
                      Home
                    </button>
                    <button
                      className="text-left px-4 py-3 text-lg hover:text-primary transition-colors border-b border-border"
                      onClick={() => scrollToSection('workflow')}
                    >
                      How it Works
                    </button>
                    <button
                      className="text-left px-4 py-3 text-lg hover:text-primary transition-colors border-b border-border"
                      onClick={() => scrollToSection('registration')}
                    >
                      Register
                    </button>
                    <button
                      className="text-left px-4 py-3 text-lg hover:text-primary transition-colors border-b border-border"
                      onClick={() => scrollToSection('dashboard')}
                    >
                      Dashboard
                    </button>
                  </div>

                  {/* Auth Section */}
                  <div className="pt-4">
                    {user ? (
                      <div className="space-y-4">
                        <div className="px-4 py-2 bg-muted rounded-md">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{user.email}</span>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center space-x-2"
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          window.location.href = '/auth';
                          setMobileMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </nav>
  );
};