import { writable, get } from 'svelte/store'
import { getApi, putApi, delApi, postApi } from '../service/api.js'
import { router } from 'tinro'

/** 게시물 스크롤시 페이지 증가 */
function setCurrentArticlesPage() {}

/**
 * 서비스의 가장 메인이 되는 스토어  
 * articles 라는 게시물 목록이 쌓이게 되고, 게시물의 수정 삭제 등과 관련된 사용자정의 메소드와
 * 좋아요나 코멘트를 추가했을 때 상태를 변경해주는 사용자 정의 메소드 등을 갖게 된다.
 */
function setArticles() {}
/** 게시물 데이터를 조회할 때 서버와 통신중이라면 로딩상태를 표시하는 기능을 하는 스토어 */
function setLoadingArticle() {}
/** 게시물 단건에 대한 정보만을 담을 스토어 */
function setArticleContent() {}
/** 
 * 특정 게시물의 Comment를 담을 스토어
 * 코멘트 추가, 수정, 삭제 등을 처리하는 사용자정의 메소드를 가진다.
 */
function setComments() {}
/**
 * 로그인된 유저의 정보를 담는 스토어
 * 로그인, 로그아웃, 회원가입 등의 사용자정의 메소드를 가진다.
 */
function setAuth() {}
/**
 * 보기 상태를 나타내는 스토어
 * 보기 모드: [모두보기, 좋아요보기, 내글보기]
 */
function setArticlesMode() {}
/** 로그인 상태여부 확인 스토어 */
function setIsLogin() {}

export const currentArticlesPage = setCurrentArticlesPage()
export const articles = setArticles()
export const loadingArticle = setLoadingArticle()
export const articleContent = setArticleContent()
export const comments = setComments()
export const auth = setAuth()
export const articlesMode = setArticlesMode()
export const isLogin = setIsLogin()