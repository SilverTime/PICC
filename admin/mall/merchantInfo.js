/**
 * Created by ANNNI on 2016/1/16.
 */
define('merchantInfo', [
    'avalon',
    'text!../../admin/mall/merchantInfo.html',
    'css!../../admin/mall/mall.css',
    '../../lib/star/star.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "merchantInfo",
        ready: function (id) {
            admin.html = html
            vm.reset()
            vm.addReset()
            vm.getDetails(id);
        },
        reset: function () {
            avalon.mix(vm,{
                info: {
                    SellerName: '获取中……',
                    Pic: '',
                    Address: '',
                    SellerLevel: '',
                    WorkTime: '',
                    SellerTypeName: '',
                    SellerTypeID: '',
                    SellerState: '',
                    SellerID: '',
                    QRCodeID: '',
                    Phone: '',
                    AreaID: '',
                    AdministratorID: '',
                    AddTime: '',
                    Notice: [],
                    Goods: [],
                    BanGoods:[],
                    TimeOutGoods:[],
                    star: ''
                },
                showingAdd: false,
            })
        },
        info: {
            SellerName: '获取中……',
            Pic: '',
            Address: '',
            SellerLevel: '',
            WorkTime: '',
            SellerTypeName: '',
            SellerTypeID: '',
            SellerState: '',
            SellerID: '',
            QRCodeID: '',
            Phone: '',
            AreaID: '',
            AdministratorID: '',
            AddTime: '',
            Notice: [],
            Goods: [],
            BanGoods:[],
            TimeOutGoods:[],
            star: ''
        },
        getDetails: function (id) {
            $$.call({
                i: 'Business/get',
                data: {
                    SellerID: id
                },
                success: function (res) {
                    vm.reset()
                    avalon.mix(vm.info, res)
                    vm.info.star = '<tsy:star ms-data-lv="info.SellerLevel"></tsy:star>'
                }
            })
        },
        save: function () {
            //TODO 保存
            $$.call({
                i: '',
                data: {},
                success: function (res) {

                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        resetPwd: function () {
            //TODO 重置密码
            $$.call({
                i: 'User/resetPwd',
                data: {
                    UserID: vm.info.AdministratorID
                },
                success: function (res) {
                    tip.on("重置成功")
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        showingAdd: false,
        showAddGoods: function (i) {
            vm.showingAdd = i

            if (!i) {
                vm.addReset()
            }
        },
        addReset: function () {
            avalon.mix(vm.add, {
                "GoodsName": "",//商品名
                "Total": 0,//总数量
                "Price": '',//价格
                "Unit": "",//单位
                "PricePrimary": '',//原价
                "BuyMax": 0,//单用户最大购买次数

//有效期,有效期后面那个数必须大于前面那个数
            })
            vm.showingAdd=false
        },

        add: {
            "GoodsName": "",//商品名
            "Total": '',//总数量
            "Price": '',//价格
            "Unit": "",//单位
            "PricePrimary": '',//原价
            "BuyMax": '',//单用户最大购买次数

//,有效期后面那个数必须大于前面那个数
        },
        $add:{
            "GoodsName": "商品名",//
            "Total": '总数量',//
            "Price": '价格',//
            "Unit": "单位",//
            "PricePrimary": '原价',//
            "BuyMax": '单用户最大购买次数',//

        },
        time1:'',
        time2:"",
        buildTime: function () {
            var time1,time2
            if(vm.time1==""||vm.time1==0){
                time1='1990-01-01'
            }else{
                time1=vm.time1
            }
            if(vm.time2==""||vm.time2==0){
                time2="3016-01-22"
            }else{
                time2=vm.time2
            }
            var t1,t2;
            var timeStr
            if(time1<=time2){
                t1=newDateAndTime(time1 +' 00:00:00').getTime()/1000
                t2=newDateAndTime(time2 +' 23:59:59').getTime()/1000
                timeStr=t1+","+t2
            }else{
                t1=newDateAndTime(time2+' 00:00:00').getTime()/1000
                t2=newDateAndTime(time1+' 23:59:59').getTime()/1000
                timeStr=t1+","+t2
            }

            return timeStr

        },

        addGoods: function () {
            vm.buildTime()
            var data={
                SellerID:vm.info.SellerID,
                "Between": vm.buildTime()
            }
            if(vm.add.Total==''){
                vm.add.Total=0
            }
            if(vm.add.BuyMax==''){
                vm.add.BuyMax=0
            }


            for(var x in vm.add){
                if(x.charAt(0)!='$'){
                    if(vm.add[x]==''){
                        tip.on('还没有填写'+vm.$add[x])
                        return
                    }else{
                        data[x]=vm.add[x]
                    }

                }
            }

            $$.call({
                i:"Commodity/add",
                data:data,
                success: function (res) {
                    vm.info.Goods.push(res[0])
                    vm.addReset()
                },
                error: function (err) {
                    tip.on(err)
                }
            })

        },

        banGoods: function (id) {
            $$.call({
                i:"Commodity/OutGoods",
                data:{
                    GoodsIDs:[id]
                },success: function (res) {
                    vm.getDetails(vm.info.SellerID);
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        startGoods: function (id) {
            $$.call({
                i:"Commodity/Start",
                data:{
                    GoodsIDs:[id]
                },success: function (res) {
                    vm.getDetails(vm.info.SellerID);
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        reQR: function () {
            $$.call({
                i:'Business/getQR',
                data:{
                    SellerID:vm.info.SellerID
                },
                success: function (res) {
                    vm.ready(vm.info.SellerID)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }
    });
    window[vm.$id] = vm
});