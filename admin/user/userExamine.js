/**
 * Created by mooshroom on 2015/12/12.
 */
define('userExamine', [
    'avalon',
    'text!../../admin/user/userExamine.html',
    'css!../../admin/user/user.css',
    '../../lib/pager/pager'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "userExamine",
        ready: function (i) {
            admin.html = html;
            vm.reset();

            if (i <= 0) {
                window.location.href = '#!/userExamine/1'
                return
            }


            vm.userExamine(i);
        },
        reset: function () {
            avalon.mix(vm, {})
        },
        SelectAll: false,
        SelectMemberID: [],
        SelectUserID: [],
        list: [],
        P: 0,
        N: 20,
        userExamine: function (i) {
            $$.call({
                i: "Member/userList",
                data: {
                    P: i,
                    N: vm.N
                },
                success: function (res) {

                    vm.list = []

                    if (res.L.length == 0) {
                        userPager.T = 0;
                        avalon.mix(userPager, {
                            T: 0,
                            P: 0
                        });
                        userPager.build(res.P)
                        tip.on('没有符合的数据')
                        return
                    }

                    vm.list = res.L

                    userPager.T = res.T;
                    avalon.mix(userPager, {
                        T: res.T,
                        P: res.P
                    });
                    userPager.build(res.P)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        selectAll: function () {
            for (var x = 0; x < vm.list.length; x++) {
                vm.list[x].Selected = !vm.SelectAll;
            }
            vm.SelectAll = !vm.SelectAll;
        },
        pass: function (result) {
            $$.call({
                i: "Judge/JudgeUsers",
                data: {
                    JudgeIDs: [],
                    MemberIDs: [],
                    Result: result,
                    Method: 1, //如果是批量审核 这里就传0，人工审核就传1
                    UID: '',
                }, success: function (res) {

                }, error: function (err) {
                    tip.on(err)
                }
            })
        },
        //选中与非选中
        select: function (MemberID, UserID) {

            vm.SelectMemberID.push(MemberID)
            vm.SelectUserID.push(UserID)
        },

        w: {
            AreaID: "",
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
            window.location.href= (apiURL + 'Excel/userLogOut' + '&tsy=' + cache.go("tsy")+"&Time="+vm.buildTime())
        },

        $opt: {
            id: "userPager",
            P: 1,
            N: 20,
            T: 150,
            showPage: 6,//显示多少页
            getList: function (p) {
                window.location.href = '#!/userExamine/' + p
            }
        },
    });
    window[vm.$id] = vm
});