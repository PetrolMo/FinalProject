export function strpScript (str) {
  let patter = new RegExp(
    "[`~!@#$%^&*()_\\-+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"
  );
  let rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.sub(i, 1).replace(patter, "");
  }
  return rs;
}
/* 验证邮箱 */
export function validateVEmail (value) {
  let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return !reg.test(value) ? true : false;
}

/* 验证密码 6-20位，包含大小写字母和数字*/
export function validateVPassword (value) {
  let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,20}$/;
  return !reg.test(value) ? true : false;
}

/* 验证验证码 6位验证码，包含数字字母*/
export function validateVCheckCode (value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}