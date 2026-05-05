<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import { createNavigationHandler } from 'navlens'

  afterNavigate(createNavigationHandler())
</script>

<slot />
