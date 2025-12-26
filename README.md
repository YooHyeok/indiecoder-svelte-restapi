# 프로젝트 구성 및 환경설정
<details>
<summary>접기/펼치기</summary>
<br>

## [Slog Fastify Prisma Server](indiecoder-slog-fastify-prisma-server/INSTALL.md)
## [Slog Svelte Frontend](indiecoder-slog-svelte3-frontend/INSTALL.md)
## [Slog Tailwindcss](indiecoder-slog-tailwindcss/INSTALL.md)

</details>
<br>

# 기본 레이아웃 컴포넌트 구성
<details>
<summary>접기/펼치기</summary>
<br>

## 디렉토리 및 파일 구성
```
설치경로
├─ node_modules
├─ public
├─ scrtips
├─ src
│  ├─ components // 디렉토리 생성(하위 포함)
│  │  ├─ Article.svelte
│  │  ├─ ArticleAddForm.svelte
│  │  ├─ ArticleEditForm.svelte
│  │  ├─ ArticlHeader.svelte
│  │  ├─ ArticlList.svelte
│  │  ├─ ArticlLoading.svelte
│  │  ├─ AuthHeader.svelte
│  │  ├─ AuthRegister.svelte
│  │  ├─ Comment.svelte
│  │  ├─ CommentList.svelte
│  ├─ styles
│  │  └─ main.css
│  ├─ App.svelte
│  └─ Main.svelte
├─ index.html
├─ package.json
└─ rollup.config.js
```

### 전역 css 적용
indiecoder-slog-tailwindcss 프로젝트 dist 디렉토리 하위의 [main.css](indiecoder-slog-tailwindcss/dist/main.css) 파일을  
indiecoder-slog-svelte3-frontend 프로젝트의 src/styles 디렉토리 하위로 복사한다.  

indiecoder-slog-svelte3-frontend 프로젝트의 [src/main.js](indiecoder-slog-svelte3-frontend/src/main.js) 파일(엔트리포인트)의 최상단에 해당 css 파일을 import한다
```js
import './styles/main.css'
```

### 컴포넌트 레이아웃 스케폴딩
indiecoder-slog-tailwindcss 프로젝트 dist 디렉토리 하위의 마크업 파일 기준으로 적용한다.   
각 컴포넌트는 아래 표의 Html파일의 주석의 시작과 끝에 해당하는 영역을 분리하여 구성한다.  

#### articles.html
| 컴포넌트                | HTML 파일      | 주석                                  |
| ---------------------- | ------------- | ------------------------------------ |
| Article.svelte         | articles.html | slog-content-box (start ~ end)       |
| ArticleAddForm.svelte  | articles.html | slog-addForm (start ~ end)           |
| ArticleEditForm.svelte | articles.html | slog-content-edit-form (start ~ end) |
| ArticleHeader.svelte   | articles.html | header (start ~ end)                 |
| ArticleList.svelte     | articles.html | slog-list-wrap (start ~ end)         |
| ArticleLoading.svelte  | articles.html | loading-box (start ~ end)            |

#### login.html
| 컴포넌트             | HTML 파일   | 주석                        |
| ------------------- | ---------- | -------------------------- |
| AuthHeader.svelte   | login.html | main-header (start ~ end)  |
| AuthLogin.svelte    | login.html | login-box (start ~ end)    |
| AuthRegister.svelte | login.html | register-box (start ~ end) |

#### comments.html
| 컴포넌트            | HTML 파일      | 주석                             |
| ------------------ | ------------- | ------------------------------- |
| Comment.svelte     | comments.html | comment (start ~ end)           |
| CommentList.svelte | comments.html | slog-comment-wrap (start ~ end) |

</details>
<br>

# Template
<details>
<summary>접기/펼치기</summary>
<br>

</details>
<br>