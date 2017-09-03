/**
 * Created by mooshroom on 2015/12/11.
 */
define('login', [
    'avalon',
    'text!../../package/getIn/login.html',
    'css!../../package/getIn/getIn.css',
    '../../plugins/isIt/isIt'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "login",
        uidHeart:"",
        ready: function (i) {


            if (cache.go('uid') > 0) {
                window.location.href = '#!/userInfo/' + cache.go('uid')
                return
            }else{
                (function iKnowYou() {
                    if (cache.go('uid') > 0) {
                        clearInterval(vm.uidHeart)
                        window.location.href = "#!/userInfo/" + cache.go('uid')
                    }
                    else {
                        //循环确认uid
                        vm.uidHeart = setTimeout(function () {
                            iKnowYou(cache.go('uid') )
                        }, 500)
                    }

                })()
            }




            vm.reset()
            index.html = html
            //判断是登陆还是注册
            vm.state = i//0为登陆 1为注册
            vm.waitPIN()

        },
        waitPIN: function () {
            vm.sit = setInterval(function () {
                if (cache.go('lastPINTime') > 0) {
                    var st = Math.ceil(40 - Math.ceil((new Date().getTime() - cache.go('lastPINTime')) / 1000))
                    if (st > 0) {
                        vm.setTimeout = st
                    } else {
                        vm.setTimeout = 0
                        clearInterval(vm.sit)
                    }
                }
            }, 1000)
        },
        sit: "",
        setTimeout: 0,
        reset: function () {
            avalon.mix(vm, {
                //state:0,
                //phone:"",
                pin: "",
                Name: "",
                IDCard: "",
                WechatID: "",
            })
        },
        state: 0,

        /*
         * 生成验证码以及发送短信
         Member/getPINByPhone

         请求
         Phone 电话号码

         返回
         无*/
        phone: "",


        getPIN: function (Phone) {
            if (isIt.mobile(Phone, "所输入的手机号")) {
                $$.call({
                    i: "Sms/PIN",
                    data: {
                        Phone: Phone
                    },
                    success: function (res) {
                        tip.on('验证码已发送', 1)

                    },
                    error: function (err) {
                        tip.on(err)
                        cache.go({
                            lastPINTime: 0
                        })

                    }
                })
                cache.go({
                    lastPINTime: new Date().getTime()
                })
                vm.waitPIN()
            }

        },

        pin: "",

        /*通过验证码及手机号动态登陆
         Member/loginByPIN

         请求
         Phone 电话号码
         PIN验证码

         返回
         true（成功）/false（失败）*/
        login: function () {
            if (isIt.mobile(vm.phone, '所输入的手机号码')) {

                if (vm.pin == '') {
                    tip.on('还没有输入验证码！')
                    return
                }
                $$.call({
                    i: 'User/loginByPIN',
                    data: {
                        Phone: vm.phone,
                        PIN: vm.pin
                    },
                    success: function (res) {
                        if (res != false) {
                            cache.go({uid: res.UserID})
                            window.location.href = '#!/userInfo/' + res.UserID
                        } else {
                            tip.on('登陆失败')
                        }

                    },
                    error: function (err) {
                        //如果是还在审核中
                        if (err == '306') {
                            var href = '#!/login/0/'
                            window.location.href = '#!/success/0'
                            require(['../../package/claims/success'], function () {
                                avalon.mix(success, {
                                    title: '正在审核',
                                    subTitle: '资料通过审核之后将会短信通知您' + '<br/>' + '敬请期待您的人保专属之旅',
                                    btn: "返回登陆",
                                    href: href
                                })
                            })
                        } else if(err=="验证码错误"){
                            tip.on(err)
                        }else {
                            window.location.href = '#!/success/1'
                            var href = '#!/login/0/'
                            require(['../../package/claims/success'], function () {
                                avalon.mix(success, {
                                    title: '登录失败!',
                                    subTitle: '您登录未成功可能有以下原因：',
                                    content: '<ul style="padding-left: 20px"><li>入会申请信息填写有误，<a href="#!/login/0">重新填写</a></li><li>保单还未起保生效，生效后再申请，<a href="#!/userInfo/0">先体验</a> </li> <li>还不是人保客户，诚邀您加入人保大家庭，<a href="#!/userInfo/0">欢迎体验</a> </li> </ul>',
                                    btn: "返回登陆",
                                    href: href
                                })
                            })
                            //tip.on(err)
                        }

                    }
                })

                //alert("已发送登陆请求")
            }
        },

        /*用户注册
         Member/add

         请求
         Phone 电话
         Name 姓名
         IDCard 身份证号
         WechatID 微信号
         PIN 验证码*/
        Name: "",
        IDCard: "",
        WechatID: "",
        userAdd: function () {
            //数据验证
            if(!isIt.id(vm.IDCard, '身份证号码')){
                return
            }
            if(!isIt.mobile(vm.phone, '电话号码')){
                return
            }
            if(vm.Name==''){
                tip.on('请输入您的姓名')
                return
            }
            if(vm.pin==""){
                tip.on("还没有输入验证码")
                return
            }

            //判断是否正确的姿势打开的（在微信上打开的同时获取到个人信息的）
            var openid=cache.go("openid")
            if(openid==''||openid==undefined||openid=='undefined'||openid==null){
                tip.on('请在微信客户端中进行注册')
                return
            }

            //alert('昵称：'+cache.go('nickname'))
            //注册请求。
            $$.call({
                i: "Member/addUser",
                data: {
                    Phone: vm.phone,
                    Name: vm.Name,
                    IDCard: vm.IDCard,
                    PIN: vm.pin,
                    OpenID:openid,
                    WeChatNickName:cache.go('nickname')
                },
                success: function (res) {
                    //alert(res)
                        cache.go({uid: res.UserID})
                        window.location.href = '#!/userInfo/' + res.UserID
                },
                error: function (err) {
                    //alert(err)
                    //如果是还在审核中
                    if (err == '306') {
                        var href = '#!/login/0/'
                        window.location.href = '#!/success/0'
                        require(['../../package/claims/success'], function () {
                            avalon.mix(success, {
                                title: '正在审核',
                                subTitle: '资料通过审核之后将会短信通知您' + '<br/>' + '敬请期待您的人保专属之旅',
                                btn: "返回登陆",
                                href: href
                            })
                        })
                    } else if(err=='305'){
                        window.location.href = '#!/success/1'
                        var href = '#!/login/0/'
                        require(['../../package/claims/success'], function () {
                            avalon.mix(success, {
                                title: '加入失败!',
                                subTitle: '您入会未成功有以下原因：',
                                content: '<ul style="padding-left: 20px"><li>入会申请信息填写有误，<a href="#!/login/0">重新填写</a></li><li>保单还未起保生效，生效后再申请，<a href="#!/userInfo/0">先体验</a> </li> <li>还不是人保客户，诚邀您加入人保大家庭，<a href="#!/userInfo/0">欢迎体验</a> </li> </ul>',
                                btn: "返回登录",
                                href: href
                            })
                        })

                    }else{
                        tip.on(err)
                    }

                }
                //原来的逻辑：2016年2月29日，逻辑调整：在注册后自动登陆
                //success: function (res) {
                //    if (res == false) {
                //        //注册失败，跳转失败页面
                //        alert('false')
                //    } else {
                //        //注册成功。跳转个人中心页面
                //        var href = '#!/login/0/'
                //        window.location.href = '#!/success/0'
                //        require(['../../package/claims/success'], function () {
                //            avalon.mix(success, {
                //                title: '加入成功',
                //                subTitle: '资料通过审核之后将会短信通知您' + '<br/>' + '敬请期待您的人保专属之旅',
                //                btn: "返回登陆",
                //                href: href
                //            })
                //        })
                //    }
                //},
                //error: function (res) {
                //    tip.on(res)
                //}
            })
        }


    })
    return login = vm
})