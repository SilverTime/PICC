/**
 * Created by ANNNI on 2016/1/16.
 */
define('giftManagement',[
    'avalon',
    'text!../../admin/mall/giftManagement.html',
    'css!../../admin/mall/mall.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"giftManagement",
        ready: function () {
            admin.html=html
        },
        reset: function () {

        }
    });
    window[vm.$id]=vm
});