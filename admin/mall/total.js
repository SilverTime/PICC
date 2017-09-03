/**
 * Created by mooshroom on 2015/12/12.
 */
define('total',[
    'avalon',
    'text!../../admin/mall/total.html',
    'css!../../admin/mall/mall.css',
    '../../lib/ECharts/ECharts'
], function (avalon, html) {
    var vm=avalon.define({
        $id:"total",
        ready: function () {
            admin.html=html
            vm.getChart()
        },
        reset: function () {

        },
        getChart: function () {
            $$.call({
                i:"Order/expChart",
                data:{},
                success: function (res) {

                    charts.$ops.series[0].data=res.sort(function (a, b) { return a.value - b.value})
                    charts.reload()
                },
                error: function (err) {
                    tip.on(err)
                }
            })
        },

        $opt:{
            id:"charts",
            width:'100%',
            height:500,
            $ops:{
//                        backgroundColor: '#2c343c',
                title: {
                    text: '商家消费占比',
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
                        name:'消费龙宝',
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
    window[vm.$id]=vm
})

