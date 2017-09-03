/**
 * Created by mooshroom on 2015/12/11.
 */
define('mallList', [
    'avalon',
    'text!../../package/mall/mallList.html',
    'css!../../package/mall/mall.css',
    '../../lib/star/star.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "mallList",
        ready: function () {
            vm.reset()
            index.html = html
            //vm.getArea()
            //vm.getBusinessType()
            vm.getBusiness()

        },
        reset: function () {
            vm.select.bt = {
                name: "全部活动",
                id: '0',
                icon: "",
            }
            vm.select.a = vm.area[0].name
            vm.listReset()

            avalon.mix(vm,{
                showMoreBT: false,
                showMoreArea: false,

                $W: {},
                $W_old:{},
            })

        },

        select: {
            bt: {},
            a: ""
        },

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

        showMoreBT: false,
        toggleBusinessType: function () {
            if(!vm.showMoreBT){
                vm.showMoreArea=false
            }
            vm.showMoreBT = !vm.showMoreBT

        },
        selectBT: function (i) {
            if (i == 0) {
                vm.$W.Type = undefined
            } else {
                vm.$W.Type = vm.businessType[i].id
            }
            vm.getBusiness()


            //vm.select.bt = vm.businessType[i]

            for(var x in vm.select.bt){
                if(x.charAt(0)!="$"){
                    vm.select.bt[x]=vm.businessType[i][x]
                }
            }
            vm.toggleBusinessType()
        },
        //getBusinessType: function () {
        //    $$.call({
        //        i: 'SellerType/gets',
        //        data: {},
        //        success: function (res) {
        //
        //        }
        //    })
        //},

        //获取区域字典表
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
        showMoreArea: false,
        toggleArea: function () {
            if(!vm.showMoreArea){
                vm.showMoreBT=false
            }
            vm.showMoreArea = !vm.showMoreArea
        },
        selectArea: function (i) {
            if (i == 0) {
                vm.$W.AreaID = undefined
            } else {
                vm.$W.AreaID = vm.area[i].code
            }

            vm.select.a = vm.area[i].name
            vm.getBusiness()
            vm.toggleArea()
        },
        //getArea: function () {
        //    $$.call({
        //        i: 'Area/gets',iv
        //        data: {},
        //        success: function (res) {
        //
        //        }
        //    })
        //},

        //获取商家列表
        list: [],
        P: 0,
        N: 12,
        T: 0,
        $W: {},
        $W_old:{},
        wIsChanged: function () {
            var res=false
            for(var x in vm.$W){
                if(vm.$W[x]!=vm.$W_old[x]){
                    res=true
                    vm.$W_old[x]=vm.$W[x]
                    //console.log(vm.$W_old[x]+"-->"+vm.$W[x]+":"+x)
                }
            }
            return res
        },
        listReset: function () {
           vm.list=[];
            vm.P=0;
            vm.T=0
        },
        getBusiness: function () {
            if(vm.keyword!=""||vm.wIsChanged()){
                //筛选条件变化了，先重置表单
                console.log("条件变化")
                
                vm.listReset()
                vm.keyword=""
            }
            vm.P++

            //控制为显示启用商家
            vm.$W.SellerState=vm.$W_old.SellerState=[1]
            $$.call({
                i:"Business/search",
                data:{
                    P:vm.P,
                    N:vm.N,
                    W:vm.$W
                },
                success: function (res) {
                    for(var x=0;x<res.L.length;x++){
                        vm.list.push(res.L[x])
                    }

                    vm.P=res.P
                    vm.N=res.N
                    vm.T=res.T
                },
                error: function (err) {
                    tip.on(err)
                }
            })

        },
        keyword:"",
        $kw:"",
        BusinessFind: function () {
            if(vm.keyword!=""){
                vm.select.bt = {
                    name: "全部活动",
                    id: '0',
                    icon: "",
                }
                vm.select.a = vm.area[0].name
                if(vm.keyword!=vm.$kw){
                    vm.listReset()
                    vm.$kw=vm.keyword
                }


                vm.P++
                $$.call({
                    i:"Business/findOut",
                    data:{
                        Keyword:vm.keyword,
                        P:vm.P,
                        N:vm.N,
                    },
                    success: function (res) {
                        if(res.err){
                            tip.on(res.err)
                            return
                        }
                        for(var x=0;x<res.L.length;x++){
                            vm.list.push(res.L[x])
                        }
                        vm.P=res.P
                        vm.N=res.N
                        vm.T=res.T
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })

            }




        }



    })
    return mallList = vm
})