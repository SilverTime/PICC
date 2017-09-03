/**
 * Created by mooshroom on 2015/12/11.
 */
define('userInfoDetails',[
    'avalon',
    'text!../../package/userInfo/userInfoDetails.html',
    'css!../../package/userInfo/userInfo.css',
],function(avalon,html,css){
    var vm=avalon.define({
        $id:"userInfoDetails",
        ready:function(id){
            vm.reset()
            index.html=html
            vm.userGet(id)
        },
        reset:function(){
            vm.info={
                Name:"体验者",
                Phone:'',
                IDCard:"",
                CardID:"",
            }
        },
        info:{
            Name:"体验者",
            Phone:'',
            IDCard:"",
            CardID:"",
        },

        /*获取用户资料
        * Member/get
        *
        * 请求：
        * UserID
        *
        * 返回：
        * 一大堆*/
        userGet: function (id) {
            if(id!=0){
                $$.call({
                    i:"Member/get",
                    data:{
                        UserID:id
                    },
                    success: function (res) {
                        if(res[0]!={}||res[0]!=[]){
                            vm.info=res[0]
                        }

                    }
                })
            }

        },

        /*登出
         User/logout

         请求
         无

         返回
         true（成功）/false（失败）*/
        logout: function () {
            $$.call({
                i:"User/logout",
                data:{},
                success: function (res) {
                    if(res){
                        cache.go({
                            uid:undefined
                        })
                        window.location.href='#!/login/0'
                    }

                }
            })
        }
    })
    return userInfoDetails=vm
})