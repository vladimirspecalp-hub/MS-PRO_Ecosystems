import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Главная", href: "/" },
    { name: "Покраска труб", href: "/pokraska-dymovoj-truby" },
    { name: "MSPRO Quad", href: "/mspro-quad" },
    { name: "Калькулятор", href: "/calculator" },
    { name: "Контакты", href: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5" data-testid="link-home">
            <span className="text-2xl font-bold text-primary">MS-PRO</span>
          </Link>
        </div>
        
        <div className="flex gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </Button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 transition-colors hover:text-primary ${
                location === item.href ? "text-primary" : "text-foreground"
              }`}
              data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <ThemeToggle />
          <Link href="/contacts" asChild>
            <Button data-testid="button-get-quote">
              Получить расчет
            </Button>
          </Link>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  location === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
                data-testid={`mobile-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link href="/contacts" asChild>
                <Button className="w-full" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-button-get-quote">
                  Получить расчет
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
