/**
 * Created by mooshroom on 2015/12/12.
 */
define('userInfo', [
    'avalon',
    'text!../../admin/user/userInfo.html',
    'css!../../admin/user/user.css',
    '../../lib/pager/pager'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "userInfo",
        ready: function (i) {
            if(i==0){
                window.location.href='#!/userInfo/1'
                return
            }

            function checkW(){
                var res=true
                for(var x in vm.w){
                    if(x.charAt(0)!='$'&&vm.$w[x]!=vm.w[x]){
                        //条件变更
                        res=false
                        vm.$w[x]=vm.w[x]
                    }
                }
                return res
            }
            if(!checkW()){
                window.location.href='#!/userInfo/1'
            }


            vm.reset();
            admin.html = html;
            vm.getList(i);
            vm.P=i

            vm.$watch('w.*', function (a, b) {
                vm.$change=true
                vm.getList(1)
            })
            vm.$watch('time1', function (a, b) {
                vm.$change=true
                vm.getList(1)
            })
            vm.$watch('time2', function (a, b) {
                vm.$change=true
                vm.getList(1)
            })
        },
        reset: function () {
            avalon.mix(vm, {
                list: [],
                "P": 1,
                "T": 0,
                area: _area
            })
        },
        ADMIN: null,
        UID: null,
        UN: null,
        list: [],
        tsy: "rhgojr9mdk43qmpf4q4a9dso63",
        getInfo: function () {
            $$.call({
                i: "Member/gets",
                data: {
                    state: 0
                },
                success: function (res) {
                    for (var x = 0; x < res.length; x++) {
                        vm.list.push(res[x])
                    }
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        w: {
            Time: "",
            AreaID: "",
            Name: "",
            CarID: "",
            Phone: "",
        },
        area: [],

        time1: '',
        time2: "",
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

        outUser: function () {
            vm.w.Time=vm.buildTime()
            var W={}


            var str=(apiURL + 'Member/memberList&Out=1' + '&tsy=' + cache.go("tsy"));
            var dataStr=''

            for(var x in vm.w){
                if(x.charAt(0)!='$'&&vm.w[x]!=''){
                   dataStr+='&'+x+"="+vm.w[x]
                }
            }

            window.location.href=str+dataStr
        },
        P:0,
        N:20,
        T:0,

        $opt:{
            id:"userPager",
            P:1,
            N:20,
            T:150,
            showPage:6,//显示多少页
            getList: function (p) {
                window.location.href='#!/userInfo/'+p
            }
        },
        $w:{},
        $change:false,
        waitCall:'',//延迟执行请求,
        getList: function (i) {
            //判断是否变化条件
            if(vm.$change){
                vm.$change=false
                window.location.href='#!/userInfo/1'
                vm.getList(1)
                return
            }

            vm.w.Time=vm.buildTime()
            var data={
                P:i,
                N:vm.N
            }

            for(var x in vm.w){
                if(x.charAt(0)!='$'&&vm.w[x]!=''){
                    vm.$w[x]=data[x]=vm.w[x]
                }
            }
            clearTimeout(vm.waitCall)
            vm.waitCall=setTimeout(function () {
                $$.call({
                    i:'Member/memberList',
                    data:data,
                    success: function (res) {


                        vm.list=[]

                        if(res.L.length==0){
                            userPager.T=0;
                            avalon.mix(userPager,{
                                T:1,
                                P:0
                            });
                            userPager.build(res.P)
                            tip.on('没有符合的数据')
                            return
                        }

                        vm.list=res.L

                        userPager.T=res.T;
                        avalon.mix(userPager,{
                            T:res.T,
                            P:res.P
                        });
                        userPager.build(res.P)
                    },
                    error: function (err) {
                        vm.list=[]
                        avalon.mix(userPager,{
                            T:0,
                            P:1
                        });
                        userPager.build(1)
                        //tip.on(err)
                    }
                })
            },300)

        }

    });
    window[vm.$id] = vm
});