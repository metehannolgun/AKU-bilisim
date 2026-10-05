"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Link } from "@/i18n/navigation";

export type NavigationItem = {
    href: string;
    label: string;
};

type MobileMenuProps = {
    items: NavigationItem[];
    openLabel: string;
    closeLabel: string;
    children: ReactNode;
    navigationLabel: string;
};

export function MobileMenu({
    items,
    openLabel,
    closeLabel,
    navigationLabel,
    children,
}: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  }
  return (
    <div className="lg:hidden" onKeyDown={handleKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((previous) => !previous)}
        className="inline-flex min-h-11 items-center rounded-xl border border-border px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {isOpen ? closeLabel : openLabel}
      </button>

      <nav
        id="mobile-navigation"
        aria-label={navigationLabel}
        hidden={!isOpen}
        className="absolute inset-x-0 top-full border-b border-border bg-background p-5 shadow-lg"
      >
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 text-sm font-medium hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-accent"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-border pt-4">
          {children}
        </div>
      </nav>
    </div>
  );
}
