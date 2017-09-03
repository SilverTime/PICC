/**
 * Created by mooshroom on 2015/12/12.
 */
define('goldManagement', [
    'avalon',
    'text!../../admin/user/goldManagement.html',
    'css!../../admin/user/user.css',
    '../../lib/uploader/uploader.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "goldManagement",
        ready: function () {
            admin.html = html
        },
        reset: function () {
            avalon.mix(vm,{
                error: [],
                note: "",
                ExcelLogID: "",
                Content: "",
                uploader:'<tsy:uploader config="$opt"></tsy:uploader>',
                showPush: false,
            })
        }
        ,
        uploader:'<tsy:uploader config="$opt"></tsy:uploader>',
        time1: '',
        time2: "",
        buildTime: function () {
            var time1,time2
            if(vm.time1==""||vm.time1==0){
                time1='1990-01-01'
            }else{
                time1=vm.time1
            }
            if(vm.time2==""||vm.time2==0){
                time2="3016-01-22"
            }else{
                time2=vm.time2
            }
            var t1,t2;
            var timeStr
            if(time1<=time2){
                t1=newDateAndTime(time1 +' 00:00:00').getTime()/1000
                t2=newDateAndTime(time2 +' 23:59:59').getTime()/1000
                timeStr=t1+","+t2
            }else{
                t1=newDateAndTime(time2+' 00:00:00').getTime()/1000
                t2=newDateAndTime(time1+' 23:59:59').getTime()/1000
                timeStr=t1+","+t2
            }

            return timeStr

        },


        W: {
            IDCard: "",
            Time: "",
        },

        getExcel: function () {
            vm.W.Time = vm.buildTime()

            var W = {}
            for (var x in vm.W) {
                if (x.charAt(0) != '$') {
                    W[x] = vm.W[x]
                }
            }

            var str = ""
            str += (apiURL + 'Excel/moneyOut' + '&tsy=' + cache.go("tsy"))

            var dataStr = "&IDCard=" + W.IDCard + '&Time=' + W.Time


            window.location.href = str + dataStr
        },

        $opt: {
            id: "giftUp",
            label: "导入EXCEL赠送元宝",//上传按钮的名字
            tip: "或者将文件拖到这里",
            $conf: {
                server: apiURL + 'Excel/moneyIn&tsy=' + cache.go("tsy"),
                accept: {
                    title: 'elcel',
                    extensions: 'csv',
                    mimeTypes: 'application/csv',

                },
                fileNumLimit: 1,
            },
            success: function (file, res) {
                if (res.error) {
                    vm.error = res.error
                    vm.note = res.note
                } else {
                    vm.ExcelLogID = res.ExcelLogID
                    vm.error = res.Msgs
                    vm.showPush = true
                }
            }
        },

        error: [],
        note: "",
        ExcelLogID: "",
        Content: "",

        showPush: false,
        pushGift: function () {
            if(vm.Content==""){
                tip.on('还没有编辑短信模板~')
                return
            }

            vm.showPush = false
            $$.call({
                i: "Sms/money",
                data: {
                    Content: vm.Content,
                    UID: cache.go('uid'),
                    ExcelLogID: vm.ExcelLogID
                },
                success: function (res) {

                    tip.on('赠送成功！')
                    vm.reset()
                    vm.showPush=true
                    vm.resetUploader()
                },
                error: function (err) {
                    vm.showPush = true
                    tip.on(err)
                }
            })
        },
        resetUploader: function () {
            vm.uploader=''
            setTimeout(function () {
                vm.uploader='<tsy:uploader config="$opt"></tsy:uploader>'
            },500)
        }
    });
    window[vm.$id] = vm
});