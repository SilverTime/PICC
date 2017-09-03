/**
 * Created by ANNNI on 2015/12/12.
 */
define('examineHistory',[
    'avalon',
    'text!../../admin/user/examineHistory.html',
    'css!../user/user.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"examineHistory",
        ready: function () {
            admin.html=html;
            vm.reset();
            vm.getHistory();
        },
        reset: function () {
            avalon.mix(vm,{
                list: [],
                "P": 1,
                "T":0
            })
        },
        list:[],
        getHistory: function () {
            $$.call({
                i:"Member/search",
                data:{
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
        }
    });
    window[vm.$id]=vm
});
