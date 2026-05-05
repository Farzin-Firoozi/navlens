import type { RouterAdapter } from '../core/types'

export function useGenericAdapter(): RouterAdapter {
  return {
    getFullPath: () =>
      typeof window !== 'undefined'
        ? window.location.pathname + window.location.search
        : '/',
    back: () => window.history.back(),
    push: (path) => { window.location.href = path },
  }
}
