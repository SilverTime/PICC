/**
 * Created by Chris on 2016/2/19.
 */
define('violationsCheck', [
    'avalon',
    'text!../../package/violationsCheck/violationsCheck.html',
    'css!../../package/violationsCheck/violationsCheck.css'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "violationsCheck",
        ready: function () {
            index.html = html;
            vm.reset();
            vm.judgeVal();
        },
        reset: function () {
            avalon.mix(vm, {
                state: 0,
                list: [],
                plateNumber: "",//车牌号
                plateInput_flag: 0,//车牌号输入状态判断
                VIN: "",//车架号（本处指车架号后六位）
                VINInput_flag: 0,//状态判断标志
            })
        },

        ////////////////////////////输入部分
        plateNumber: "",//车牌号
        plateInput_flag: 0,
        VIN: "",//车架号
        VINInput_flag: 0,
        judgeVal: function () {
            //定时判断输入框内容，为空时，更改状态，出现“删除”标志；
            setInterval(function () {
                if (vm.plateNumber !== "") {
                    vm.plateInput_flag = 1;
                }
                else {
                    vm.plateInput_flag = 0;
                }
                if (vm.VIN !== "") {
                    vm.VINInput_flag = 1;
                }
                else {
                    vm.VINInput_flag = 0;
                }
            }, 100)
        },
        //车牌号输入时，字母转换为大写
        upperCase: function () {
            vm.plateNumber = vm.plateNumber.toUpperCase();
        },
        //输入框清空函数
        clearIpt1: function () {
            vm.plateNumber = ""
        },
        clearIpt2: function () {
            vm.VIN = ""
        },

        ////////////////////////////审核状态

        state: 0,//默认状态，0是默认状态；1是查询中；2是查询出没有违章记录；3是查询出违章历史
        list: [],
        checkFunc: function () {
            //如果连续查询，每次点击需要将上次查询的结果清空
            vm.state = 0;
            vm.list = [];
            if (vm.plateNumber === "") {
                tip.on("车牌号请勿为空");
                return
            }
            if (vm.plateNumber.length !== 6) {
                tip.on("请检查您输入的车牌号位数");
                return
            }
            //车牌号正则，由于“川”字在页面给出，故本处
            //首位需为大写字母，后五位为大写字母或数字
            var par = /^[A-Z]{1}[0-9A-Z]{5}$/;
            if (par.test(vm.plateNumber) === false) {
                tip.on("请输入正确的车牌号");
                return
            }

            if (vm.VIN === "") {
                tip.on("车架号请勿为空");
                return
            }
            if (vm.VIN.length !== 6) {
                tip.on("请检查您的车架号是否为后六位");
                return
            }
            //车架号后六位，为数字或数字和字母组合
            var reg = /^[0-9A-Za-z]{6}$/;
            if (reg.test(vm.VIN) === false) {
                tip.on("请正确输入您的车架号后六位");
                return
            }
            //检查通过时发起查询请求
            if (vm.plateNumber.length === 6 && vm.VIN.length === 6) {
                vm.state = 1;
                $$.call({
                    i: "Api/SiChuanWeiZhang",
                    data: {
                        CarNumber: vm.plateNumber,
                        LastSixVIN: vm.VIN
                    },
                    success: function (res) {
                        //当数据库返回为空时，状态设为2，即 查询到没有违章记录
                        if (res === null) {
                            vm.state = 2;
                        }
                        else {
                            for (var i = 0; i < res.length; i++) {
                                vm.list.push(res[i]);
                            }
                            //查询成功时，判断并更改状态
                            if (vm.list.length === 0) {
                                tip.on("查询失败，请核实您的信息");
                            }
                            else {
                                vm.state = 3;
                            }
                        }
                    },
                    error: function (res) {
                        console.log("数据请求出错啦");
                        vm.state = 0;
                    }
                });
                //当较长时间请求不到数据时，做超时处理
                setTimeout(function () {
                    if (vm.state === 1) {
                        vm.state = 0;
                        tip.on("请求超时啦")
                    }
                }, 10000)
            }

        }
    });
    return violationsCheck = vm;
});