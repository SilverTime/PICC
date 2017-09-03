/**
 * Created by mooshroom on 2015/12/12.
 */
define('gift', [
    'avalon',
    'text!../../admin/system/gift.html',
    'css!../../admin/system/system.css',
    '../../lib/uploader/uploader.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "gift",
        ready: function (id) {
            vm.reset();
            admin.html = html;
            vm.getGift(id);
        },
        reset: function () {
            avalon.mix(vm, {
                list1: [],
                list2: [],
                row: [],
                error:[],
                addList: [],
                note:"",
                ExcelLogID:"",
                Content:"",
                nowSave: "",
                timeOut: "",
                now:"",
                time1:'',
                time2:"",
                uploader:'<tsy:uploader config="$opt"></tsy:uploader>',
                showPush:false,
                W: {
                    IDCard: "",
                    Time: "",
                },
            })
        },
        uploader:'<tsy:uploader config="$opt"></tsy:uploader>',
        list1: [],
        list2: [],
        //从数据库渲染礼品列表
        getGift: function () {
            $$.call({
                i: "Gift/gets",
                data: {
                    GiftName: "金砖",
                    AddPeopleID: 1
                },
                success: function (res) {
                    for (var x=0; x < res.L.length; x++) {
                        vm.list1.push(res.L[x])
                    }
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        //渲染礼品历史列表
        getGiftHistory: function () {
            $$.call({
                i: "GiftLog/history",
                data: {},
                success: function (res) {
                    for (var x = 0; x < res.length; x++) {
                        vm.list2.push(res[x])
                    }
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },


        //操作项

        //向数据库发出导出列表申请
        Putout: function (id) {
            $$.call({
                i: "GiftLog/export",
                data: {
                    GiftID: id
                },
                success: function (res) {
                    tip.on("成功导出")
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        //添加礼品
        addList: [],
        AddGift: function () {
            vm.addList.push({
                GiftName: "",
                AddGiftPeopleID: cache.go("uid"),
                AddGiftTime: new Date().getTime(),
                AddGiftPeopleName:cache.go("un")
            });
        },
        cancelAdd: function (i) {
            vm.addList.splice(i, 1)
        },
        nowSave: "",
        timeOut: "",
        saveAdd: function (i) {
            vm.nowSave = i;
            if (vm.addList[i].GiftName == "") {
                tip.on("请输入礼品类型");
            }
            else {
                clearTimeout(vm.timeOut);
                $$.call({
                    i: "Gift/add",
                    data: {
                        GiftName: vm.addList[i].GiftName,
                        AddPeopleID: vm.addList[i].AddPeopleID
                    },
                    success: function (res) {
                        tip.on("保存成功", 1);
                        if (vm.nowSave >= 0) {
                            vm.cancelAdd(vm.nowSave);
                        }
                        vm.nowSave = "";
                        vm.list1.unshift(res[0])
                    },
                    error: function (err) {
                        vm.nowSave = "";
                        tip.on(err)
                    }
                });
                vm.timeOut = setTimeout(function () {
                    if (vm.nowSave != '') {
                        vm.nowSave = '';
                        tip.on('服务器请求超时')
                    }
                },10000)
            }
        },
        //从数据库删除本条数据
        //delRow: function (i) {
        //
        //},
        now:"",
        DeleteRow: function (id,i) {
            $$.call({
                i: "Gift/del",
                data: {
                    GiftID: id
                },
                success: function (res) {
                    vm.list1.splice(i,1);
                   tip.on("删除成功！",1);
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },


        /*导出礼品赠送历史*/
        time1:'',
        time2:"",
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
            vm.W.Time=vm.buildTime()

            var W={}
            for(var x in vm.W){
                if(x.charAt(0)!='$'){
                    W[x]=vm.W[x]
                }
            }

            var str=""
            str+=(apiURL + 'Excel/giftOut' + '&tsy=' + cache.go("tsy"))

            var dataStr="&IDCard="+ W.IDCard+'&Time='+ W.Time



            window.location.href=str+dataStr
        },

        $opt:{
            id:"giftUp",
            label:"导入EXCEL赠送礼品",//上传按钮的名字
            tip:"或者将文件拖到这里",
            $conf:{
                server:apiURL + 'Excel/giftIn&tsy=' + cache.go("tsy"),
                accept: {
                    title: 'elcel',
                    extensions: 'csv',
                    mimeTypes: 'application/csv',

                },
                fileNumLimit: 1,
            },
            success: function (file, res) {
                if(res.error){
                    vm.error=res.error
                    vm.note=res.note
                }else{
                    vm.ExcelLogID=res.ExcelLogID
                    vm.error=res.Msgs
                    vm.showPush=true
                }
            }
        },

        error:[],
        note:"",
        ExcelLogID:"",
        Content:"",

        showPush:false,
        pushGift: function () {
            if(vm.Content==""){
                tip.on('还没有编辑短信模板~')
                return
            }
            vm.showPush=false
            $$.call({
                i:"Sms/gift",
                data:{
                    Content:vm.Content,
                    UID:cache.go('uid'),
                    ExcelLogID:vm.ExcelLogID
                },
                success: function (res) {
                    tip.on('赠送成功！',1)
                    vm.reset()
                    vm.showPush=true
                    vm.resetUploader()
                },
                error: function (err) {
                    vm.showPush=true
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
    window[vm.$id] = vm;
});
