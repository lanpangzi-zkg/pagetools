var re = /^(1[3-9])\d{9}$/;
var rePwd = /^.{6,20}$/;
var ifphone = function (obj, dom) {
    if (obj === '' || !(re.test(obj))) {
        dom.css('display', 'block');
        return false;
    } else {
        dom.css('display', 'none');
        return true;
    }
}

var ifnull = function(obj, dom) {
	if (obj === '') {
		dom.css('display', 'block');
		return false;
	} else {
		dom.css('display', 'none');
		return true;
	}
}

var passw = function (obj, dom) {
    if (obj === '' || !(rePwd.test(obj))) {
        dom.css('display', 'block');
        return false;
    } else {
        dom.css('display', 'none');
        return true;
    }
}

//鍊掕鏃�
var time = 60;
function getVerifyCode(ele) {
    var timer = setInterval(function () {
        if (time >= 0) {
            ele.text(time + 's');
            time--;
        }
        else {
            ele.removeAttr("disabled");
            ele.text('鑾峰彇楠岃瘉鐮�');
            clearInterval(timer);
            time = 60;
        }
    }, 1000);
}

function getQueryStringWithEscape(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return r[2];
    }
    return null;
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

//淇濇寔search涓嶅彉
function redirectHoldSearch(url) {
    var search = window.location.search;
    var default_url = url;
    if (search && search.length > 0) {
        default_url += search;
    }
    window.location.href = default_url;
}

function getUrlParam(name, url) {
    // 濡傛灉閾炬帴娌℃湁鍙傛暟锛屾垨鑰呴摼鎺ヤ腑涓嶅瓨鍦ㄦ垜浠鑾峰彇鐨勫弬鏁帮紝鐩存帴杩斿洖绌�
    if (url.indexOf("?") == -1 || url.indexOf(name + '=') == -1) {
        return '';
    }
    // 鑾峰彇閾炬帴涓弬鏁伴儴鍒�
    var queryString = url.substring(url.indexOf("?") + 1);
    if (queryString.indexOf('#') > -1) {
        queryString = queryString.substring(0, queryString.indexOf('#'));
    };
    // 鍒嗙鍙傛暟瀵� ?key=value&key2=value2
    var parameters = queryString.split("&");
    var pos, paraName, paraValue;
    for (var i = 0; i < parameters.length; i++) {
        // 鑾峰彇绛夊彿浣嶇疆
        pos = parameters[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        // 鑾峰彇name 鍜� value
        paraName = parameters[i].substring(0, pos);
        paraValue = parameters[i].substring(pos + 1);
        // 濡傛灉鏌ヨ鐨刵ame绛変簬褰撳墠name锛屽氨杩斿洖褰撳墠鍊硷紝鍚屾椂锛屽皢閾炬帴涓殑+鍙疯繕鍘熸垚绌烘牸
        if (paraName == name) {
            return decodeURIComponent(paraValue.replace("+", " "));
        }
    }
    return '';
}

function externalLocation(value) {
    var returnUrl = getQueryStringWithEscape("ReturnUrl");
    if (!!returnUrl) {
        window.location.href = "../user/external/login?provider=" + value + "&ReturnUrl=" + returnUrl;
    } else {
        window.location.href = "../user/external/login?provider=" + value;
    }
}

$(function () {
    $("#loginlogo").click(function () {
        redirectHoldSearch("../user/login");
    });
    // 璁颁綇鎴�
    $("#remeber,#agree").click(function () {
        var ele = $(this).children("i");
        if (ele.hasClass("no-check-icon")) {
            if ($(this).attr('id') === 'agree') {
                $('#btnRegister').removeAttr('disabled');
            }
            return ele.removeClass("no-check-icon");
        }
        ele.addClass("no-check-icon");
        if ($(this).attr('id') === 'agree') {
            $('#btnRegister').attr('disabled', 'disabled');
        }
    });

    $("#qq").click(function () {
	    externalLocation("qq");
    });

    $("#wechat").click(function () {
	    externalLocation("wechat");
    });

    $("#weibo").click(function () {
	    externalLocation("weibo");
    });

    $("#ding").click(function () {
	    externalLocation("ding");
    });
})