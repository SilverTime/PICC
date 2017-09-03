/**
 * Created by Chris on 2016/1/4.
 */
define(
    "mAlert",
    [
        "avalon",
        "text!../../lib/mAlert/mAlert.html",
        "css!../../lib/mAlert/mAlert.css"
    ],
    function (avalon, html, css) {
        avalon.component("tsy:malert", {
            $template: html,
            //当执行的时候
            $init: function (vm, elem) {
                window[vm.id] = vm;
                //弹出窗口
                vm.appear = function () {
                    vm.show = true;
                }
                //窗口消失
                vm.disappear = function () {
                    vm.show = false;
                }
            },
            //准备就绪后的方法
            $ready: function () {
                //console.log(vm.id+"构建成功")
            },
            id: "malert",
            show: false,

            //按钮的定义
            btn: [
                {
                    name: "我知道了",
                    onClick: function () {

                    }
                }
            ],
            subtitle:[
                " "

            ],
            extraTitle:[
                "",

            ],
            content:''



        })
    }
)