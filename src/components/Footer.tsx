"use client";
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-[hsl(var(--border)/0.5)] text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Amith Viswas Reddy. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/70 mt-2">
          Inspired by BMW M Performance. Designed with passion.
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <div className="w-8 h-1 bg-[hsl(var(--bmw-m-blue))] rounded-full"></div>
          <div className="w-8 h-1 bg-primary-foreground rounded-full"></div>
        </div>
      </div>
    </footer>
  );
}
