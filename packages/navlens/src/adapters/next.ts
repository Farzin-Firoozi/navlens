import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import type { RouterAdapter } from '../core/types'

export function useNextAdapter(): RouterAdapter {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  return {
    getFullPath: () => {
      const qs = searchParams.toString()
      return qs ? `${pathname}?${qs}` : pathname
    },
    back: () => router.back(),
    push: (path) => router.push(path),
  }
}
