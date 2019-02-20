/** 
 * 2. JavaScript数据类型及语言基础
 */




//  2-1 实践判断各种数据类型的方法
// 判断 arr 是否为一个数组，返回一个 boolean 值
function isArray(arr) {
	return Array.isArray && Array.isArray(arr) || Object.prototype.toString.call(arr) == "[object Array]";
}

// 判断 fn 是否为一个函数，返回一个 boolean 值
function isFunction(fn) {
	return typeof (fn) == "function"
}

// 判断综合
function returnType(value) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}




// 2-2 了解值类型和引用类型的区别，了解各种对象的读取、遍历方式
// 实现深拷贝，源对象限制为数字、字符串、布尔、日期、数组、Object对象
function deepClone1(sourceObj) {
	var targetType = Object.prototype.toString.call(sourceObj).slice(8, -1).toLowerCase(), cacheObj = null;
	switch (targetType) {
		case "number":
		case "string":
		case "boolean":
			cacheObj = sourceObj;
			break;
		case "array":
			cacheObj = [];
			for (var i = 0; i < sourceObj.length; i++) {
				cacheObj[ i ] = deepClone1(sourceObj[ i ]);
			}
			break;
		case "object":
		case "date":
			cacheObj = {};
			for (var key in sourceObj) {
				if (sourceObj.hasOwnProperty(key)) {
					cacheObj[ key ] = deepClone1(sourceObj[ key ]);
				}
			}
			break;
		default:
			break;
	}
	return cacheObj;
}

var deepClone2 = function (obj) {
	var cacheValue;
	if (Object.prototype.toString.call(obj) === "[object Array]") {
		cacheValue = [];
		while (obj.length--) {
			cacheValue[ i ] = deepClone2(obj[ i ]);
		}
		return cacheValue;
	} else if (Object.prototype.toString.call(obj) === "[object Object]") {
		cacheValue = {};
		for (var k in obj) {
			if (obj.hasOwnProperty(k)) {
				cacheValue[ k ] = deepClone2(obj[ k ]);
			}
		}
		return cacheValue;
	} else {
		return obj;
	}
}

// 测试用例：
var srcObj = {
	a: 1,
	b: {
		b1: [ "hello", "hi" ],
		b2: "JavaScript",
		b3: {
			b4: [ 1, 2, 3 ],
			b5: 'test',
			b6: [ 4, 5, {
				b7: [ 6, 7, {
					b8: [ 8, 9, 10 ],
					b9: "hi"
				} ],
				b10: {
					b11: 2,
					b12: [ 11, 12, 13 ]
				}
			} ]
		}
	}
};
var abObj = srcObj;
var tarObj = deepClone1(srcObj);

srcObj.a = 2;
srcObj.b.b1[ 0 ] = "Hello";
srcObj.b.b3.b6[ 2 ].b10.b12.push(14)

// console.log("2-2", tarObj.a);
// 1
// console.log("2-2", tarObj.b.b1[ 0 ]);
// "hello"
// console.log("2-2", tarObj.b.b3.b6[ 2 ].b10.b12)
// [11, 12, 13]




// 2-3 学习数组、字符串、数字等相关方法
// 返回去重后的数组
function uniqArray1(arr) {
	if (Array.isArray && Array.isArray(arr)) {
		var cacheArr = [];
		arr.reduce((ac, cv) => {
			if (!(cv in ac)) {
				ac[ cv ] = cv;
				cacheArr.push(cv);
				return ac;
			} else {
				return ac;
			}
		}, {})
		return cacheArr;
	} else {
		throw new Error("array accept");
	}
}

// 使用示例
var a = [ 1, 3, 5, 7, 5, 3, null, null, undefined, undefined, NaN, NaN, Infinity, Infinity ];
// console.log(uniqArray1(a));
// [1, 3, 5, 7, null, undefined, NaN, Infinity]




// 去除字符串头尾的 全角空格、半角空格、Tab等
function trim(str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}

// 使用示例
var str = ' 	   hi!  ';
// console.log(trim(str)); 
// 'hi!'




// 遍历数组元素以执行 fn 函数，参数为数组索引 和 元素
function each(arr, fn) {
	arr.forEach((cv, index) => {
		fn(cv, index);
	})
}

// 使用示例
var arr = [ 'java', 'c', 'php', 'html' ];
function output(item, index) {
	// console.log(index + ': ' + item)
}
each(arr, output);
// 0: java, 1: c, 2: php, 3: html




// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
	var attrNum = 0;
	for (var key in obj) {
		if (obj.hasOwnProperty(key)) {
			attrNum++;
		}
	}
	return attrNum;
}

// 使用示例
var obj = {
	a: 1,
	b: 2,
	c: {
		c1: 3,
		c2: 4
	}
};
// console.log(getObjectLength(obj));
// 3




// 2-4 学习正则表达式
// 判断是否为邮箱地址
function isEmail(emailStr) {
	// your implement
}

// 判断是否为手机号
function isMobilePhone(phone) {
	// your implement
}

