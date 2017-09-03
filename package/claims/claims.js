/**
 * Created by mooshroom on 2015/12/11.
 */
define('claims',[
    'avalon',
    'text!../../package/claims/claims.html',
    'text!../../package/claims/demo.html',
    'css!../../package/claims/claims.css',
    '../../lib/mAlert/mAlert.js'
],function(avalon,html,demo){
    var vm=avalon.define({
        $id:"claims",
        ready:function(){
            vm.reset();
            index.html=html;
            vm.getClaims();
        },
        reset:function(){
            avalon.mix(vm,{
                list:[],
                P:0,
                T:0
            })
        },

    //    通过用户ID获取理赔历史
        list:[],
        P:0,
        N:16,
        T:0,
        getClaims: function () {
            vm.P++
            $$.call({
                i:"ClaimsManagement/getListByOpenID",
                data:{
                    "OpenIDs":[cache.go('openid')],
                    P:vm.P,
                    N:vm.N
                },
                success: function (res) {
                    console.log(res);
                    vm.list=res.L
                    vm.P=res.P
                    vm.T=res.T
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        $alert:{
            id:"claimsAlert",
            btn: [
                {
                    name: "取消",
                    onClick: function () {
                        claimsAlert.disappear()
                    }
                }
            ],
            subtitle:[
                "请选择您要理赔的车牌号"

            ],
            extraTitle:[
                "",

            ],
            cars:[],
            content:'<div class="car-id" ms-repeat="cars"><a ms-attr-href="#!/claimsAdd/0&&{{el.CarInfoID}}">{{el.CarID}}</a></div>'

        },
        $alert2:{
            id:"claimsAlert2",
            btn: [
                {
                    name: "点击加入",
                    onClick: function () {
                        claimsAlert2.disappear()
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
        $alert3:{
            id:"claimsAlert3",
            btn: [
                {
                    name: "我知道了",
                    onClick: function () {
                        claimsAlert3.disappear()
                        //window.location.href='#!/login/1'
                    }
                }
            ],
            //subtitle:[
            //    "理赔流程介绍"
            //],
            //extraTitle:[
            //    "",
            //],
            tips:[
                '出险后请立即拨打95518报案',
                '报案后5分钟内会有专业勘察人员与您联系，请保持电话畅通',
                '车辆损失较小适合小额快速微信查勘，可通过微信上传现场照片，工作人员会及时审核您上传的照片。这样可以节约您在现场的等待时间',
                '若您的案件不属于小额快速微信查勘，请您在现场稍等，我们会有查勘人员到现场协助您处理此次事故',
                '现场查勘环节完成后，您可以把车开往人保公司推荐的4S店伙修理厂并再次拨打95518通知定损，我们会派专业定损人员对您的车辆进行定损。定完损就可以修车了',
                '若此次事故单车损失金额在10000元以内，您不需要提供修车发票就可以进行赔付。若单车损失超过10000元，则需要提供修车发票、定损单、报价单等进行索赔',
                '“在线理赔服务”旨在省去繁琐的理赔流程让车险理赔更省心、省时、省力。'

            ],
            content:demo

        },

        //获取车牌
        //cars:[],
        getCar: function () {
            uid=cache.go('uid')
            if(uid==undefined||uid==""||uid=='undefined'){
                //还没有加入会员
                claimsAlert2.appear()
                return
            }

            $$.call({
                i:"VehicleInformation/cars",
                data:{
                    "UserID":cache.go('uid')
                },
                success: function (res) {
                    claimsAlert.cars=res
                    claimsAlert.appear()
                }
            })
        }

    });
    return claims=vm
});