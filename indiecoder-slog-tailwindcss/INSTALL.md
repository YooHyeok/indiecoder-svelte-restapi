# Slog Tailwindcss

## 실행환경
> nodejs는 16이상의 LTS 버전을 사용하시길 권장합니다. 

### 프로젝트 clone degit
깃 리포지토리에서 파일만 복사해오는 도구인 degit 옵션을 사용한다.
- [indiecoder-slog-tailwindcss-template.git](https://github.com/YooHyeok/indiecoder-slog-tailwindcss-template.git)

#### npx 방식
설치 없이 실행 가능한 npm CLI 이다. 아래 명령을 통해 degit 패키지를 즉시 실행하여 GitHub 레포지토리를 다운로드한다.
```bash
npx degit YooHyeok/indiecoder-slog-tailwindcss-template#main indiecoder-slog-tailwindcss
```
- `./`: 현재 경로를 프로젝트로 지정  
  (`-/`가 아닌 프로젝트명을 기입할경우 디렉토리가 생성되고, 하위로 설치된다.)

#### npm 방식
degit을 로컬 또는 전역에 설치한 뒤 degit 명령을 통해 GitHub 레포지토리를 다운로드한다.
- digit 설치
  ```bash
  npm install -g degit
  ```
- GihHub 레포지토리 다운로드
  ```bash
   YooHyeok/indiecoder-slog-tailwindcss-template#main indiecoder-slog-tailwindcss
  ```
  - `./`: 현재 경로를 프로젝트로 지정  
    - `-/`가 아닌 프로젝트명을 기입할경우 디렉토리가 생성되고, 하위로 설치된다.
