var cookie = 0; //默认cookiec从零开始保存最多保存10;

function save_cookie(c_name, value, expiredays, isclear) {
	var a = document.cookie.length;
	console.log(a + "cooke长度");

	if(cookie > 10) {
		return;
	}
	value = cookie + ":" + value + ";";
	value = getCookie(c_name) + value;
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())

	console.log("保存成功" + "==js" + cookie);
	if(isclear) {
		return;
	}
	cookie++;

	console.log("保存成功" + "==js" + cookie);
}

function getCookie(c_name) {
	if(document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if(c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if(c_end == -1) c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return "";
}

function getListcookie(c_name) {
	var stringcok = getCookie(c_name);
}

function romeverCookie(ck_name) {
	if(document.cookie.length > 0) {
		save_cookie(ck_name, "", -1, true);
		cookie = 0;
		console.log("删除成功");
	}

}