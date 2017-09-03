/**
 * Created by Chris on 2016/1/16.
 */
define('changeActor',[
        'avalon',
        'text!../../admin/system/changeActor.html',
        'css!../../admin/system/system.css'
    ], function (avalon, html) {
        var vm = avalon.define({
            $id: "changeActor",
            role: [],
            RoleIDs:"1,2",
            ready: function (id) {
                vm.reset();
                admin.html = html;
                //vm.getRole(id);
                vm.UserID = id;
                vm.getActor(id);
            },
            reset: function () {
                avalon.mix(vm, {
                    info:{},
                    list:{}
                })
            },
            info:{},
            getActor:function(id){
                $$.call({
                    i: "User/getByID",
                    data: {
                        UserIDs:[id]
                    },
                    success: function (res) {
                        vm.info=res[0];
                        vm.info.Role=res[0].Role[0].RoleID

                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })
            },
            changeRole: function (id) {
                if(vm.info.Role==""){
                    tip.on("还没有选择角色");
                    return
                }
                $$.call({
                    i: "Member/ChangeUserRole",
                    data: {
                        UserID:vm.UserID,
                        RoleIDs:vm.info.Role
                    },
                    success: function (res) {
                        tip.on("修改成功",1);
                        window.location.href="#!/members/0";
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })
            },
            Roles: {
                3: "理赔客服人员",
                2: '管理员',
                1: "超级管理员"
            },
            roleType: function (i) {
                vm.nowType[i]=vm.RoleTypebox[i].id
            },
            cancelFun:function() {
                window.location.href = "#!/members/0";
            }
    });
    window[vm.$id] = vm;
});