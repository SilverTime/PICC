/**
 * Created by mooshroom on 2015/12/11.
 */
define('claimsPic', [
    'avalon',
    'text!../../package/claims/claimsPic.html',
    'css!../../package/claims/claims.css',
    //'../../lib/wxAddPic/wxAddPic.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "claimsPic",
        ready: function (id) {
            vm.reset()
            index.html = html
            //vm.buildPics()
            vm.getInfo(id)

        },
        reset: function () {
            avalon.mix(vm,{
                $around: [],
                "$close": [],//近景
                "$local": [],//局部
                "$part": [],//配件
                "$Vehicle": [],//机动车行驶证
                "$Drive": [],//驾驶证
                "$ID": [],//身份证
                "$Bank": [],//银行卡
                "$Other": [],//其他
                scenePic: [
                    {
                        title: "前后远景照",
                        sub: "需反映周围路面情况以及车牌号",
                        defaultNum: 3,
                        pics: [],
                        //$pics: []

                    },
                    {
                        title: "近景照片",
                        sub: "需要反映车辆于物体的碰撞部位",
                        defaultNum: 3,
                        pics: []
                    },
                    {
                        title: "局部拍照",
                        sub: "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",
                        defaultNum: 3,
                        pics: [],
                        //$pics: []
                    },
                    {
                        title: "配件散落物照片",
                        sub: "若车辆有配件损坏需拍摄地面散落物照片",
                        defaultNum: 3,
                        pics: [],
                        //$pics: []
                    },
                ],

                //证件
                cardPic: [
                    {
                        title: "机动车行驶证正副页",
                        sub: "",
                        defaultNum: 2,
                        $pics: [],
                        //$pics: []

                    },
                    {
                        title: "驾驶证正副页",
                        sub: "",
                        defaultNum: 2,
                        $pics: []
                    },
                    {
                        title: "被保人身份证正反面",
                        sub: "",
                        defaultNum: 2,
                        $pics: [],
                        //$pics: []
                    },
                    {
                        title: "被保人银行卡号",
                        sub: "",
                        defaultNum: 1,
                        $pics: [],
                        //$pics: []
                    },
                    {
                        title: "其他",
                        sub: "",
                        defaultNum: 3,
                        $pics: [],
                        //$pics: []
                    },
                ],

                //切换照片组
                showing:0,
                docScroll:0,//0 顶部，1，底部 2 中间
            })
        },
        /*
         * 理赔详情

         请求

         Picc/ClaimsManagement/detail
         {
         "IndemnifyID": 218246
         }*/
        info:{},
        getInfo: function (id) {
            $$.call({
                i:"ClaimsManagement/detail",
                data:{
                    "IndemnifyID": id
                },
                success: function (res) {
                    //todo 根据后端返回进行塞入
                    vm.info=res[0]
                    vm.scenePic[0].pics=res[0].Pics.around
                    vm.scenePic[1].pics=res[0].Pics.close
                    vm.scenePic[2].pics=res[0].Pics.local
                    vm.scenePic[3].pics=res[0].Pics.part
                    vm.cardPic[0].pics=res[0].Pics.vehicle
                    vm.cardPic[1].pics=res[0].Pics.drive
                    vm.cardPic[2].pics=res[0].Pics.id
                    vm.cardPic[3].pics=res[0].Pics.bank
                    vm.cardPic[4].pics=res[0].Pics.other

                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        //图片队列模型


        scenePic: [
            {
                title: "前后远景照",
                sub: "需反映周围路面情况以及车牌号",
                defaultNum: 3,
                pics: [],

            },
            {
                title: "近景照片",
                sub: "需要反映车辆于物体的碰撞部位",
                defaultNum: 3,
                pics: []
            },
            {
                title: "局部拍照",
                sub: "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",
                defaultNum: 3,
                pics: [],
            },
            {
                title: "配件散落物照片",
                sub: "若车辆有配件损坏需拍摄地面散落物照片",
                defaultNum: 3,
                pics: [],
            },
        ],

        //证件
        cardPic: [
            {
                title: "机动车行驶证正副页",
                sub: "",
                defaultNum: 2,
                pics: [],

            },
            {
                title: "驾驶证正副页",
                sub: "",
                defaultNum: 2,
                pics: [],
            },
            {
                title: "被保人身份证正反面",
                sub: "",
                defaultNum: 2,
                pics: [],
            },
            {
                title: "被保人银行卡号",
                sub: "",
                defaultNum: 1,
                pics: [],
            },
            {
                title: "其他",
                sub: "",
                defaultNum: 3,
                pics: [],
            },
        ],

        //切换照片组
        showing:0,
        docScroll:0,//0 顶部，1，底部 2 中间


        //切换显示
        toggleShow: function (i) {
            vm.showing=i
        },



    })
    return claimsAdd = vm
})