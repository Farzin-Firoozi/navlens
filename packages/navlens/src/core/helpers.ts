import { readHistory, writeHistory } from './storage'
import type { NavHistoryConfig, NavEntry } from './types'

export function getNavHistory(config?: NavHistoryConfig): NavEntry[] {
  return readHistory(config)
}

export function getPreviousPath(config?: NavHistoryConfig): string | undefined {
  const entries = readHistory(config)
  return entries.length >= 2 ? entries[entries.length - 2].path : undefined
}

export function getCurrentPath(config?: NavHistoryConfig): string | undefined {
  const entries = readHistory(config)
  return entries[entries.length - 1]?.path
}

export function clearNavHistory(config?: NavHistoryConfig): void {
  writeHistory([], config)
}
