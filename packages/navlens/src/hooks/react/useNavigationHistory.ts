import { useEffect, useRef } from 'react'
import { pushEntry } from '../../core/storage'
import type { RouterAdapter, NavHistoryConfig } from '../../core/types'

export function useNavigationHistory(adapter: RouterAdapter, config?: NavHistoryConfig): void {
  const path = adapter.getFullPath()
  const configRef = useRef(config)
  configRef.current = config

  useEffect(() => {
    pushEntry(path, configRef.current)
  }, [path])
}
