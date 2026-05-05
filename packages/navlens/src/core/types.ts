export interface NavEntry {
  path: string
  timestamp: number
}

export interface NavHistoryConfig {
  storageKey?: string
  maxAgeMs?: number
  maxEntries?: number
  storage?: 'session' | 'local'
}

export interface RouterAdapter {
  getFullPath: () => string
  back: () => void
  push: (path: string) => void
}
