import { useLocation, useNavigate } from 'react-router-dom'
import type { RouterAdapter } from '../core/types'

export function useReactRouterAdapter(): RouterAdapter {
  const location = useLocation()
  const navigate = useNavigate()

  return {
    getFullPath: () => location.pathname + location.search,
    back: () => navigate(-1),
    push: (path) => navigate(path),
  }
}
