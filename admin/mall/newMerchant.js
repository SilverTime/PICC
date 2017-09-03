/**
 * Created by ANNNI on 2016/1/15.
 */
define('newMerchant', [
    'avalon',
    'text!../../admin/mall/newMerchant.html',
    'css!../../admin/mall/mall.css',
    '../../lib/star/star.js',
    '../../lib/uploader/uploader.js',
    '../../lib/MDEditor/MDEditor.js',
], function (avalon, html) {
    var vm = avalon.define({
        $id: "newMerchant",
        ready: function (i) {
            vm.reset()
            admin.html = html

            if(i>0){
                //这里是编辑
                vm.SellerID=i
                $$.call({
                    i:'Business/get',
                    data:{
                        SellerID:i
                    },
                    success: function (res) {
                        vm.info={
                            SellerName:res.SellerName,
                            AreaID: res.AreaID,
                            SellerTypeID: res.SellerTypeID,
                            Phone: res.Phone,
                            Address: res.Address,
                            WorkTime: res.WorkTime,
                            SellerLevel: res.SellerLevel,
                            //AdministratorID: "",
                        }

                        vm.picUrl=res.Pic

                        vm.selectType(res.SellerTypeID-1)

                        if(res.Note!=null){
                            newMallMD.md=res.Note
                            newMallMD.trs()
                        }


                        cStar.lv=res.SellerLevel
                        cStar.build()
                    }
                })
            }

        },
        picUrl:"",
        SellerID:0,
        reset: function () {
            avalon.mix(vm, {
                info: {
                    SellerName: "",
                    AreaID: "",
                    SellerTypeID: "",
                    Phone: "",
                    Address: "",
                    WorkTime: "",
                    SellerLevel: "",
                    //AdministratorID: "",
                },
                businessType:_businessType,
                area:_area,
                picUrl:'',
                nowType:"",
                SellerID:0,
            })
        },
        businessType: [],
        objName:"商家",
        nowType:"",
        selectType: function (i) {
            vm.info.SellerTypeID=vm.nowType=_businessType[i].id
            if(_businessType[i].id==3){
                vm.objName='活动'
            }else{
                vm.objName="商家"
            }
        },

        info: {},
        area: [],

        $opt:{
            id:"cStar",
//                    lv:2,
            callback: function (i) {

                cStar.lv=vm.info.SellerLevel=i
                cStar.build()
            }
        },
        $opt2:{
            id:"mallAddUp",
            label:"上传图片",//上传按钮的名字
            tip:"或者将图片拖到这里",
            $conf:{
                server:apiURL + 'ClaimsPicture/picUpload&tsy=' + cache.go("tsy"),
                accept: {
                    title: 'Images',
                    extensions: 'jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                },
                fileNumLimit: 1,
            },
            success: function (file, res) {
                vm.info.PicID=res.UploadID
            }
        },

        $md:{
            id:"newMallMD",
            $uploader:{
                id:"mallMDAddUp",
                boxID:'mallMDuploader',//最外面的div的ID
                dnd:"mallMDdndArea",
                filePicker:"mallMDfilePicker",
                label:"点击选择图片",//上传按钮的名字
                filePicker2:"mallMDfilePicker2",
                tip:"或者将文件拖到这里",
                $conf:{
                    server:apiURL + 'ClaimsPicture/picUpload&tsy=' + cache.go("tsy"),
                    accept: {
                        title: 'Images',
                        extensions: 'jpg,jpeg,bmp,png',
                        mimeTypes: 'image/*'
                    },
                    fileNumLimit: 1,
                },
                success: function (file, res) {
                    newMallMD.imgUrl=res.Url
                }
            },
            loadLocaDoc:false,
            height:600,
            callback: function (md) {
                vm.info.Note=md
            }
        },
        checkData: function () {
            var must={
                SellerName: '名称',
                AreaID: '地区',
                SellerTypeID: '类型',
                Phone: "",
                Address: "",
                WorkTime: "",
                SellerLevel: '等级',
            }
            for(var x in vm.info){
                if(x.charAt(0)!="$"){
                    if(must[x]!=''&&vm.info[x]==''){
                        tip.on('还没有设置'+must[x])
                        return false
                    }
                }
            }
            return true
        },
        add: function () {
            if(!vm.checkData()){
                return
            }
            var data={}
            for(var x in vm.info){
                if(x.charAt(0)!='$'){
                    data[x]=vm.info[x]
                }
            }
            $$.call({
                i:"Business/add",
                data:data,
                success: function (res) {
                    tip.on("添加成功！",1)
                    window.location.href='#!/mallList/1'
                },
                err: function (err) {
                    tip.on(err)
                }
            })
        },
        save: function () {
            var data={

            }
            for(var x in vm.info){
                if(x.charAt(0)!='$'){
                    data[x]=vm.info[x]
                }
            }
            $$.call({
                i:"Business/save",
                data:{
                    SellerID:vm.SellerID,
                    Params:data
                },
                success: function (res) {
                    tip.on("保存成功！",1)
                    window.location.href='#!/mallList/1'
                },
                err: function (err) {
                    tip.on(err)
                }
            })
        }
    });
    window[vm.$id] = vm
});