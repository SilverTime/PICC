/**
 * Created by mooshroom on 2016/1/9.
 * ΢�Ŷ��ϴ�ͼƬ�����
 */
define('wxAddPic', [
    'avalon',
    'text!../../lib/wxAddPic/wxAddPic.html',
    'css!../../lib/wxAddPic/wxAddPic.css'
], function (avalon, html, css) {
    avalon.component('wx:addpic', {
        $template: html,
        callback: function (id) {},
        localId: '',//����ID
        serverId:'',//������id
        choose: function () {},
        upload: function () {},
        del: function () {},
        delCallBack: function () {},
        $init: function (vm, elem) {
            //ѡ����Ƭ
            vm.choose = function () {
                wx.ready(function () {
                    wx.chooseImage({
                        count: 1, // Ĭ��9
                        sizeType: ['original'], // ����ָ����ԭͼ����ѹ��ͼ��Ĭ�϶��߶���
                        sourceType: ['album', 'camera'], // ����ָ����Դ����ỹ�������Ĭ�϶��߶���
                        success: function (res) {
                            vm.localId = res.localIds[res.localIds.length - 1]; // ����ѡ����Ƭ�ı���ID�б�localId������Ϊimg��ǩ��src������ʾͼƬ
                            vm.upload(vm.localId)
                        }
                    });
                })
            }

            //�ϴ���Ƭ
            vm.upload = function (id) {
                wx.ready(function () {
                    wx.uploadImage({
                        localId: id, // ��Ҫ�ϴ���ͼƬ�ı���ID����chooseImage�ӿڻ��
                        isShowProgressTips: 1, // Ĭ��Ϊ1����ʾ������ʾ
                        success: function (res) {
                            vm.serverId = res.serverId; // ����ͼƬ�ķ�������ID
                            //alert('!!')
                            vm.callback(vm.serverId)
                        }
                    });
                })
            }

            //ɾ������
            vm.del= function () {
                vm.localId="";
                vm.delCallBack(vm.serverId)
                //vm.serverId='';
            }
        }
    })
})