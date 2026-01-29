<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import ArticleLoading from "./ArticleLoading.svelte";

  export let totalPageCount
  export let currentPage
  export let pageLock
  export let loading
  export let domTarget

  const dispatch = createEventDispatcher();
  
  let component
  let element

  onMount(() => {
    component = document.querySelector(domTarget)
    element = component.parentNode
  })
  
  onDestroy(() => {
    if (element) {
      element.removeEventListener('scroll', onScroll)
      element.removeEventListener('resize', onScroll)
    }
  })

  $: {
    if (element) {
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
    const countCheck = () => {
      // const check = $articles.totalPageCount <= $currentArticlesPage 
      const check = totalPageCount <= currentPage
      return check
    }

    if(countCheck()) {// 전체 페이지보다 현재 호출된 페이지보다 작거나 같은 경우 조회 잠금
      // articlePageLock.set(true)
      dispatch('onPageLock')
    }
    
    const scrollTrigger = () => {
      return triggerComputed() && !countCheck() && !pageLock
    }
    if (scrollTrigger()) {
      dispatch('increPage')
    }
  }
</script>
 {#if loading}
    <ArticleLoading />
  {/if}
