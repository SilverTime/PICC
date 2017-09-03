/**
 * Created by Chris on 2016/1/17.
 */
define('deleteMonthTheme',[
    'avalon',
    'text!../../admin/system/deleteMonthTheme.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"deleteMonthTheme",
        ready: function () {
            admin.html=html
        },
        reset: function () {
        }
    })
    window[vm.$id]=vm
})