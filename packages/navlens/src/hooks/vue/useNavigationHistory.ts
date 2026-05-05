import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { pushEntry } from '../../core/storage'
import type { NavHistoryConfig } from '../../core/types'

export function useVueNavigationHistory(config?: NavHistoryConfig): void {
  const route = useRoute()
  watch(
    () => route.fullPath,
    (path) => pushEntry(path, config),
    { immediate: true },
  )
}
