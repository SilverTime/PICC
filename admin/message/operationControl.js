/**
 * Created by mooshroom on 2015/12/12.
 */
define('operationControl', [
    'avalon',
    'text!../../admin/message/operationControl.html',
    'css!../../admin/message/message.css'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "operationControl",
        ready: function (id) {
            vm.reset();
            admin.html = html;
            vm.SmsMouldID = id;
            //vm.getMsg(id);
            vm.sendId(0);
        },
        reset: function () {
            //弹出窗口
            vm.now = 0;
            avalon.mix(vm, {})
        },
        now: "",

        Mould: '',
        sendId: function ($index) {
            vm.list = [];
            vm.now = $index;
            $$.call({
                i: "SmsMould/get",
                data: {
                    MouldID: $index + 1
                },
                success: function (res) {
                    vm.Mould = res[0].Mould
                    for (var i = 0; i < vm.msgNav.length; i++) {
                        if (res[0].MouldID = vm.msgNav[i].MouldID) {
                            avalon.mix(vm.msgNav[i],res[0])
                            //vm.msgNav[i].msg = res[0]
                            return
                        }
                    }
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        sendMsg: function ($index) {
            $$.call({
                i: "SmsMould/save",
                data: {
                    Mould: vm.Mould,
                    MouldID: $index + 1
                },
                success: function (res) {
                    tip.on("保存成功", 1)
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        msgNav: [
            {
                name: '入会邀请',
                MouldID: 1,
                UpdateTime:""
            },
            {
                name: '恭喜入会',
                MouldID: 2,
                UpdateTime:""
            },
            {
                name: '保单到期',
                MouldID: 3,
                UpdateTime:""
            },
            {
                name: '礼品赠送',
                MouldID: 4,
                UpdateTime:""
            },
            {
                name: '短信验证码',
                MouldID: 5,
                UpdateTime:""
            },
            {
                name: '商品赠送',
                MouldID: 6,
                UpdateTime:""
            },
            {
                name: '生日祝福',
                MouldID: 7,
                UpdateTime:""
            }
        ],
        tips: {
            '商家名': '[商家]',

            '商家地址': '[商家地址]',

            '商品名': '[商品]',

            '客户名': '[客户]',

            '验证码': '[验证码]',

            '龙宝金额': '[龙宝]',

            '礼品名': '[礼品]',

            '到期时间': '[到期时间]',
        }
    });
    window[vm.$id] = vm
});