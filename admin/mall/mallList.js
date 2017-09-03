/**
 * Created by mooshroom on 2015/12/12.
 */
define('mallList',[
    'avalon',
    'text!../../admin/mall/mallList.html',
    'css!../../admin/mall/mall.css',
    '../../lib/pager/pager.js',
    '../../lib/select/select.js'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"mallList",
        ready: function (id) {
            if(id==0){
                window.location.href="#!/mallList/1";
                return
            }



            vm.reset();
            admin.html=html;

            vm.getMall(id);
            vm.p=id;
            //vm.GoodsID=id;

            vm.$watch('W.*', function (a, b) {
                vm.$change=true
                vm.getMall(1)
            })
            vm.$watch('time1', function (a, b) {
                vm.$change=true
                vm.getMall(1)
            })
            vm.$watch('time2', function (a, b) {
                vm.$change=true
                vm.getMall(1)
            })
        },
        $change:false,
        reset: function () {
            avalon.mix(vm,{
                "T":0,
                list:[],

                time1:'',
                time2:"",

            })
            vm.$opt1.list=JSON.parse(JSON.stringify(_businessType))
            vm.$opt2.list=JSON.parse(JSON.stringify(_area))
        },
        $opt1: {
            list:_businessType,
            callback: function (res) {
                console.log(res)
                //    todo 添加到条件中
                var l=[]
                for(var i=0;i<res.length;i++){
                    l.push(res[i].id)
                }
                vm.W.Type=l
            }
        },
        $opt2: {
            list: _area,
            callback: function (res) {
                console.log(res)
                //    todo 添加到条件中
                var l=[]
                for(var i=0;i<res.length;i++){
                    l.push(res[i].id)
                }
                vm.W.AreaID=l
            }
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


        W: {
            SellerName: "",
            Time: "",
            Type: [],
            AreaID: [],
        },
        $w:{},
        //锟斤拷取锟教硷拷锟叫憋拷锟斤拷
        list:[],
        "P": 1,
        "N": 20,
        "T": 6,
        "tsy": "rhgojr9mdk43qmpf4q4a9dso63",
        "UID": null,
        "UN": null,
        "ADMIN": null,
        getMall: function (p) {
            //判断是否变化条件
            if(vm.$change){
                vm.$change=false
                window.location.href='#!/mallList/1'
                vm.getMall(1)
                return
            }

            if(vm.time1!=""||vm.time2!=''){
                vm.W.Time=vm.buildTime()
            }

            var data={
                P:p,
                N:vm.N,
                W:{},
            }
            for(var x in vm.W){
                if(x.charAt(0)!='$'&&vm.W[x]!=''){
                    vm.$w[x]=data.W[x]=vm.W[x]
                }
            }

            //控制为显示所有商家
            vm.$w.SellerState=data.W.SellerState=vm.W.SellerState=[0,1]

            $$.call({
                i:"Business/search",
                data:data,
                success: function (res) {
                    vm.list=res.L;
                    mlPager.T=res.T;
                    avalon.mix(mlPager,{
                        T:res.T,
                        P:res.P
                    });
                    mlPager.build(res.P)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        //分页配置
        $opt:{
            id:"mlPager",
            N:"20",
            getList:function(p){
                window.location.href='#!/mallList/'+p
            }
        },
        sellerStateChange: function (SellerID,SellerState) {
            $$.call({
                i:'Business/save',
                data:{
                    SellerID:SellerID,
                    Params:{
                        SellerState:SellerState
                    }
                },
                success: function (res) {
                    for(var i = 0;i<vm.list.length;i++){
                        if(vm.list[i].SellerID==SellerID){
                            vm.list[i].SellerState=SellerState
                            break;
                        }
                    }
                    tip.on('操作成功！',1)
                }
            })
        }
    });
    window[vm.$id]=vm
});