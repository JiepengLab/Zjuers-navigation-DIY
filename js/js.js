window.onscroll = function () {
  //回到顶部
  var sllTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (sllTop > 240) {
    $('#get-top').css('display', 'block')
  } else {
    $('#get-top').css('display', 'none')
  }

}
//设为首页
function setHome(obj, vrl) {
  try {
    obj.style.behavior = 'url(#default#homepage)'; obj.setHomePage(vrl);
  }
  catch (e) {
    if (window.netscape) {
      try {
        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
      }
      catch (e) {
        alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
      }
      var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
      prefs.setCharPref('browser.startup.homepage', vrl);
    } else {
      (new $.zui.ModalTrigger({
        custom: '<h3>您的浏览器不支持此操作，请手动将此页设为首页。</h3>' +
          '<blockquote>Edge端: 打开浏览器设置.<br />2.点击"设置"→"开始、主页和新建标签页"→"输入网址"→确定.</blockquote>',
        title: '设为首页'
      })).show()
    }
  }
};
//初始化工具提示     
$('[data-toggle="tooltip"]').tooltip({
  tipClass: 'tooltip-info'
});

//检测本地是否存在localStorage，若存在则遍历localStorage的值到对应的元素内
if (localStorage.length != 0) {
  for (var i = 0; i < localStorage.length; i++) {
    var linkId = localStorage.key(i);
    var data = localStorage.getItem(localStorage.key(i));
    data = data.split('|');
    var value1 = data[0], value2 = data[1];
    if (linkId.length <= 10 && linkId != "page_/") {
      var getID = $('#' + linkId);
      getID.html(value1).attr("href", value2);
    }
  }
}

$(window).load(function () {
  CustomMode();
  CustomTheme();
});

//自定义模式
function CustomMode() {
  $('.bar-btn').on('click', function () {
    $('.left-bar').toggleClass('showBar');
    $('.mask').toggleClass('showMask');
    $(this).toggleClass('animated1');
  });
  $('.nav-btn').on('click', function () {
    $('.nav').toggleClass('showNav');
    $(this).toggleClass('animated2');
  });

  //自定义模式下禁用链接跳转 - 使用遮罩层遮挡方式
  $('.customize').on('click', function () {
    //获取当前页面是否可以自定义
    var customizeStatus = $("#content").attr("data-customize");
    if (customizeStatus === "true") {
      $('.customize-mode-tips').toggleClass('shaow_tips');
      $('.linkList-item').toggleClass('customize_mode');
      $('.not_operational').toggleClass('shaow_tips');
    } else {
      new $.zui.Messager('当前页面不支持自定义模式，请前往首页设置', {
        icon: 'bell', // 定义消息图标
        type: 'danger',
        placement: 'top',
        close: false
      }).show();
    }
  });

  //在自定义模式下才能修改内容标题
  $('.link-list-tit').click(function () {
    var getCustomize = $('.shaow_tips')[0];
    if (getCustomize == null) {
      return false
    }
    var getLink_tit = $(this);
    var getLink_id = $(this).attr("id");

    //给当前元素的兄弟元素添加显示类，获取标题内容赋值给输入框，并让其焦点聚焦同时选中文字
    $(this).siblings().addClass("shaow-edit-category").val(getLink_tit.html()).focus().select();

    //输入框焦点失去时将输入框内容写入到localStorage
    $(".shaow-edit-category").blur(function () {
      var inputVal = $(this).val();
      getLink_tit.html(inputVal);
      window.localStorage.setItem(getLink_id, inputVal);
      $(".shaow-edit-category").removeClass("shaow-edit-category");
    })
  });

  var idValue;
  var thisIink;
  //点击编辑按钮弹出对话框
  $('.bianji').click(function () {
    $('#myModal').modal({
      keyboard: false,
      show: true
    });
    //获取当前点击元素的兄弟元素及值并传递给对应的全局变量
    thisIink = $(this).prev();
    idValue = $(this).prev().attr("id");
    var thisIink_con = $(this).prev().html();
    var thisIink_href = $(this).prev().attr("href");
    $('#inputAccountExample1').val(thisIink_con);
    $('#inputAccountExample2').val(thisIink_href);
  });

  //点击确认按钮后将输入框内容写入localStorage并更新页面中对应元素的内容
  $('.btn-primary').click(function () {
    var text = $('#inputAccountExample1').val();
    var text2 = $('#inputAccountExample2').val();
    window.localStorage.setItem(idValue, text + '|' + text2);
    var data = localStorage.getItem(idValue);
    data = data.split('|');
    var value1 = data[0], value2 = data[1];
    $(thisIink).html(value1).attr("href", value2);
  });
}

$('#get-top').click(function () {
  $('body,html').animate({
    scrollTop: 0
  },
    800);//点击回到顶部按钮，缓慢回到顶部,数字越小越快
})

//判断用户使用的设备
var deviceVal = browserRedirect();
function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    return 'phone';
  } else {
    return 'pc';
  }
}

//百度自动推动代码
(function () {
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
})();

//百度统计代码
var _hmt = _hmt || [];
(function () {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7397c22fedfaa11157d38143820e7330";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

