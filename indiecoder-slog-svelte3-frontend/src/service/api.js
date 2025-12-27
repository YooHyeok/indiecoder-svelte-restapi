import axios from 'axios'

const send = async ({method='', path='', data={}, access_token=''} = {}) => {
  const commonUrl = 'http://localhost:3000'
  const url = commonUrl + path

  const headers = {
    "Access-Control-Allow-Origin": commonUrl, // cross domain 이슈 대응 옵션
    "Access-Control-Allow-Credentials": true, // 
    "content-type": "application/json;charset=UTF-8", // 송수신 데이터 타입
    "accept": "application/json,",
    "SameSite": "None", // 인증시 사용할 쿠키를 위한 설정
    "Authorization": access_token // 토큰정보 전송
  }
  const options = {
    method,
    url,
    headers,
    data,
    withCredentials: true, // 프론트,백엔드 서버의 포트가 다른 형태에 서버 쿠키를 공유하기 위한 설정
  }

  try {
    const response = await axios(options);
    return response.data
  } catch (error) {
    throw error
  }
}

const getApi = ({path='', access_token=''} = {}) => {
  return send({method: 'GET', path, access_token})
}
const putApi = ({path='', data={} access_token=''} = {}) => {
  return send({method: 'PUT', path, data, access_token})
}
const postApi = ({path='', data={} access_token=''} = {}) => {
  return send({method: 'POST', path, data, access_token})
}
const delApi = ({path='', data={} access_token=''} = {}) => {
  return send({method: 'DELETE', path, data, access_token})
}
export {
  getApi,
  putApi,
  postApi,
  delApi
}