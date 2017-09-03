/**
 * Created by ANNNI on 2016/1/17.
 */
define('giftHistory',[
    'avalon',
    'text!../../admin/mall/giftHistory.html',
    'css!../../admin/mall/mall.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"giftHistory",
        ready: function () {
            admin.html=html
        },
        reset: function () {

        }
    });
    window[vm.$id]=vm
});