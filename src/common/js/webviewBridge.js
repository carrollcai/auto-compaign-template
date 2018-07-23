//server
bridge={};
(function(d){var e=d.c_||{};d.publish=function(a,b){for(var c=e[a],f=c?c.length:0;f--;)c[f].apply(d,b||[])};d.subscribe=function(a,b){e[a]||(e[a]=[]);e[a].push(b);return[a,b]};d.unsubscribe=function(a){for(var b=e[a[0]],a=a[1],c=b?b.length:0;c--;)b[c]===a&&b.splice(c,1)}})(bridge);
bridge.sinit=function(register){
	//assert register is a function
	bridge.subscribe("MESSAGE2S",function(message,responseCallback){
		register(message,responseCallback);
	})
};
bridge.ssend=function(message,responseCallback){
	bridge.publish("MESSAGE2C",[message,responseCallback]);
};
bridge.scallHandler=function(handlerName, data, responseCallback) {
	bridge.publish("[c]"+handlerName,[data, responseCallback]);
};
bridge.sregisterHandler=function(handlerName, handler) {
	bridge.subscribe("[s]"+handlerName,handler);
};
//client
(function(bridge){
	//common
	function assert(condition, message) {
    	if (!condition) {
        	throw message || "Assertion failed";
    	}
	}

	bridge.init=function(register){
		//assert register is a function
		assert(register instanceof Function,"init() should has a function as parameter");
		bridge.subscribe("MESSAGE2C",function(message,responseCallback){
			register(message,responseCallback);
		})
	}  
	bridge.send=function(message,responseCallback){
		bridge.publish("MESSAGE2S",[message,responseCallback]);
	}
	bridge.callHandler=function(handlerName, data, responseCallback) {
		bridge.publish("[s]"+handlerName,[data, responseCallback]);
	}
	bridge.registerHandler=function(handlerName, handler) {
		bridge.subscribe("[c]"+handlerName,handler);
	}
	//dispatch event
	var event=new CustomEvent('WebViewJavascriptBridgeReady')
	event.bridge=bridge;
	document.dispatchEvent(event);

	//console.log(bridge);

})(bridge);

document.addEventListener('WebViewJavascriptBridgeReady', function onBridgeReady(event) {

	var bridge = event.bridge
	bridge.init(function(message, responseCallback) {
      
    });
   
}, false);

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        //alert("JavaScript Registed");
        callback(WebViewJavascriptBridge)
    } else {
        //alert("JavaScript will Regist");
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
}

/**
 * 分享成功回调
 * @param callback
 */
function setShareCallback(callback) {
	connectWebViewJavascriptBridge(function(bridge){
		bridge.registerHandler('shareCallback', function(data, responseCallback) {
			if(typeof(callback)=='function') {
				callback(data);
			}
		});
	});
}

/**
 * 设置网页默认分享配置
 * @param config
 */
function setDefaultShareConfig(config) {
	connectWebViewJavascriptBridge(function(){
		window.WebViewJavascriptBridge.callHandler('setDefaultShareConfig', config, function(responseData){
			console.log(responseData);
		});
	});
}


/**
 * 设置网页当前页面分享配置
 * @param config
 * {icon:xx,url:xx,title:xx,content:xx}
 */
function setPageShareConfig(config) {
	connectWebViewJavascriptBridge(function(){
		window.WebViewJavascriptBridge.callHandler('setPageShareConfig', config, function(responseData){
			console.log(responseData);
		});
	});
}


/**
 * 网页主动去分享
 * @param type 渠道(1微信 2微信朋友圈  3我的好友 4附近的人  5新浪微博  6、QQ 7、QQ空间) type=0,客户端打开分享选择面板
 */
function doShare(type)
{
	connectWebViewJavascriptBridge(function(){
		window.WebViewJavascriptBridge.callHandler('doShare', {"type":type}, function(responseData){
			console.log(responseData);
		});
	});
}

/**
* 2.3版本一下 使用shareFunc
*
*/
/*
window.onload = function(){
	if(typeof shareFunc == 'function'){
		shareFunc
		var str = shareFunc.toString();
	}
}
*/
