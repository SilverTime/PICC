/**
 * Created by mooshroom on 2015/12/11.
 */
define('activityInfo', [
    'avalon',
    'text!../../package/userInfo/activityInfo.html',
    'css!../../package/userInfo/userInfo.css',
    '../../lib/mAlert/mAlert.js'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "activityInfo",
        ready: function (i) {
            vm.reset()
            index.html = html

            if(i=="list"){
                //显示列表
                vm.state=0
                vm.getAll()
                return
            }

            vm.state=1
            if (i == 0) {
                //获取默认的
                vm.getAll()
            } else {
                //获取指定的
                vm.getOne(i)
            }

        },
        reset: function () {
            avalon.mix(vm,{
                list: [],
                info: {},
            })
        },

        state:'list',//0列表，1详情
        /*获取所有主题月活动

         SubjectMonth/getAll
         请求

         无

         返回

         {
         "d":[
         {
         "ActivityID":"18321",
         "ActivityName":"抢月饼活动",
         "CreateTime":"1451990715",
         "RegMax":"1000",
         "ActivityState":"1",
         "TopPicID":"1",
         "InPicID":"1",
         "RegCount":"0",
         "EnrollStartTime":"1451987115",
         "EnrollCloseTime":"1501990715"
         },
         {
         "ActivityID":"18322",
         "ActivityName":"打字活动",
         "CreateTime":"1451994073",
         "RegMax":"1000",
         "ActivityState":"1",
         "TopPicID":"1",
         "InPicID":"1",
         "RegCount":"0",
         "EnrollStartTime":"1451990473",
         "EnrollCloseTime":"1501994073"
         }
         ],
         "tsy":"fhskfvsev4saq3og0btl4rurc4",
         "UID":null,
         "UN":null,
         "ADMIN":null
         }*/
        list: [],
        info: {},
        getAll: function () {
            $$.call({
                i: "SubjectMonth/getAll",
                data: {
                    ActivityStates:[2,3],
                    Sort:"CreateTime"
                },
                success: function (res) {
                    if (res.length > 0) {


                        for(var i=res.length-1;i>=0;i--){
                            if(res[i].ActivityState==3){
                                vm.list.push(res[i])
                            }else{
                                vm.list.unshift(res[i])
                            }
                        }


                        vm.info = res[0]
                        vm.buildBeforOver()
                    }else{
                        tip.on('暂时没有活动，感谢您的关注')
                    }
                },
                error: function (res) {

                }
            })
        },

        buildBeforOver: function () {
            var now=new Date().getTime()
            var befor=0
            for(var i=0;i<vm.list.length;i++){
                befor=Math.floor((vm.list[i].EnrollCloseTime*1000-now)/(1000*60*60*24))
                if(vm.list[i].ActivityState==2){
                    vm.list[i].beforOver='距离活动结束还有'+"<strong><big> "+befor+" </big></strong>"+'天'
                }else{
                    vm.list[i].beforOver='已结束'
                }
            }
        },

        /*
         * 获取主题月详情

         SubjectMonth/get
         请求

         ActivityID=18321
         返回

         {
         "ActivityID":"18321",
         "ActivityName":"抢月饼活动",
         "CreateTime":"1451990715",
         "RegMax":"1000",
         "ActivityState":"1",
         "TopPicID":"1",
         "InPicID":"1",
         "RegCount":"0",
         "EnrollStartTime":"1451987115",
         "EnrollCloseTime":"1501990715"
         }
         */
        getOne: function (id) {
            $$.call({
                i: "SubjectMonth/get",
                data: {
                    ActivityID: id
                },
                success: function (res) {
                    vm.info = res
                }
            })
        },

        /*主题月报名

         SubjectMonth/enroll
         请求

         UserID
         ActivityID
         返回

         记录ID*/
        $alert2:{
            id:"acAlert2",
            btn: [
                {
                    name: "点击加入",
                    onClick: function () {
                        acAlert2.disappear()
                        window.location.href='#!/login/1'
                    }
                }
            ],
            subtitle:[
                "体验该项服务，<br/>需要您成为人保会员"
            ],
            extraTitle:[
                "",
            ],
            content:''

        },
        enroll: function () {
            uid=cache.go('uid')
            if(uid==undefined||uid==""||uid=='undefined'){
                //还没有加入会员
                acAlert2.appear()
                return
            }

            $$.call({
                i: "SubjectMonth/enroll",
                data: {
                    UserID: uid,
                    ActivityID: vm.info.ActivityID
                },
                success: function (res) {
                    tip.on('报名成功！',1)
                    window.location.href="#!/success/0"
                    require(['../../package/claims/success'], function () {
                        setTimeout(function () {
                            avalon.mix(success,{
                                title:"报名成功！",
                                subTitle:"活动进行前，您的特约小助手将与您联系",
                                btn:'返回主题月列表',
                                href:"#!/activityInfo/list",
                            })
                        },300)
                    })
                },
                error: function (err) {

                    if(err=="已报名成功"){
                        vm.success()
                        return
                    }

                    if(err=='报名人数已满'){
                        window.location.href="#!/success/0"
                        require(['../../package/claims/success'], function () {
                            setTimeout(function () {
                                avalon.mix(success, {
                                    title: "报名人数已满!",
                                    subTitle: "期待您下次参与",
                                    btn: '返回主题月列表',
                                    href: "#!/activityInfo/list",
                                })
                            }, 300)
                        })
                    }

                    tip.on(err)

                }
            })
        },

        success: function () {
            window.location.href="#!/success/0"
            require(['../../package/claims/success'], function () {
                setTimeout(function () {
                    avalon.mix(success,{
                        title:"您已成功报名！",
                        subTitle:"该活动只能报名一次，本次重复报名无效",
                        btn:'返回主题月列表',
                        href:"#!/activityInfo/list",
                    })
                },300)
            })


        }


    })
    return activityInfo = vm
})