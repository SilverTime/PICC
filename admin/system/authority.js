/**
 * Created by mooshroom on 2015/12/12.
 */
define('authority',[
    'avalon',
    'text!../../admin/system/authority.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"authority",
        ready: function () {
            admin.html=html
        },
        reset: function () {

        }
    })
    window[vm.$id]=vm
})