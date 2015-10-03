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
            fat:"#NIE-share",//����������븸����dom��ѡ��������Ĭ�ϣ�"#NIE-share"
            type:6,//����������Ĭ��:1��1��Сicon��2����icon��3���Ҳ����������4��ͼƬ����5���ı�����6�������ֵ�Сicon��
            defShow:[23,22,2,1,4],//Ĭ��չʾ�ķ���ť
            title:shareTitle,//����ı���,Ĭ�ϣ���ǰҳ���title
            url:shareUrl,//��������ӣ�Ĭ�ϣ���ǰҳ���url
            img:sharePic,//�����ͼƬ��Ĭ�ϣ�null
            content:shareTxt,//������������ݣ�ֻ�в���ƽ̨֧�֡�Ĭ�ϣ���ǰҳ���title
            product:"��Ʒ��"//ѡ�����Ӧ163.com�����Ĳ�Ʒ����̳��Ҫָ������ָ̳���淶�����·���̳ product="tx2_bbs"��
        });
    });

    nie.use(["nie.util.shareV5"],function(){
        share = nie.util.share({
            fat:".csz-share",//����������븸����dom��ѡ��������Ĭ�ϣ�"#NIE-share"
            type:1,//����������Ĭ��:1��1��Сicon��2����icon��3���Ҳ����������4��ͼƬ����5���ı�����6�������ֵ�Сicon��
            defShow:[23,22],//Ĭ��չʾ�ķ���ť
            title:null,//����ı���,Ĭ�ϣ���ǰҳ���title
            url:null,//��������ӣ�Ĭ�ϣ���ǰҳ���url
            img:null,//�����ͼƬ��Ĭ�ϣ�null
            content:null,//������������ݣ�ֻ�в���ƽ̨֧�֡�Ĭ�ϣ���ǰҳ���title
            product:"��Ʒ��"//ѡ�����Ӧ163.com�����Ĳ�Ʒ����̳��Ҫָ������ָ̳���淶�����·���̳ product="tx2_bbs"��
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
        //����ѵ�¼�����˻�����ʾ�˳���½��ť
        $('#nie-logout').show();
        $('#nie-login').hide();
        $('#nie-logout').attr('href','http://reg.163.com/Logout.jsp?username='+cookie_check_logined()+'&url='+window.location.href+'');
        //����Ӧλ����ʾ�û���
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

    //����½����
    //@Notice : ƽ̨�Ǳ߼�� cookies ��һ��СʱΪ���ڣ��������������Ҫ��һ��ͬ������
    //@return:string �û���
    function cookie_check_logined(){
        var s_info = $.cookie("S_INFO");
        var p_info = $.cookie("P_INFO");
        var now = new Date();
        if (s_info != null && s_info != "" && p_info != null && p_info != "" && now.getTime()/1000 - s_info.split('|')[0] < 60*60){
            return p_info.split('|')[0];
        }
        return null;
    }
    //��½����
    function loginFun(){

        // �û�������� ����������ʾ
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

        // �û���������
        $("#loginform").ntesLoginForm({

            // �ύ��ǰ��֤
            beforeSubmit: function() {

                var username = $(this).find("input[name=username]");
                var password = $(this).find("input[name=password]");
                var err = $(this).find("#loginformErr");
                err.html("");

                // ��֤�û����Ƿ�Ϸ�
                if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/ig.test(username.val())) {
                    err.show() && err.text("��������ȷ���ʺ�");
                    return false;
                } else {
                    err.hide() && err.text("");
                }

                // ��֤�����Ƿ�Ϸ�
                if (!password.val()) {
                    err.show() && err.text("����������");
                    return false;
                } else {
                    err.hide() && err.text("");
                }

                return true;
            },

            //��½�ɹ�����ú���
            success: function(ret) {

                var userName = cookie_check_logined();
                userName.indexOf(ret.username) >= 0
                && $(this).hide()
                && $("#nie-userName").text("�˳�")
                && $("#nie-userName").attr('href', 'http://reg.163.com/Logout.jsp?username='+userName+'&url='+self.location.href);

                //����ѵ�¼�����˻�����ʾ�˳���½��ť
                $('#dialog-screen').hide();
                $('#dialog1').fadeOut(200);

                //����ѵ�¼�����˻�����ʾ�˳���½��ť
                $('#nie-logout').show();
                $('#nie-login').hide();
                $('#nie-logout').attr('href','http://reg.163.com/Logout.jsp?username='+cookie_check_logined()+'&url='+window.location.href+'');
                //����Ӧλ����ʾ�û���
                $('#nie-userName').text(cookie_check_logined());
            },

            //��½ʧ��
            fail: function(ret) {

                $(this).find("#loginformErr").show();

                switch(ret.errorType){

                    // ������󣬶���
                    case "460" :
                        $(this).find("input[name=password]").val("");
                        $(this).find("#loginformErr").text(ret.errorMsg);
                        break;

                    // �û��������ڣ�����
                    case "420" :
                        $(this).find("input[name=username]").val("");
                        $(this).find("#loginformErr").text(ret.errorMsg);
                        break;

                    default:
                        $(this).find("#loginformErr").text(ret.errorMsg);
                        break;
                }
            },

            //�첽��¼��������������벻Ҫ���ģ�
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