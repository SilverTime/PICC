/**
 * Created by mooshroom on 2015/12/11.
 */
define('spendList',[
    'avalon',
    'text!../../package/mySpend/spendList.html',
    'css!../../package/mySpend/mySpend.css',
],function(avalon,html,css){
    var vm=avalon.define({
        $id:"spendList",
        ready:function(){
            vm.reset()
            index.html=html
            vm.uid=cache.go("uid")
            vm.OrderGet()
        },
        reset:function(){
            avalon.mix(vm,{
                uid:0,
                list:[],
                P:0,
                N:12,
                T:0,
            })
        },
        uid:0,

        /*
        * 获取用户订单列表

         Order/getMyOrder
         请求

         UserID=5
         返回

         {
         "d":[
         {
         "OrderID":"110",
         "UserID":"5",
         "SellerID":"1",
         "GoodsID":"167320",
         "PayMoney":"200",
         "PayTime":"1452072042",
         "UseTime":null,
         "Source":null,
         "CancelTime":null,
         "OrderPhone":null,
         "PresenterType":null,
         "PresenterID":null,
         "WalletLogID":"1",
         "OverdueTime":null,
         "OrderState":null,
         "Serialnumber":null
         },
        * */
        OrderGet: function () {
            if(vm.uid==0){
                tip.on('未能识别当前用户，请重新登录')
                return
            }
            vm.P++
            $$.call({
                i:"Order/getMyOrder",
                data:{
                    UserID:vm.uid,
                    P:vm.P,
                    N:vm.N
                },
                success: function (res) {
                    if(res.L.length>0){
                        for(var i=0;i<res.L.length;i++){
                            vm.list.push(res.L[i])
                        }

                        vm.P=res.P;
                        vm.T=res.T
                    }else{
                        tip.on("暂时没有记录",1)
                    }
                },
                error: function (err) {

                }
            })
        },

        list:[],
        P:0,
        N:12,
        T:0,

    })
    return spendList=vm
})