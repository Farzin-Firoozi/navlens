import { Suspense } from 'react'
import { useNavigationHistory } from '../../hooks/react/useNavigationHistory'
import type { RouterAdapter, NavHistoryConfig } from '../../core/types'

interface Props {
  adapter: RouterAdapter
  config?: NavHistoryConfig
}

function Tracker({ adapter, config }: Props) {
  useNavigationHistory(adapter, config)
  return null
}

export function NavigationTracker(props: Props) {
  return (
    <Suspense fallback={null}>
      <Tracker {...props} />
    </Suspense>
  )
}
