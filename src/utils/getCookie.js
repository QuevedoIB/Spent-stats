export default function getCookie(keyword, cookies) {
  if (cookies.length > 0) {
    let c_start = cookies.indexOf(keyword + "=");
    if (c_start != -1) {
      c_start = c_start + keyword.length + 1;
      let c_end = cookies.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = cookies.length;
      }
      return unescape(cookies.substring(c_start, c_end));
    }
  }
  return "";
}
