
"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuItem {
  title: string;
  href?: string;
  children?: { title: string; href: string }[];
}

interface SidePanelProps {
  title: string;
  menuItems: MenuItem[];
}

export default function SidePanel({ title, menuItems }: SidePanelProps) {
  const [open, setOpen] = useState(true);

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <ul className="space-y-2">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            {item.href ? (
              <Link
                href={item.href}
                className="block p-2 rounded hover:bg-gray-100"
              >
                {item.title}
              </Link>
            ) : (
              <>
                <button
                  className="w-full text-left p-2 rounded hover:bg-gray-100"
                  onClick={() => setOpen(!open)}
                >
                  {item.title}
                </button>
                {open && item.children && (
                  <ul className="ml-4 mt-2 space-y-1">
                    {item.children.map((child, cidx) => (
                      <li key={cidx}>
                        <Link
                          href={child.href}
                          className="block p-2 rounded hover:bg-gray-100"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
