/**
 * Created by mooshroom on 2015/12/11.
 */


    /*全局变量*/
var apiURL = 'http://picc.weixin.tansuyun.cn/index.php?i=';

var _businessType = [

    {
        name: "加油",
        id: "1",
        icon: '',
        checked:false
    },
    {
        name: "洗车",
        id: "2",
        icon: '',
        checked:false
    },
    {
        name: "特惠活动",
        id: "3",
        icon: '',
        checked:false
    },
]

var _area = [
    {
        name:"涪城区",
        id:"510703",
        checked:false
    },
    {
        name:"游仙区",
        id:"510704",
        checked:false
    },
    {
        name:"三台县",
        id:"510722",
        checked:false
    },
    {
        name:"盐亭县",
        id:"510723",
        checked:false
    },
    {
        name:"安县",
        id:"510724",
        checked:false
    },
    {
        name:"梓潼县",
        id:"510725",
        checked:false
    },
    {
        name:"北川羌族自治县",
        id:"510726",
        checked:false
    },
    {
        name:"平武县",
        id:"510727",
        checked:false
    },
    {
        name:"江油市",
        id:"510781",
        checked:false
    },
    {
        name:"高新区",
        id:"5107001",
        checked:false
    },
    {
        name:"科创园区",
        id:"5107002",
        checked:false
    },
    {
        name:"经开区",
        id:"5107003",
        checked:false
    },
    {
        name:"科学城",
        id:"5107004",
        checked:false
    }
]
    //0: "请选择区域",
    //
    //510703: '涪城区',
    //510704: '游仙区',
    //510722: '三台县',
    //510723: '盐亭县',
    //510724: '安县',
    //510725: '梓潼县',
    //510726: '北川羌族自治县',
    //510727: '平武县',
    //510781: '江油市',
    //5107001: '高新区',
    //5107002: '科创园区',
    //5107003: '经开区',
    //5107004: '科学城 ',




/*根VM*/

