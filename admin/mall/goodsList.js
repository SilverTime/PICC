/**
 * Created by ANNNI on 2015/12/12.
 */
define('goodsList',[
    'avalon',
    'text!../../admin/mall/goodsList.html',
    'css!../../admin/mall/mall.css',
    '../../lib/pager/pager.js'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"goodsList",
        ready: function (id) {
            if(id==0){
                window.location.href="#!/goodsList/1";
                return
            }
            admin.html=html;
            vm.reset();
            vm.getGoods(id);
            vm.p=id;
            vm.SellerID=id;
            //vm.AdministratorID=id;
        },
        reset: function () {
            avalon.mix(vm,{
                "T":0
            })
        },
        list:[],
        N: "20",
        P: "13",
        T: "1",
        ADMIN: null,
        UID: null,
        UN: null,
        getGoods:function(p){
            $$.call({
                i:"Business/get",
                data:{
                    SellerID:p,
                    "N":vm.N,
                    "P":p
                },
                success: function (res) {
                    vm.list=res.L;
                    glPaper.T=res.T;
                    avalon.mix(glPaper,{
                        T:res.T,
                        P:res.P
                    });
                    glPaper.build(res.P)
                },
                error: function (err) {
                    tip.on(err);
                }
            })
        },
        //分页配置
        $opt:{
            id:"glPaper",
            N:"20",
            getList:function(p){
                window.location.href='#!/goodsList/'+p
            }
        }
    });
    window[vm.$id]=vm
});