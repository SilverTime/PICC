/**
 * Created by mooshroom on 2016/1/9.
 * 微信端上传图片的组件
 */
define('wxAddPic', [
    'avalon',
    'text!../../lib/wxAddPic/wxAddPic.html',
    'css!../../lib/wxAddPic/wxAddPic.css'
], function (avalon, html, css) {
    avalon.component('wx:addpic', {
        $template: html,
        callback: function (id) {},
        localId: '',//本地ID
        serverId:'',//服务器id
        choose: function () {},
        upload: function () {},
        del: function () {},
        delCallBack: function () {},
        $init: function (vm, elem) {
            //选择照片
            vm.choose = function () {
                wx.ready(function () {
                    wx.chooseImage({
                        count: 1, // 默认9
                        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                        success: function (res) {
                            vm.localId = res.localIds[res.localIds.length - 1]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                            vm.upload(vm.localId)
                        }
                    });
                })
            }

            //上传照片
            vm.upload = function (id) {
                wx.ready(function () {
                    wx.uploadImage({
                        localId: id, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            vm.serverId = res.serverId; // 返回图片的服务器端ID
                            //alert('!!')
                            vm.callback(vm.serverId)
                        }
                    });
                })
            }

            //删除方法
            vm.del= function () {
                vm.localId="";
                vm.delCallBack(vm.serverId)
                //vm.serverId='';
            }
        }
    })
})