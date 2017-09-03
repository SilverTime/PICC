/**
 * Created by ANNNI on 2016/1/16.
 */
define('goodsDetail',[
    'avalon',
    'text!../../admin/mall/goodsDetail.html',
    'css!../../admin/mall/mall.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"goodsDetail",
        info:{
            PassDate:'寰呭鐞?',
            EffectDate:'寰呭鐞?',
            OverdueDate:'寰呭鐞?',

        },
        GoodsID:0,
        ready: function (id) {
            vm.GoodsID=id
            admin.html=html
            vm.reset()
            vm.getDetails(id)
        },
        reset: function () {

        },
        getDetails:function(id){
            $$.call({
                i:'Commodity/get',
                data:{
                    GoodsID:id
                },
                success: function (res) {
                    var date = new Date();
                    vm.info = res[0]
                    avalon.mix(vm.info,res[0])
                    //vm.info.PassTime = null==res[0].PassTime?'鏈煡':new Date().setTime(res[0].PassTime*1000).toLocaleDateString()
                    date.setTime(vm.info.PassTime*1000)
                    vm.info.PassDate = vm.info.PassTime==null?'鏈煡':date.toLocaleDateString()
                    date.setTime(vm.info.EffectTime*1000)
                    vm.info.EffectDate = vm.info.EffectTime==null?'鏈煡':date.toLocaleDateString()
                    date.setTime(vm.info.OverdueTime*1000)
                    vm.info.OverdueDate = vm.info.OverdueTime==null?'鏈煡':date.toLocaleDateString()
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }
    });
    window[vm.$id]=vm
});