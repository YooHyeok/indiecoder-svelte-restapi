<script>
  import Router from "./router.svelte";
  import { onMount } from 'svelte'
  import { auth, isRefresh } from './stores'

  const refresh_time = 1000 * 60 * 14 // 14분

  onMount(() => {
    const onRefresh = setInterval(() => {
      if($isRefresh) {
        auth.refresh()
      } else {
        clearInterval(onRefresh)
      }
    }, refresh_time)
  })
</script>
<div class="main-comtainer">
  <!-- {#await auth.refresh() then}
    <Router />
  {/await} -->
  <Router /> <!-- main.js에서 refresh 적용 -->
</div>