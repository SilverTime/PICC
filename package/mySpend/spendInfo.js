/**
 * Created by mooshroom on 2015/12/11.
 */
define('spendInfo',[
    'avalon',
    'text!../../package/mySpend/spendInfo.html',
    'css!../../package/mySpend/mySpend.css',
    'css!../../package/mall/mall.css',

],function(avalon,html,css){
    var vm=avalon.define({
        $id:"spendInfo",
        ready:function(id){
            vm.reset()
            index.html=html
            vm.OrderGet(id)


        },
        reset:function(){

            vm.info={
                //Goods:[],
                Notice:[]
            }
            avalon.mix(vm,{
                btName:'',
                Order:{},
                showGoods:true,
                showNotice:true,
            })
        },
        btName:'',
        Order:{},
        businessType: [
            {
                name: "全部活动",
                id: '0',
                icon: "",
            },
            {
                name: "加油",
                id: "1",
                icon: '',
            },
            {
                name: "洗车",
                id: "2",
                icon: '',
            },
            {
                name: "特惠活动",
                id: "3",
                icon: '',
            },
        ],

        area: [
            {code:0,name: "全部区域"},
            {code:510703,name: '涪城区'},
            {code:510704,name: '游仙区'},
            {code:5107001,name: '高新区'},
            {code:5107002,name: '科创园区'},
            {code:5107003,name: '经开区'},
            {code:5107004,name: '科学城 '},
            {code:510781,name: '江油市'},
            {code:510722,name: '三台县'},
            {code:510723,name: '盐亭县'},
            {code:510724,name: '安县'},
            {code:510725,name: '梓潼县'},
            {code:510726,name: '北川县'},
            {code:510727,name: '平武县'},

        ],
        //获取订单
        OrderGet: function (id) {
            $$.call({
                i:'Order/get',
                data:{
                    OrderID:id
                },
                success: function (res) {
                    vm.Order=res
                    vm.mallGet(res.SellerID)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        //获取商家
        info:{
            //Goods:[],
            Notice:[]
        },
        mallGet: function (id) {
            $$.call({
                i:"Business/get",
                data:{
                    SellerID:id
                },
                success: function (res) {
                    ////构建选中字段
                    //for(var i=0;i<res[0].Goods.length;i++){
                    //    res[0].Goods[i].Checked=false
                    //}

                    //进入界面
                    vm.info=res
                    vm.info.star='<tsy:star ms-data-lv="info.SellerLevel"></tsy:star>'
                    vm.btName="{{businessType[info.SellerTypeID].name}}"
                }
            })
        },
        /*选购服务和购买须知默认展开，服务条款默认收起*/
        showGoods:true,
        toggleGoods: function () {
            vm.showGoods=!vm.showGoods
        },
        showNotice:true,
        toggleNotice:function(){
            vm.showNotice=!vm.showNotice
        },

        //扫描二维码
        scan: function () {
            //alert("开始调用哨马")
            try{
                wx.ready(function(){
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            //alert("二维码扫描成功："+result)
                            vm.pay(result)
                        }
                    });
                })

            }catch(err){alert(err.message)}

        },

        pay: function (Url) {
            if(!confirm("确认消费")){
                return
            }
            $$.call({
                i:"Commodity/QR",
                data:{
                    "Url": Url,
                    "UserID": cache.go("uid"),
                    "OrderID": vm.Order.OrderID
                },
                success: function (res) {
                    //alert(JSON.stringify(res))
                    vm.Order=res[0]
                    window.location.href='#!/success/0'
                    require(['../../package/claims/success'], function () {
                        avalon.mix(success,{
                            title:'消费成功',
                            subTitle:'流水号   '+res[0].SerialNumber,
                            btn:"返回个人中心",
                            href:'#!/userInfo/'+cache.go('uid')
                        })
                    })
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }

    })
    return spendInfo=vm
})