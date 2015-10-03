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

});