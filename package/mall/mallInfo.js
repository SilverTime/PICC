/**
 * Created by mooshroom on 2015/12/11.
 */
define('mallInfo', [
    'avalon',
    'text!../../package/mall/mallInfo.html',
    'css!../../package/mall/mall.css',
    '../../package/mall/mallList',
    '../../lib/MDEditor/markdown',
    '../../lib/mAlert/mAlert.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "mallInfo",
        ready: function (id) {
            vm.reset()
            index.html = html
            vm.mallGet(id)
        },
        reset: function () {
            vm.area = mallList.area;
            vm.businessType = mallList.businessType
            vm.info = {
                Goods: [],
                Notice: []
            }

            avalon.mix(vm, {
                checkedGoods: [],
                checkedTotal: 0,
                buying: 0,
                $buyGoods: [],
                showGoods: true,
                showNotice: true,
            })
        },
        businessType: "",
        area: "",
        info: {
            Goods: [],
            Notice: []
        },
        mallGet: function (id) {
            $$.call({
                i: "Business/get",
                data: {
                    SellerID: id
                },
                success: function (res) {
                    console.log(res)

                    //构建选中字段
                    if (res.Goods) {
                        for (var i = 0; i < res.Goods.length; i++) {
                            res.Goods[i].Checked = false
                        }
                    }


                    //进入界面
                    vm.info = res
                    if(res.Note==null){
                        res.Note=''
                    }else{
                        vm.info.Note = marked(res.Note)
                    }
                    vm.info.star = '<tsy:star ms-data-lv="info.SellerLevel"></tsy:star>'
                }
            })
        },
        //    商品的选中与取消
        checkedGoods: [],
        checkedTotal: 0,
        goodsCheck: function (o, type) {
            if (type == undefined || type == 'auto') {
                vm.info.Goods[o].Checked = !vm.info.Goods[o].Checked
            } else if (type == "Check") {
                vm.info.Goods[o].Checked = true
            } else if (type == "unCheck") {
                vm.info.Goods[o].Checked = false
            }


            //重新整理购物车
            vm.checkedGoods = []
            vm.checkedTotal = 0
            for (var i = 0; i < vm.info.Goods.length; i++) {
                if (vm.info.Goods[i].Checked) {
                    //加入购物车
                    vm.info.Goods[i].i = i
                    vm.checkedGoods.push(vm.info.Goods[i])
                    vm.checkedTotal = (Number(vm.checkedTotal) + Number(vm.info.Goods[i].Price)).toFixed(2)
                }
            }
        },

        //购买商品
        /*订单添加

         Order/add
         请求

         UserID=5
         SellerID=1
         GoodsID='167320'
         Money=200
         TypeID=0
         (如果是用户购买，Type=0
         如果是系统赠送，Type=1)

         返回

         {
         "d":[
         {
         "OrderID":"111",
         "UserID":"5",
         "SellerID":"1",
         "GoodsID":"167320",
         "PayMoney":"200",
         "PayTime":"1452072990",
         "UseTime":null,
         "Source":0,
         "CancelTime":null,
         "OrderPhone":null,
         "PresenterType":null,
         "PresenterID":null,
         "WalletLogID":"2",
         "OverdueTime":null,
         "OrderState":null,
         "Serialnumber":null,
         "UserName":"乔巴",
         "Phone":"13600000000"
         }
         ],
         "tsy":"958e0ct393s71o7clp5vuo3fm6",
         "UID":null,
         "UN":null,
         "ADMIN":null
         }
         */

        buying: 0,
        $buyGoods: [],
        $alert2:{
            id:"maAlert2",
            btn: [
                {
                    name: "点击加入",
                    onClick: function () {
                        maAlert2.disappear()
                        window.location.href='#!/login/1'
                    }
                }
            ],
            subtitle:[
                "体验该项服务，<br/>需要您成为人保会员"
            ],
            extraTitle:[
                "",
            ],
            content:''

        },
        buy: function () {
            uid=cache.go('uid')
            if(uid==undefined||uid==""||uid=='undefined'){
                //还没有加入会员
                maAlert2.appear()
                return
            }

            //数据验证
            var UserID = cache.go("uid");

            if (UserID == undefined || UserID == "") {
                tip.on("未能识别当前用户，请重新登录")
                return
            }

            if (vm.checkedGoods.length == 0) {
                tip.on("请选择您要购买的商品", 1)
                return
            }

            //批量购买
            vm.$buyGoods = []
            for (var i = 0; i < vm.checkedGoods.length; i++) {
                vm.buying++
                orderAdd(vm.checkedGoods[i].GoodsID)

                //缓存本次购买
                vm.$buyGoods.push(vm.checkedGoods[i])

            }

            function orderAdd(goodsid) {
                var GoodsID = goodsid
                if (GoodsID > 0) {
                    $$.call({
                        i: "Order/add",
                        data: {
                            UserID: UserID,
                            SellerID: vm.info.SellerID,
                            GoodsID: GoodsID,
                            TypeID: 0
                        },
                        success: function (res) {
                            vm.buying--
                            if (res.length > 0) {
                                //购买成功
                                tip.on("购买成功,订单编号：" + res[0].OrderID, 1)
                                var goodsid = res[0].GoodsID
                                //vm.checkedTotal=(vm.checkedTotal-res[0].PayMoney).toFixed(2)

                                for (var i = 0; i < vm.info.Goods.length; i++) {
                                    if (vm.info.Goods[i].GoodsID == goodsid) {
                                        vm.goodsCheck(vm.info.Goods[i].i, "unCheck")
                                    }
                                }

                                if (vm.buying == 0) {
                                    window.location.href = '#!/success/0'
                                    require(['../../package/claims/success'], function () {
                                        avalon.mix(success, {
                                            title: '购买成功',
                                            subTitle: '',
                                            btn: "马上消费",
                                            href: '#!/spendList/0'
                                        })
                                    })
                                }

                            } else {
                                //购买出错
                                tip.on("未知错误")
                            }
                        },
                        error: function (err) {
                            vm.buying--
                            tip.on(err)
                        }
                    })
                } else {
                    return
                }

            }


        },


        /*选购服务和购买须知默认展开，服务条款默认收起*/
        showGoods: true,
        toggleGoods: function () {
            vm.showGoods = !vm.showGoods
        },

        showNotice: true,
        toggleNotice: function () {
            vm.showNotice = !vm.showNotice
        },

        showTips: true,
        toggleTips: function () {
            vm.showTips = !vm.showTips
        },


        //服务条款
        tips: [
            '进入我的消费-点击对应订单-打开二维码消费使用”。',
            '每次消费不限使用龙宝券张数。',
            '服务订单一旦兑换即代表消费下单，不可申请“退单退款”和“过期退款”。建议在产生消费时下单扫码，合理下单消费。',
            '如部分服务因商家设备故障或其他不可抗因素导致无法提供，商家可提供等价服务替换，具体事宜请与商家协商。',
            '为保证用户权益，请选择绵阳车友俱乐部微信平台进行消费。客户与本平台外的任何第三方发生的交易行为如出现问题，本平台都不承担责任，谢谢您的理解和支持。',
            '客户在享受商家服务时 ，若存在不合理情况（服务项目内容不一致、价格比实际价格贵、服务态度恶劣等），均可向微信平台投诉。'

        ]

    })
    return mallInfo = vm
})