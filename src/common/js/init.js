var lastTouchEnd;
var deviceWidth;
setHtmlFontSize();
if (window.addEventListener) {
  window.addEventListener('resize', function() {
    setHtmlFontSize();
  }, false);
  // no-scalable start
  document.addEventListener('touchstart', function(event) {
    var _event = event || window.event;
    if (_event.touches.length > 1) {
      _event.preventDefault();
    }
  });
  lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    var _event = event || window.event;
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      _event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  // no-scalable end
}

function setHtmlFontSize() {
  deviceWidth = document.documentElement.clientWidth > 750 ? 750 : document.documentElement.clientWidth < 320 ? 320 : document.documentElement.clientWidth;
  document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 7.5 + 'px';
}

// 咪咕阅读：B+C，1

// 咪咕影院：C能力，2

// 咪咕游戏：C能力，3

// 咪咕动漫：C能力，4

// 咪咕音乐：B+C，5

// 咪咕视频：C能力，6

// 咪咕善跑：C能力，修改为B+C，7

// 咪咕直播：B+C，8

// 灵犀：B+C，9

// 展厅： 10

// 咪咕+： 11