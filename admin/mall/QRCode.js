/**
 * Created by ANNNI on 2016/1/16.
 */
define('QRCode',[
    'avalon',
    'text!../../admin/mall/QRCode.html',
    'css!../../admin/mall/mall.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"QRCode",
        ready: function () {
            admin.html=html
        },
        reset: function () {

        }
    });
    window[vm.$id]=vm
});