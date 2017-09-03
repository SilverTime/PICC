/**
 * Created by mooshroom on 2015/12/12.
 */
define('members', [
    'avalon',
    'text!../../admin/system/members.html',
    'css!../../admin/system/system.css',
    '../../lib/pager/pager.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "members",
        ready: function (id) {
            if(id==0){
                window.location.href='#!/members/1';
                return
            }
            vm.reset();
            admin.html = html;
            vm.getMembers(id);
            vm.UserID = id;
            vm.P=id;
        },
        //重置列表
        reset: function () {
            avalon.mix(vm, {
                "T":0
            })
        },
        list: [],
        "P": 1,
        "N": 20,
        "T": 21,
        roleName:{},
        //获取员工名单
        getMembers: function (p) {
            $$.call({
                i: "User/getByGroup",
                data: {
                    GroupIDs:[3],
                    P:p,
                    N:vm.N
                },
                success: function (res) {
                    vm.list=[];
                    for(var x=0;x<res[0].User.L.length;x++){
                        vm.list.push(res[0].User.L[x]);
                    }
                    cePager.T=res[0].User.T;
                    avalon.mix(cePager,{
                        T:res[0].User.T,
                        P:res[0].User.P
                    });
                    cePager.build(res[0].User.P)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        //分页配置
        $opt:{
            id:"cePager",
            N:"20",
            getList: function (p) {
                window.location.href='#!/members/'+p
            }
        }
    });
    window[vm.$id] = vm
});