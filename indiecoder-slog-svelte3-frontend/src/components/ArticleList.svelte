<script>
  import Article from "./Article.svelte";
  import ArticleLoading from "./ArticleLoading.svelte";
  import { onMount } from 'svelte'
  import { articles, currentArticlesPage } from '../stores'

  /* 스크롤 정보를 담을 상태값 */
  let component
  let element

  onMount(() => {
    articles.resetArticles()
    articles.fetchArticles()
  })
  
  $: {
    if (component) {
      element = component.parentNode
      element.addEventListener('scroll', onScroll)
      element.addEventListener('resize', onScroll)
    }
  }

  const onScroll = (e) => {
    const scrollHeight = e.target.scrollHeight // 스크롤 높이
    const clientHeight = e.target.clientHeight // 화면 높이
    const scrollTop = e.target.scrollTop // 현재 스크롤 위치
    const realHeight = scrollHeight - clientHeight // 실제 스크롤 높이
    const triggerHeight = realHeight * 0.7 // 화면 70%에 해당하는 높이(다음 페이지가 호출될 스크롤 위치)

    const triggerComputed = () => {
      return scrollTop > triggerHeight
    }
    const scrollTrigger = () => {
      return triggerComputed()
    }
    if (scrollTrigger()) {
      currentArticlesPage.increPage()
    }
  }

</script>
<!-- articles.html -->
<!-- slog-list-wrap start-->
<div class="slog-list-wrap" bind:this={component}>    
  <ul class="slog-ul">
    {#each $articles.articleList as article, index}
      <li class="mb-5">
        <Article {article} />
      </li>
    {/each}
  </ul>
</div><!-- slog-list-wrap end-->