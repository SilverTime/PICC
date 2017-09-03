/**
 * Created by mooshroom on 2016/1/25.
 */
define('userChart',[
    'avalon',
    'text!../../admin/user/userChart.html',
    'css!../../admin/user/user.css',
    '../../lib/ECharts/ECharts'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"userChart",
        ready: function (i) {
            vm.reset()
            admin.html=html
            vm.getChart()
        },
        reset: function () {
            avalon.mix(vm,{

            })
        },
        getChart: function () {
            $$.call({
                i:"Member/chart",
                data:{},
                success: function (res) {
                    memberCharts.$ops.series[0].data=res.sort(function (a, b) { return a.value - b.value})
                    memberCharts.reload()
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },
        $opt:{
            id:"memberCharts",
            width:'100%',
            height:500,
            $ops:{
//                        backgroundColor: '#2c343c',
                title: {
                    text: '会员统计',
                    left: 'center',
                    top: 20,
                    textStyle: {
                        color: '#ccc'
                    }
                },

                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },

                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series : [
                    {
                        name:'人数',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:[

                        ].sort(function (a, b) { return a.value - b.value}),
//                                roseType: 'angle',
                        label: {
                            normal: {
                                textStyle: {
//                                            color: 'rgba(255, 255, 255, 0.3)'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
//                                            color: 'rgba(255, 255, 255, 0.3)'
                                },
                                smooth: 0.2,
                                length: 10,
                                length2: 20
                            }
                        },
                        itemStyle: {
                            normal: {
//                                        color: '#c23531',
                                shadowBlur: 200,
//                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
        },
    })
})