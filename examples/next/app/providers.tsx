"use client";

import { ReactNavigationTracker, useNextAdapter } from "navlens";

export function Providers({ children }: { children: React.ReactNode }) {
  const adapter = useNextAdapter();

  return (
    <>
      <ReactNavigationTracker adapter={adapter} />
      {children}
    </>
  );
}
