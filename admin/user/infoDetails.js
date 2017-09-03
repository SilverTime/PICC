/**
 * Created by ANNNI on 2016/1/17.
 */
define('infoDetails',[
    'avalon',
    'text!../../admin/user/infoDetails.html',
    'css!../../admin/user/user.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"infoDetails",
        ready: function (id) {
            admin.html=html;
            vm.reset();
            vm.getDetails(id);
            vm.UserID=id;
        },
        reset: function () {
            avalon.mix(vm,{
                list: [],
                "P": 1,
                "T":0
            })
        },
        info:{
            //SignCount:0,
            //Car:[],
            //Wallet:[
            //    {
            //        TotalMoney:"未知",
            //        ConsumeMoney:"未知",
            //        BalanceMoney:"未知"
            //    }
            //]
        },
        SignCount:"",
        getDetails: function (id) {
            $$.call({
                i:"Member/get",
                data:{
                    UserID:id

                },
                success: function (res) {
                    //avalon.mix(vm.info,res[0])

                    vm.info=res[0]

                    vm.getSign(vm.UserID)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        getSign:function(id){
            $$.call({
                i:'SignRecord/count',
                data:{
                    UserID:vm.UserID
                },
                success: function (res) {
                    vm.SignCount = res[0].SignCount
                },
                error: function (err) {

                }
            })
        },
        getClaims:function(res){
            //vm.
        }
    });
    window[vm.$id]=vm
});