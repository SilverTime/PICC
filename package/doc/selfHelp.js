/**
 * Created by mooshroom on 2016/1/14.
 */
define('selfHelp', [
    'avalon',
    'text!../../package/doc/selfHelp.html',
    'css!../../package/doc/doc.css',
    'css!../../src/css/bootstrap.min.css'
], function (avalon, html, css) {
    var vm = avalon.define({
        $id: "selfHelp",
        ready: function (i) {
            vm.reset()
            index.html = html
            vm.state = i
            if (i == 0) {
                //渲染大类\

            } else {
                //渲染详情
                vm.getDoc(i)
            }
        },
        state: 0,
        reset: function () {
            avalon.mix(vm, {
                //要重置的东西丢净来
                content: '',
            })
        },

        bigClass: [
            '单方面事故问题',
            '双方或多方事故问题',
            '人伤事故问题',
            '车险理赔条款示例',
            '事故责任判定指南',
        ],
        content: '',
        getDoc: function (i) {
            vm.content = ''
            require(['text!../../package/doc/sh' + i + '.html'], function (html) {
                vm.content = html
            })
        },

        //车险理赔示例 的文章内容
        claimsETC: [
            [
                '车辆发生碰撞事故，车上乘客被甩出车外后落地受伤，该乘客应被界定为车上人员还是第三者？',
                '应被界定为车上人员，行业示范条款明确约定车上人员是指发生意外事故的瞬间，在被保险机动车车体内或车体上的人员，包括正在上下车的人员。',
            ],
            [
                '乘客正在上车过程中，车辆突然起动，导致乘客摔伤，该乘客能否界定为车上人员？',
                '界定为车上人员，行业示范条款明确车上人员是指发生意外事故的瞬间，在被保险机动车车体内或车体上的人员，包括正在上下车的人员。'
            ],
            [
                '车辆停放时被其他车辆撞坏，找不到肇事方，该车投保了车损险，保险公司如何赔付？',
                '按照损失70%赔付，行业示范条款约定“被保险机动车的损失应当由第三方负责赔偿，无法找到第三方的，实行30%的绝对免赔率；如果附加《机动车损失保险无法找到第三方特约险》则可以在附加险项下赔付免赔的30%的车辆损失。',
            ],
            [
                '车辆出险后，如果需要施救，请问保险公司如何给付施救费用？',
                '对于必要的、合理的施救费用，保险公司给予赔付。施救费用另行计算，最高不超过保险金额的数额；如果施救的财产中含未保险的财产，按照应施救财产的实际价值占总施救财产的实际价值比例分摊施救费用。',
            ],
            [
                '车辆停放时轮胎被盗，该车投保了盗抢险，保险公司如何赔付？',
                '不赔，盗抢险条款约定非全车遭盗窃，仅车上零部件或附属设备被盗窃或损坏属于责任免除。'
            ],
            [
                '货车由于所载货物超宽行驶时与桥洞相撞，货车及桥洞损失保险公司是否赔付？',
                '车损不赔，条款约定违反安全装载是保险事故发生的直接原因的，造成标的车损失为责任免除；桥洞损失属于三者财产损失，按照条款约定扣除10%的绝对免赔后赔付。',
            ],
            [
                '车辆投保第三者责任险，发生意外事故，造成三者人员死亡，三者家属向保险公司提出索要精神损害抚慰金，保险公司是否赔付？',
                '不能赔付，三者险条款约定精神损害抚慰金为除外责任；如果投保附加《精神损害抚慰金责任险》条款，可以在保险限额内进行赔偿。'
            ],
            [
                '李大妈养了一条宠物狗，平时视为自己儿女，一天晨练时被过往的机动车撞死，李大妈悲痛欲绝，除要求肇事司机赔偿1000元狗款外，还要求肇事司机赔偿其精神损失费5000元，请问如果肇事车辆承保了商业三者险，并附加了精神损害抚慰金责任险，对于李大妈要求的精神抚慰金保险公司是否应该赔付？',
                '不赔付，附加精神损害抚慰金责任险的保险责任约定：只有造成第三者或车上人员的人身伤亡，受害人据此提出精神损害赔偿请求，保险公司依据法院判决及保险合同约定进行赔付，因此本次事故对于小动物的死伤，不赔偿精神抚慰金。'
            ],
            [
                '车辆发生事故造成了4S店售车前单独加装的前保险杠护杠损坏，保险公司是否赔付护杠损失？',
                '不能赔付，因为车损险条款约定本车标准配置以外的新增设备损失为除外责任；如果投保附加新增设备险的情况下，且该零部件也在列明的备件范围内，则可以赔付。'
            ],
            [
                '如何界定驾驶员饮酒及醉酒？',
                '驾驶机动车时每100ml血液中含有的酒精量大于等于20mg，小于80mg的为饮酒驾驶；每100ml血液中含有的酒精量大于等于80mg时则为醉酒驾驶。（将酒后改成饮酒）'
            ],
            [
                '张某倒车时，不慎将自己父亲撞伤，同时又撞坏了父亲家的大门，保险公司是否能在商业三者险项下赔付事故损失？',
                '张某父亲受伤保险公司应赔付，因为三者险条款责任免除仅约定了“被保险人、被保险人允许的驾驶人、本车车上人员的人身伤亡”为责任免除；   张某父亲家大门损失保险公司不赔付，因为三者险条款责任免除约定了被保险人及其家庭成员所有财产的损失为责任免除。'
            ],
            [
                '标的车投保了车损险，附加车身划痕损失险，只要车被划伤了，保险公司均应赔偿吗？',
                '不是的，车身划痕险条款约定以下几种情况责任免除，一是被保险人及其家庭成员、驾驶人及其家庭成员的故意行为造成的损失；二是因投保人、被保险人与他人的民事、经济纠纷导致的任何损失；三是车身表面自然老化、损坏，腐蚀造成的任何损失。'
            ],
            [
                '车辆投保商业三者险，附加车上货物责任险，发生翻车交通事故，车上拉的10头奶牛，当场死亡2头，走失8头，保险公司如何赔付奶牛损失？',
                '车上货物责任险条款约定“偷盗、哄抢、自然损耗、本身缺陷、短少、死亡、腐烂、变质、串味、生锈，动物走失、飞失、货物自身起火燃烧或爆炸造成的货物损失”为责任免除，因此保险公司只能赔付事故中死亡的2头奶牛损失。'
            ],
            [
                '车辆投保了车上货物责任险，发生保险导致运输期限延迟，这部分损失能否得到赔偿？',
                '不赔付，根据车上货物责任险免除条款第五款保险事故导致货物减值、运输延迟、营业损失及其他各种间接损失，属于除外责任。'
            ],
            [
                '被保险人将车辆借给朋友使用，其朋友利用车辆盗窃石油途中发生交通事故，造成车辆损坏，保险公司是否赔付？',
                '不予赔付，条款约定“被保险人或其允许的驾驶人故意或重大过失，导致被保险机动车被利用从事犯罪行为造成的车损”为责任免除。'
            ],
            [
                '已获得学习资格的学员独立练习开车发生事故，保险公司是否赔偿？',
                '不赔付，行业示范条款约定学习驾驶时无合法教练员随车指导造成的车损，为责任免除。'
            ],
            [
                '驾驶证过了换证时间，但查询公安交管系统该证件为有效状态，驾驶员持该驾驶证驾车发生事故，保险公司是否赔付？',
                '赔付，行业示范条款删除了09版条款关于“驾驶证有效期已届满”的责任免除项目，但该行为会受到公安交管部门的行政处罚。'
            ],
            [
                '三者车辆被交警扣留停车场，产生的停车费，保险公司是否赔付罚款？',
                '不赔，按照第三者责任条款约定停车费、保管费、扣车费、罚款、罚金或惩罚性赔款，为责任免除。'
            ],
            [
                '车辆加装氙气大灯，某日车辆因为大灯线路过载起火燃烧，该车已投保自燃损失险，该事故造成的损失保险公司是否赔付？',
                '不赔，自燃损失险条款责任免除约定由于擅自改装、加装电器及设备导致被保险机动车起火造成的损失，属于除外责任。'
            ],
            [
                '车辆在涉水行驶过程中导致发动机进水而损毁，保险公司是否赔付？',
                '不赔付，车损险条款约定发动机进水后导致的发动机损坏为责任免除；如果附加发动机涉水损失险，发动机损失可以赔付，需扣除15%的绝对免赔。'
            ],
            [
                '车辆投保了修理期间费用补偿险，发生事故的车辆修复仅需一天，能否得到修理期间费用补偿险的补偿？',
                '不能，该附加险约定每次事故的绝对免赔额为1天的赔偿金额，且不适用主险中的各项免赔率、免赔额的约定。'
            ],
            [
                '李某驾车涉水行驶时，前保险杠被水流兜坏，保险公司对前杠损失是否赔付？',
                '不赔付，行业示范条款关于碰撞的释义明确为被保险机动车或其符合装载规定的货物与外界固态物体之间发生的、产生撞击痕迹的意外撞击，因此本次事故不构成碰撞责任。'
            ],
            [
                '车辆行驶时因急刹车，车厢内所载货物将车体撞坏，此次事故造成的车辆损失保险公司是否赔付？',
                '赔付，行业示范条款车损险保险责任约定标的车受到被保险机动车所载货物、车上人员意外撞击为保险责任。'
            ],
            [
                '王某投保了交强险，某日王某醉酒驾车将三者行人张某撞伤，现伤者张某向保险公司请求赔偿，保险公司是否赔付?',
                '先赔付，后向王某（致害人）追偿。依据最高人民法院《关于审理道路交通事故损害赔偿案件适用法律若干问题的解释》规定因“醉酒、服用国家管制的精神药品或者麻醉药品后驾驶机动车发生交通事故导致第三者人身损害，当事人请求保险公司在交强险责任限额范围内予以赔偿，人民法院应予支持：保险公司在赔偿范围内向侵权人主张追偿权的，人民法院应予支持”。'
            ],
            [
                'A车与B车相撞，交警队判定B车全责，双方因交通事故主产生矛盾，B车不配合赔偿事宜，A车损失是否可以直接向B车的保险公司申请赔偿？',
                '可以，《保险法》第六十五条规定被保险人怠于请求的，第三者有权就其应获赔偿部分直接向保险人请求赔偿。'
            ],
            [
                'A车与B车相撞，交警队判定B车全责， B车车主没有赔偿能力，A车损失是否可以向A车的保险公司申请赔偿？',
                '如果A车承保车损险，可以请求保险公司赔付，保险公司代位赔付A车损失后，取得向B车车主追偿的权力，向B车车主追偿A车损失。前提是A车在保险公司未赔偿之前，不能放弃对第三方请求赔偿的权利，还需配合提供必要的文件和所知道的有关情况。'
            ],
            [
                '车辆投保车上人员责任险，发生交通事故造成车上人员受伤，交警队判定标的车负事故的主要责任，被保险人能向承保的保险公司申请赔偿伤人的全部损失吗？ 没有赔偿能力，A车损失是否可以向A车的保险公司申请赔偿呢？',
                '不能，行业示范条款车上人员责任险条款约定车上人员责任险按责赔付。'
            ],
            [
                '保险事故发生后，多长时间可以领到赔款？',
                '保险人收到被保险人的赔偿请求后，应当及时作出核定；情形复杂的，应当在三十日内作出核定。保险人应当将核定结果通知被保险人；对属于保险责任的，在与被保险人达成赔偿协议后十日内，履行赔偿义务。保险合同对赔偿期限另有约定的，保险人应当按照约定履行赔偿义务。'
            ],
            [
                '一台停放车辆起火燃烧，公安消防部门火因鉴定结论为“燃烧严重，火因无法确定，不排除自然原因”，请问车辆损失保险公司是否赔付？',
                '不赔付，条款约定不明原因火灾造成的车辆损失属于责任免除。'
            ],
            [
                '车辆在修理厂修复竣工后，修理工试车过程中发生碰撞事故，标的车损失保险公司是否赔付？',
                '不赔付，车损险条款约定在营业性场所维修、保养、改装期间造成的车损为责任免除。'
            ],
            [
                '一台自卸车在行驶过程中翻斗突然升起，将空中通讯电缆刮断，由此造成的通讯电缆损失保险公司是否赔付？',
                '要赔付。'
            ],
            [
                '王某驾车撞亡一行人后驾车逃离现场，迫于压力，第二天王某投案自首，王某为车辆投保了交强险及商业三者险，保险公司对亡人损失费用是否赔付？',
                '保险公司在交强险责任限额内赔付行人死亡损失费用，但商业三者险不赔付。因为交强险没有将肇事逃逸列为责任免除，而商业三者险约定“事故发生后，在未依法采取措施的情况下驾驶被保险机动车或者遗弃被保险机动车离开事故现场”为责任免除。'
            ],
            [
                '王某将车借给朋友张某，张某以王某欠款为由，将车辆据为己有并失去联系，王某为该车投保了车损险、盗抢险，保险公司对王某车辆损失是否赔付？',
                '不赔付，盗抢险条款约定“因投保人、被保险人与他人的民事、经济纠纷导致的任何损失”为责任免除。'
            ],
            [
                '附加了不计免赔条款，发生了保险事故，保险公司是否就可全额赔付？',
                '不是，下列情况下，应当由被保险人自行承担的免赔金额，保险人不负责赔偿：（一）机动车损失保险中应当由第三方负责赔偿而无法找到第三方的；（二）因违反安全装载规定而增加的；（三）发生机动车全车盗抢保险约定的全车损失保险事故时，被保险人未能提供《机动车登记证书》、机动车来历凭证的，每缺少一项而增加的；（四）机动车损失保险中约定的每次事故绝对免赔额；（五）可附加本条款但未选择附加本条款的险种约定的；（六）不可附加本条款的险种约定的。'
            ],
            [
                '驾驶营业性货车发生保险事故，驾驶员没有交通运输管理部门核发的道路货物运输资格证，保险公司对车辆损失是否赔付？',
                '不赔付，依照行业示范条款责任免除约定“驾驶出租机动车或营业性机动车无交通运输管理部门核发的许可证书或其他必备证书”为责任免除。'
            ],
            [
                '王某驾车发生一起保险事故，保险公司及时对损失做出了核定，并达成赔偿协议，但由于保险公司工作人员原因，赔款耽误了两个月才赔付到账，王某向保险公司提出赔偿赔款利息损失要求，保险公司是否赔付利息损失？',
                '赔偿，行业示范条款约定保险人未及时履行十日内赔付义务的，除支付赔款外，应当赔偿被保险人因此受到的损失。'
            ],
            [
                '牵引车及挂车，投保第三者责任险（主车限额10万，挂车限额5万）、发生保险事故后，三者损失15万，保险公司能全部赔偿损失吗?（不考虑交强险）',
                '不能全额赔付，三者险条款约定主车和挂车连接使用时视为一体，发生保险事故时，由主车保险人和挂车保险人按照保险单上载明的机动车第三者责任保险责任限额的比例，在各自的责任限额内承担赔偿责任，但赔偿金额总和以主车的责任限额为限，因此保险公司只能赔付10万元。'
            ],
            [
                '因紧急刹车，发生本车上副驾驶室乘坐人员头部碰撞前档玻璃，本车前档玻璃破碎，乘员受伤的事故。车辆投保车损险，未投保玻璃单独破碎险，也没投保车上人员责任险，保险公司是否赔付风挡玻璃损失？',
                '不赔付，车损险条款约定“未发生被保险机动车其他部位的损坏，仅发生被保险机动车前后风挡玻璃和左右车窗玻璃的损坏”为责任免除。'
            ],
            [
                '保险机动车被盗窃、抢劫、抢夺，需经出险当地县级以上公安刑侦部门立案证明，满多少天未查明下落的全车损失保险公司承但全车盗抢险的赔偿责任？',
                '60天。'
            ],
            [
                '此次改革实施“无责代赔，先赔后追”，被保险人是否需要向保险公司交“追偿费用”？',
                '此次改革在车损险中实施“无责代赔，先赔后追”，被保险人可以更快获得赔款，享受更好服务。当然，实施车损险“无责代赔，先赔后追”，会一定程度增加保险公司的成本。但为更好发挥保险社会管理功能、促进社会和谐、服务消费者，消费者在保费外无需增加费用。'
            ]
        ]
    })
    window[vm.$id] = vm
})