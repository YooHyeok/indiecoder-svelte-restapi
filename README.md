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
src/components 디렉토리 하위에 10개 컴포넌트를 구성한다.  
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

# Router와 Tinro
<details>
<summary>접기/펼치기</summary>
<br>

svelte는 router를 기본적으로 제공하지 않는다.  
대신 다양한 기능의 router를 플러그인으로 설치할 수 있고, 개발자는 필요에 따라 라우터를 선별해서 사용하면 되며, 강의에서는 Tinro 라는 라우터 플러그인 패키지를 설치하여 사용한다.  
(svelte의 확장 프레임워크인 SvelteKit에는 라우터를 제공한다.)  

```bash
npm install -D tinro
```

## 디렉토리 및 파일 구성
src/pages 디렉토리 하위에 4개 컴포넌트를 구성한다.  
```
설치경로
├─ node_modules
├─ public
├─ scrtips
├─ src
│  ├─ components
│  ├─ pages // 디렉토리 생성(하위 포함)
│  │  ├─ Articles.svelte
│  │  ├─ Comments.svelte
│  │  ├─ Login.svelte
│  │  ├─ notFound.html.svelte
│  │  └─ Register.svelte
│  ├─ styles
│  │  └─ main.css
│  ├─ App.svelte
│  ├─ Main.svelte
│  └─ router.svelte // 생성
├─ package.json
└─ rollup.config.js
```

### [Articles.svelte](indiecoder-slog-svelte3-frontend/src/pages/Articles.svelte)
```svelte
<script>
  import ArticleHeader from "../components/ArticleHeader.svelte";
  import ArticleList from "../components/ArticleList.svelte";
  import ArticleAddForm from "../components/ArticleAddForm.svelte";
</script>

<ArticleHeader />
<main class="slog-main">
  <ArticleAddForm />
  <ArticleList />
</main>
```

### [Login.svelte](indiecoder-slog-svelte3-frontend/src/pages/Login.svelte)
```svelte
<script>
  import AuthHeader from "../components/AuthHeader.svelte";
  import AuthLogin from "../components/AuthLogin.svelte";
</script>
<AuthHeader />
<main class="auth-box">
  <AuthLogin />
</main>
```
### [Register.svelte](indiecoder-slog-svelte3-frontend/src/pages/Register.svelte)
```svelte
<script>
  import AuthHeader from "../components/AuthHeader.svelte";
  import AuthRegister from "../components/AuthRegister.svelte";
</script>
<AuthHeader />
<main class="auth-box">
  <AuthRegister />
</main>
```
### [notFound.svelte](indiecoder-slog-svelte3-frontend/src/pages/notFound.svelte)
indiecoder-slog-tailwindcss 프로젝트 dist 디렉토리 하위의 not-found.html 마크업 파일 기준으로 적용한다.  
```svelte
<!-- not-found.html -->
<!-- 404 page start -->
<div class="not-found-full-box">
  <h1>404 Not Found</h1>
</div><!-- 404 page end -->    
```


pages 디렉토리를 생성하고, 그 하위에 라우팅에 의해 화면에 표시되는 컴포넌트들을 주제별로 구성한다.  
pages 디렉토리와 동일한 레벨에 router.svelte를 생성한다.  
해당 컴포넌트에 라우팅과 관련된 코드가 작성된다.  

- [router.svelte](indiecoder-slog-svelte3-frontend/src/router.svelte)
  ```svelte
  <script>
    import { Route } from 'tinro'
    import Articles from './pages/Articles.svelte';
    import Login from './pages/Login.svelte';
    import Register from './pages/Register.svelte';
    import NotFound from './pages/notFound.svelte';
  </script>
  <Route path="/" redirect="/articles/all" />
  <Route path="/articles/*" ><Articles/></Route>
  <Route path="/login" ><Login/></Route>
  <Route path="/register" ><Register/></Route>
  <Route fallback ><NotFound/></Route>
  ```
trino로 부터 Route를 import하여 해당 컴포넌트를 선언하여 path 속성에 라우팅할 주소를, 해당 주소 요청이 들어오면 렌더링 할 컴포넌트를 Route 컴포넌트의 자식 컴포넌트로 지정해준다.  
기본주소로 접근하는 사용자에게는 redirect를 이용해 articles로 이동하게 설정한다.
comment의 경우 articles의 하위 라우터로 배치될 예정이므로 주소 끝에 *를 표시해 둔다.  

- [App.svelte](indiecoder-slog-svelte3-frontend/src/App.svelte)
  ```svelte
  <script>
    import Router from "./router.svelte";
  </script>
  <div class="main-comtainer">
    <Router />
  </div>
  ```
  App.svelte 컴포넌트에서 해당 컴포넌트를 import 하여 배치하면, 배치한 영역에 출력되게 된다.

- http://127.0.0.1:5173
- http://127.0.0.1:5173/login
- http://127.0.0.1:5173/register
- http://127.0.0.1:5173/임의의주소(notfound)

</details>
<br>

# Ajax 통신과 Axios
<details>
<summary>접기/펼치기</summary>
<br>

백엔드 서버와 REST API를 이용한 통신이 필요하다.  
자바스크립트에서 Ajax 통신을 하는 대표적 방법으로 fetch와 Axios가 있다.  

- fetch: 자바스크립트 기본 API
- Axios: 외부 플러그인
기본 fetch도 괜찮지만 Axios의 경우 좀 더 다양한 옵션들이 있어 서버와 통신하는 데 많은 편의성을 제공한다.  

## axios 설치
```bash
npm install axios
```

### 기본 사용 방법
```js
axios.get("http://localhost:3000/api/articles", {
  headers: {
    X-Auth-Token: '###'
  }
})
axios.get("http://localhost:3000/api/likes", {
  headers: {
    X-Auth-Token: '###'
  }
})
axios.post("http://localhost:3000/api/article", 
  {
    content: "###"
  },
  {
    headers: {
    X-Auth-Token: '###'
    }
  }
)
```

### 코드 공통화
해당 서비스의 정해진 보안 정책을 기준으로 api 호출 메소드를 공통화 시키면 아래와 같이 코드가 간결해진다.  
```js
getApi({path: '/articles'});
getApi({path: '/likes'});
const options = {
  path: '/articles',
  data: {
    email: '###'
  }
}
getApi(options);
```

#### [api.js](indiecoder-slog-svelte3-frontend/src/service/api.js)
```
설치경로
├─ node_modules
├─ public
├─ scrtips
├─ src
│  ├─ components
│  ├─ pages
│  ├─ service // 디렉토리 생성(하위 포함)
│  │  └─ api.js // 생성
│  ├─ styles
│  │  └─ main.css
│  ├─ App.svelte
│  ├─ Main.svelte
│  └─ router.svelte
├─ index.html
├─ package.json
└─ rollup.config.js
```

강의 코드에서는 headers 옵션에 `Access-Control-Allow-Origin`와 `Access-Control-Allow-Credencials` 이라는 CORS 관련 옵션을 요청 헤더에 담아 보내는데, 백엔드 서버에서 응답 헤더에 담아 반환하는 설정값이먀, SameSite의 경우 Cookie에 설정하는 값이기 때문에 백엔드에서 요청 헤더로 부터 꺼내서 다시 세팅하지 않는 이상 사실 이 헤더값은 무의미하다고 봐도 무방하다.  

</details>
<br>

# Template
<details>
<summary>접기/펼치기</summary>
<br>



</details>
<br>

# Template
<details>
<summary>접기/펼치기</summary>
<br>

</details>
<br>