/**
 * Created by Chris on 2016/1/16.
 */
define('delectAccount', [
    'avalon',
    'text!../../admin/system/delectAccount.html',
    'css!../../admin/system/system.css'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "delectAccount",
        ready: function (id) {
            vm.reset();
            admin.html = html;
            vm.UserID = id;
            vm.getUser(id);
        },
        reset: function () {
            list: []
        },
        list: [],
        getUser:function(){
            $$.call({
                i:"User/getByID",
                data:{
                UserIDs:[vm.UserID]
                },
                success:function(res){
                    vm.list=res[0];
                },
                error:function(){
                    tip.on(err);
                }
            })
        },
        delAccount: function () {
            $$.call({
                i: "Member/delWork",
                data: {
                    WorkIDs: vm.UserID
                },
                success: function (res) {
                    tip.on("删除成功", 1);
                    window.location.href = '#!/members/0';
                },
                error: function (err) {
                    tip.on(err)
                }

            })
        },
        cancelFun:function() {
            window.location.href = "#!/members/0";
        }
    });
    window[vm.$id] = vm
});