"use client";

import { useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export const Nav = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;

    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={
        "px-4 py-2 flex items-center h-14 z-50 bg-gradient-to-r from-emerald-800 to-emerald-600 border-b border-emerald-700"
      }
    >
      <div className="flex items-center">
        <span className="text-xl font-arabic text-white">Islamic AI Chat</span>
        <div className="ml-2 text-emerald-200 text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      </div>
      <div className={"ml-auto flex items-center gap-1"}>
        <Button
          onClick={toggleDark}
          variant={"ghost"}
          size={"icon"}
          className={"text-white hover:text-emerald-200"}
        >
          {isDarkMode ? (
            <Moon className={"size-4"} />
          ) : (
            <Sun className={"size-4"} />
          )}
        </Button>
      </div>
    </div>
  );
};
