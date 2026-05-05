import type { NavHistoryConfig } from '../../core/types'
import { pushEntry } from '../../core/storage'

interface SvelteNavigation {
  to: { url: URL } | null
}

export function createNavigationHandler(config?: NavHistoryConfig) {
  return ({ to }: SvelteNavigation) => {
    if (to?.url) pushEntry(to.url.pathname + to.url.search, config)
  }
}
