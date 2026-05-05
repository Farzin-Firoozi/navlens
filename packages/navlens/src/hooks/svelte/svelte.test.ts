import { describe, it, expect, beforeEach } from 'vitest'
import { createNavigationHandler } from './index'
import { readHistory } from '../../core/storage'

beforeEach(() => {
  sessionStorage.clear()
})

describe('createNavigationHandler', () => {
  it('returns a function', () => {
    expect(typeof createNavigationHandler()).toBe('function')
  })

  it('pushes pathname + search on navigation', () => {
    const handler = createNavigationHandler()
    handler({ to: { url: new URL('http://localhost/products?page=2') } })
    const history = readHistory()
    expect(history[0].path).toBe('/products?page=2')
  })

  it('does nothing when to is null', () => {
    const handler = createNavigationHandler()
    handler({ to: null })
    expect(readHistory()).toEqual([])
  })

  it('respects config passed to handler factory', () => {
    const handler = createNavigationHandler({ storageKey: 'custom_svelte_key' })
    handler({ to: { url: new URL('http://localhost/home') } })
    const stored = sessionStorage.getItem('custom_svelte_key')
    expect(stored).not.toBeNull()
    const history = JSON.parse(stored!)
    expect(history[0].path).toBe('/home')
  })
})
