import { writable, get, derived } from 'svelte/store'
import { getApi, putApi, delApi, postApi } from '../service/api.js'
import { router } from 'tinro'

/** 게시물 스크롤시 페이지 증가 */
function setCurrentArticlesPage() {

  const { subscribe, update, set } = writable(1)

  const resetPage = () => set(1)
  const increPage = () => {
    update(data => data = data + 1) // 페이지 번호 증가
    articles.fetchArticles(); // 게시글 목록 호출
  }

  return {
    subscribe,
    resetPage,
    increPage
  }
}

/**
 * 서비스의 가장 메인이 되는 스토어  
 * articles 라는 게시물 목록이 쌓이게 되고, 게시물의 수정 삭제 등과 관련된 사용자정의 메소드와
 * 좋아요나 코멘트를 추가했을 때 상태를 변경해주는 사용자 정의 메소드 등을 갖게 된다.
 */
function setArticles() {
  let initValues = {
    articleList: [],
    totalPageCount: 0,
    menuPopup: '',
    editMode: ''
  }

  const { subscribe, update, set } = writable({ ...initValues })

  /** 선택된 페이지 데이터 조회(페이지 증가시 호출) */
  const fetchArticles = async () => {
    const currentPage = get(currentArticlesPage) // 다른 store에서 값을 참조하는 경우 혹은 svelte파일이 아닌 일반 js 모듈에서 store값을 참조하는 경우 get을 사용
    loadingArticle.turnOnLoading()
    let path = `/articles/?pageNumber=${currentPage}`
    try {
      const access_token = get(auth).Authorization
      const options = {
        path: path,
        access_token: access_token
      }
      const getDatas = await getApi(options)
      const newData = {
        articleList: getDatas.articleList,
        totalPageCount: getDatas.totalPageCount,
      }
      update(datas => {
        if (currentPage == 1) {
          datas.articleList = newData.articleList
          datas.totalPageCount = newData.totalPageCount
        } else {
          const newArticles = [...datas.articleList, ...newData.articleList]
          datas.articleList = newArticles
          datas.totalPageCount = newData.totalPageCount
        }
        return datas
      })
      loadingArticle.turnOffLoading()
    } catch (error) {
      loadingArticle.turnOffLoading()
      throw error
    }
  }
  /** 게시글 목록 초기화(페이지번호 초기화) */
  const resetArticles = () => {
    set({ ...initValues })
    currentArticlesPage.resetPage()
    articlePageLock.set(false)
  }

  const addArticle = async (content) => {
    const access_token = get(auth).Authorization
    try {
      const options = {
        path: "/articles",
        data: {
          content: content
        },
        access_token: access_token
      }
      const newArticles = await postApi(options)
      update(datas => {
        datas.articleList = [newArticles, ...datas.articleList]
        return datas;
      })
    } catch (error) {
      throw error;
    }
  }

  const openMenuPopup = (id) => {
    update(datas => {
      datas.menuPopup = id
      return datas
    })
  }
  const closeMenuPopup = () => {
    update(datas => {
      datas.menuPopup = ''
      return datas
    })
  }

  const openEditModeArticle = (id) => {
    articles.closeMenuPopup()

    update(datas => {
      datas.editMode = id
      return datas
    })
  }

  const closeEditModeArticle = () => {
    update(datas => {
      datas.editMode = ''
      return datas
    })
  }

  const updateArticle = async (article) => {
    const access_token = get(auth).Authorization

    try {
      const updateData = {
        articleId: article.id,
        content: article.content
      }

      const options = {
        path: '/articles',
        data: updateData,
        access_token: access_token
      }

      const updateArticle = await putApi(options)

      update(datas => {
        const newArticleList = datas.articleList.map(article => {
          if (article.id === updateArticle.id) {
            article = updateArticle
          }
          return article // 수정된 게시글 id가 수정 대상 id와 일치할 경우 게시글정보를 수정 완료된 정보로 수정
        })
        datas.articleList = newArticleList
        return datas;
      })
      articles.closeEditModeArticle()
      alert('수정이 완료되었습니다.')
    } catch (error) {
      alert('수정중에 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const deleteArticle = async (id) => {
    const access_token = get(auth).Authorization
    console.log(access_token)
    try {
      const options = {
        path: `/articles/${id}`,
        access_token: access_token
      }

      await delApi(options)
      update(datas => {
        const newArticleList = datas.articleList.filter(article => article.id != id)
        datas.articleList = newArticleList // 현재 id를 제외한 게시글목록으로 수정
        return datas
      })
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.")  
    }
  }

  const increArticleCommentCount = (articleId) => {
    update(datas => {
      const newArticleList = datas.articleList.map(article => {
        if (article.id === articleId) {
          article.commentCount = article.commentCount + 1
        }
        return article
      })
      datas.articleList = newArticleList
      return datas
    })
  }

  const decreArticleCommentCount = (articleId) => {
    update(datas => {
      const newArticleList = datas.articleList.map(article => {
        if (article.id === articleId) {
          article.commentCount = article.commentCount - 1
        }
        return article
      })
      datas.articleList = newArticleList
      return datas
    })
  }

  const likeArticle = async (articleId) => {
    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/likes/add/${articleId}`,
        access_token: access_token
      }

      await postApi(options)
      update(datas => {
        const newArticles = datas.articleList.map(article => {
          if (article.id === articleId) {
            article.likeCount = article.likeCount + 1
            article.likeMe = true
          }
          return article
        })
        datas.articleList = newArticles
        return datas;
      })

    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  const cancelLikeArticle = async (articleId) => {
    const access_token = get(auth).Authorization

    try {
      const options = {
        path: `/likes/cancel/${articleId}`,
        access_token: access_token
      }

      await postApi(options)
      update(datas => {
        const newArticles = datas.articleList.map(article => {
          if (article.id === articleId) { // 좋아요 갯수 증가 및 사용자 좋아요 여부 수정
            article.likeCount = article.likeCount - 1
            article.likeMe = false
          }
          return article
        })
        datas.articleList = newArticles
        return datas;
      })

    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }
  
  return {
    subscribe,
    fetchArticles,
    resetArticles,
    addArticle,
    openMenuPopup,
    closeMenuPopup,
    openEditModeArticle,
    closeEditModeArticle,
    updateArticle,
    deleteArticle,
    increArticleCommentCount,
    decreArticleCommentCount,
    likeArticle,
    cancelLikeArticle
  }
}
/** 게시물 데이터를 조회할 때 서버와 통신중이라면 로딩상태를 표시하는 기능을 하는 스토어 */
function setLoadingArticle() {
  const { subscribe, set } = writable(false)
  const turnOnLoading = () => {
    set(true)
    articlePageLock.set(true)
  }
  const turnOffLoading = () => {
    set(false)
    articlePageLock.set(false)
  }
  return {
    subscribe,
    turnOnLoading,
    turnOffLoading
  }
}

/** 게시물 단건에 대한 정보만을 담을 스토어 */
function setArticleContent() {
  let initValues = {
    id:'',
    userId:'',
    userEmail:'',
    content:'',
    createdAt:'',
    commentCount:0,
    likeCount: 0,
    likeUsers: []
  }

  const { subscribe, set } = writable({...initValues})

  const getArticle = async (id) => {
    try {
      const options = {
        path: `/articles/${id}`
      }
      const getData = await getApi(options)
      set(getData)
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    getArticle
  }
}

/** 
 * 특정 게시물의 Comment를 담을 스토어
 * 코멘트 추가, 수정, 삭제 등을 처리하는 사용자정의 메소드를 가진다.
 */
function setComments() {
  const { subscribe, update, set } = writable([])
  const fetchComments = async (id) => {
    try {
      const options = {
        path: `/comments/${id}`
      }
      const getDatas = await getApi(options)
      set(getDatas.comments)
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }
  const addComment = async (articleId, commentContent) => {
    const access_token = get(auth).Authorization;
    try {
      const options = {
        path: `/comments`,
        data: {
          articleId: articleId,
          content: commentContent
        },
        access_token: access_token
      }
      const newData = await postApi(options)
      update(datas => [...datas, newData])
      articles.increArticleCommentCount(articleId)
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }
  const deleteComment = async (commentId, articleId) => {
    const access_token = get(auth).Authorization;
    try {
      const options = {
        path: `/comments`,
        data: {
          commentId: commentId,
          articleId: articleId,
        },
        access_token: access_token
      }
      await delApi(options)
      update(datas => datas.filter(comment => comment.id !== commentId))
      articles.decreArticleCommentCount(articleId)
      alert('코멘트가 삭제 되었습니다.')
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    fetchComments,
    addComment,
    deleteComment,
  }
}
/**
 * 로그인된 유저의 정보를 담는 스토어
 * 로그인, 로그아웃, 회원가입 등의 사용자정의 메소드를 가진다.
 */
function setAuth() {
  let initValues = {
    id: '',
    email: '',
    Authorization: ''
  }
  const { subscribe, set, update } = writable({ ...initValues })
  const refresh = async () => {
    try {
      const authenticationUser = await postApi({ path: '/auth/refresh' })
      set(authenticationUser) // Authorization(AccessToken) 초기화
      isRefresh.set(true)
    } catch (error) {
      auth.resetUserInfo() // 정상이 아닐경우 폴백 (auth store 초기화)
      isRefresh.set(false)
    }
  }
  const resetUserInfo = () => set({ ...initValues })
  const login = async (email, password) => {
    try {
      const options = {
        path: '/auth/login',
        data: {
          email: email,
          pwd: password
        }
      }
      const result = await postApi(options)
      set(result) // Authorization(AccessToken) 초기화
      isRefresh.set(true) // refresh 호출여부 on
      router.goto('/articles') // 라우터의 goto를 이용하여 게시글 목록 화면으로 이동
    } catch (error) {
      alert('오류가 발생했습니다. 로그인을 다시 시도해 주세요.')
    }
  }
  const logout = async () => {
    try {
      const options = {
        path: '/auth/logout'
      }
      await delApi(options)
      set({ ...initValues })
      isRefresh.set(false) // refresh 호출여부 off
      router.goto('/') // 라우터의 goto를 이용하여 메인 화면으로 이동
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해 주세요.')
    }
  }
  const register = async (email, password) => {
    try {
      const options = {
        path: '/auth/register',
        data: {
          email: email,
          pwd: password
        }
      }
      await postApi(options)
      alert('가입이 완료되었습니다.')
      router.goto('/login') // 라우터의 goto를 이용하여 로그인 화면으로 이동
    } catch (error) {
      alert('오류가 발생했습니다. 로그인을 다시 시도해 주세요.')
    }
  }

  return {
    subscribe,
    refresh,
    login,
    logout,
    resetUserInfo,
    register
  }
}
/**
 * 보기 상태를 나타내는 스토어
 * 보기 모드: [모두보기, 좋아요보기, 내글보기]
 */
function setArticlesMode() {}
/** 로그인 상태여부 확인 스토어 */
function setIsLogin() {
  // const checkLogin = derived(auth, $auth => $auth.Authorization ? true : false)
  const checkLogin = derived(auth, $auth => {
    return $auth.Authorization ? true : false
  })
  return checkLogin;
}

export const currentArticlesPage = setCurrentArticlesPage()
export const articles = setArticles()
export const articlePageLock = writable(false)
export const loadingArticle = setLoadingArticle()
export const articleContent = setArticleContent()
export const comments = setComments()
export const auth = setAuth()
export const articlesMode = setArticlesMode()
export const isLogin = setIsLogin()
export const isRefresh = writable(false)