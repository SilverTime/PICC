/**
 * Created by mooshroom on 2016/1/27.
 */
define('login',[
    'avalon',
    'text!../../admin/user/login.html',
    'css!../../admin/user/login.css',
], function (avalon,html,css) {
    var vm=avalon.define({
        $id:"login",
        ready: function () {
            admin.login=html
            admin.html=""
        },
        reset: function () {
            avalon.mix(vm,{
                LogAccount :"",
                pwd:"",
            })
        },
        LogAccount :"",
        pwd:"",
        login: function () {
            if(vm.UserName==""){
                tip.on('请填写用户名')
                return
            }
            if(vm.pwd==""){
                tip.on('请填写密码')
                return
            }

            $$.call({
                i:"User/loginByAccount",
                data:{
                    LogAccount :vm.LogAccount ,
                    pwd:vm.pwd
                },
                success: function (res) {

                    door.comeIn({
                        haveLogin: function () {
                            admin.un=cache.go('un')
                            window.location.href="#!/"
                        }
                    })

                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }

    })
    window[vm.$id]=vm
})