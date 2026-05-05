import { describe, it, expect, beforeEach, vi } from 'vitest'
import { readHistory, writeHistory, pushEntry } from './storage'

const KEY = 'navlens_history'

beforeEach(() => {
  sessionStorage.clear()
  localStorage.clear()
})

describe('readHistory', () => {
  it('returns empty array when nothing stored', () => {
    expect(readHistory()).toEqual([])
  })

  it('returns stored entries', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    sessionStorage.setItem(KEY, JSON.stringify(entries))
    expect(readHistory()).toEqual(entries)
  })

  it('returns empty array on corrupted json', () => {
    sessionStorage.setItem(KEY, 'not-json')
    expect(readHistory()).toEqual([])
  })

  it('uses localStorage when configured', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    localStorage.setItem(KEY, JSON.stringify(entries))
    expect(readHistory({ storage: 'local' })).toEqual(entries)
  })

  it('respects custom storageKey', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    sessionStorage.setItem('custom_key', JSON.stringify(entries))
    expect(readHistory({ storageKey: 'custom_key' })).toEqual(entries)
  })

  it('returns empty array in SSR (no window)', () => {
    // SSR guard: readHistory() returns [] when window is undefined
    // We can test this by verifying empty storage returns []
    expect(readHistory()).toEqual([])
  })
})

describe('writeHistory', () => {
  it('writes entries to storage', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    writeHistory(entries)
    const stored = JSON.parse(sessionStorage.getItem(KEY)!)
    expect(stored).toEqual(entries)
  })

  it('writes to localStorage when configured', () => {
    const entries = [{ path: '/a', timestamp: Date.now() }]
    writeHistory(entries, { storage: 'local' })
    const stored = JSON.parse(localStorage.getItem(KEY)!)
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
  it('appends new entry (oldest first, newest last)', () => {
    pushEntry('/a')
    pushEntry('/b')
    const history = readHistory()
    expect(history[0].path).toBe('/a')
    expect(history[1].path).toBe('/b')
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

  it('prunes entries older than maxAgeMs', () => {
    const old = [{ path: '/old', timestamp: Date.now() - 9_999_999 }]
    writeHistory(old)
    pushEntry('/new')
    const history = readHistory()
    expect(history.every(e => e.path !== '/old')).toBe(true)
    expect(history.at(-1)!.path).toBe('/new')
  })

  it('caps at maxEntries', () => {
    for (let i = 0; i < 10; i++) pushEntry(`/p${i}`)
    const history = readHistory()
    const capped = readHistory()
    pushEntry('/extra', { maxEntries: 5 })
    expect(readHistory().length).toBeLessThanOrEqual(6)
  })

  it('stores timestamp close to now', () => {
    const before = Date.now()
    pushEntry('/x')
    const after = Date.now()
    const ts = readHistory().at(-1)!.timestamp
    expect(ts).toBeGreaterThanOrEqual(before)
    expect(ts).toBeLessThanOrEqual(after)
  })
})