require([
    'avalon',
    'mmRequest',
    '../../plugins/door/door.js'
], function (avalon, mmRequest) {
    var vm = avalon.define({
        $id: 'admin',
        html: '',//所填入内容的区域
        login:"",//登陆界面
        RoleID:'',
        ready: function () {
            //暴露视图模型
            window.admin = vm;
            //构建路由
            require([
                "mmRouter"
            ], function () {
                //构建导航的路由
                vm.buildRouter();
                console.log("路由构建完毕");
                //开始监听
                avalon.history.start();

                avalon.scan();
            })
            vm.un=cache.go('un')
        },
        un:'',
        reset: function () {

        },
        //路由配置
        topNav: [
            {
                name: "理赔管理",
                default: 0,//默认进入哪一个路由
                leftNav: [
                    {
                        name: "理赔审核",
                        en: "claimsExamine",
                        href: "#!/claimsExamine/0",
                        vm: '../../admin/claims/claimsExamine.js'

                    },
                    {
                        name: "审核详情",
                        en: "ExamineDetails",
                        href: "#!/ExamineDetails/0",
                        vm: '../../admin/claims/ExamineDetails.js',
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "理赔历史",
                        en: "claimsHistory",
                        href: "#!/claimsHistory/0",
                        vm: '../../admin/claims/claimsHistory'
                    },
                    {
                        name: "历史详情",
                        en: "HistoryDetails",
                        href: "#!/HistoryDetails/0",
                        vm: '../../admin/claims/HistoryDetails.js',
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    }
                ]
            },
            {
                name: "系统管理",
                default: 0,
                hiddenRoleID:3,//限制某个角色无法看到
                leftNav: [
                    {
                        name: "员工管理",
                        en: 'members',
                        href: "#!/members/0",
                        vm: "../../admin/system/members"
                    },
                    //员工管理操作项
                    {
                        name: "新增账号",
                        en: 'addAccount',
                        href: "#!/addAccount/0",
                        vm: "../../admin/system/addAccount",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏

                    },
                    {
                        name: "修改角色",
                        en: 'changeActor',
                        href: "#!/changeActor/0",
                        vm: "../../admin/system/changeActor",
                        hidden: true

                    },
                    {
                        name: "修改信息",
                        en: 'changeInfo',
                        href: "#!/changeInfo/0",
                        vm: "../../admin/system/changeInfo",
                        hidden: true

                    },
                    {
                        name: "重置密码",
                        en: 'resetPassword',
                        href: "#!/resetPassword/0",
                        vm: "../../admin/system/resetPassword",
                        hidden: true

                    },
                    {
                        name: "删除账号",
                        en: 'delectAccount',
                        href: "#!/delectAccount/0",
                        vm: "../../admin/system/delectAccount",
                        hidden: true

                    },


                    {
                        name: "菜单管理",
                        en: "navConf",
                        href: "#!/navConf/0",
                        vm: "../../admin/system/navConf",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "角色权限",
                        en: 'authority',
                        href: "#!/authority/0",
                        vm: "../../admin/system/authority",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "客服管理",
                        en: "service",
                        href: "#!/service/0",
                        vm: "../../admin/system/service"
                    },
                    {
                        name: "客服操作",
                        en: "serviceDone",
                        href: "#!/serviceDone/0",
                        vm: "../../admin/system/serviceDone",
                        hidden: true//
                    },

                    {
                        name: "礼品",
                        en: "gift",
                        href: "#!/gift/0",
                        vm: "../../admin/system/gift"
                    },
                    {
                        name: "精彩活动",
                        en: "monthTheme",
                        href: "#!/monthTheme/0",
                        vm: "../../admin/system/monthTheme"
                    },
                    //主题月操作
                    {
                        name: "新增主题月",
                        en: "addMonthTheme",
                        href: "#!/addMonthTheme/0",
                        vm: "../../admin/system/addMonthTheme",
                        hidden: true
                    },
                    {
                        name: "删除主题月",
                        en: "deleteMonthTheme",
                        href: "#!/deleteMonthTheme/0",
                        vm: "../../admin/system/deleteMonthTheme",
                        hidden: true
                    },
                    {
                        name: "报名详情查看",
                        en: "joinDetails",
                        href: "#!/joinDetails/0",
                        vm: "../../admin/system/joinDetails",
                        hidden: true
                    }
                ]
            },
            {
                name: "会员管理",
                default: 0,
                hiddenRoleID:3,//限制某个角色无法看到
                leftNav: [
                    {
                      name:'会员统计',
                        en:'userChart',
                        href:'#!/userChart/0',
                        vm:'../../admin/user/userChart',
                        hidden:true,
                    },
                    {
                        name: "会员资料",
                        en: "userInfo",
                        href: "#!/userInfo/0",
                        vm: "../../admin/user/userInfo"
                    },
                    {
                        name: "会员资料详情",
                        en: "infoDetails",
                        href: "#!/infoDetails/0",
                        vm: "../../admin/user/infoDetails",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "会员审核",
                        en: "userExamine",
                        href: "#!/userExamine/0",
                        vm: "../../admin/user/userExamine"
                    },
                    {
                        name: "审核历史",
                        en: "examineHistory",
                        href: "#!/examineHistory/0",
                        vm: "../../admin/user/examineHistory",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "会员审核详情",
                        en: "userDetails",
                        href: "#!/userDetails/0",
                        vm: "../../admin/user/userDetails",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "数据同步",
                        en: "update",
                        href: "#!/update/0",
                        vm: "../../admin/user/update"
                    },
                    {
                        name: "元宝管理",
                        en: "goldManagement",
                        href: "#!/goldManagement/0",
                        vm: "../../admin/user/goldManagement"
                    }
                ]
            },
            {
                name: "商家管理",
                default: 0,
                hiddenRoleID:3,//限制某个角色无法看到
                leftNav: [
                    {
                        name: "总体统计",
                        en: "total",
                        href: "#!/total/0",
                        vm: "../../admin/mall/total",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "类型管理",
                        en: "type",
                        href: "#!/type/0",
                        vm: "../../admin/mall/type",
                        hidden: true
                    },
                    {
                        name: "商家列表",
                        en: "mallList",
                        href: "#!/mallList/0",
                        vm: "../../admin/mall/mallList"
                    },
                    {
                        name: "新增商家",
                        en: "newMerchant",
                        href: "#!/newMerchant/0",
                        vm: "../../admin/mall/newMerchant",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "商家信息",
                        en: "merchantInfo",
                        href: "#!/merchantInfo/0",
                        vm: "../../admin/mall/merchantInfo",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "商品列表",
                        en: "goodsList",
                        href: "#!/goodsList/0",
                        vm: "../../admin/mall/goodsList",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "订单列表",
                        en: "orderDetails",
                        href: "#!/orderDetails/0",
                        vm: "../../admin/mall/orderDetails",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "赠送管理",
                        en: "giftManagement",
                        href: "#!/giftManagement/0",
                        vm: "../../admin/mall/giftManagement",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "赠送历史",
                        en: "giftHistory",
                        href: "#!/giftHistory/0",
                        vm: "../../admin/mall/giftHistory",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "商品详情",
                        en: "goodsDetail",
                        href: "#!/goodsDetail/0",
                        vm: "../../admin/mall/goodsDetail",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "商家二维码",
                        en: "QRCode",
                        href: "#!/QRCode/0",
                        vm: "../../admin/mall/QRCode",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    //{
                    //    name: "商品审核",
                    //    en: "goodsExamine",
                    //    href: "#!/goodsExamine/0",
                    //    vm: "../../admin/mall/goodsExamine"
                    //},
                    {
                        name: "商品审核详情",
                        en: "goodsExamineDetail",
                        href: "#!/goodsExamineDetail/0",
                        vm: "../../admin/mall/goodsExamineDetail",
                        hidden: true//控制是否在界面上是否隐藏 为true则隐藏
                    },
                    {
                        name: "结算明细",
                        en: "settlementDetail",
                        href: "#!/settlementDetail/0",
                        vm: "../../admin/mall/settlementDetail"
                    }
                ]
            },
            {
                name: "短信平台",
                default: 0,
                hiddenRoleID:3,//限制某个角色无法看到
                leftNav: [
                    {
                        name: '业务管理',
                        en: 'operationControl',
                        href: '#!/operationControl/0',
                        vm: '../../admin/message/operationControl'
                    },
                    {
                        name: '短信群发',
                        en: 'msgSend',
                        href: '#!/msgSend/0',
                        vm: '../../admin/message/msgSend'
                    }
                ]
            }
        ],
        showingLeftNav: [],

        //切换侧边导航
        toggleLeftNav: function (i) {
            var module = vm.topNav[i];
            //切换左侧导航
            vm.showingLeftNav = module.leftNav;
            //跳转默认路径
            window.location.href = module.leftNav[module.default].href
        },

        /*………………………………………………………………………………………………路由处理函数………………………………………………………………………………………………*/
        buildRouter: function () {
            var l = vm.topNav
            for (var i = 0; i < l.length; i++) {
                for (var o = 0; o < l[i].leftNav.length; o++) {
                    //构建路由
                    vm.newRouter(l[i].leftNav[o]);
                    //构建索引 用于查找高亮
                    l[i].leftNav[o].fatherIndex = i;
                    l[i].leftNav[o].thisIndex = o;
                }
            }
            avalon.router.get("/", function () {
                window.location.href = "#!/claimsExamine/0";
            });

            //登陆页面的路由
            avalon.router.get('/login',function(){
                require(['../../admin/user/login'], function () {
                    login.ready()
                })
            })

            console.log("全部路由构建完毕，开始监听");
            //开始监听
            avalon.history.start();
            //构建错误页面
            avalon.router.error(function () {
                try {
                    tip.on("404:没有找到这个路径")
                } catch (err) {
                }
            });

            avalon.scan();
        },
        nowTop: -1,
        nowLeft: -1,
        newRouter: function (n) {
            var en = n.en;

            avalon.router.get('/' + en + '/:i', function (i) {

                //门禁验证
                door.comeIn({
                    haveLogin: function () {

                    },
                    notLogin: function () {
                        window.location.href='#!/login'
                        tip.on('您的登录已过期或未登录，请重新登陆')
                    }
                })

                admin.login=''
                //if(cache.go('uid')==undefined||cache.go('uid')=="undefined"){
                //    window.location.href="#!/login"
                //    return
                //}
                //开启进度条
                //try {
                //    pb.startT()
                //} catch (err) {
                //}
                //if (!n.modal) {
                //    //关闭模态框
                //    try {
                //        modal.mustOut()
                //    } catch (err) {}
                //}

                //查找高亮
                vm.nowTop = n.fatherIndex;
                vm.nowLeft = n.thisIndex;

                //填充左侧导航

                vm.showingLeftNav = vm.topNav[vm.nowTop].leftNav;


                //todo 这里以后要做权限验证 checkLimit()
                if (n.vm) {
                    require([n.vm], function () {
                        avalon.vmodels[en].ready(i);

                        //结束进度条
                        //try {
                        //    pb.endT()
                        //} catch (err) {
                        //}
                    })
                }
                if (n.fn) {
                    n.fn(i);

                    //结束进度条
                    try {
                        pb.endT()
                    } catch (err) {
                    }
                }

                //document.getElementById("title").innerText= n.name
                console.log(n.name + "模块加载完毕")
            });
            console.log(n.name + "路由创建完毕")
        },

        //这个函数用来对用户进行权限控制，未来可能会添加多种限制条件
        checkLimit: function (fn, limit) {


            if (cache.go("UnitID") == 23) {
                fn()
            } else {
                tip.on("您的账户没有访问改模块的权限");
                //history.go(-1)
            }

        },


        //组件配置
        //提示框配置
        $opta: {
            id: "tip"
        },
//                模态框配置
        $optb: {
            id: "modal"
        },
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

        //登出
        logout: function () {
            $$.call({
                i:"User/logout",
                data:{},
                success: function (res) {
                    cache.go({
                        uid:'',
                        un:'',
                        tsy:''
                    })
                    door.locked = true
                    door.logined=false
                    window.location.href='#!/login'
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }
    })
    //引入组建
    require([
        '../../lib/tip/tip.js',
        '../../lib/progressbar/progressbar.js'
    ], function () {
        avalon.scan();
        vm.ready()
    })

    /*………………………………………………………………………………………………路由处理函数………………………………………………………………………………………………*/


});


/*全局方法*/
function getDateFromTimestamp(Timestamp) {
    for (var i = Timestamp.length; i < 13; i++) {
        Timestamp += '0';
    }
    var date = new Date();
    date.setTime(Timestamp);

    var month=(date.getMonth()+1)+''
    for(var o=month.length;o<2;o++){
        month='0'+month
    }
    var day=date.getDate()+''
    for(var p=day.length;p<2;p++){
        day='0'+day
    }
    return date.getFullYear()+"-"+month+"-"+day
}

//new Date的兼容性处理
function newDateAndTime(dateStr){
    var ds = dateStr.split(" ")[0].split("-");
    var ts = dateStr.split(" ")[1]?dateStr.split(" ")[1].split(":"):['00','00','00'];
    var r = new Date();
    r.setFullYear(ds[0],ds[1] - 1, ds[2]);
    r.setHours(ts[0], ts[1], ts[2], 0);
    return r;
}