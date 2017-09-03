/**
 * Created by mooshroom on 2015/12/12.
 */
define('type',[
    'avalon',
    'text!../../admin/mall/type.html',
    'css!../../admin/mall/mall.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"type",
        ready: function () {
            admin.html=html
        },
        reset: function () {

        }
    })
    window[vm.$id]=vm
})