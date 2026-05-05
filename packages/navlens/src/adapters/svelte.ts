import { goto } from '@sveltejs/kit'
import type { RouterAdapter } from '../core/types'

export function useSvelteAdapter(): RouterAdapter {
  const getFullPath = () => window.location.pathname + window.location.search + window.location.hash
  const back = () => history.back()
  const push = (path: string) => goto(path)

  return { getFullPath, back, push }
}
