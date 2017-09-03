/**
 * Created by mooshroom on 2015/12/12.
 */
define('service',[
    'avalon',
    'text!../../admin/system/service.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"service",
        ready: function (id) {
            vm.reset();
            admin.html=html;
            vm.getService(id);
            vm.ConnectID=id;
        },
        reset: function () {
            avalon.mix(vm, {
                list: []
            })
        },
        list:[],
        getService:function(){
            $$.call(
                {
                    i:"Work/getAll",
                    data:{
                    },
                    success: function (res) {
                        for(var x=0;x<res.length;x++){
                            vm.list.push(res[x]);
                        }
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                }
            )
    }
    });
    window[vm.$id]=vm
});