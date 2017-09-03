/**
 * Created by ANNNI on 2016/1/19.
 */
define('goodsExamineDetail',[
    'avalon',
    'text!../../admin/mall/goodsExamineDetail.html',
    'css!../../admin/mall/mall.css'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"goodsExamineDetail",
        info:{},
        GoodsID:0,
        ready: function (id) {
            vm.GoodsID=id
            vm.reset()
            admin.html=html
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
                    //vm.info.PassTime = null==res[0].PassTime?'未知':new Date().setTime(res[0].PassTime*1000).toLocaleDateString()
                    //date.setTime(vm.info.PassTime*1000)
                    vm.info.PassDate = vm.info.PassTime==null?'未知':data.toLocaleDateString()
                    vm.info.EffectDate = vm.info.EffectTime==null?'未知':date.setTime(vm.info.EffectTime*1000).toLocaleDateString()
                    vm.info.OverdueDate = vm.info.OverdueTime==null?'未知':date.setTime(vm.info.OverdueTime*1000).toLocaleDateString()
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        pass: function (pass) {
            $$.call({
                i:'Judge/CommodityJudge',
                data:{
                    GoodsID:vm.GoodsID,
                    SellerID:vm.info.SellerID,
                    Result:pass
                },
                success: function (res) {
                    tip.on('审核成功')
                    window.location.reload()
                },error: function (err) {
                    tip.on(err)
                }
            })
        }
    });
    window[vm.$id]=vm
});