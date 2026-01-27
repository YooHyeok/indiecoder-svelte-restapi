<script>
  import { Route } from 'tinro'
  import Articles from './pages/Articles.svelte';
  import Login from './pages/Login.svelte';
  import Register from './pages/Register.svelte';
  import NotFound from './pages/notFound.svelte';
  import { isLogin } from './stores';
</script>
<Route path="/" redirect="/articles/all" />
<Route path="/articles/*">
  <Route path="/all/*"><Articles/></Route>
  {#if $isLogin}
    <Route path="/my/*"><Articles/></Route>
    <Route path="/like/*"><Articles/></Route>
  {:else}
    <Route path="/my/*" redirect="/articles/all"/>
    <Route path="/like/*" redirect="/articles/all"><Articles/></Route>
  {/if}
</Route>