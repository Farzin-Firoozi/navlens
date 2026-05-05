'use client'

import { ReactNavigationTracker } from 'navlens'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ReactNavigationTracker adapter="next" />
      {children}
    </>
  )
}
