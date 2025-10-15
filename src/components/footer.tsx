import React from "react";

export function Footer() {
  return (
    <footer className="w-full p-8 text-center text-sm text-muted-foreground mt-16 border-t border-border">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Obsidian 零基础入门教程 Vault. All rights reserved.</p>
        <a
          href="https://www.dyad.sh/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors"
        >
          Made with Dyad
        </a>
      </div>
    </footer>
  );
}