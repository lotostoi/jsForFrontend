const LOCAL_ACCESS_NAME = 'accessToken';
const LOCAL_REFRESH_NAME = 'refreshToken';
const LOCAL_ACCESS_EXP = 'accessExp';
const LOCAL_ACCESS_USERNAME = 'userName';

function setTokens(access, refresh) {
  let accessData = getJWTPayload(access);
  localStorage.setItem(LOCAL_ACCESS_NAME, access);
  localStorage.setItem(LOCAL_REFRESH_NAME, refresh);
  localStorage.setItem(LOCAL_ACCESS_EXP, accessData.exp);
  localStorage.setItem(LOCAL_ACCESS_USERNAME, accessData.userName);
  return accessData;
}

function cleanTokensData() {
  localStorage.removeItem(LOCAL_ACCESS_NAME);
  localStorage.removeItem(LOCAL_REFRESH_NAME);
  localStorage.removeItem(LOCAL_ACCESS_EXP);
  localStorage.removeItem(LOCAL_ACCESS_USERNAME);
}

function getAccessToken() {
  // null, exp ...
  return localStorage.getItem(LOCAL_ACCESS_NAME);
}

function getRefreshToken() {
  return localStorage.getItem(LOCAL_REFRESH_NAME);
}

function getJWTPayload(token) {
  return parseJWT(token).payload;
}

function parseJWT(token) {
  let parts = token.split('.');

  return {
    header: parsePart(parts[0]),
    payload: parsePart(parts[1]),
    sign: parts[2],
  };
}

function parsePart(str) {
  return JSON.parse(atob(str));
}

export {
  setTokens,
  cleanTokensData,
  getJWTPayload,
  getAccessToken,
  getRefreshToken,
};
