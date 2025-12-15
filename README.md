# 프로젝트 구성 및 환경설정
<details>
<summary>접기/펼치기</summary>
<br>

## Slog Fastify Prisma Server
<details>
<summary>접기/펼치기</summary>
<br>

### 프로젝트 clone degit
깃 리포지토리에서 파일만 복사해오는 도구인 degit 옵션을 사용한다.
- [indiecoder-slog-fastify-prisma-server-template.git](https://github.com/YooHyeok/indiecoder-slog-fastify-prisma-server-template.git)


#### npx 방식
설치 없이 실행 가능한 npm CLI 이다. 아래 명령을 통해 degit 패키지를 즉시 실행하여 GitHub 레포지토리를 다운로드한다.
- `npx degit YooHyeok/indiecoder-slog-fastify-prisma-server-template#main indiecoder-slog-fastify-prisma-server`
  - `./`: 현재 경로를 프로젝트로 지정  
    - `-/`가 아닌 프로젝트명을 기입할경우 디렉토리가 생성되고, 하위로 설치된다.

#### npm 방식
degit을 로컬 또는 전역에 설치한 뒤 degit 명령을 통해 GitHub 레포지토리를 다운로드한다.
- `npm install -g degit`
- `degit YooHyeok/indiecoder-slog-fastify-prisma-server-template#main indiecoder-slog-fastify-prisma-server`
  - `./`: 현재 경로를 프로젝트로 지정  
    - `-/`가 아닌 프로젝트명을 기입할경우 디렉토리가 생성되고, 하위로 설치된다.

#### 설치 및 기동
- `npm install`
- `npm start`
- [Swagger UI](http://127.0.0.1:3000/documentation/static/index.html)
</details>
<br>

</details>
<br>