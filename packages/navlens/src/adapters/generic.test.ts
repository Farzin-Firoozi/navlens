import { describe, it, expect, beforeEach } from 'vitest'
import { useGenericAdapter } from './generic'

describe('useGenericAdapter', () => {
  it('getFullPath returns pathname + search + hash', () => {
    const adapter = useGenericAdapter()
    const path = adapter.getFullPath()
    // jsdom default: 'http://localhost/'
    expect(typeof path).toBe('string')
    expect(path).toBe(window.location.pathname + window.location.search + window.location.hash)
  })

  it('returns RouterAdapter shape', () => {
    const adapter = useGenericAdapter()
    expect(typeof adapter.getFullPath).toBe('function')
    expect(typeof adapter.back).toBe('function')
    expect(typeof adapter.push).toBe('function')
  })
})
