/**
 * Created by Chris on 2016/1/12.
 */
define('changeInfo', [
    'avalon',
    'text!../../admin/system/changeInfo.html',
    'css!../../admin/system/system.css',
    '../../plugins/isIt/isIt'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "changeInfo",
        ready: function (id) {
            vm.reset();
            admin.html = html;
            vm.getUser(id);
            vm.UserID = id;
        },
        reset: function () {
            avalon.mix(vm, {
                UserID: '',
                name: "",
                Phone: ""
            })
        },

        getUser: function (id) {
            $$.call({
                i: "User/getByID",
                data: {
                    UserIDs:[id]
                },
                success: function (res) {
                    vm.name = res[0].UserName;
                    vm.Phone = res[0].Phone
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        UserID: '',
        name: "",
        Phone: "",
        changeUserInfo: function () {

            if(vm.name==''){
                tip.on("员工姓名不能为空");
                return
            }
            if(!isIt.mobile(vm.Phone,'所输入的电话号码')&&!isIt.phone(vm.Phone,'所输入的电话号码')){
                return
            }

            $$.call({
                i: "User/ChangeUserInfo",
                data: {
                    UserID: vm.UserID,
                    UserName: vm.name,
                    Phone: vm.Phone,
                    Email: ""
                },
                success: function (res) {
                    tip.on("修改成功", 1);
                    window.location.href = "#!/members/0";

                },
                error: function (err) {
                    tip.on(err)
                }
            })

        },

        cancelFun: function () {
            window.location.href = "#!/members/0";
            vm.name = "";
            vm.phone = "";
        }
    });
    window[vm.$id] = vm;
});