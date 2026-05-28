"use client";

import Link from "next/link";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-heading font-bold text-xl tracking-tight text-white">
            PhishGuard<span className="text-primary">.ai</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/analyze" className="hover:text-primary transition-colors">Analyze</Link>
          <Link href="/history" className="hover:text-primary transition-colors">History</Link>
          <Link href="/tips" className="hover:text-primary transition-colors">Cyber Tips</Link>
        </nav>
        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <>
              <Link href="/sign-in">
                <Button variant="outline" className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10 border-2 border-primary shadow-[0_0_10px_rgba(0,240,255,0.3)]"
              }
            }} />
          )}
        </div>
      </div>
    </header>
  );
}
