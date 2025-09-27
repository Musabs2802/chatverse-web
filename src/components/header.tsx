"use client";

import { Button } from "../components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../hooks/use-auth";
import { LayoutDashboard, Menu } from "lucide-react";

export function Header() {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Models", href: "/#models" },
  ];

  console.log(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white backdrop-blur supports-[backdrop-filter]:bg-white">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm items-center">
              <img src="icon-white.svg" className="w-6" />
            </span>
          </div>
          <span className="font-bold text-2xl text-gray-900">Chatverse</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href; // handle in-page anchors

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors duration-200 ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Buttons */}
        {user?.aud === "authenticated" ? (
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className="bg-black text-white hover:bg-gray-800 transition-colors"
              asChild
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_CHATVERSE_APP_URL}`}
                className="flex items-center gap-1"
              >
                <LayoutDashboard className="w-4 h-4" /> Go to App
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button
              variant="link"
              className="text-gray-700 hover:text-black bg-none transition-colors"
              asChild
            >
              <Link href={`${process.env.NEXT_PUBLIC_CHATVERSE_APP_URL}/login`}>
                Login
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-black text-white hover:bg-gray-800 transition-colors"
              asChild
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_CHATVERSE_APP_URL}/signup`}
              >
                Get Started
              </Link>
            </Button>
          </div>
        )}

        {/* Mobile menu placeholder */}
        <div className="md:hidden">
          <Button variant="ghost" className="p-2">
            <Menu className="w-6 h-6 text-gray-700" />
          </Button>
        </div>
      </div>
    </header>
  );
}
