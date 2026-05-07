'use client';

import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuLink } from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Icons } from '@/components/shared/Icons';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Automatically close mobile menu when switching to desktop mode
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

const navItems = [
  { label: "Home", href: "/" },
  { label: "Doctors", href: "/doctors" },
  { label: "Pharmacy", href: "/pharmacy" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Admin", href: "/admin" },
  { label: "Patient", href: "/patient" },
  { label: "Doctor", href: "/doctor" },
];
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-24 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="https://res.cloudinary.com/dkk9lvbtf/image/upload/v1778161565/1778077513978_solqyp.png"
                alt='HealBridge logo' 
                width={150} 
                height={120} 
                className="h-auto w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <Link href={item.href} className={cn(navigationMenuTriggerStyle(), "px-4 font-bold text-gray-700 hover:text-blue-600 transition-colors")}>
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 mr-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <Icons.phone className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Contact Us</span>
                <span>+1 315 369 5943</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 border-l pl-4 ml-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>

            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Icons.menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Access all sections of the HealBridge platform.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 hover:text-blue-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <hr />
                  <div className="flex flex-col gap-2">
                    <Button variant="ghost" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
    );
};

export default Navbar;