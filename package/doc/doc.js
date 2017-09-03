/**
 * Created by mooshroom on 2016/1/14.
 */
define('doc',[
    'avalon',
    'text!../../package/doc/doc.html',
    'css!../../package/doc/doc.css'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"doc",
        ready: function (i) {
            vm.reset();
            index.html=html;
            vm.state=i;
            if(i==0){
                return
            }
            vm.getDoc(i);
            document.getElementById("title").innerText = vm.free[i].name
        },
        reset: function () {
            avalon.mix(vm,{

            })
        },
        state:0,
        doc:'',
        getDoc: function (i) {
            require(['text!../../package/doc/doc'+i+'.html'], function (html) {
                vm.doc=html
            })
        },

        free:[
            {
                icon:"./src/images/userInfoimgs/mo_03.png",
                name:'车辆救援',
                href:'#!/doc/1'
            },
            {
                icon:"./src/images/userInfoimgs/mo_05.png",
                name:'代办年检',
                href:'#!/doc/2'
            },
            {
                icon:"./src/images/userInfoimgs/mo_07.png",
                name:'“车、驾”管业务',
                href:'#!/doc/3'
            },
            {
                icon:"./src/images/userInfoimgs/mo_09.png",
                name:'极速理赔',
                href:'#!/doc/4'
            },
            {
                icon:"",
                name:"俱乐部会员章程",
                href:"#!/doc/5"
            }
        ],
    })
})