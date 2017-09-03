/**
 * Created by mooshroom on 2016/1/6.
 */
define('star', [
    'avalon',
    'text!../../lib/star/star.html',
    'css!../../lib/star/star.css',
    'css!../../src/css/font-awesome.min.css'
], function (avalon, html, css, font) {
    avalon.component('tsy:star', {
        $template: html,
        id:"",
        lv: 0,
        max: 5,
        star: [],
        unStar: [],
        $init: function (vm, elem) {
            //主动读取配置
            var elem = avalon(elem)
            //将参数放入对于的地方
            try {
                if(elem.data('lv')!=undefined){
                    vm.lv = elem.data('lv')
                }
            } catch (err) {
            }

            if(vm.id!=""){
                window[vm.id]=vm
            }


            console.log(vm.lv)
            vm.build= function () {
                vm.star = avalon.range(0, vm.lv)
                vm.unStar = avalon.range(0, vm.max - vm.lv)
            }

            vm.starClick= function (i, type) {
                //分辨出被点击的是第几个
                function $i(){
                    if(type==1){
                        return i+1
                    }else{
                        return vm.max-vm.unStar.length+i+1
                    }
                }
                //调用回掉
                vm.callback($i())
            }
        },
        $ready: function (vm, elem) {
            vm.build()
        },
        build: function () {

        },
        callback: function () {

        },

        starClick: function (i,type) {

        }

    })
})