/**
 * Created by mooshroom on 2015/12/11.
 */
define('claimsAdd', [
    'avalon',
    'text!../../package/claims/claimsAdd.html',
    'text!../../package/claims/claimsAddBase.html',
    'css!../../package/claims/claims.css',
    '../../lib/wxAddPic/wxAddPic.js',
    '../../lib/mAlert/mAlert.js'
], function (avalon, html, base, css) {
    var vm = avalon.define({
        $id: "claimsAdd",
        ready: function (i) {
            vm.reset();
            //vm.getUserInfo();
            vm.buildPics();
            vm.judgeVal();
            //解析参数
            //var params =i.split("&&")
            //vm.CarInfoID=params[1]

            if (i == 0) {
                //理赔信息填写
                index.html = base;
                avalon.mix(vm, {
                    Name: '',
                    Phone: "",
                    CarID: "",
                })

                //如果是已登录的用户，抓取用户信息中的，姓名、手机号自动填入到表单中
                vm.getUserInfo();
            }
            else if (i == 1) {
                //上传照片
                index.html = html

                try {
                    wx.ready(function () {
                        wx.getLocation({
                            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                            success: function (res) {
                                //alert(res.latitude + "," + res.longitude)
                                vm.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                                vm.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                                var speed = res.speed; // 速度，以米/每秒计
                                var accuracy = res.accuracy; // 位置精度
                            }
                        });
                    })

                } catch (err) {
                    alert(err.message)
                }
            }

        },
        CarInfoID: '',
        reset: function () {
            avalon.mix(vm, {
                latitude: "",
                longitude: '',
                CarInfoID: '',
                name_flag: 0,
                phone_flag: 0,
                carId_glag: 0,
                wxPic: '<wx:addpic ms-attr-config="$opt{{el.name}}"></wx:addpic>',
                $opt0: {
                    callback: function (id) {
                        vm.scenePic[0].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                            if (vm.scenePic[0].$pics[i] == id) {
                                vm.scenePic[0].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },
                $opt1: {
                    callback: function (id) {
                        vm.scenePic[1].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                            if (vm.scenePic[1].$pics[i] == id) {
                                vm.scenePic[1].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },
                $opt2: {
                    callback: function (id) {
                        vm.scenePic[2].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                            if (vm.scenePic[2].$pics[i] == id) {
                                vm.scenePic[2].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },

                $opt3: {
                    callback: function (id) {
                        vm.scenePic[3].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                            if (vm.scenePic[3].$pics[i] == id) {
                                vm.scenePic[3].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },
                $opt4: {
                    callback: function (id) {
                        vm.cardPic[0].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                            if (vm.cardPic[0].$pics[i] == id) {
                                vm.cardPic[0].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },
                $opt5: {
                    callback: function (id) {
                        vm.cardPic[1].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                            if (vm.cardPic[1].$pics[i] == id) {
                                vm.cardPic[1].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },
                $opt6: {
                    callback: function (id) {
                        vm.cardPic[2].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                            if (vm.cardPic[2].$pics[i] == id) {
                                vm.cardPic[2].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },
                $opt7: {
                    callback: function (id) {
                        vm.cardPic[3].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                            if (vm.cardPic[3].$pics[i] == id) {
                                vm.cardPic[3].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },
                $opt8: {
                    callback: function (id) {
                        vm.cardPic[4].$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                            if (vm.cardPic[4].$pics[i] == id) {
                                vm.cardPic[4].$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                },

                //切换照片组

                showing: 0,
                docScroll: 0,//0 顶部，1，底部 2 中间

                scenePic: [
                    {
                        title: "前后远景照",
                        sub: "需反映周围路面情况以及车牌号，至少上传一张照片",
                        defaultNum: 2,//控制图片上传按钮数量
                        name: '0',

                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "前后远景照"

                                ],
                                extraTitle: [
                                    "需反映周围路面情况以及车牌号",

                                ],
                                content: '<img src="./src/images/claimsTip/around_03.jpg" alt=""/><hr/><img src="./src/images/claimsTip/around_06.jpg" alt=""/>'
                            })
                        },


                    },
                    {
                        title: "近景照片",
                        sub: "需要反映车辆于物体的碰撞部位",
                        defaultNum: 1,
                        name: '1',
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "近景照片"

                                ],
                                extraTitle: [
                                    "需要反映车辆于物体的碰撞部位",

                                ],
                                content: '<img src="./src/images/claimsTip/close_03.jpg" alt=""/>'
                            })
                        },
                    },
                    {
                        title: "局部拍照",
                        sub: "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",
                        defaultNum: 2,
                        name: '2',
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "局部拍照"

                                ],
                                extraTitle: [
                                    "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",

                                ],
                                content: '<img src="./src/images/claimsTip/local1.jpg" alt=""/><hr/><img src="./src/images/claimsTip/local2.jpg" alt=""/>'
                            })
                        },
                    },
                    {
                        title: "配件散落物照片",
                        sub: "若车辆有配件损坏需拍摄地面散落物照片",
                        defaultNum: 1,
                        name: "3",
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "配件散落物照片"

                                ],
                                extraTitle: [
                                    "若车辆有配件损坏需拍摄地面散落物照片",

                                ],
                                content: '<img src="./src/images/claimsTip/part1.jpg" alt=""/>'
                            })
                        },
                    },
                ],

                //证件
                cardPic: [
                    {
                        title: "机动车行驶证正副页",
                        sub: "",
                        defaultNum: 2,
                        name: '4',
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "机动车行驶证正副页"

                                ],
                                extraTitle: [
                                    "",

                                ],
                                content: '<img src="./src/images/claimsTip/Vehicle1.jpg" alt=""/><hr/><img src="./src/images/claimsTip/Vehicle2.jpg" alt=""/>'
                            })
                        },

                    },
                    {
                        title: "驾驶证正副页",
                        sub: "",
                        defaultNum: 2,
                        name: '5',
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "驾驶证正副页"

                                ],
                                extraTitle: [
                                    "",

                                ],
                                content: '<img src="./src/images/claimsTip/Drive1.jpg" alt=""/><hr/><img src="./src/images/claimsTip/Drive2.jpg" alt=""/>'
                            })
                        },
                    },
                    {
                        title: "被保人身份证正反面",
                        sub: "",
                        defaultNum: 2,
                        name: '6',
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "被保人身份证正反面"

                                ],
                                extraTitle: [
                                    "",

                                ],
                                content: '<img src="./src/images/claimsTip/ID1.jpg" alt=""/><hr/><img src="./src/images/claimsTip/ID2.jpg" alt=""/>'
                            })
                        },
                    },
                    {
                        title: "被保人银行卡号",
                        sub: "",
                        defaultNum: 1,
                        name: '7',
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "被保人银行卡号"

                                ],
                                extraTitle: [
                                    "",

                                ],
                                content: '<img src="./src/images/claimsTip/Bank1.jpg" alt=""/>'
                            })
                        },
                    },
                    {
                        title: "其他",
                        sub: "",
                        defaultNum: 3,
                        name: '8',
                        pics: [],
                        $pics: [],
                        tip: function () {
                            claimsTip.appear()
                            avalon.mix(claimsTip, {
                                subtitle: [
                                    "其他"

                                ],
                                extraTitle: [
                                    "",

                                ],
                                content: ''
                            })
                        },
                    },
                ],
            })
        },

        /***************理赔信息填写的相关*********************/
        Name: "",
        Phone: "",
        CarID: "",
        //标记输入框的内容状态
        name_flag: 0,
        phone_flag: 0,
        carID_flag: 0,
        judgeVal: function () {
            //定时判断输入框内容，为空时，更改状态，出现“删除”标志；
            setInterval(function () {
                if (vm.Name !== "") {
                    vm.name_flag = 1;
                }
                else {
                    vm.name_flag = 0;
                }
                if (vm.Phone !== "") {
                    vm.phone_flag = 1;
                }
                else {
                    vm.phone_flag = 0;
                }
                if (vm.CarID !== "") {
                    vm.carID_flag = 1;
                }
                else {
                    vm.carID_flag = 0;
                }
            }, 100)
        },
        //车牌号输入时，字母转换为大写
        upperCase: function () {
            vm.CarID = vm.CarID.toUpperCase();
        },
        //输入框清空函数
        clearName: function () {
            vm.Name = ""
        },
        clearPhone: function () {
            vm.Phone = ""
        },
        clearCarID: function () {
            vm.CarID = ""
        },


        //获取用户信息
        getUserInfo: function () {
            //判断是否登陆
            var UID = cache.go('uid');
            if (UID == '' || UID == undefined || UID == null || UID == "undefined") {
                //未登录的用户
                return
            }
            //已登陆 调用接口获取信息
            $$.call({
                i: "User/getByID",
                data: {
                    UserIDs: [UID]
                },
                success: function (res) {
                    //抓出姓名和手机号填入到Name和Phone中
                    console.log(res);
                    vm.Name = res[0].UserName;
                    vm.Phone = res[0].Phone;
                },
                error: function (err) {
                    tip.on(err)
                }
            })

        },

        goToNext: function () {
            //验证所填入的东西是否都完整且正确
            if (vm.Name === "") {
                tip.on("请输入申请人姓名");
                return
            }
            if (vm.Phone === "") {
                tip.on("请输入申请人手机号码");
                return
            }
            if (vm.CarID === "") {
                tip.on("请输入申请人的车牌号");
                return
            }

            /*匹配姓名：
             要求：真实姓名可以是汉字，也可以是字母，但是不能两者都有，也不能包含任何符号和数字
             注意：1.如果是英文名,可以允许英文名字中出现空格
             2.英文名的空格可以是多个，但是不能连续出现多个
             3.汉字不能出现空格[\u4e00-\u9fa5]
             */
            var name_reg = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
            if (name_reg.test(vm.Name) === false) {
                tip.on("请检查您的姓名栏输入是否有误");
                return
            }

            /*电话号的正则匹配
             电话号区段
             130-139/180-189
             145 、147
             150-153 、155-159
             170 、175 、176 、177 、178
             */
            var phone_reg = /^(1[38][0-9][0-9]{8})|(14[57][0-9]{8})|(15[012356789][0-9]{8})|(17[05678][0-9]{8})$/;
            if (phone_reg.test(vm.Phone) === false) {
                tip.on("请检查您的手机号码是否正确", 0, 3000);
                return
            }


            /*
             车牌号的匹配
             首位是汉字，第二位为大写英文字母，后五位为字母、数字
             */
            var carId_reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{5}$/;
            if (carId_reg.test(vm.CarID) === false) {
                tip.on("请检查您输入的车牌号是否正确，如“川", 0, 3000);
                return
            }
            window.location.href = '#!/claimsAdd/1';
            //跳转到上传图片（#!/claimsAdd/1）
        },


        /********************图片上传相关******************************/
        buildPics: function () {
            function build(obj) {
                for (var i = 0; i < obj.defaultNum; i++) {
                    vm.addMore(obj)
                }
            }

            function each(arr) {
                for (var o = 0; o < arr.length; o++) {
                    build(arr[o])
                }
            }

            try {
                each(vm.scenePic)
            } catch (err) {
            }

            try {
                each(vm.cardPic)
            } catch (err) {
            }
        },
        //图片队列模型

        //现场
        $around: [],
        "$close": [],//近景
        "$local": [],//局部
        "$part": [],//配件
        "$Vehicle": [],//机动车行驶证
        "$Drive": [],//驾驶证
        "$ID": [],//身份证
        "$Bank": [],//银行卡
        "$Other": [],//其他

        addMore: function (This) {
            This.pics.push({
                $opt: {
                    callback: function (id) {
                        This.$pics.push(id)
                    },
                    delCallback: function (id) {
                        for (var i = 0; i < This.$pics.length; i++) {
                            if (This.$pics[i] == id) {
                                This.$pics.splice(i, 1)
                                return
                            }
                        }
                    }
                }
            })
        },

        $tip: {
            id: "claimsTip",
            btn: [
                {
                    name: "我知道了",
                    onClick: function () {
                        claimsTip.disappear()
                    }
                },
            ],
            subtitle: [
                ""

            ],
            extraTitle: [
                "",
            ],
            content: ''
        },

        scenePic: [
            {
                title: "前后远景照",
                sub: "需反映周围路面情况以及车牌号，至少上传一张照片",
                defaultNum: 3,
                name: '0',

                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "前后远景照"

                        ],
                        extraTitle: [
                            "需反映周围路面情况以及车牌号",

                        ],
                        content: '<img src="./src/images/claimsTip/around_03.png" alt=""/><hr/><img src="./src/images/claimsTip/around_06.png" alt=""/>'
                    })
                },


            },
            {
                title: "近景照片",
                sub: "需要反映车辆于物体的碰撞部位",
                defaultNum: 3,
                name: '1',
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "近景照片"

                        ],
                        extraTitle: [
                            "需要反映车辆于物体的碰撞部位",

                        ],
                        content: '<img src="./src/images/claimsTip/close_03.png" alt=""/>'
                    })
                },
            },
            {
                title: "局部拍照",
                sub: "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",
                defaultNum: 3,
                name: '2',
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "局部拍照"

                        ],
                        extraTitle: [
                            "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",

                        ],
                        content: ''
                    })
                },
            },
            {
                title: "配件散落物照片",
                sub: "若车辆有配件损坏需拍摄地面散落物照片",
                defaultNum: 3,
                name: "3",
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "配件散落物照片"

                        ],
                        extraTitle: [
                            "若车辆有配件损坏需拍摄地面散落物照片",

                        ],
                        content: ''
                    })
                },
            },
        ],

        //证件
        cardPic: [
            {
                title: "机动车行驶证正副页",
                sub: "",
                defaultNum: 2,
                name: '4',
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "机动车行驶证正副页"

                        ],
                        extraTitle: [
                            "",

                        ],
                        content: '<img src="./src/images/claimsTip/vehicle_03.png" alt=""/><hr/><img src="./src/images/claimsTip/vehicle_06.png" alt=""/>'
                    })
                },

            },
            {
                title: "驾驶证正副页",
                sub: "",
                defaultNum: 2,
                name: '5',
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "驾驶证正副页"

                        ],
                        extraTitle: [
                            "",

                        ],
                        content: '<img src="./src/images/claimsTip/drive_03.png" alt=""/><hr/><img src="./src/images/claimsTip/drive_06.png" alt=""/>'
                    })
                },
            },
            {
                title: "被保人身份证正反面",
                sub: "",
                defaultNum: 2,
                name: '6',
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "被保人身份证正反面"

                        ],
                        extraTitle: [
                            "",

                        ],
                        content: '<img src="./src/images/claimsTip/id_03.png" alt=""/><hr/><img src="./src/images/claimsTip/id_06.png" alt=""/>'
                    })
                },
            },
            {
                title: "被保人银行卡号",
                sub: "",
                defaultNum: 1,
                name: '7',
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "被保人银行卡号"

                        ],
                        extraTitle: [
                            "",

                        ],
                        content: '<img src="./src/images/claimsTip/bank_03.png" alt=""/>'
                    })
                },
            },
            {
                title: "其他",
                sub: "",
                defaultNum: 3,
                name: '8',
                pics: [],
                $pics: [],
                tip: function () {
                    claimsTip.appear()
                    avalon.mix(claimsTip, {
                        subtitle: [
                            "其他"

                        ],
                        extraTitle: [
                            "",

                        ],
                        content: ''
                    })
                },
            },
        ],

        wxPic: '',

        $opt0: {
            callback: function (id) {
                vm.scenePic[0].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                    if (vm.scenePic[0].$pics[i] == id) {
                        vm.scenePic[0].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },
        $opt1: {
            callback: function (id) {
                vm.scenePic[1].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                    if (vm.scenePic[1].$pics[i] == id) {
                        vm.scenePic[1].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },
        $opt2: {
            callback: function (id) {
                vm.scenePic[2].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                    if (vm.scenePic[2].$pics[i] == id) {
                        vm.scenePic[2].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },

        $opt3: {
            callback: function (id) {
                vm.scenePic[3].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.scenePic[1].$pics.length; i++) {
                    if (vm.scenePic[3].$pics[i] == id) {
                        vm.scenePic[3].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },
        $opt4: {
            callback: function (id) {
                vm.cardPic[0].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                    if (vm.cardPic[0].$pics[i] == id) {
                        vm.cardPic[0].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },
        $opt5: {
            callback: function (id) {
                vm.cardPic[1].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                    if (vm.cardPic[1].$pics[i] == id) {
                        vm.cardPic[1].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },
        $opt6: {
            callback: function (id) {
                vm.cardPic[2].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                    if (vm.cardPic[2].$pics[i] == id) {
                        vm.cardPic[2].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },
        $opt7: {
            callback: function (id) {
                vm.cardPic[3].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                    if (vm.cardPic[3].$pics[i] == id) {
                        vm.cardPic[3].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },
        $opt8: {
            callback: function (id) {
                vm.cardPic[4].$pics.push(id)
            },
            delCallback: function (id) {
                for (var i = 0; i < vm.cardPic[0].$pics.length; i++) {
                    if (vm.cardPic[4].$pics[i] == id) {
                        vm.cardPic[4].$pics.splice(i, 1)
                        return
                    }
                }
            }
        },

        //切换照片组
        showing: 0,
        docScroll: 0,//0 顶部，1，底部 2 中间


        //切换显示
        toggleShow: function (i) {
            vm.showing = i
        },

        //提交理赔申请
        latitude: "",
        longitude: '',
        committing:false,
        commit: function () {
            //检测图片数量

            for (var x = 0; x < vm.scenePic.length; x++) {
                if (vm.scenePic[x].$pics.length == 0) {
                    tip.on('现场照片每个分类至少上传一张照片~')
                    return false
                }
            }
            //todo  下面3个不能为空

            if (cache.go("openid") == "" || cache.go("openid") == undefined || cache.go("openid") == null) {
                tip.on("请在微信客户端使用此功能")
                return
            }
            if (vm.CarID == "" || vm.CarID == undefined || vm.CarID == null) {
                tip.on('车牌号码为空')
                return
            }
            if (vm.Phone == "" || vm.Phone == undefined || vm.Phone == null) {
                tip.on('电话号码为空')
                return
            }


            // "CarID":vm.CarID,
            //"OpenID": cache.go("openid"),
            //"Phone": vm.Phone,


            //获取地理位置

            //alert(vm.Latitude + "," + vm.Longitude)
            vm.committing=true
            tip.on('正在提交理赔申请……', 2000)
            //发起请求
            $$.call({
                i: 'ClaimsManagement/add',
                data: {
                    "CarID": vm.CarID,
                    "OpenID": cache.go("openid"),
                    "Phone": vm.Phone,
                    "Name": vm.Name,
                    Latitude: vm.latitude,
                    Longitude: vm.longitude,
                    "Picture": {
                        "around": vm.scenePic[0].$pics,
                        "close": vm.scenePic[1].$pics,
                        "local": vm.scenePic[2].$pics,
                        "part": vm.scenePic[3].$pics,
                        "vehicle": vm.cardPic[0].$pics,
                        "drive": vm.cardPic[1].$pics,
                        "id": vm.cardPic[2].$pics,
                        "bank": vm.cardPic[3].$pics,
                        "other": vm.cardPic[4].$pics
                    }
                },
                success: function (res) {
                    vm.committing=false
                    tip.off('正在提交理赔申请……', 2000)
                    window.location.href = '#!/success/0';
                    require(['../../package/claims/success.js'], function () {
                        var d = new Date()
                        var str = "申请时间：" + d.getFullYear() + '.' + (d.getMonth() + 1) + '.' + d.getDate() + " " + d.getHours() + ":" + d.getMinutes()
                        avalon.mix(success, {
                            title: "理赔申请提交完成!",
                            subTitle: str,
                            btn: "返回个人中心",
                            href: "#!/userInfo/" + cache.go("uid")
                        })
                    })

                },
                error: function (err) {
                    vm.committing=false
                    tip.off('正在提交理赔申请……', 2000)
                    tip.on(err)
                }
            })
        }
        //alert("!!")


    })
    return claimsAdd = vm
})