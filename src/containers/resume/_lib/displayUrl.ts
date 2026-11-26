/** 종이에 적는 주소 (프로토콜·www 없이, 짧게) */
export function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
