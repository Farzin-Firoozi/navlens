import { useRoute, useRouter } from 'vue-router'
import type { RouterAdapter } from '../core/types'

export function useVueRouterAdapter(): RouterAdapter {
  const route = useRoute()
  const router = useRouter()

  return {
    getFullPath: () => route.fullPath,
    back: () => router.back(),
    push: (path) => router.push(path),
  }
}
