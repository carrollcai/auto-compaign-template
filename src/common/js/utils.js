/**
 * @author carroll
 * @since 20180719
 * @description 绑定公共方法到$上
*/

$.extend({
  GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  },
  /**
  * @returns 1是andriod，2是ios，0是其他
  */
  appType: function () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      return 1
    } else if (!!u.match(/["iPhone"|"iphone"]/ig)) {
      return 2
    } else {
      return 0
    }
  },
  /** 
   * @description 是否是微信
  */
  isWechat: function () {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  Toast: function (desc) {
    var toastTime = null;
    var toast = $('.toast');
    var toastMain = $('.toast-main');
    clearTimeout(toastTime);
    toast.show();
    toastMain.html(desc);
    toastTime = setTimeout(function () {
      toast.hide();
    }, 2000);
  },
  /** 
   * @description 通过show和hide控制显示隐藏
  */
  Loading: function (configs) {
    var isLoading = $('.loading-hide');
    configs.show ? isLoading.show() : isLoading.hide();
  },
  checkPhone: function (value) {
    var reg = /^[1][0-9]{10}$/;
    return reg.test(value);
  }
});