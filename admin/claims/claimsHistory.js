/**
 * Created by mooshroom on 2015/12/12.
 */
define('claimsHistory',[
    'avalon',
    'text!../../admin/claims/claimsHistory.html',
    'css!../../admin/claims/claims.css',
    '../../lib/pager/pager.js'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"claimsHistory",
        ready: function (id) {
            if(id==0){
                window.location.href='#!/claimsHistory/1';
                return
            }
            vm.reset();
            admin.html=html;
            vm.history(id);
            vm.p=id;

            vm.$watch('w.*', function (a, b) {
                vm.$change=true
                vm.history(1)
            })
            vm.$watch('time1', function (a, b) {
                vm.$change=true
                vm.history(1)
            })
            vm.$watch('time2', function (a, b) {
                vm.$change=true
                vm.history(1)
            })
        },
        //重置列表
        reset: function () {
            avalon.mix(vm,{
                "T":0
            })
        },
        //获取理赔历史表格\
        $change:false,
        list: [],
        "P": 1,
        "N": 20,
        "T": 2,
        history: function (p) {

            //判断是否变化条件
            if(vm.$change){
                vm.$change=false
                window.location.href='#!/claimsHistory/1'
                vm.history(1)
                return
            }

            var data={
                P:p,
                N:vm.N,
                State:[1,2],
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
                    chPager.T=res.T;
                    avalon.mix(chPager,{
                        T:res.T,
                        P:res.P
                    });
                    chPager.build(res.P)
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
            id:"chPager",
            N:"20",
            getList:function(p){
                window.location.href='#!/claimsHistory/'+p
            }
        }
    });
    window[vm.$id]=vm
});