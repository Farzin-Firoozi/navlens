<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { createNavigationHandler } from 'navlens/svelte'

  afterNavigate(createNavigationHandler())
</script>

<slot />
