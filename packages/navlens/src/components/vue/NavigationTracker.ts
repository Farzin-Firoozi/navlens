import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useVueNavigationHistory } from '../../hooks/vue/useNavigationHistory'
import type { NavHistoryConfig } from '../../core/types'

export const NavigationTracker = defineComponent({
  name: 'NavigationTracker',
  props: {
    config: {
      type: Object as PropType<NavHistoryConfig>,
      default: undefined,
    },
  },
  setup(props) {
    useVueNavigationHistory(props.config)
    return () => null
  },
})
