<script>
  import Article from "./Article.svelte";
  import { onMount } from 'svelte'
  import { 
    articles, currentArticlesPage,
    loadingArticle, articlePageLock, articlesMode
   } from '../stores'
  import { router } from 'tinro'
  import InfiniteScroll from "./InfiniteScroll.svelte";
  
  /* 스크롤 정보를 담을 상태값 */
  let currentMode = $router.path.split("/")[2]

  onMount(() => {
    // articles.resetArticles()
    // articles.fetchArticles()
    articlesMode.changeMode(currentMode)
  })

</script>
<!-- articles.html -->
<!-- slog-list-wrap start-->
<div class="slog-list-wrap infiniteTarget">    
  <ul class="slog-ul">
    {#each $articles.articleList as article, index}
      <li class="mb-5">
        <Article {article} />
      </li>
    {/each}
  </ul>
  <InfiniteScroll 
    loading={$loadingArticle}
    pageLock={$articlePageLock}
    totalPageCount={$articles.totalPageCount}
    currentPage={$currentArticlesPage}
    domTarget={'.infiniteTarget'}
    on:onPageLock={() => articlePageLock.set(true)}
    on:increPage={() => currentArticlesPage.increPage()}
  />
</div><!-- slog-list-wrap end-->