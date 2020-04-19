export function userAcceptsCookies () {
  return Boolean(getCookie('user-accepts-cookies'));
}

export function setAcceptanceCookie () {
  return setCookie('user-accepts-cookies', true, null, true);
}

export function getCookie (name) {
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

export function setCookie (name, value, days, overridePermission) {
  if (!userAcceptsCookies() && !overridePermission) {
    return;
  }

  const expires = days
    ? `; expires=${(() => {
      const d = new Date();
      d.setDate(d.getDate() + days);
      return d;
    })().toUTCString()}`
    : '';

  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

export function clearCookie (name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
