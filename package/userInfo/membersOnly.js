/**
 * Created by mooshroom on 2016/1/6.
 */
define('membersOnly', [
    'avalon',
    'text!../../package/userInfo/membersOnly.html',
    'css!../../package/userInfo/userInfo.css'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "membersOnly",
        ready: function (i) {
            index.html = html
        },
        reset: function () {

        },

        free: [
            {
                icon: "&#xe63d;",
                name: "车辆救援",
                href: '#!/doc/1'
            },
            {
                icon: "&#xf0151;",
                name: "极速理赔",
                href: '#!/doc/4'
            },
            {
                icon: "&#xe653;",
                name: "违章查询",
                href: "#!/violationsCheck/0"
            }
            //{
            //    icon:"<i class='iconfont' style='color:#fda85a;font-size: 55px;'>&#xe604;</i>",
            //    name:'车驾管',
            //    href:'#!/doc/3'
            //}

        ],
        out: [
            {
                icon: "&#xe60a;",
                name: '代办年检',
                href: '#!/doc/2'
            },
            {
                name: "保单查询",
                icon: "&#xe660;",
                href: "http://www.epicc.com.cn/wap/views/policyClaim/claimIndex.jsp"
            },
            {
                name: "理赔查询",
                icon: "&#xe603;",
                href: "http://www.epicc.com.cn/wap/views/policyClaim/claimPolicy.jsp"
            }
        ],
        others: [
            {
                icon: "<img style='width:60px;height:60px;transform: rotateY(180deg) ' src='./src/images/userInfoimgs/monkey.png' />",
                href: "#!/membersOnly/0"
            },
            {
                icon: "<img style='width:60px;height:60px' src='./src/images/userInfoimgs/fook.png' />",
                href: "#!/membersOnly/0"
            },
            {
                icon: "<img style='width:60px;height:60px' src='./src/images/userInfoimgs/monkey.png' />",
                href: "#!/membersOnly/0"
            }
        ],
        only: [
            {
                icon: "<img style='width:50px;height:50px' src='./src/images/userInfoimgs/shopping.png' />",
                name: "智能商城",
                href: "#!/mallList/0"
            },
            {
                name: "微·理赔",
                icon: "<img style='width:50px;height:50px' src='./src/images/userInfoimgs/mo-weilipei.png' />",
                href: "#!/claims/0"
            }
        ],
        onlySec: [
            {
                icon: "<img style='width:50px;height:50px' src='./src/images/userInfoimgs/activity.png' />",
                name: "精彩活动",
                href: '#!/activityInfo/list'
            },
            {
                icon: "<img style='width:50px;height:50px' src='./src/images/userInfoimgs/mo-kefu.png' />",
                name: "自助客服",
                href: '#!/selfHelp/0'
            }

        ]
    })
});