import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readHistory, writeHistory, pushEntry } from './storage'

beforeEach(() => {
  sessionStorage.clear()
})

describe('readHistory', () => {
  it('returns empty array when nothing stored', () => {
    expect(readHistory()).toEqual([])
  })

  it('returns stored entries', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    sessionStorage.setItem('navtrace_history', JSON.stringify(entries))
    expect(readHistory()).toEqual(entries)
  })

  it('filters out expired entries', () => {
    const expired = [{ path: '/old', timestamp: Date.now() - 9999999 }]
    sessionStorage.setItem('navtrace_history', JSON.stringify(expired))
    expect(readHistory()).toEqual([])
  })

  it('respects maxEntries', () => {
    const entries = Array.from({ length: 10 }, (_, i) => ({
      path: `/p${i}`,
      timestamp: Date.now(),
    }))
    sessionStorage.setItem('navtrace_history', JSON.stringify(entries))
    expect(readHistory({ maxEntries: 3 })).toHaveLength(3)
  })

  it('clears corrupted data and returns empty', () => {
    sessionStorage.setItem('navtrace_history', 'not-json')
    expect(readHistory()).toEqual([])
    expect(sessionStorage.getItem('navtrace_history')).toBeNull()
  })

  it('uses localStorage when configured', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    localStorage.setItem('navtrace_history', JSON.stringify(entries))
    expect(readHistory({ storage: 'local' })).toEqual(entries)
    localStorage.clear()
  })

  it('respects custom storageKey', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    sessionStorage.setItem('custom_key', JSON.stringify(entries))
    expect(readHistory({ storageKey: 'custom_key' })).toEqual(entries)
  })
})

describe('writeHistory', () => {
  it('writes entries to storage', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    writeHistory(entries)
    const stored = JSON.parse(sessionStorage.getItem('navtrace_history')!)
    expect(stored).toEqual(entries)
  })

  it('handles quota exceeded error silently', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
      throw new DOMException('QuotaExceededError')
    })
    expect(() => writeHistory([{ path: '/a', timestamp: Date.now() }])).not.toThrow()
  })
})

describe('pushEntry', () => {
  it('adds new entry at front', () => {
    pushEntry('/a')
    pushEntry('/b')
    const history = readHistory()
    expect(history[0].path).toBe('/b')
    expect(history[1].path).toBe('/a')
  })

  it('deduplicates consecutive same path', () => {
    pushEntry('/a')
    pushEntry('/a')
    expect(readHistory()).toHaveLength(1)
  })

  it('allows same path after different path', () => {
    pushEntry('/a')
    pushEntry('/b')
    pushEntry('/a')
    expect(readHistory()).toHaveLength(3)
  })

  it('stores timestamp close to now', () => {
    const before = Date.now()
    pushEntry('/x')
    const after = Date.now()
    const ts = readHistory()[0].timestamp
    expect(ts).toBeGreaterThanOrEqual(before)
    expect(ts).toBeLessThanOrEqual(after)
  })
})
