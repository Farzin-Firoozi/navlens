export type { NavEntry, NavHistoryConfig, RouterAdapter } from './core/types'
export { getNavHistory, getPreviousPath, getCurrentPath, clearNavHistory } from './core/helpers'
export { pushEntry, readHistory, writeHistory } from './core/storage'

export { useNavigationHistory } from './hooks/react/index'
export { useVueNavigationHistory } from './hooks/vue/index'
export { createNavigationHandler } from './hooks/svelte/index'

export { NavigationTracker as ReactNavigationTracker } from './components/react/index'
export { NavigationTracker as VueNavigationTracker } from './components/vue/index'

export { useNextAdapter } from './adapters/next'
export { useReactRouterAdapter } from './adapters/react-router'
export { useVueRouterAdapter } from './adapters/vue-router'
export { useNuxtAdapter } from './adapters/nuxt'
export { useQuasarAdapter } from './adapters/quasar'
export { useGenericAdapter } from './adapters/generic'
export { useSvelteAdapter } from './adapters/svelte'
