<script lang="ts">
  import { afterNavigate } from '@sveltejs/kit'
  import { pushEntry } from '../../core/storage'
  import type { NavHistoryConfig } from '../../core/types'

  export let config: NavHistoryConfig | undefined = undefined

  afterNavigate(({ to }) => {
    if (to?.url) {
      pushEntry(to.url.pathname + to.url.search, config)
    }
  })
</script>
