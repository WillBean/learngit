/**
 * Created by Will on 2015/10/1.
 */
$(function(){
    nie.config.copyRight.setWhite();
    var share = null;
    var shareUrl = $("#share_url").html();
    var sharePic = $("#share_pic").attr("data-src");
    var shareTxt = $("#share_desc").html();
    var shareTitle = $("#share_title").html();
    nie.use(["nie.util.shareV5"],function(){
        share = nie.util.share({
            fat:"#NIE-share",//分享组件插入父级（dom或选择器），默认："#NIE-share"
            type:6,//分享组件类别，默认:1（1：小icon，2：大icon，3：右侧滚动条分享，4：图片分享，5：文本分享，6：带文字的小icon）
            defShow:[23,22,2,1,4],//默认展示的分享按钮
            title:shareTitle,//分享的标题,默认：当前页面的title
            url:shareUrl,//分享的链接，默认：当前页面的url
            img:sharePic,//分享的图片，默认：null
            content:shareTxt,//分享的正文内容，只有部分平台支持。默认：当前页面的title
            product:"产品号"//选填，自适应163.com域名的产品，论坛需要指定（论坛指定规范：天下贰论坛 product="tx2_bbs"）
        });
    });

    nie.use(["nie.util.shareV5"],function(){
        share = nie.util.share({
            fat:".csz-share",//分享组件插入父级（dom或选择器），默认："#NIE-share"
            type:1,//分享组件类别，默认:1（1：小icon，2：大icon，3：右侧滚动条分享，4：图片分享，5：文本分享，6：带文字的小icon）
            defShow:[23,22],//默认展示的分享按钮
            title:null,//分享的标题,默认：当前页面的title
            url:null,//分享的链接，默认：当前页面的url
            img:null,//分享的图片，默认：null
            content:null,//分享的正文内容，只有部分平台支持。默认：当前页面的title
            product:"产品号"//选填，自适应163.com域名的产品，论坛需要指定（论坛指定规范：天下贰论坛 product="tx2_bbs"）
        });
    });

    var gotoTop = $(".gotoTop");
    gotoTop.click(function () {
        $('body,html').animate({ scrollTop: 0 })
    });
    $(window).scroll(function(){
        if($(window).scrollTop()>$(window).height()){
            gotoTop.fadeIn();
        }else{
            gotoTop.fadeOut();
        }
    });

    if(cookie_check_logined() != null){
        //检测已登录网易账户，显示退出登陆按钮
        $('#nie-logout').show();
        $('#nie-login').hide();
        $('#nie-logout').attr('href','http://reg.163.com/Logout.jsp?username='+cookie_check_logined()+'&url='+window.location.href+'');
        //在相应位置显示用户名
        $('#nie-userName').text(cookie_check_logined());

    }else{
        $('#nie-login').show();
        $('#nie-logout').hide();
        $('#nie-login').click(function(){
            $('#dialog-screen').show();
            $('#dialog1').fadeIn(200);
        });
        loginFun();
    }

    //检测登陆函数
    //@Notice : 平台那边检测 cookies 是一个小时为过期，所以我们这边需要做一个同步处理
    //@return:string 用户名
    function cookie_check_logined(){
        var s_info = $.cookie("S_INFO");
        var p_info = $.cookie("P_INFO");
        var now = new Date();
        if (s_info != null && s_info != "" && p_info != null && p_info != "" && now.getTime()/1000 - s_info.split('|')[0] < 60*60){
            return p_info.split('|')[0];
        }
        return null;
    }
    //登陆函数
    function loginFun(){

        // 用户名输入框 出现下拉提示
        AutoUrs.bind("username", {
            mailList: [
                "163.com",
                "126.com",
                "yeah.net",
                "qq.com",
                "vip.163.com",
                "popo.163.com",
                "vip.126.com",
                "188.com",
                "gmail.com",
                "sina.com",
                "hotmail.com"
            ],
            tabTo: "password",
            cookie: "global"
        });

        // 用户表单处理类
        $("#loginform").ntesLoginForm({

            // 提交表单前验证
            beforeSubmit: function() {

                var username = $(this).find("input[name=username]");
                var password = $(this).find("input[name=password]");
                var err = $(this).find("#loginformErr");
                err.html("");

                // 验证用户名是否合法
                if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ig.test(username.val())) {
                    err.show() && err.text("请输入正确的帐号");
                    return false;
                } else {
                    err.hide() && err.text("");
                }

                // 验证密码是否合法
                if (!password.val()) {
                    err.show() && err.text("请输入密码");
                    return false;
                } else {
                    err.hide() && err.text("");
                }

                return true;
            },

            //登陆成功后调用函数
            success: function(ret) {

                var userName = cookie_check_logined();
                userName.indexOf(ret.username) >= 0
                && $(this).hide()
                && $("#nie-userName").text("退出")
                && $("#nie-userName").attr('href', 'http://reg.163.com/Logout.jsp?username='+userName+'&url='+self.location.href);

                //检测已登录网易账户，显示退出登陆按钮
                $('#dialog-screen').hide();
                $('#dialog1').fadeOut(200);

                //检测已登录网易账户，显示退出登陆按钮
                $('#nie-logout').show();
                $('#nie-login').hide();
                $('#nie-logout').attr('href','http://reg.163.com/Logout.jsp?username='+cookie_check_logined()+'&url='+window.location.href+'');
                //在相应位置显示用户名
                $('#nie-userName').text(cookie_check_logined());
            },

            //登陆失败
            fail: function(ret) {

                $(this).find("#loginformErr").show();

                switch(ret.errorType){

                    // 密码错误，动作
                    case "460" :
                        $(this).find("input[name=password]").val("");
                        $(this).find("#loginformErr").text(ret.errorMsg);
                        break;

                    // 用户名不存在，动作
                    case "420" :
                        $(this).find("input[name=username]").val("");
                        $(this).find("#loginformErr").text(ret.errorMsg);
                        break;

                    default:
                        $(this).find("#loginformErr").text(ret.errorMsg);
                        break;
                }
            },

            //异步登录出错（如果无需求请不要更改）
            error : function (iframeTarget){
                $(this).attr('target', '_self');
                $(this).submit();
                $(this).attr('target', iframeTarget);
            }
        });
    }
});

var popTc = function (e) {
    closedc(), 0 == $(".bg").length && $("body").append('<div class="bg"></div>');
    var i = $(e);
    $(".bg").css({height: $(document).height()}).show();
    var r = (i.width(), i.height(), i.height() / 2), o = i.width() / 2, t = $(window).scrollTop(),b=($(window).height()- i.height())/2;//console.log(t,b);
    if (document.documentElement.clientHeight < i.height())i.css({
        top: b + "px",
        //position: "absolute",
        "margin-left": -o
    }).fadeIn(); else {
        var n = $.browser.version, s = n.substr(0, 1);
        $.browser.msie && 6 == s ? i.css({
            top: b + "px",
            //position: "absolute",
            "margin-left": -o
        }).fadeIn() : i.css({top: b + "px", "margin-left": -o}).fadeIn()
    }
    //$(e).show();
}, closedc = function () {
    var e = $(".Tc");
    e.hide(), $(".bg").hide()
};