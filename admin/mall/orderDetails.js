/**
 * Created by ANNNI on 2016/1/16.
 */
define('orderDetails',[
    'avalon',
    'text!../../admin/mall/orderDetails.html',
    'css!../../admin/mall/mall.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"orderDetails",
        ready: function () {
            admin.html=html
        },
        reset: function () {

        }
    });
    window[vm.$id]=vm
});