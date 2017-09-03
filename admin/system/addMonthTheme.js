/**
 * Created by Chrris on 2016/1/12.
 */
define('addMonthTheme',[
    'avalon',
    'text!../../admin/system/addMonthTheme.html',
    'css!../../admin/system/system.css',
    '../../lib/uploader/uploader.js'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"addMonthTheme",
        ready: function (i) {
            vm.reset();
            admin.html=html;
            //vm.upload();

            if(i>0){
                vm.ActivityID=i
                //这里说明是修改
                $$.call({
                    i:"SubjectMonth/get",
                    data:{
                        ActivityID:i
                    },
                    success: function (res) {
                        vm.info={
                            "ActivityName": res.ActivityName,
                            //"EnrollCloseTime": '',
                            "RegMax": res.RegMax,
                            "TopPicID": res.TopPicID,
                            "InPicID": res.InPicID,
                        }
                        vm.TopPic=res.TopPic
                        vm.InPic=res.InPic
                        vm.time=getDateFromTimestamp(res.EnrollCloseTime)

                    },
                    error: function (err) {
                        tip.on(err)
                    }
                })
            }
        },
        TopPic:"",
        InPic:"",
        ActivityID:'',
        reset: function () {
            avalon.mix(vm,{
                TopPic:"",
                InPic:"",
                info:{
                    "ActivityName": "",
                    //"EnrollCloseTime": '',
                    "RegMax": "0",
                    "TopPicID": "0",
                    "InPicID": "0",
                    //"ActivityState": "1"
                },
                time:"",
                ActivityID:'',
            })
        },

        info:{
            "ActivityName": "",
            //"EnrollCloseTime": '',
            "RegMax": "0",
            "TopPicID": "0",
            "InPicID": "0",
        },
        time:"",

        $opt2:{
            id:"topPicUp",
            boxID:'uploader1',//最外面的div的ID
            dnd:"dndArea1",
            filePicker:"filePicke1r",
            label:"点击上传封面",//上传按钮的名字
            filePicker2:"filePicker2",
            tip:"或者将图片拖到这里,最多支持1张图片",
            $conf:{
                server:apiURL + 'ClaimsPicture/picUpload&tsy=' + cache.go("tsy"),
                accept: {
                    title: 'Images',
                    extensions: 'jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                fileNumLimit: 1
            },
            success:function(file,res){
                vm.info.TopPicID=res.UploadID;
                vm.TopPic=res.Url
            }
        },
        $opt3:{
            id:"contentPicUp",
            boxID:'uploader2',//最外面的div的ID
            dnd:"dndArea2",
            filePicker:"filePicke2r",
            label:"点击上传详情图片",//上传按钮的名字
            filePicker2:"filePicker22",
            tip:"或者将图片拖到这里,最多支持1张图片",
            $conf:{
                server:apiURL + 'ClaimsPicture/picUpload&tsy=' + cache.go("tsy"),
                accept: {
                    title: 'Images',
                    extensions: 'jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                fileNumLimit: 1
            },
            success:function(file,res){
                vm.info.InPicID=res.UploadID;
                vm.InPic=res.Url
            }
        },

        buildTime: function () {
            if(vm.time==""){
                return false
            }

            return newDateAndTime(vm.time +' 23:59:59').getTime()/1000
        },

        save:function(i){
            var time=vm.buildTime()
            if(!time){
                tip.on('还没有填写报名截止日期')
                return
            }
            var data={
                ActivityState:i,
                EnrollCloseTime:time
            };
            for(var x in vm.info){
                if(x.charAt(0)!=$){
                    data[x]=vm.info[x]
                }
            }
            var ii='SubjectMonth/add'
            var d=data
            if(vm.ActivityID>0){
                ii='SubjectMonth/save'
                //data.ActivityID=vm.ActivityID
                d={
                    ActivityID:vm.ActivityID,
                    Params:data
                }
            }
            $$.call({
                i:ii,
                data:d,
                success:function(){
                    tip.on("保存成功",1);
                    //vm.info.theme="";
                    //vm.info.date="";
                    //vm.info.upperLimit="";
                    //vm.info.ActivityState= "1";
                    window.location.href="#!/monthTheme/0"
                },
                err:function(err){
                    tip.on(err)
                }
            })
        },
        sign:function(){
                var data={};
                for(var x in vm.info){
                    if(x.charAt(0)!=$){
                        data[x]=vm.info[x]
                    }
                }
            $$.call({
                i:"SubjectMonth/active",
                data:data,
                success:function(){
                    //vm.info.theme="";
                    //vm.info.date="";
                    //vm.info.upperLimit="";
                    vm.info.ActivityID="2"
                    tip.on("发布成功",1);
                    window.location.href="#!/monthTheme/0"
                },
                err:function(err){
                    tip.on(err)
                }
            })
        }
    });
    window[vm.$id]=vm
});