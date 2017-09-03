/**
 * Created by Chris on 2016/1/16.
 */
define('serviceDone', [
    'avalon',
    'text!../../admin/system/serviceDone.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "serviceDone",
        ready: function (id) {
            vm.reset();
            admin.html = html;
            vm.getWork(id);
            vm.WorkID = id;
            vm.getOther(id);
            vm.Type();
        },
        reset: function () {
            avalon.mix(vm, {
                info: {},
                list: [],
                type: [],
                typeIDList: [],
                nowType: [],
                flag: [],
                otherType: [],
                otherTypeIDList: []
            })
        },
        info: {},
        keyWord: "",
        type: [],
        getWork: function (id) {//Connect/getother    WorkID=
            $$.call({
                i: "Work/get",
                data: {
                    WorkID: id
                },
                success: function (res) {
                    vm.info = res[0];
                    vm.keyWord = vm.info.KeyWord;
                    for (var i = 0; i < res[0].Connect.length; i++) {
                        vm.type.push(res[0].Connect[i]);
                        vm.nowType[i] = vm.typeIDList.push(res[0].ConnectIDs[i]);
                    }
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        //判断默认客服的复选框状态
        nowType: [],
        stateFlag: [],
        Type: function (i) {//本来负责本项的指定客服，默认选中
            if (vm.stateFlag[i] == undefined) {//点击不传参，更改状态
                vm.nowType.splice(i, 1);
                vm.stateFlag[i] = 0;
            }
            else {                             //点击传参，更改状态
                vm.nowType.push(vm.typeIDList[i]);
                vm.stateFlag[i] = undefined;
            }
        },
        //获得其他客服状态
        otherType: [],
        otherTypeIDList: [],
        getOther: function (id) {
            $$.call(
                {
                    i: "Connect/getother",
                    data: {
                        WorkID: id
                    },
                    success: function (res) {
                        for (var i = 0; i < res.length; i++) {
                            vm.otherType.push(res[i]);
                            vm.otherTypeIDList.push(res[i].ConnectID);
                        }
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                }
            )
        },
        //判断未指定的客服的状态
        stateFlagOther: [],
        otherTypes: function (i) {//未指定的客服，默认未选中
            if (vm.stateFlagOther[i] == undefined) {
                vm.nowType.push(vm.otherTypeIDList[i]); //点击传参，更改状态
                vm.stateFlagOther[i] = 0;
            }
            else {
                vm.nowType.splice(i, 1);//点击不传参，更改状态
                vm.stateFlagOther[i] = undefined;
            }
        },
        //提交结果
        putChange: function (id) {
            if (vm.nowType == "") {
                tip.on("请选择指定客服");
            }
            else {
                $$.call({
                    i: "Connect/ChangeConnect",
                    data: {
                        WorkID: vm.WorkID,
                        KeyWord: vm.keyWord,
                        ConnectIDs: vm.nowType
                    },
                    success: function () {
                        tip.on("指定成功", 1);
                        //window.location.href = "#!/service/0";
                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })
            }
        },
        cancelFun: function () {
            window.location.href = "#!/service/0";
        }
    });
    window[vm.$id] = vm
});