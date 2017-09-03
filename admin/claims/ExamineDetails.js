/**
 * Created by mooshroom on 2015/12/12.
 */
define('ExamineDetails', [
    'avalon',
    'text!../../admin/claims/ExamineDetails.html',
    'css!../../admin/claims/claims.css'
], function (avalon, html) {
    var vm = avalon.define({
        $id: "ExamineDetails",
        ready: function (id) {
            vm.reset();
            admin.html = html;

            vm.IndemnifyID = id;
            vm.getDetails(id);
        },
        reset: function () {
            avalon.mix(vm, {
                list: [],
                "P": 1,
                "T": 0,
                info: {
                    CarID: "",
                    CarInfoID: "",
                    CommitTime: "",
                    ExamineID: "",
                    ExaminePassTime: "",
                    IndemnifyID: "",
                    IndemnifyState: "",
                    Phone: "",
                    UserID: "",
                    UserName: "",
                    Comment:[],

                },
                address:"",
                scenePic: [
                    {
                        title: "前后远景照",
                        sub: "需反映周围路面情况以及车牌号",
                        defaultNum: 3,
                        pics: [],
                        //$pics: []

                    },
                    {
                        title: "近景照片",
                        sub: "需要反映车辆于物体的碰撞部位",
                        defaultNum: 3,
                        pics: []
                    },
                    {
                        title: "局部拍照",
                        sub: "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",
                        defaultNum: 3,
                        pics: [],
                        //$pics: []
                    },
                    {
                        title: "配件散落物照片",
                        sub: "若车辆有配件损坏需拍摄地面散落物照片",
                        defaultNum: 3,
                        pics: [],
                        //$pics: []
                    },
                ],

                //证件
                cardPic: [
                    {
                        title: "机动车行驶证正副页",
                        sub: "",
                        defaultNum: 2,
                        pics: [],
                        //$pics: []

                    },
                    {
                        title: "驾驶证正副页",
                        sub: "",
                        defaultNum: 2,
                        pics: []
                    },
                    {
                        title: "被保人身份证正反面",
                        sub: "",
                        defaultNum: 2,
                        pics: [],
                        //$pics: []
                    },
                    {
                        title: "被保人银行卡号",
                        sub: "",
                        defaultNum: 1,
                        pics: [],
                        //$pics: []
                    },
                    {
                        title: "其他",
                        sub: "",
                        defaultNum: 3,
                        pics: [],
                        //$pics: []
                    },
                ],
            })
        },
        scenePic: [
            {
                title: "前后远景照",
                sub: "需反映周围路面情况以及车牌号",
                defaultNum: 3,
                pics: [],
                //$pics: []

            },
            {
                title: "近景照片",
                sub: "需要反映车辆于物体的碰撞部位",
                defaultNum: 3,
                pics: []
            },
            {
                title: "局部拍照",
                sub: "需拍摄车辆受损部位以及碰撞物体上的残留痕迹",
                defaultNum: 3,
                pics: [],
                //$pics: []
            },
            {
                title: "配件散落物照片",
                sub: "若车辆有配件损坏需拍摄地面散落物照片",
                defaultNum: 3,
                pics: [],
                //$pics: []
            },
        ],

        //证件
        cardPic: [
            {
                title: "机动车行驶证正副页",
                sub: "",
                defaultNum: 2,
                pics: [],
                //$pics: []

            },
            {
                title: "驾驶证正副页",
                sub: "",
                defaultNum: 2,
                pics: []
            },
            {
                title: "被保人身份证正反面",
                sub: "",
                defaultNum: 2,
                pics: [],
                //$pics: []
            },
            {
                title: "被保人银行卡号",
                sub: "",
                defaultNum: 1,
                pics: [],
                //$pics: []
            },
            {
                title: "其他",
                sub: "",
                defaultNum: 3,
                pics: [],
                //$pics: []
            },
        ],
        info: {
            CarID: "",
            CarInfoID: "",
            CommitTime: "",
            ExamineID: "",
            ExaminePassTime: "",
            IndemnifyID: "",
            IndemnifyState: "",
            Phone: "",
            UserID: "",
            UserName: "",
            Comment:[],

        },
        address:"",
        getDetails: function (id) {
            $$.call({
                i: "ClaimsManagement/get",
                data: {
                    IndemnifyID: id,
                },
                success: function (res) {
                    if( res.Comment==undefined){
                        res.Comment=[]
                    }
                    vm.info = res
                    /*根据经纬度转换为街道名称
                     *
                     * http://gc.ditu.aliyun.com/regeocoding?l=39.9381,116.3957
                     * */
                    $$.call({
                        i:"Api/get",
                        data:{
                            url:"http://gc.ditu.aliyun.com/regeocoding?l="+res.Latitude+","+res.Longitude,
                        },
                        success: function (res) {
                            //转换格式
                            var geo=JSON.parse(res)
                            if(geo.addrList.length>0){
                                vm.address=geo.addrList[0].admName+","+geo.addrList[0].name+" 附近"
                            }
                        }
                    })

                    //加载图片
                    vm.scenePic[0].pics = res.Pics.around
                    vm.scenePic[1].pics = res.Pics.close
                    vm.scenePic[2].pics = res.Pics.local
                    vm.scenePic[3].pics = res.Pics.part
                    vm.cardPic[0].pics = res.Pics.vehicle
                    vm.cardPic[1].pics = res.Pics.drive
                    vm.cardPic[2].pics = res.Pics.id
                    vm.cardPic[3].pics = res.Pics.bank
                    vm.cardPic[4].pics = res.Pics.other



                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        //详情确认
        conDetails: function (i) {
            // 理赔审核
            $$.call({
                i: "Judge/ClaimJudge",
                data: {
                    'Result': i,
                    'IndemnifyID': vm.IndemnifyID,
                    UID: cache.go('uid')
                },
                success: function () {
                    tip.on("审核完成", 1);

                    window.location.href = "#!/claimsExamine/0"
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        commit: "",
        addCommit: function () {
            if (vm.commit == "") {
                tip.on('还没有填写备注')
                return
            }

            $$.call({
                i: "Comment/add",
                data: {
                    Comment: vm.commit,
                    IndemnifyID: vm.info.IndemnifyID,
                    AddPeopleID: cache.go('uid')
                },
                success: function (res) {
                    vm.commit = ''



                    vm.info.Comment.push(res[0].Comment[0])


                }
            })
        },
        delCommit: function (i) {
            $$.call({
                i: "Comment/del",
                data: {
                    CommentIDs: [i],
                    IndemnifyID: vm.info.IndemnifyID
                },
                success: function (res) {
                    var id = res[0]
                    for (var i = 0; i < vm.info.Comment.length; i++) {
                        if (vm.info.Comment[i].CommentID == id) {
                            vm.info.Comment.splice(i, 1)
                        }
                    }
                }
            })
        },

        //短信知会
        smsContent:"",
        sms: function () {
            if(!vm.info.Phone>0){
                tip.on('手机号码错误')
                return
            }
            if(vm.smsContent==''){
                tip.on('还没有填写短信内容')
                return
            }
            $$.call({
                i:"Sms/sms",
                data:{
                    to:vm.info.Phone,
                    content:vm.smsContent
                },
                success: function (res) {
                    tip.on("短信已发送",1)
                    vm.smsContent=""
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        }
    });
    window[vm.$id] = vm
});