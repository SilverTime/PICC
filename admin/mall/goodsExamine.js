/**
 * Created by mooshroom on 2015/12/12.
 */
define('goodsExamine',[
    'avalon',
    'text!../../admin/mall/goodsExamine.html',
    'css!../../admin/mall/mall.css',
    '../../lib/pager/pager.js',
    '../../lib/select/select.js'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"goodsExamine",
        ready: function (id) {
            if(id==0){
                window.location.href="#!/goodsExamine/1";
                return
            }
            vm.reset();

            vm.goodsExamine(id);
            vm.P=id

            admin.html=html;
        },
        reset: function () {
            avalon.mix(vm,{

                "T":0,

            })
            vm.$opt1.list=JSON.parse(JSON.stringify(_businessType))
            vm.$opt2.list=JSON.parse(JSON.stringify(_area))
        },
        $opt1:{
            list:JSON.parse(JSON.stringify(_businessType)),
            callback: function (res) {
                console.log(res)
                //    todo 添加到条件中
            }
        },
        $opt2:{
            list:JSON.parse(JSON.stringify(_area)),
            callback: function (res) {
                console.log(res)
                //    todo 添加到条件中
            }
        },


        $W:{
            SellerTypeID:0
        },

        list:[],
        "N":20,
        "P":1,
        "T":6,
        //"tsy": "rhgojr9mdk43qmpf4q4a9dso63",
        "UID": null,
        "UN": null,
        "ADMIN": null,
        goodsExamine: function (p) {
            $$.call({
                i:"Commodity/search",
                data:{
                    "N":vm.N,
                    "P":p,
                    //TODO 鍟嗗搧鐘舵??
                    W:{
                        GoodsStatus:['in',[0,1]]
                    }
                },
                success: function (res) {
                    vm.list=[]
                    var date = new Date()
                    for(var i=0;i<res.L.length;i++){
                        var s = res.L[i]
                        date.setTime(s.CreateTime*1000)
                        s.CreateDate = date.toLocaleDateString()
                        vm.list.push(s)
                    }

                    gePager.T=res.T;
                    avalon.mix(gePager,{
                        T:res.T,
                        P:res.P
                    });
                    gePager.build(res.P)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        pass: function (GoodsID,SellerID,pass) {
            $$.call({
                i:'Judge/CommodityJudge',
                data:{
                    GoodsID:GoodsID,
                    SellerID:SellerID,
                    Result:pass,
                    UID:cache.go("uid")
                },
                success: function (res) {
                    tip.on('瀹℃牳鎴愬姛')
                    window.location.reload()
                },error: function (err) {
                    tip.on(err)
                }
            })
        },
        $opt:{
            id:"gePager",
            N:"20",
            getList:function(p){
                window.location.href='#!/goodsExamine/'+p
            }
        }
    });
    window[vm.$id]=vm
});