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

});