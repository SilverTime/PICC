/**
 * Created by mooshroom on 2015/12/11.
 */
define('userInfo', [
    'avalon',
    'text!../../package/userInfo/userInfo.html',
    'css!../../package/userInfo/userInfo.css',
    '../../lib/star/star.js',
    '../../plugins/door/door.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "userInfo",
        ready: function (id) {
            vm.reset()
            index.html = html
            vm.userGet(id)
            vm.blocks[0].href += id
            vm.uid = id

            if (id == 0) {
                iKnowYou()
            } else {
                clearInterval(vm.uidHeart)
            }

            function iKnowYou() {
                if (cache.go('uid') > 0) {
                    window.location.href = "#!/userInfo/" + cache.go('uid')
                }
                else {
                    vm.info.Name = '体验者'
                    vm.lvStar = '<tsy:star ms-data-lv="info.UserLevel"></tsy:star>'

                    //循环确认uid
                    vm.uidHeart = setTimeout(function () {
                        iKnowYou(cache.go('uid') )
                    }, 500)
                }

            }


        },
        uidHeart: '',
        headimgurl: "",
        reset: function () {
            vm.info = {
                Name: "加载中……",
                BalanceMoney: 3500,
                UserLevel: 3
            };
            vm.uid = 0;

            avalon.mix(vm, {
                lvStar: '',
                $star: {
                    lv: 0
                },
                headimgurl: cache.go('headimgurl'),
                blocks: [
                    {
                        name: "详细资料",
                        icon: "./src/images/userInfoimgs/user_06.png",
                        href: "#!/userInfoDetails/"
                    },
                    {
                        name: "微·理赔",
                        icon: "./src/images/userInfoimgs/user_03.png",
                        href: "#!/claims/0"
                    },
                    {
                        name: "会员特享",
                        icon: "./src/images/userInfoimgs/user_14.png",
                        href: "#!/membersOnly/0"
                    },
                    {
                        name: "智能商城",
                        icon: "./src/images/userInfoimgs/user_11.png",
                        href: "#!/mallList/0"
                    },
                    {
                        name: "我的消费",
                        icon: "./src/images/userInfoimgs/user_22.png",
                        href: "#!/spendList/0"
                    },
                    {
                        name: "精彩活动",
                        icon: "./src/images/userInfoimgs/user_19.png",
                        href: "#!/activityInfo/list"
                    }
                ]
            })
        },
        uid: 0,

        info: {
            Name: "体验者",
            BalanceMoney: 3500,
            UserLevel: 3
        },
        userGet: function (id) {
            if (id != 0) {
                $$.call({
                    i: "Member/get",
                    data: {
                        UserID: id
                    },
                    success: function (res) {
                        vm.info = res[0];
                        vm.$star.lv = vm.info.UserLevel;
                        vm.lvStar = '<tsy:star ms-data-lv="info.UserLevel"></tsy:star>'
                    },
                    error: function (err) {
                        vm.info.Name = '体验者';
                        vm.lvStar = '<tsy:star ms-data-lv="info.UserLevel"></tsy:star>'
                    }
                })
                vm.getSignRecord(id)
            }

        },

        /*获取用户的签到次数
         请求

         Picc/SignRecord/count
         {"UserID":5}
         返回

         SignCount就是签到总次数啦
         {
         "d": [
         {
         "SignRecordID": "14",
         "UserID": "5",
         "SignTime": "1452148085",
         "SignDay": "20160107",
         "SignCount": "1"
         }
         ],
         "tsy": "bd7i4o9m9kga2mhup0jqdd8vd7",
         "UID": null,
         "UN": null,
         "ADMIN": null
         }*/
        SignCount: 0,
        getSignRecord: function (uid) {
            $$.call({
                i: "SignRecord/count",
                data: {
                    UserID: uid
                },
                success: function (res) {
                    vm.SignCount = res[0].SignCount
                },
            })
        },

        lvStar: '',
        $star: {
            lv: 0
        },

        //功能面板
        blocks: [
            {
                name: "详细资料",
                icon: "./src/images/userInfoimgs/user_06.png",
                href: "#!/userInfoDetails/",
            },
            {
                name: "微·理赔",
                icon: "./src/images/userInfoimgs/user_03.png",
                href: "#!/claims/0",
            },
            {
                name: "会员特享",
                icon: "./src/images/userInfoimgs/user_14.png",
                href: "#!/membersOnly/0",
            },
            {
                name: "智能商城",
                icon: "./src/images/userInfoimgs/user_11.png",
                href: "#!/mallList/0",
            },
            {
                name: "我的消费",
                icon: "./src/images/userInfoimgs/user_22.png",
                href: "#!/spendList/0",
            },
            {
                name: "精彩活动",
                icon: "./src/images/userInfoimgs/user_19.png",
                href: "#!/activityInfo/0",
            },
        ]
    })
    return userInfo = vm
})