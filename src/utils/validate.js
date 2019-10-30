/* 手机号 */
// eslint-disable-next-line import/prefer-default-export
export function validataPhoneNumber(str) {
  const phoneReg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
  return phoneReg.test(str);
}
