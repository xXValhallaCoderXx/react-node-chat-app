interface CreateCookie {
  name: string;
  value: string;
  expiryDays: number;
}

export const setCookie = ({ name, value, expiryDays }: CreateCookie) => {
  var date = new Date();
  date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + value + '; expires=' + date.toUTCString();
};

interface GetCookie {
  name: string;
}

export const getCookie = ({ name }: GetCookie) => {
  var cname = name + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return '';
};
