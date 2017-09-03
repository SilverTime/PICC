/**
 * Created by mooshroom on 2016/1/13.
 */
define('success',[
    'avalon',
    'text!../../package/claims/success.html'
], function (avalon,html) {
    var vm=avalon.define({
        $id:"success",
        ready: function (i) {
            //vm.reset()
            index.html=html
            vm.state=i
        },
        state:0,
        reset: function () {
            avalon.mix(vm,{
                title:"",
                subTitle:"",
                btn:'',
                href:"",
            })
        },

        title:"",
        subTitle:"",
        content:'',
        btn:'',
        href:"",
    })
    window[vm.$id]=vm

})