/**
 * Created by mooshroom on 2015/12/12.
 */
define('update',[
    'avalon',
    'text!../../admin/user/update.html',
    'css!../../admin/user/user.css',
    '../../lib/uploader/uploader.js'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"update",
        ready: function () {
            vm.reset()
            admin.html=html
        },
        reset: function () {
            avalon.mix(vm,{
                showTip:false,
                NotCount:"",
                WaitCount:'',
            })
        },
        uploader:'<tsy:uploader config="$opt"></tsy:uploader>',
        $opt:{
            id:"uptest",
            label:"EXCEL导入更新",//上传按钮的名字
            tip:"或者将文件拖到这里",
            $conf:{
                server:apiURL + 'Excel/userUpload&tsy=' + cache.go("tsy"),
                accept: {
                    title: 'elcel',
                    extensions: 'csv',
                    mimeTypes: 'application/csv',

                },
                fileNumLimit: 1,
            },
            success: function (file, res) {
                vm.NotCount=res.NotCount
                vm.WaitCount=res.WaitCount
                vm.showTip=true
                vm.uploader=''
                setTimeout(function () {
                    vm.uploader='<tsy:uploader config="$opt"></tsy:uploader>'
                },300)
            }
        },
        showTip:false,
        NotCount:"",
        WaitCount:'',
    })
    window[vm.$id]=vm
})