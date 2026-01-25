<script>
  import { articles } from '../stores'
  import { contentValidate, extractErrors } from '../utils/validates';

  let errors = {}

  let values = {
    formContent: ''
  }
  const onAddArticle = async () => {
    try {
      await contentValidate.validate(values, {abortEarly: false /* 오류 벌크/개별 처리 여부 - false=모든form검증 및 오류 발생 */})
      await articles.addArticle(values.formContent)
    } catch (error) {
      errors = extractErrors(error)
      if (errors.formContent) alert (errors.formContent)
    }
  }
  const onCancelAddArticle = () => {
    values.formContent = ''
  }

</script>
<!-- articles.html -->
<!-- slog-addForm start -->
<div class="slog-add-content-box" >
  <div class="content-box-header ">
    <div class="flex" >
      <p>지금 여러분의 생각을 적어주세요.</p>
    </div>
  </div>
  <div class="content-box-main">
    <textarea bind:value={values.formContent} class:wrong={errors.formContent} id="message" rows="5" class="slog-content-textarea " placeholder="내용을 입력해 주세요."></textarea>
  </div>
  <div class="content-box-bottom">
    <div class="button-box">
      <button class="button-base" on:click={onAddArticle}>입력</button>
      <button class="button-base" on:click={onCancelAddArticle}>취소</button>
    </div>
  </div>
</div>
<!-- slog-addForm end -->
<style>
.wrong {
  border-bottom: 3px solid red;
}
</style>