function setCookie(name, value, expires, path, domain, secure){
    var cookieName = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if(expires instanceof Date){
        cookieName += '; expires=' + expires;
    }
    if(path){
        cookieName += '; path=' + path;
    }
    if(domain){
        cookieName += '; domain=' + domain;
    }
    if(secure){
        cookieName += '; secure';
    }
    document.cookie=cookieName;
}
function getCookie(name){
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;

    if(cookieStart>-1){
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if(cookieEnd == -1){
            cookieEnd = document.cookie.length;
        }
        cookieValue = document.cookie.substring(cookieStart + cookieName.length , cookieEnd);
    }
    return cookieValue;
}

console.log(getCookie('email'));

console.log(getCookie('url'));
console.log(getCookie('user').toString());
function setCookieDate(day){
    var date = null;
    if(typeof day == 'number' && day>0){
        date = new Date();
        date.setDate(date.getDate()+day);
    }else{
        throw new Error('您传递的天数不合法！必须是数字且大于0');
    }
    return date.toGMTString();
}