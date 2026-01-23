import * as yup from 'yup'
export const contentValidate = yup.object().shape({
  formContent: yup.string().required('내용을 입력해 주세요.').label('내용')
})
export const loginValidate = yup.object().shape({
  formEmail: yup.string().required('이메일을 입력해 주세요.').email('이메일 형식이 잘 못 되었습니다.').label('이메일'),
  formPassword: yup.string().required('패스워드를 입력해 주세요.').label('패스워드')
})
export const registerValidate = yup.object().shape({
  formEmail: yup.string().required('이메일을 입력해 주세요.').email('이메일 형식이 잘 못 되었습니다.'),
  formPassword: yup.string().required('패스워드를 입력해 주세요.'),
  formPasswordConfirm: yup.string().required('패스워드확인을 입력해 주세요.')
    .oneOf([yup.ref('formPassword'), null], '패스워드와 패스워드 확인이 일치하지 않습니다.')
    .label('패스워드 확인')
})

/**
 * extractErrors  
 * form마다 발생되는 오류를 reduce를 이용해 한 번에 모아주는 역할을 하는 함수이다.  
 * 이렇게 모아야 한번에 오류가 난 form들을 표시할 수 있다.  
 */
export const extractErrors = error => { // 
  return error.inner.reduce((acc, error) => {
    return {...acc, [error.path]: error.message}
  }, {})
}