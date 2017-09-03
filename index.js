/**
 * Created by mooshroom on 2015/12/11.
 */
/*………………………………………………………………………………………………全局配置………………………………………………………………………………………………*/
//var apiURL = './index.php?i=';
var apiURL='http://picc.weixin.tansuyun.cn/index.php?i='
//alert("开始请求3" + apiURL);
$$.call({
    i: 'Wechat/getJSTicket',
    data: {},
    success: function (res) {
        //console.log(res)
        //alert(res)
        //try{
            wxgetReady(res.ticket);
        //}catch(err){err.message}



    }
})
/*
 * 注意：
 * 1. 所有的JS接口只能在公众号绑定的域名下调用，公众号开发者需要先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
 * 2. 如果发现在 Android 不能分享自定义内容，请到官网下载最新的包覆盖安装，Android 自定义分享接口需升级至 6.0.2.58 版本及以上。
 * 3. 完整 JS-SDK 文档地址：http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 *
 * 如有问题请通过以下渠道反馈：
 * 邮箱地址：weixin-open@qq.com
 * 邮件主题：【微信JS-SDK反馈】具体问题
 * 邮件内容说明：用简明的语言描述问题所在，并交代清楚遇到该问题的场景，可附上截屏图片，微信团队会尽快处理你的反馈。
 */
wx.ready(function () {
   //tip.on("微信SDK接入成功",1,700)
})
wx.error(function (res) {
    tip.on(JSON.stringify(res));
});
cache.go({
    tsy:""
})
doorWX.getCode();

/*………………………………………………………………………………………………index的视图模型………………………………………………………………………………………………*/
require([
    'avalon',
    'mmRequest',
    //'../../plugins/door/door.js'
], function (avalon) {
    var vm = avalon.define({
        $id: "index",
        ready: function () {
            require([
                "mmRouter",
            ], function () {

                //构建导航的路由
                getMap(vm.nav);
                console.log("路由构建完毕")
                //开始监听
                avalon.history.start();

                avalon.scan();

            })

        },
        reset: function () {

        },

        html: '',
        //路由
        nav: [
            //入会
            {
                name: '加入俱乐部',
                en: 'login',
                href: '#!/login/0',
                vm: "../../package/getIn/login.js"
            },

            {
                name: '信息审核中',
                en: 'waiting',
                href: '#!/waiting/0',
                //vm:'../../package//.js',
                fn: function () {
                    require(['text!../../package/getIn/waiting.html', 'css!../../package/getIn/getIn.css'], function (html) {
                        vm.html = html
                    })
                }
            },
            //{
            //    name: '加入成功',
            //    en: 'getInSuccess',
            //    href: '#!/getInSuccess/0',
            //    //vm:'../../package//.js'
            //    fn: function () {
            //        require(['text!../../package/getIn/success.html', 'css!../../package/getIn/getIn.css'], function (html) {
            //            vm.html = html
            //        })
            //    }
            //},

            //个人资料
            {
                name: '个人资料',
                en: 'userInfo',
                href: '#!/userInfo/0',
                vm: '../../package/userInfo/userInfo.js'
            },
            {
                name: '详细资料',
                en: 'userInfoDetails',
                href: '#!/userInfoDetails/0',
                vm: '../../package/userInfo/userInfoDetails.js'
            },
            {
                name: '活动详情',
                en: 'activityInfo',
                href: '#!/activityInfo/0',
                vm: '../../package/userInfo/activityInfo.js'
            },
            {
                name:'会员特享',
                en:"membersOnly",
                href: '#!/membersOnly/0',
                vm: '../../package/userInfo/membersOnly.js'
            },
            {
                name:'违章查询',
                en:"violationsCheck",
                href: '#!/violationsCheck/0',
                vm: '../../package/violationsCheck/violationsCheck.js',
                hidden:true
            },


            //理赔服务
            {
                name: '理赔服务',
                en: 'claims',
                href: '#!/claims/0',
                vm: '../../package/claims/claims.js'
            },
            {
                name: '申请理赔',
                en: 'claimsAdd',
                href: '#!/claimsAdd/0',
                vm: '../../package/claims/claimsAdd.js'
            },
            {
                name: '理赔详情',
                en: 'claimsInfo',
                href: '#!/claimsInfo/0',
                vm: '../../package/claims/claimsInfo.js'
            },
            {
                name: '理赔图片详情',
                en: 'claimsPic',
                href: '#!/claimsPic/0',
                vm: '../../package/claims/claimsPic.js'
            },
            {
                name: '提交成功',
                en: 'success',
                href: '#!/success/0',
                vm:'../../package/claims/success.js'
            },

            //智能商城
            {
                name: '智能商城',
                en: 'mallList',
                href: '#!/mallList/0',
                vm: '../../package/mall/mallList.js'
            },
            {
                name: '商家详情',
                en: 'mallInfo',
                href: '#!/mallInfo/0',
                vm: '../../package/mall/mallInfo.js'
            },
            {
                name: '购买成功',
                en: 'paySuccess',
                href: '#!/paySuccess/0',
                vm: '../../package/mall/paySuccess.js'
            },

            //我的消费
            {
                name: '我的消费',
                en: 'spendList',
                href: '#!/spendList/0',
                vm: '../../package/mySpend/spendList.js'
            },
            {
                name: '消费详情',
                en: 'spendInfo',
                href: '#!/spendInfo/0',
                vm: '../../package/mySpend/spendInfo.js'
            },

            //静态文档类
            {
                name:"文档",
                en:"doc",
                href:"#!/doc/0",
                vm:'../../package/doc/doc.js'
            },
            {
                name:'自助客服',
                en:"selfHelp",
                href: '#!/selfHelp/0',
                vm: '../../package/doc/selfHelp.js'
            },
            {
                name:'关于俱乐部',
                en:"about",
                href: '#!/about/0',
                vm: '../../package/doc/about.js'
            },
        ],

        //组件配置
        //提示框配置
        $opta: {
            id: "tip"
        },
//                模态框配置
//        $optb: {
//            id: "modal"
//        },
        //websocket配置
//        $optc: {
//            id: "ws",
//            server: "ws://180.97.81.190:46032",//线上版本
////                    server: "ws://my.s.tansuyun.cn:46080",//测试版本
//            debug: false
//        },
        $optd: {
            id: "pb"
        },
        //$optTop: {
        //    id: "toTop"
        //},
    })
    require([
        '../../lib/tip/tip.js',
        '../../lib/progressbar/progressbar.js'
    ], function () {
        avalon.scan();
        vm.ready()
    })

    window.index = vm

    /*………………………………………………………………………………………………路由处理函数………………………………………………………………………………………………*/

    //这个函数用来对用户进行权限控制，未来可能会添加多种限制条件
    function checkLimit(fn, limit) {


        if (cache.go("UnitID") == 23) {
            fn()
        } else {
            tip.on("您的账户没有访问改模块的权限")
            //history.go(-1)
        }

    }

    /*路由*/
    function newRouter(n) {
        var en = n.en;

        avalon.router.get('/' + en + '/:i', function (i) {

            //检查权限
            //door.comeIn({})

            //开启进度条
            try {
                pb.startT()
            } catch (err) {
            }
            if (!n.modal) {
                //关闭模态框
                try {
                    modal.mustOut()
                }
                catch (err) {
                }
            }


            //tip.on("正在加载……",1)
            if (n.vm) {
                require([n.vm], function () {
                    avalon.vmodels[en].ready(i)
                    //tip.off("正在加载……",1)

                    //结束进度条
                    try {
                        pb.endT()
                    } catch (err) {
                    }
                })
            }
            if (n.fn) {
                n.fn(i)

                //结束进度条
                try {
                    pb.endT()
                } catch (err) {
                }
            }

            document.getElementById("title").innerText = n.name
            console.log(n.name + "模块加载完毕")
        });
        console.log(n.name + "路由创建完毕")


    }

    function getMap(nav) {
        console.log("开始构建路由")
        var l = nav
        var ll = l.length
        var lsl;
        for (var i = 0; i < ll; ++i) {
            if (l[i].sub) {
                //有第二级导航
                lsl = l[i].sub.length
                for (var o = 0; o < lsl; ++o) {
                    newRouter(l[i].sub[o])
                }
            }
            else {
                //直接渲染项目
                newRouter(l[i])

            }
        }

    }


})


