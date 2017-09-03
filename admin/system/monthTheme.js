/**
 * Created by mooshroom on 2015/12/12.
 */
define('monthTheme',[
    'avalon',
    'text!../../admin/system/monthTheme.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"monthTheme",
        ready: function () {
            vm.reset();
            admin.html=html;
            vm.getList()
        },
        reset: function () {
            avalon.mix(vm,{
                list:[]
            })
        },

        list:[],
        //获取列表
        getList: function () {
            $$.call({
                i:"SubjectMonth/getAll",
                data:{
                    ActivityStates:[1,2,3]
                },
                success: function (res) {
                    vm.list=res
                },
                error: function (err) {
                    tip.on(err)
                }

            })
        },

        del: function (id) {
            $$.call({
                i:"SubjectMonth/del",
                data:{
                    ActivityID:id
                },
                success: function (res) {
                    for(var i=0; i<vm.list.length;i++){
                        if(vm.list[i].ActivityID==res[0].ActivityID){
                            vm.list.splice(i,1)
                        }
                    }
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        subjectOut: function (i) {
            window.location.href=(apiURL + 'Excel/subjectOut' + '&tsy=' + cache.go("tsy")+"&ActivityID="+i)
        },

        reEdit: function (id) {
            $$.call({
                i:"SubjectMonth/save",
                data:{
                    ActivityID:id,
                    Params:{
                        ActivityState:1,
                    }
                },
                success: function (res) {
                    vm.ready()
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }
    })
    window[vm.$id]=vm
})