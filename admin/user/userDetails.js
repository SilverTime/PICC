/**
 * Created by ANNNI on 2016/1/17.
 */
define('userDetails', [
    'avalon',
    'text!../../admin/user/userDetails.html',
    'css!../../admin/user/user.css'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "userDetails",
        ready: function (id) {
            admin.html = html;
            vm.reset();
            vm.getDetails(id);
            vm.UserID = id;
        },
        reset: function () {
            avalon.mix(vm, {
                list: [],
                "P": 1,
                "T": 0,
                //nowTime:new Date().getTime(),
            })

        },
        nowTime: '',
        info: {},
        getDetails: function (id) {
            $$.call({
                i: "Member/get",
                data: {
                    MemberID: id
                },
                success: function (res) {
                    vm.info = res[0]
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        /*会员状态	不同步   1
         　	已同步   2
         　	已通过   3
         　	未通过   4
         　	未同步   5*/
        UserStateValue: {
            1: "不同步",
            2: "已同步",
            3: "已通过",
            4: "未通过",
            5: "未同步"
        },


        judge: function (i) {

            /*
            * i--通过：1
            * 1--不通过：2
            *
            * */
            $$.call({
                i: "Judge/JudgeUsers",
                data: {
                    Result: i,
                    Method: 1, //如果是批量审核 这里就传0，人工审核就传1
                    MemberIDs: [vm.UserID],
                    UID: cache.go('uid')
                },
                success: function (res) {
                    tip.on('审核成功',1)
                    vm.ready(vm.UserID)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }
    });
    window[vm.$id] = vm
});