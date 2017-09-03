/**
 * Created by mooshroom on 2015/12/12.
 */
define('navConf',[
    'avalon',
    'text!../../admin/system/navConf.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"navConf",
        ready: function () {
            admin.html=html
        },
        reset: function () {

        }
    })
    window[vm.$id]=vm
})