'use client';

import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuLink } from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Icons } from '@/components/shared/Icons';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, selectCurrentUser, TUser } from '@/redux/features/auth/authSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useMyProfilQuery } from '@/redux/features/user/userApi';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userData } = useMyProfilQuery({}, { skip: !loggedUser || !mounted });

  console.log("Navbar userData:", userData);

  const profile = userData?.data;

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);


  const handleLogout = () => {
    dispatch(logout());
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    router.refresh();
  };


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
              {mounted && (
                loggedUser ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                        <Avatar className="h-10 w-10 border border-blue-100">
                          <AvatarImage src={profile?.avatar || ""} alt={profile?.name || "User"} />
                          <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                            {(profile?.name || loggedUser?.name)?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{profile?.name || loggedUser?.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">{profile?.email || loggedUser?.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/${loggedUser?.role?.toLowerCase()}`} className="cursor-pointer">
                          <Icons.layoutDashboard className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 cursor-pointer">
                        <Icons.logOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="ghost" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                  </>
                )
              )}
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
                    {mounted && (
                      loggedUser ? (
                        <>
                          <Button asChild variant="outline" className="w-full justify-start">
                            <Link href={`/${loggedUser?.role?.toLowerCase()}`}>
                              <Icons.layoutDashboard className="mr-2 h-4 w-4" />
                              Dashboard
                            </Link>
                          </Button>
                          <Button onClick={handleLogout} variant="destructive" className="w-full justify-start">
                            <Icons.logOut className="mr-2 h-4 w-4" />
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button variant="ghost" asChild className="w-full">
                            <Link href="/login">Login</Link>
                          </Button>
                        </>
                      )
                    )}

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