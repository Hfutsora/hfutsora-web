import store from 'store';

const userToken = 'USER_TOKEN_KEY';

export function setToken(token) {
  store.set(userToken, token);
}

export function getToken() {
  return store.get(userToken);
}
