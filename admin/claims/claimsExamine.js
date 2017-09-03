/**
 * Created by mooshroom on 2015/12/12.
 */
define('claimsExamine',[
    'avalon',
    'text!../../admin/claims/claimsExamine.html',
    'css!../../admin/claims/claims.css',
    '../../lib/pager/pager.js'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"claimsExamine",
        ready: function (id) {
            if(id==0){
                window.location.href='#!/claimsExamine/1';
                return
            }
            function checkW(){
                var res=true
                for(var x in vm.w){
                    if(vm.w[x].charAt(0)!='$'&&vm.$w[x]!=vm.w[x]){
                        //条件变更
                        res=false
                        vm.$w[x]=vm.w[x]
                    }
                }
                return res
            }
            if(!checkW()){
                window.location.href='#!/claimsExamine/1'
            }
            vm.reset();
            admin.html=html;
            vm.getClaims(id);
            vm.P=id;

            vm.$watch('w.*', function (a, b) {
                vm.$change=true
                vm.getClaims(1)
            })
            vm.$watch('time1', function (a, b) {
                vm.$change=true
                vm.getClaims(1)
            })
            vm.$watch('time2', function (a, b) {
                vm.$change=true
                vm.getClaims(1)
            })
        },
        //重置列表
        reset: function () {
            avalon.mix(vm,{
                "T":0
            })
        },
        $change:false,
        //获取理赔历史表格
        list: [],
        "P": 1,
        "N": 20,
        "T": 9,
        getClaims: function (p) {

            //判断是否变化条件
            if(vm.$change){
                vm.$change=false
                window.location.href='#!/claimsExamine/1'
                vm.getClaims(1)
                return
            }

            var data={
                P:p,
                N:vm.N,
                State:[0],
            }
            //if(vm.time1!=''||vm.time2!=''){
                vm.w.Time=data.Time=vm.buildTime()
            //}
            if(vm.Keyword!=''){
                data.Keyword=vm.w.Keyword
            }


            $$.call({
                i:"ClaimsManagement/claims",
                data:data,
                success: function (res) {
                    vm.list=[]
                    vm.list=res.L;

                    cePager.T=res.T;
                    avalon.mix(cePager,{
                        T:res.T,
                        P:res.P
                    });
                    cePager.build(res.P)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        w:{
            Keyword:"",
            Time:"",
        },
        $w:{},
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
        //分页配置
        $opt:{
            id:"cePager",
            N:"20",
            getList: function (p) {
                window.location.href='#!/claimsExamine/'+p
            }
        }
    });
    window[vm.$id]=vm
});