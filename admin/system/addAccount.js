/**
 * Created by Chrris on 2016/1/16.
 */
define('addAccount', [
    'avalon',
    'text!../../admin/system/addAccount.html',
    'css!../../admin/system/system.css',
    '../../plugins/isIt/isIt'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "addAccount",
        ready: function () {
            vm.reset();
            admin.html = html;
        },
        reset: function () {
            avalon.mix(vm, {
                nowType: [],
                stateFlag: [],
                LogAccount: "",
                Name: "",
                Phone: "",
                RoleIDs: [],
                PWD: "",
                Role: "",
                rePWD: "",
            })
        },
        LogAccount: "",
        Name: "",
        Phone: "",
        RoleIDs: [],
        PWD: "",
        Role: "",
        rePWD: "",


        //判断并上传数据
        putAccount: function () {
            if(vm.Name==""){
                tip.on('还没有输入员工姓名');
                return
            }
            if(vm.Phone==""){
                tip.on('没有输入电话号码');
                return
            }
            if(!isIt.mobile(vm.Phone,'所输入的电话号码')&&!isIt.phone(vm.Phone,'所输入的电话号码')){
                return
            }
            if(vm.LogAccount==""){
                tip.on('还没有输入登陆账号');
                return
            }
            if(vm.PWD!=vm.rePWD){
                tip.on('两次输入的密码不一致');
                return
            }
            if(!isIt.pwd(vm.PWD,'所输入的密码')){
                return
            }
            if(vm.Role==""){
                tip.on("还没有选择员工角色");
                return
            }


            $$.call({
                i: "Member/addWorker",
                data: {
                    Name: vm.Name,
                    Phone: vm.Phone,
                    LogAccount: vm.LogAccount,
                    RoleIDs: [vm.Role],
                    PWD: vm.PWD
                },
                success: function (res) {
                    tip.on("添加成功", 1);
                    window.location.href = "#!/members/0";
                    vm.Name = "";
                    vm.Phone = "";
                    vm.LogAccount = "";

                },
                error: function (err) {
                    tip.on(err)
                }
            })

        },
        cancelFun: function () {
            window.location.href = "#!/members/0";
            vm.Name = "";
            vm.Phone = "";
            vm.LogAccount = "";
        },


        Roles: {
            3: "理赔客服人员",
            2: '管理员',
            1: "超级管理员"
        }
    });
    window[vm.$id] = vm
});