/**
 * Created by mooshroom on 2015/12/12.
 */
define('settlementDetail', [
    'avalon',
    'text!../../admin/mall/settlementDetail.html',
    'css!../../admin/mall/mall.css',
    '../../lib/select/select.js'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "settlementDetail",
        ready: function (id) {
            //if(id==0){
            //    window.location.href="#!/settlementDetail/1";
            //    return
            //}
            vm.reset();
            admin.html = html;

            //vm.getDetail(id);
            //vm.p=id;
        },
        reset: function () {
            avalon.mix(vm, {
                "T": 0,
                allCheckB: false,
                allCheckA: false,

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

        getExcel: function () {
            vm.W.Time=vm.buildTime()
            if(vm.W.Type.length==0){
                tip.on("请选择类型")
                return
            }

            if(vm.W.AreaID.length==0){
                tip.on('请选择区域')
                return
            }
            var W={}
            for(var x in vm.W){
                if(x.charAt(0)!='$'){
                    W[x]=vm.W[x]
                }
            }

            var str=""
            str+=(apiURL + 'Excel/sumOut' + '&tsy=' + cache.go("tsy"))

            var dataStr="&SellerName="+ W.SellerName+'&Time='+ W.Time

            for(var x =0;x< W.Type.length;x++){
                dataStr+="&Type[]="+ W.Type[x]
            }
            for(var x =0;x< W.AreaID.length;x++){
                dataStr+="&AreaID[]="+ W.AreaID[x]
            }

            window.location.href=str+dataStr
        }


    });
    window[vm.$id] = vm
});