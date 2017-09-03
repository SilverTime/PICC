/**
 * Created by Chris on 2016/1/17.
 */
define('joinDetails',[
        'avalon',
        'text!../../admin/system/joinDetails.html',
        'css!../../admin/system/system.css'
    ], function (avalon, html) {
        var vm = avalon.define({
            $id: "joinDetails",
            ready: function (id) {
                vm.reset();
                admin.html = html;
                vm.getDetails(id);
                vm.ActivityID = id;
                vm.getName(id);
            },
            reset: function () {
                avalon.mix(vm, {
                    list: [],
                    info:[],
                    //"P": 1,
                    //"T": 0
                })
            },
            list: [],
            //"N":20,
            //"p":1,
            //"T":3,
            ADMIN: null,
            UID: null,
            UN: null,
            getDetails: function (id) {
                $$.call({
                    i: "SubjectMonth/detail",
                    data: {
                        ActivityID:id
                    },
                    success: function (res) {
                        for(var x=0;x<res.length;x++){
                            vm.list.push(res[x])
                        }
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })
            },
            info:[],
            //获取列表
            getName: function (id) {
                $$.call({
                    i:"SubjectMonth/get",
                    data:{
                        ActivityID:vm.ActivityID
                    },
                    success: function (res) {
                        vm.info=res[0]
                    },
                    error: function (err) {
                        tip.on(err)
                    }

                })
            },
            Export:function(){
                $$.call({
                    i:"SubjectMonth/excel",
                    data:{
                        ActivityID:vm.ActivityID
                    },
                    success:function(){
                        tip.on("导出成功",1)
                    },
                    error:function(err){
                        tip.on(err)
                    }

                })
            }
        });
        window[vm.$id] = vm
    });