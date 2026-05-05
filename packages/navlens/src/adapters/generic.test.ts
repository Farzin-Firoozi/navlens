import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useGenericAdapter } from './generic'

beforeEach(() => {
  // jsdom sets window.location to 'about:blank' by default
  vi.stubGlobal('location', {
    pathname: '/products',
    search: '?page=2',
    hash: '',
  })
})

describe('useGenericAdapter', () => {
  it('getFullPath returns pathname + search + hash', () => {
    const adapter = useGenericAdapter()
    expect(adapter.getFullPath()).toBe('/products?page=2')
  })

  it('push calls window.history.pushState', () => {
    const pushState = vi.spyOn(window.history, 'pushState')
    const adapter = useGenericAdapter()
    adapter.push('/new-path')
    expect(pushState).toHaveBeenCalledWith(null, '', '/new-path')
    pushState.mockRestore()
  })

  it('back calls window.history.back', () => {
    const back = vi.spyOn(window.history, 'back').mockImplementation(() => {})
    const adapter = useGenericAdapter()
    adapter.back()
    expect(back).toHaveBeenCalled()
    back.mockRestore()
  })
})
