var cookieindex = 0; //保存索引值
var valueName = "value"; //保存值的名字
var cookieName = "index"; //保存索引的名字
var saveCouts =5; //保存数据条目数
var isDao=false;//用于判断是否替换
(function() {
	//保存
	$("#save").click(function() {
		var valueNew = $("#inputvalue").val();
		if(StringIsEmpty(valueNew)) {
			return;
		}
		console.log(valueNew + "==输入框值");
		saveTwoCookie(valueName, valueNew, "/", 7, cookieindex)
		getCookieList(valueName);

	});
	//删除
	$("#clear").click(function() {
		clearCookie();
	})

})();
//判断是否空
function StringIsEmpty(Str) {
	if(Str == "" || typeof(Str) == "undefined") {
		alert("请输入内容");
		return true;
	} else {
		return false;
	}
}
//保存cookie索引值
function saveOneCookie(cd_name, value, isexpiress) {

	if(isexpiress == null || isexpiress != NaN) {
		isexpiress = 7; //默认7天过期
	}
	$.cookie(cd_name, value, {
		expiress: isexpiress
	});
};
//保存 要缓存数据的值
function saveTwoCookie(cd_name, value, isexpiress, pathCookie) {
	//第一步读取索引值
	var index = readIndex();
	console.log("索引值"+index+"::规定数"+saveCouts)
	if (isDao||index>=saveCouts) {//当保存的数据数大于规定的
//     if (index==0) {
//	   	isDao=false;
//	   } else{
//	   	isDao=true;
//	   }
	   savaReplaceData(cd_name,value,index,isexpiress,pathCookie);
       return;
	}
	
	if(isexpiress == null || isexpiress != NaN) {
		isexpiress = 7; //默认7天过期
	}

	if(pathCookie == null || pathCookie == "") {
		pathCookie = "/";
	}
	var valueOld = readcookie(valueName);
	console.log(valueOld);
	if(valueOld == "undefined" || valueOld == "") {
		valueOld = "";
	}
	value = valueOld + index + "=" + value + ";";
	console.log("保存值的内容为:" + value)
	$.cookie(cd_name, value, {　
		path: pathCookie,
		expiress: isexpiress
	});

	index++;
	//	把变化后的索引给保存
	saveOneCookie(cookieName, index, 7);

};
//	读取cookie
function readcookie(cd_name) {
	var value = $.cookie(cd_name);
	return value;
};
//  删除cookie
function clearCookie() {
	$.cookie(valueName, "");
	$.cookie(cookieName, "");
	cookieindex = 0;
	console.log("删除成功");
}

//  读取索引值
function readIndex() {
	//		第一次读取
	var index = readcookie(cookieName);
	var val=readcookie(valueName);
	var item = val.split(";")
	console.log(item.length+"第一获取存储的的长度")
	console.log(index+"读取index 值");
	if(typeof(index) == "undefined" || index == "") {
		index = cookieindex;
		saveOneCookie(cookieName, cookieindex, 7);
		console.log(index + "第一次赋值index ")
	};
	console.log(index+":======::"+cookieindex+isDao)
 
	if (item.length==(saveCouts+1)) {//
		isDao=true;
	}
	if(index > saveCouts) {
		index=saveCouts;
	}else if(isDao&&index==0){
		index=saveCouts;
		isDao=true;
	}
//	else if(!isDao) {
//    index = saveCouts;
//	}
	return index;

};
//  读取cookie遍历为list
function getCookieList(cd_name) {
	var list = new Array; //用来显示数据;
	var historyStr = readcookie(cd_name);
	var item = historyStr.split(";")
	
	for(var i = 0; i < item.length; i++) {
		var name = i + "=";
		var c = item[i].trim();
		if(c.indexOf(name) == 0)
			var items = c.substring(name.length, c.length);
		if(typeof(items) == "undefined") {
			return;
		}
		list[i] = items;
		console.log(items + "遍历后的数据" + i);
	}
	return list;

}
//  替换现有的数据
function savaReplaceData(cd_name, value,index, isexpiress, pathCookie) {

	 index--;//满足条件减一
	 console.log(index+"减一索引值"); 
   if(isexpiress == null || isexpiress != NaN) {
		isexpiress = 7; //默认7天过期
	}

	if(pathCookie == null || pathCookie == "") {
		pathCookie = "/";
	}
	
    var newcookie=readcookie(cd_name);
    
    console.log(newcookie+"读取要替待数据")
    
    var olddata= getItemCookie(cd_name,index)
    console.log("查找数据"+olddata)
    
    value= newcookie.replace(olddata,value)
    console.log(value+"替待前数据")
    $.cookie(cd_name, value, {　
		path: pathCookie,
		expiress: isexpiress
	});
	var val = readcookie(cd_name);
	console.log("代替后保存的数据:"+val);

//	把变化后的索引给保存
	
	console.log(index+"==替换的index值");
	saveOneCookie(cookieName, index, 7);
    var cout= readcookie(cookieName);
	console.log(cout+"查找替换还的index");
	
};

//  查找其中一个item值
 function getItemCookie(cd_name,index) {
 	var historyStr = readcookie(cd_name);
	var item = historyStr.split(";")
	console.log(item.length+"数据存满是的长度")
	for(var i = 0; i < item.length; i++) {
		var name = i + "=";
		var c = item[i].trim();
		if (i==index) {
			if(c.indexOf(name) == 0)
			var items = c.substring(name.length, c.length);
		if(typeof(items) == "undefined") {
			return;
		}
	     return items;
		console.log(index +" 对应的数据的数据" +items);
		}
		
	}
 }
