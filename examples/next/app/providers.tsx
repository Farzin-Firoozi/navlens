"use client";

import { ReactNavigationTracker, useNextAdapter } from "navlens";
import { Suspense } from "react";

function NavigationTracker() {
  const adapter = useNextAdapter();

  return <ReactNavigationTracker adapter={adapter} />;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <NavigationTracker />
      </Suspense>

      {children}
    </>
  );
}