// 去除头尾空格
function trimm(str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}







/** 
 * 3. DOM
 */

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
	element.classList.add(newClassName);
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
	element.classList.remove(oldClassName);
}

// 判断 siblingNode 和 element 是否为同一个父元素下的同一级的元素，返回 boolean 值 
function isSiblingNode(element, siblingNode) {
	return element.parentElement == siblingNode.parentElement;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	return {
		x: element.getBoundingClientRect().left,
		y: element.getBoundingClientRect().top
	}
}


// 实现一个简单的 Query 不直接使用document.querySelector
function $(selector) {
	return document.querySelector(selector);
}

// 可以通过 id 获取 DOM 对象，通过 # 标示，例如
// $("#adom");
// 返回 id 为 adom 的 DOM 对象

// 可以通过 tagName 获取 DOM 对象，例如
// $("a");
// 返回第一个 <a>对象

// 可以通过样式名称获取DOM对象，例如
// $(".classa");
// 返回第一个样式定义包含 classa 的对象

// 可以通过 attribute 匹配获取 DOM 对象，例如
// $("[data-log]");
// 返回第一个包含属性 data-log 的对象

// $("[data-time=2015]");
// 返回第一个包含属性 data-time 且值为 2015 的对象

// 可以通过简单的组合提高查询便利性，例如
// $("#adom .classa");
// 返回 id 为 adom 的DOM所包含的所有子节点中，第一个样式定义包含 classa 的对象









/** 
 * 4. 事件
 */

// 继续封装 Jquery
// 给一个 element 绑定一个针对 event 事件的响应，响应函数为 listener
function addEvent(element, event, listener) {
	element.addEventListener(event, listener);
}

// 例如：
function clicklistener(event) {
}
// addEvent($("#doma"), "click", a);

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
	element.removeEventListener(event, listener);
}

// 实现对 click 事件的绑定
function addClickEvent(element, listener) {
	element.addEventListener('click', listener);
}

// 实现对于按 Enter 键时的事件绑定
function addEnterEvent(element, listener) {
	element.addEventListener('enter', listener);
}

// 实现下列功能
// addEvent(element, event, listener) -> $.on(element, event, listener);
// removeEvent(element, event, listener) -> $.un(element, event, listener);
// addClickEvent(element, listener) -> $.click(element, listener);
// addEnterEvent(element, listener) -> $.enter(element, listener);

// (function () {
// 	var $ = {
// 		on: function (ele, event, listener) {

// 		},
// 		un: function (ele, event, listener) {

// 		},
// 		click: function (ele, listener) {

// 		},
// 		enter: function (ele, listener) {

// 		}
// 	}
// 	return $;
// })()



/** 
 * 5. BOM
 */

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
	// your implement
}

// 设置 cookIe 1
function setCookie(cookieName, cookieValue, lifeTime) {
  const d = new Date();
  d.setTime(d.getTime() + (lifeTime * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cookieName + "=" + cookieValue + "; " + expires;
}

// 设置 cookIe 2
function setcookie(cookieName, cookieValue, lifeTime) {
  var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
  if (Object.prototype.toString.call(lifeTime).slice(8, -1).toLowerCase() === "number") {
    cookie += "; max-age=" + (lifeTime * 60 * 60 * 24);
  }
  document.cookie = cookie;
}

// 获取 cookIe 1
function getCookie(cookieName) {
  var name = cookieName + "=";
  var cookieArr = document.cookie.split(';');
  for (var i = 0; i < cookieArr.length; i++) {
    var c = cookieArr[ i ].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

// 获取 cookIe 2
function getcookie() {
  var result = {},
      cookie = document.cookie;	
      
  if (!all) {
    return result;
  }
  var list = cookie.split(";");	
  for (var i = 0; i < list.length; i++) {
    cookie[list[i].split('=')[0]] = decodeURIComponent(list[i].split('=')[1]);
  }
  return cookie;
}

/** 
 * 6. Ajax
 */

//  自己封装一个 Ajax
// options是一个对象，里面可以包括的参数为：

// type: post或者get，可以有一个默认值
// data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
// onsuccess: 成功时的调用函数
// onfail: 失败时的调用函数
function ajax(url, options) {
	let type, data, successFn, errorFn;

	type = options.type ? options.type.toUpperCase() : 'GET';
	data = JSON.stringify(options.data).replace(/":"/g, '=').replace(/","/g,'&').slice(2,-2);

	successFn = option.onsuccess ? option.onsuccess : null;
	errorFn = option.onfail ? option.onfail : null;

	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
			successFn && successFn.call(this, xhr.responseText, xhr);
		}else{
			errorFn && errorFn();
		}
	};
	xhr.send(data);
}

// 使用示例：
// ajax(
// 	'http://localhost:8080/server/ajaxtest',
// 	{
// 		data: {
// 			name: 'simon',
// 			password: '123456'
// 		},
// 		onsuccess: function (responseText, xhr) {
// 			console.log(responseText);
// 		}
// 	}
// );
