<script>
  import Comment from "./Comment.svelte";
  import { onMount } from "svelte";
  import { meta, router } from "tinro";
  import { articleContent, comments, isLogin } from "../stores";
  import { contentValidate, extractErrors } from '../utils/validates';
  import dateView from '../utils/date';

  let errors = {}

  const route = meta()
  const articleId = Number(route.params.id)

  let values = {
    formContent: ''
  }

  onMount(() => {
    articleContent.getArticle(articleId)
    comments.fetchComments(articleId)
  })
  const goArticles = () => router.goto('/articles')
  const onAddComment = async () => {
    try {
      await contentValidate.validate(values, {abortEarly: false /* 오류 벌크/개별 처리 여부 - false=모든form검증 및 오류 발생 */})
      await comments.addComment(articleId, values.formContent)
    } catch (error) {
      errors = extractErrors(error)
      if (errors.formContent) alert (errors.formContent)
    }
  }
  </script>

<!-- comments.html -->
<!-- slog-comment-wrap start-->
<div class="slog-comment-wrap">    
  <!-- slog-comment-box start-->
  <div class="slog-comment-box" >
    <div class="comment-box-header ">
      <div class="content-box-header-inner-left" >
        <p class="p-user" >{$articleContent.userEmail}</p>
        <p class="p-date" >{dateView($articleContent.createdAt)}</p>
      </div>
    </div>
    
    <div class="comment-box-main ">
      <p class="whitespace-pre-line">{$articleContent.content}</p>
      <div class="inner-button-box ">
        <button class="button-base" on:click={goArticles}>글 목록 보기</button>
      </div>
    </div>
    
    <div class="commnet-list-box ">
      <h1 class="comment-title">Comments</h1>
      <ul class="my-5">
        {#each $comments as comment, index}
        <Comment {comment} {articleId}/>
        {/each}
      </ul>
    </div>
    {#if $isLogin}
    <div class="comment-box-bottom ">
      <textarea bind:value={values.formContent} class:wrong={errors.formContent} id="message" rows="5" class="slog-content-textarea " placeholder="내용을 입력해 주세요."></textarea>
      <div class="button-box-full">
        <button class="button-base" on:click={onAddComment}>입력</button>
      </div>
    </div>
    {/if}
  </div><!-- slog-comment-box end -->

</div><!-- slog-comment-wrap end-->
<style>
.wrong {
  border-bottom: 3px solid red;
}
</style>