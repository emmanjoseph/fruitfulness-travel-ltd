"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <NavbarContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
