/**
 * Created by ANNNI on 2016/2/19.
 */
define('msgSend',[
    'avalon',
    'text!../../admin/message/msgSend.html',
    'css!../../admin/message/message.css'
], function (avalon,html,css) {
    var vm=avalon.define({
        $id:"msgSend",
        ready: function () {
            admin.html=html;
            vm.textState=0;
            vm.textClear();
        },
        reset: function () {
            avalon.mix(vm,{
                state:0,//默认状态0,发送中1，发送成功2
                text:'',//原始文本
                listHead:[],
                list:[],
                //发送短信
                msg:"",
                textState:0,
            })
        },
        state:0,//默认状态0,发送中1，发送成功2

        //读取文件
        getText: function () {
            if (typeof FileReader == "undefined") {
                alert("您老的浏览器不行了！");
                return
            }
            var resultFile = document.getElementById("file").files[0];

            if (resultFile) {
                var reader = new FileReader();

                reader.readAsText(resultFile, 'GBK');
                reader.onload = function (e) {
                    vm.text = this.result;
                    //console.log(vm.text)
                    vm.buildList()
                };
            }
        },
        //构建列表
        text:'',//原始文本
        listHead:[],
        list:[],

        buildList: function () {
            //第一次行拆分
            var row=vm.text.split('\r\n');

            //构建表头
            vm.listHead=row[0].split(',');

            //构建表内容
            vm.list=[];
            for(var i= 1;i<row.length;i++){
                if(row[i]==''){
                    break
                }
                vm.list.push(row[i].split(','))
            }
            var focusText=document.getElementById("text").focus();

        },
        //发送短信
        msg:"",
        send: function () {
            if(vm.msg==""){
                tip.on("还没有输入短信内容！");
            }
            if(vm.text==""){
                tip.on("还没有上传收件人！");
            }
            if(vm.msg!==""&&vm.text!==""){
                vm.state = 1;
                $$.call({
                    i:"Sms/batchSend",
                    data:{
                        Content:vm.msg,
                        Users:vm.text
                    },
                    success: function (res) {

                        //if(){
                            vm.msg="";
                            vm.state=2;
                            tip.on("发送成功！",1);
                        //}

                    },
                    error:function(err){
                        vm.state=3;
                        tip.on(err);
                    }

                });
            }
        },


        //输入框状态控制
        textState:0,
        textClear:function(){
            setInterval(function(){
                if(vm.msg!=""){
                    vm.textState=1;
                }
                else{
                    vm.textState=0;
                }
            }, 100)
        },
        textFocusing:false,
        inputFocus: function (bo) {
            vm.textFocusing=bo
        },



        clear1:function(){
            vm.msg="";
        }
    });
    window[vm.$id]=vm
});