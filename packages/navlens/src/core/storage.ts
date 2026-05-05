import type { NavEntry, NavHistoryConfig } from './types'

const DEFAULTS: Required<NavHistoryConfig> = {
  storageKey: 'navlens_history',
  maxAgeMs: 1_800_000,
  maxEntries: 50,
  storage: 'session',
}

function getStore(storage: 'session' | 'local'): Storage {
  return storage === 'local' ? localStorage : sessionStorage
}

export function readHistory(config: NavHistoryConfig = {}): NavEntry[] {
  if (typeof window === 'undefined') return []
  const { storageKey, storage } = { ...DEFAULTS, ...config }
  try {
    const raw = getStore(storage).getItem(storageKey)
    if (!raw) return []
    return JSON.parse(raw) as NavEntry[]
  } catch {
    try { getStore(storage).removeItem(storageKey) } catch {}
    return []
  }
}

export function writeHistory(entries: NavEntry[], config: NavHistoryConfig = {}): void {
  if (typeof window === 'undefined') return
  const { storageKey, storage } = { ...DEFAULTS, ...config }
  try {
    getStore(storage).setItem(storageKey, JSON.stringify(entries))
  } catch {}
}

export function pushEntry(path: string, config: NavHistoryConfig = {}): void {
  const { maxAgeMs, maxEntries } = { ...DEFAULTS, ...config }
  const now = Date.now()
  let entries = readHistory(config)

  if (entries[entries.length - 1]?.path === path) return

  entries = entries.filter(e => now - e.timestamp < maxAgeMs)
  entries.push({ path, timestamp: now })
  if (entries.length > maxEntries) entries = entries.slice(-maxEntries)

  writeHistory(entries, config)
}
