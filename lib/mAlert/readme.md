##功能
---
1.在用户进行相应操作时，弹出弹出框窗口

2.可以在窗口内进行进一步的操作

3.具有相应的样式

##依赖
---
1.MVVM框架：avalon.js

2.窗口动作：mAlert.js

---
##用法：
###第一步：引入

将mAlert组件包以及其依赖的组件包弄到项目里面，mAlert的全部文件如下：


![输入图片描述](http://images.tansuyun.cn/Image/TSY/376/2016-01-10/569243236a8a4.png)


###第二步：配置依赖路径

在mAlert.js中如图位置，配置组件所依赖的文件的路径

![输入图片描述](http://images.tansuyun.cn/Image/TSY/376/2016-01-10/5692234c103a5.png)


###第三步：标记组件降落点

在需要引入的地方编写如下：

```输入代码语言
<div ms-controller="alertDemo">
    <div ms-widget="mAlert,mAlert,$opt"></div>
    <div ms-widget="tip,tip"></div>
</div>
 ```

第三行的tip组件视情况引入；
第四步：引入主文件，加载配置

编写js：

```输入代码语言
require(["../../lib/mAlert/mAlert.js"],function() {
             var alertDemo = avalon.define({
                        $id: "alertDemo",
                        ready:function(){},
                        $opt: {}
                        }]
            avalon.scan()
           })
 ```
##注意

如果需要获得当前正在编辑的文档可以访问组件视图模型内的md属性，要获得编译之后的html可以访问其中的html属性获得。

在传入配置时，可以设置是否在启动编辑器时加载上一次的文档，通过传入loadLocaDoc:true 可设置为是，如果不传默认为是，特殊情况需要不加载上一次的文档