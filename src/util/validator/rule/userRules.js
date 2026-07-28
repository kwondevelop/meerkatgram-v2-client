/**
 * 이메일 유효성 체크
 * @param {string} val 검증할 문자열 
 * @returns {string} 통과 시 빈 문자열(''), 실패 시 에러 메시지
 */

export const email = (val) => {
  const regex = /^[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}@[0-9a-zA-Z](?!.*?[\-\_\.]{2})[a-zA-Z0-9\-\_\.]{3,63}\.[a-zA-Z]{2,3}$/;
  if(!val) {
    return '이메일은 필수다';
  }
  if(!regex.test(val)) {
    return '이메일 형식이 올바르지 않다';
  }
  return '';
}

export const password = (val) => {
  const regex = /^[0-9a-zA-Z!@#$%^&*()]{8,20}$/;
  if(!val) {
    return '비밀번호는 필수다';
  }

  if(!regex.test(val)) {
    return '비밀번호 형식이 올바르지 않다\n영어 대소문자, 숫자, 특수문자(!, @, #, $, %, ^, &, *) 허용한다';
  }
  return '';
}

export const passwordCheck = (password, passwordCheck) => {
  if(!passwordCheck) {
    return '비밀번호 확인 필수다';
  }
  return password === passwordCheck ? '' : '비밀번호랑 비밀번호 일치하지 않는다';
}

export const nick = (val) => {
  const regex = /^[0-9a-zA-Z_]{2,20}$/;
  if(!val) {
    return '닉네임은 필수다';
  }

  if(!regex.test(val)) {
    return '닉네임 형식이 올바르지 않다\n영어 대소문자, 숫자, 언더바(_) 허용한다';
  }
  return '';
}

export const profile = (val) => {
  if(!val) {
    return '프로필은 필수다';
  }
  return '';
}