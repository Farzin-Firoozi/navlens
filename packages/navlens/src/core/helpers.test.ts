import { describe, it, expect, beforeEach } from 'vitest'
import { getNavHistory, getPreviousPath, getCurrentPath, clearNavHistory } from './helpers'
import { writeHistory } from './storage'

const KEY = 'navlens_history'
const now = Date.now()

// oldest first, newest last
const mockHistory = [
  { path: '/', timestamp: now - 2000 },
  { path: '/products', timestamp: now - 1000 },
  { path: '/products/1', timestamp: now },
]

beforeEach(() => {
  sessionStorage.clear()
})

describe('getNavHistory', () => {
  it('returns empty array when no history', () => {
    expect(getNavHistory()).toEqual([])
  })

  it('returns stored history', () => {
    writeHistory(mockHistory)
    expect(getNavHistory()).toEqual(mockHistory)
  })
})

describe('getCurrentPath', () => {
  it('returns undefined when no history', () => {
    expect(getCurrentPath()).toBeUndefined()
  })

  it('returns last entry path (newest)', () => {
    writeHistory(mockHistory)
    expect(getCurrentPath()).toBe('/products/1')
  })
})

describe('getPreviousPath', () => {
  it('returns undefined when no history', () => {
    expect(getPreviousPath()).toBeUndefined()
  })

  it('returns undefined when only one entry', () => {
    writeHistory([{ path: '/a', timestamp: now }])
    expect(getPreviousPath()).toBeUndefined()
  })

  it('returns second-to-last entry path', () => {
    writeHistory(mockHistory)
    expect(getPreviousPath()).toBe('/products')
  })
})

describe('clearNavHistory', () => {
  it('clears history (writes empty array)', () => {
    writeHistory(mockHistory)
    clearNavHistory()
    expect(getNavHistory()).toEqual([])
  })

  it('respects custom storageKey', () => {
    sessionStorage.setItem('custom_key', JSON.stringify(mockHistory))
    clearNavHistory({ storageKey: 'custom_key' })
    const stored = sessionStorage.getItem('custom_key')
    expect(stored).toBe('[]')
  })
})
