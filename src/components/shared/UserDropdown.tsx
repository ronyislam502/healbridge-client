'use client';

import * as React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Icons } from '@/components/shared/Icons';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, TUser } from '@/redux/features/auth/authSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useMyProfilQuery } from '@/redux/features/user/userApi';
import { useState, useEffect } from 'react';

interface UserDropdownProps {
  customTrigger?: React.ReactNode;
  isMobile?: boolean;
}

const UserDropdown = ({ customTrigger, isMobile }: UserDropdownProps = {}) => {
  const [mounted, setMounted] = useState(false);
  const loggedUser = useAppSelector((state) => state?.auth?.user) as TUser;
  const { data: userData } = useMyProfilQuery({}, { skip: !loggedUser || !mounted });
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
    router.push('/login');
    router.refresh();
  };

  if (!mounted) return null;

  if (isMobile) {
    if (!loggedUser) {
      return (
        <Button variant="ghost" asChild className="w-full">
          <Link href="/login">Login</Link>
        </Button>
      );
    }
    return (
      <>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href={`/${loggedUser?.role?.toLowerCase()}`}>
            <Icons.layoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        <Button onClick={handleLogout} variant="destructive" className="w-full justify-start mt-2">
          <Icons.logOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </>
    );
  }

  if (!loggedUser) {
    return (
      <Button variant="ghost" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {customTrigger ? customTrigger : (
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
            <Avatar className="h-10 w-10 border border-blue-100">
              <AvatarImage src={profile?.avatar || undefined} alt={profile?.name || "User"} />
              <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">
                {(profile?.name || loggedUser?.name)?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </Button>
        )}
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
  );
};

export default UserDropdown;
