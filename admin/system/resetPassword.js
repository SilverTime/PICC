/**
 * Created by Chris on 2016/1/16.
 */
define('resetPassword', [
    'avalon',
    'text!../../admin/system/resetPassword.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "resetPassword",
        ready: function (id) {
            vm.reset();

            admin.html = html;
            vm.UserID = id;
        },
        reset: function () {
            avalon.mix(vm, {
                UserID:"",
                upNewPwd:"",
                reUpPwd:"",
            })
        },
        UserID:"",
        upNewPwd:"",
        reUpPwd:"",
        ResetPwd: function () {
            if(vm.upNewPwd!=vm.reUpPwd){
                tip('两次输入密码不一致，请检查正确性')
                return
            }
            $$.call({
                i: "User/ChangePwd",
                data: {
                    UserID:vm.UserID,

                    //OldPwd:"", //原密码
                    NewPwd:vm.upNewPwd //新密码
                },
                success: function (res) {
                    tip.on("重置成功",1);
                    window.location.href='#!/members/1'
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

    });
    window[vm.$id] = vm
});