/*………………………………………………………………………………………………全局函数………………………………………………………………………………………………*/
//跨浏览器事件对象方法
var EventUtil = new Object;
EventUtil.addEventHandler = function (oTarget, sEventType, fnHandler) {
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEventType, fnHandler, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = fnHandler;
    }
};

EventUtil.removeEventHandler = function (oTarget, sEventType, fnHandler) {
    if (oTarget.removeEventListener) {
        oTarget.removeEventListener(sEventType, fnHandler, false);
    } else if (oTarget.detachEvent) {
        oTarget.detachEvent("on" + sEventType, fnHandler);
    } else {
        oTarget["on" + sEventType] = null;
    }
};

EventUtil.formatEvent = function (oEvent) {
    if (isIE && isWin) {
        oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
        oEvent.eventPhase = 2;
        oEvent.isChar = (oEvent.charCode > 0);
        oEvent.pageX = oEvent.clientX + document.body.scrollLeft;
        oEvent.pageY = oEvent.clientY + document.body.scrollTop;
        oEvent.preventDefault = function () {
            this.returnValue = false;
        };

        if (oEvent.type == "mouseout") {
            oEvent.relatedTarget = oEvent.toElement;
        } else if (oEvent.type == "mouseover") {
            oEvent.relatedTarget = oEvent.fromElement;
        }

        oEvent.stopPropagation = function () {
            this.cancelBubble = true;
        };

        oEvent.target = oEvent.srcElement;
        oEvent.time = (new Date).getTime();
    }
    return oEvent;
};

EventUtil.getEvent = function() {
    if (window.event) {
        return this.formatEvent(window.event);
    } else {
        return EventUtil.getEvent.caller.arguments[0];
    }
}