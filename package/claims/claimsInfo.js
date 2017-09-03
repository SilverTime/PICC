/**
 * Created by mooshroom on 2015/12/11.
 */
define('claimsInfo',[
    'avalon',
    'text!../../package/claims/claimsInfo.html',
    'css!../../package/claims/claims.css',
    '../../lib/wxAddPic/wxAddPic'
],function(avalon,html,css){
    var vm=avalon.define({
        $id:"claimsInfo",
        ready:function(id){
            vm.reset()
            index.html=html
            vm.getInfo(id)
            vm.IndemnifyID=id
        },
        reset:function(){
            avalon.mix(vm,{
                info:{}
            });
            vm.picReset()
        },
        IndemnifyID:'',

        /*
        * 理赔详情

         请求

         Picc/ClaimsManagement/detail
         {
         "IndemnifyID": 218246
         }*/
        info:{},
        getInfo: function (id) {
            $$.call({
                i:"ClaimsManagement/detail",
                data:{
                    "IndemnifyID": id
                },
                success: function (res) {
                    vm.info=res[0]
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        addMore: function (n) {
            for(var i=0;i<n;i++){
                vm.morePic.push({
                    serverId:'',
                    $opt:{
                        callback: function (serverId) {
                            vm.$pics.push(serverId)
                        },
                        delCallBack: function (serverId) {
                            for(var i=0;i<vm.$pics.length;i++){
                                if(vm.$pics[i]==serverId){
                                    vm.$pics.splice(i,1)
                                    return
                                }
                            }
                        },
                    }
                })
            }

        },
        $pics:[],
        $opt:{
            callback: function (serverId) {
                vm.$pics.push(serverId)
            },
            delCallBack: function (serverId) {
                for(var i=0;i<vm.$pics.length;i++){
                    if(vm.$pics[i]==serverId){
                        vm.$pics.splice(i,1)
                        return
                    }
                }
            },
        },
        morePic:[],
        pushPics: function () {
            if(vm.$pics.length==0){
                tip.on("还没有添加图片！")
                return
            }
            $$.call({
                i:"ClaimsManagement/picSupplement",
                data:{
                    "IndemnifyID": vm.info.IndemnifyID,
                    "Picture": vm.$pics
                },
                success: function (res) {
                    vm.picReset()
                    tip.on('图片追加成功！',1)
                },
                error: function (err) {
                    tip.on(err)
                }
            })

        },
        picReset: function () {
            vm.morePic=[];
            vm.$pic=[]
        }



    })
    return claimsInfo=vm
})