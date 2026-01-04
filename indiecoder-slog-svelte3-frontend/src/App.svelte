<script>
  import Router from "./router.svelte";
  // import { auth } from './stores'
</script>
<div class="main-comtainer">
  <!-- {#await auth.refresh() then}
    <Router />
  {/await} -->
  <Router /> <!-- main.js에서 refresh 적용 -->
</div>