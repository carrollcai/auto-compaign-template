$.extend({
  share: function (config, successFunc) {
    var isWeixin = $.isWeixin();
    var ajaxUrl = 'http://s.migu.cn/migu/wxShare/wxJsSig.action';
    var shareTitle = config.title;
    var shareDesc = config.description;
    var sharePic = config.picture;;
    //是否是微信
    if (isWeixin) {
      $.ajax({
        url: ajaxUrl,
        data: { url: window.location.href },
        dataType: 'json',
        success: function (msg) {
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: msg.data.appId, // 必填，公众号的唯一标识
            timestamp: msg.data.timestamp,// 必填，生成签名的时间戳
            nonceStr: msg.data.nonceStr, // 必填，生成签名的随机串
            signature: msg.data.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function () {
            wx.onMenuShareTimeline({
              title: shareTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: window.location.href, // 分享链接
              imgUrl: sharePic, // 分享图标
              success: function (res) {
                // 用户确认分享后执行的回调函数
                option.success(res);
              },
              cancel: function (res) {
                // 用户取消分享后执行的回调函数
                option.cancel(res);
              }
            });
            wx.onMenuShareAppMessage({
              title: shareTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: window.location.href, // 分享链接
              imgUrl: sharePic, // 分享图标
              success: function (res) {
                // 用户确认分享后执行的回调函数
                option.success(res);
              },
              cancel: function (res) {
                // 用户取消分享后执行的回调函数
                option.cancel(res);
              }
            });
            wx.onMenuShareQQ({
              title: shareTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: window.location.href, // 分享链接
              imgUrl: sharePic, // 分享图标
              success: function (res) {
                // 用户确认分享后执行的回调函数
                option.success(res);
              },
              cancel: function (res) {
                // 用户取消分享后执行的回调函数
                option.cancel(res);
              }
            });
            wx.onMenuShareWeibo({
              title: shareTitle, // 分享标题
              desc: shareDesc, // 分享描述
              link: window.location.href, // 分享链接
              imgUrl: sharePic, // 分享图标
              success: function (res) {
                // 用户确认分享后执行的回调函数
                option.success(res);
              },
              cancel: function (res) {
                // 用户取消分享后执行的回调函数
                option.cancel(res);
              }
            });
          })
        }
      });
    };
    function isWeixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  }
});