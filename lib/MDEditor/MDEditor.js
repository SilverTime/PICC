/**
 * Created by mooshroom on 2016/1/24.
 */
define('MDEditor', [
    'avalon',
    'jquery',
    'text!../../lib/MDEditor/MDEditor.html',
    'css!../../lib/MDEditor/MDEditor.css',
    '../../lib/uploader/uploader',
    "../../lib/MDEditor/markdown",
    "../../lib/MDEditor/prettify",
    'css!../../src/css/font-awesome.min.css'
], function (avalon, $, html, css, uploader, markdown, prettify) {
    avalon.component("tsy:mdeditor", {
        $template: html,
        id: "",
        now: "1",
        md: '',
        html: "",
        loadLocaDoc: true,
        $opt: {},
        //图片上传组件配置
        $uploader:{

        },

        callback: function (md) {

        },
        file:'',
        initType: 1,//0为初始纯净模式；1为初始双屏模式；2为初始阅读模式
        //本地缓存
        isHTML5: false,
        getLoaclDoc: function () {

        },
        //文档编译
        trs: function () {


        },
        toWrite: function () {

        },
        toBoth: function () {

        },
        toRead: function () {

        },
        height: "auto",
        autoHeight: function () {

        },
        doubleScroll: function () {

        },
        insert: function () {

        },
        //粗体
        bold: function () {


        },
        //斜体
        italic: function () {


        },
        //插入连接
        link: "",
        links: function () {


        },

        //表格
        table: function () {
        },

        //段落引用
        quote: function () {
        },
        //插入代码
        code: function () {

        },
        //插入图片
        imgUrl: "",
        img: function () {



        },
        //插入有序列表
        ol: function () {
        },
        //插入无序列表
        ul: function () {
        },
        //插入标题h1
        h1: function () {

        },
        //插入标题h2
        h2: function () {
        },
        //插入标题h3
        h3: function () {
        },
        //插入标题h4
        h4: function () {
        },
        //插入标题h5
        h5: function () {
        },

        //插入分割线
        divider: function () {
        },

        //分段落
        paragraph: function () {
        },

        //打开文件

        open: function (e) {
        },

//        //保存文件
        Base64: {
        },
        save: function () {
        },
        saveFile: function () {
        },

        //下拉菜单
        dh: false,//插入标题下拉菜单
        dl: false,//插入列表下拉菜单
        dropdown: function (i) {
        },

        //各个模态框的显示
        showModal:0,
        toggleModal: function (i) {

        },
        $init: function (vm, elem) {
            if(vm.id!=""){
                window[vm.id]=vm
            }

            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
            });

            console.log("【markdown编辑器模块加载完成！】");

            //本地缓存
            vm.getLoaclDoc = function () {
                if (vm.loadLocaDoc) {
                    //检测是否支持html5web存储
                    if (typeof(Storage) !== "undefined") {
                        vm.isHTML5 = true;

                        //查找存储中的lastMD，判断是否为第一次使用
                        var isFirst = true;
                        for (var i = 0; i < window.localStorage.length; i++) {
                            if (window.localStorage.key(i) == "lastMD") {
                                isFirst = false;
                                break
                            }
                        }

                        //加载上一次的文档


                        if (isFirst) {
                            //avalon.ajax({
                            //    url: "./README.md",
                            //    type: "get",
                            //    success: function (data) {
                            //        vm.md = data;
                            //        vm.trs();
                            //    }
                            //
                            //})
                        }
                        else {
                            vm.md = window.localStorage.getItem("lastMD");
                            if (vm.md !== "") {
                                vm.trs();
                                tip.on("成功加载上一次的文档！", 1, 3000)
                            }
                        }


                    }
                    else {
                        tip.on("您老的浏览器老得不行了，无法为您开启文档保护", 0, 6000)// Sorry! No web storage support..
                        vm.isHTML5 = false;
                    }
                }
            }


            //执行编译
            vm.trs = function () {
                vm.html = marked(vm.md) + '<br/><br/><br/><br/><br/><br/>'
                //执行本地缓存
                if (vm.isHTML5 === true) {
                    window.localStorage.setItem("lastMD", vm.md)
                }
                prettyPrint();

                //回掉给其他东西
                vm.callback(vm.md)
            }

            //编辑窗口动作
            vm.toWrite = function () {
                $("#doc-show-tool").show();
                $(".doc-layout").removeClass("col-sm-6").addClass("col-sm-12");           //.doc-layout class变为col-sm-12
                $("#doc-show-layout").fadeOut();
                $("#doc-main-layout").fadeIn();
                //变形完成
                $("#doc-show").show();
                $("#read-only").hide();

                vm.autoHeight();
                vm.now = 0

            }
            vm.toBoth = function () {
                $("#read-only").hide();
                $("#doc-show").show();
                $("#nav-read").fadeOut();                                                  //#nav-both  class添加 hidden
                $("#nav-write").fadeOut();
                $(".doc-layout").removeClass("col-sm-6 col-sm-12").addClass("col-sm-6");           //.doc-layout class变为col-sm-12
                $("#doc-main-layout").fadeIn();
                $("#doc-show-layout").fadeIn();                                         //#doc-show-layout class添加hidden
                $("#nav-both").fadeIn();                                                //#nav-write class 去除hidden


                $("#doc-main-tool").find(".to-write").show();
                $("#doc-show-tool").find(".to-read").show();
                //变形完成
                vm.autoHeight();
                vm.now = 1
            }
            vm.toRead = function () {

                $(".doc-layout").removeClass("col-sm-6 col-sm-12").addClass("col-sm-12");           //.doc-layout class变为col-sm-12
                $("#doc-main-layout").fadeOut();
                $("#doc-show-layout").fadeIn();
                $("#doc-show").hide();
                $("#doc-show-tool").hide();
                $("#read-only").show();
                $('.doc-layout').css('height', 'auto');


                //变形完成
                vm.now = 2
            }
            vm.autoHeight = function () {

                if (vm.height == "auto") {
                    var adaptHeight = function () {
                        var x = $(window).height();
                        $('.doc-layout').css('height', (x - 90) + 'px');
                    };
                    adaptHeight();
                    $(window).resize(function () {
                        adaptHeight();
                    });
                }
                else {
                    $('.doc-layout').css('height', (vm.height - 90) + 'px');
                }


            }
            //跟随滚动：
            vm.doubleScroll = function () {
                $(".live-sroll").hover(function () {
                    $(this).on("scroll", function () {
                        //得到要跟随滚动的ID值
                        //元素获取
                        var thisId = $(this).attr('id');
                        var otherId = thisId == "doc-show" ? "doc-main" : "doc-show";
                        //参数获取
                        var sh1 = document.getElementById(thisId).scrollHeight;
                        var st1 = $("#" + thisId).scrollTop();
                        var sh2 = document.getElementById(otherId).scrollHeight;
                        var h1 = $("#" + thisId).height();
                        var h2 = $("#" + otherId).height();
                        //跟随滚动公式
                        // 实际运动高度
                        //var l1 = (sh1 - h1);
                        //var l2 = (sh2 - h2);
                        //文本运动高度之比与实际运动高度之比相等
                        var st2 = st1 / (sh1 - h1) * (sh2 - h2);
                        //动作执行
                        $("#" + otherId).scrollTop(st2);
                    });
                }, function () {
                    $(this).off("scroll");
                });


            }
            //插入内容模块
            vm.insert = function (f1, f2, n1, n2) {

                //保存当前滚动高度
                var sh = $("#doc-main").scrollTop();

                var textarea = document.getElementById("doc-main");
                var start = textarea.selectionStart;//获取光标所在位置对应的文本节点
                var end = textarea.selectionEnd;
                var l = vm.md.length;//获取整个文本总长度

                //插入指定的东西
                var t1 = vm.md.slice(0, start);
                var t = vm.md.slice(start, end);
                var t2 = vm.md.slice(end, l);
                var afterMd = t1 + f1 + t + f2 + t2;
                vm.md = afterMd;

                //文本域获取焦点并且选中制定的文本
                textarea.focus();
                textarea.setSelectionRange(start + n1, end + n1 + n2);

                //滚回原来的高度
                $("#doc-main").scrollTop(sh);

                //执行编译
                vm.trs();
                console.log()


            }

            //粗体
            vm.bold = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("**加粗的文字", "**", 2, 5)
                }
                else {
                    vm.insert("**", "**", 2, 0)
                }

            }
            //斜体
            vm.italic = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("*倾斜的文字", "*", 1, 5)
                }
                else {
                    vm.insert("*", "*", 1, 0)
                }

            }
            //插入连接

            vm.links = function () {
                vm.toggleModal(0)
                if (vm.link == "") {
                    vm.link = "输入连接地址";
                }
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("[输入连接描述", "](" + vm.link + ")", 1, 6)
                }
                else {
                    vm.insert("[", "](" + vm.link + ")", 1, 0)
                }

                vm.link = "";

            }

            //表格
            vm.table = function () {
                vm.insert("\r\n", "表头一|表头二|表头三\r\n----|----|----\r\n行一列一|行一列二|行一列三\r\n行二列一|行二列二|行二列三\r\n行三列一|行三列二|行三列三", 1, 0)
            }

            //段落引用
            vm.quote = function () {
                vm.insert("\r\n> ", "", 3, 0)
            }
            //插入代码
            vm.code = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("```输入代码语言\r\n输入代码", "\r\n ```", 3, 6)
                }
                else {
                    vm.insert("```输入代码语言\r\n", "\r\n ```", 3, 6)
                }

            }
            //插入图片
            vm.img = function () {

                function imgIn() {
                    //要插入
                    vm.toggleModal(0)
                    if (vm.imgUrl == "") {
                        vm.imgUrl = "输入图片URL地址";
                    }
                    var textarea = document.getElementById("doc-main");
                    if (textarea.selectionStart == textarea.selectionEnd) {
                        vm.insert("![输入图片描述", "](" + vm.imgUrl + ")", 2, 6)
                    }
                    else {
                        vm.insert("![", "](" + vm.imgUrl + ")", 2, 0)
                    }

                    vm.imgUrl = "";
                }

                if (vm.imgUrl == "") {
                    //没有 图片地址
                    var a = confirm("您还没有输入或上传图片，确定插入么？")
                    if (a) {
                        imgIn()
                    }
                    else {
                        //不要插入
                    }
                } else {
                    //已有图片地址
                    imgIn()
                }


            }
            //插入有序列表
            vm.ol = function () {
                vm.insert("\r\n1. ", "", 5, 0)
            }
            //插入无序列表
            vm.ul = function () {
                vm.insert("\r\n*  ", "", 5, 0)
            }
            //插入标题h1
            vm.h1 = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("\r\n# 标题1", "\r\n", 3, 3)
                }
                else {
                    vm.insert("\r\n# ", "\r\n", 3, 0)
                }

            }
            //插入标题h2
            vm.h2 = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("\r\n## 标题2", "\r\n", 4, 3)
                }
                else {
                    vm.insert("\r\n## ", "\r\n", 4, 0)
                }
            }
            //插入标题h3
            vm.h3 = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("\r\n### 标题3", "\r\n", 5, 3)
                }
                else {
                    vm.insert("\r\n### ", "\r\n", 6, 0)
                }
            }
            //插入标题h4
            vm.h4 = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("\r\n#### 标题4", "\r\n", 6, 3)
                }
                else {
                    vm.insert("\r\n#### ", "\r\n", 6, 0)
                }
            }
            //插入标题h5
            vm.h5 = function () {
                var textarea = document.getElementById("doc-main");
                if (textarea.selectionStart == textarea.selectionEnd) {
                    vm.insert("\r\n##### 标题5", "\r\n", 7, 3)
                }
                else {
                    vm.insert("\r\n##### ", "\r\n", 7, 0)
                }
            }

            //插入分割线
            vm.divider = function () {
                vm.insert("", "\r\n---\r\n", 7, 0)
            }

            //分段落
            vm.paragraph = function () {
                vm.insert("\r\n\r\n", "", 2, 0)
            }

            //打开文件

            vm.open = function (e) {
                if (typeof FileReader == "undified") {
                    alert("您老的浏览器不行了！");
                }
                var resultFile = document.getElementById("file").files[0];

                if (resultFile) {
                    var reader = new FileReader();

                    reader.readAsText(resultFile, 'UTF-8');
                    reader.onload = function (e) {
                        vm.md = this.result;
                        vm.toggleModal(0)
                        vm.trs();
                    };

                    tip.on("成功载入！最后更新日期:" + resultFile.lastModifiedDate, 1, 5000)
                }
            }

//        //保存文件
            vm.Base64 = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                    var i = 0;
                    input = vm.Base64._utf8_encode(input);
                    while (i < input.length) {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
                        output = output +
                            vm.Base64._keyStr.charAt(enc1) + vm.Base64._keyStr.charAt(enc2) +
                            vm.Base64._keyStr.charAt(enc3) + vm.Base64._keyStr.charAt(enc4);
                    }
                    return output;
                },
                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3;
                    var enc1, enc2, enc3, enc4;
                    var i = 0;
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                    while (i < input.length) {
                        enc1 = vm.Base64._keyStr.indexOf(input.charAt(i++));
                        enc2 = vm.Base64._keyStr.indexOf(input.charAt(i++));
                        enc3 = vm.Base64._keyStr.indexOf(input.charAt(i++));
                        enc4 = vm.Base64._keyStr.indexOf(input.charAt(i++));
                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;
                        output = output + String.fromCharCode(chr1);
                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }
                    }
                    output = vm.Base64._utf8_decode(output);
                    return output;
                },
                _utf8_encode: function (string) {
                    string = string.replace(/\r\n/g, "\n");
                    var utftext = "";
                    for (var n = 0; n < string.length; n++) {
                        var c = string.charCodeAt(n);
                        if (c < 128) {
                            utftext += String.fromCharCode(c);
                        }
                        else if ((c > 127) && (c < 2048)) {
                            utftext += String.fromCharCode((c >> 6) | 192);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                            utftext += String.fromCharCode((c >> 12) | 224);
                            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                            utftext += String.fromCharCode((c & 63) | 128);
                        }
                    }
                    return utftext;
                },
                _utf8_decode: function (utftext) {
                    var string = "";
                    var i = 0;
                    var c = c1 = c2 = 0;
                    while (i < utftext.length) {
                        c = utftext.charCodeAt(i);
                        if (c < 128) {
                            string += String.fromCharCode(c);
                            i++;
                        }
                        else if ((c > 191) && (c < 224)) {
                            c2 = utftext.charCodeAt(i + 1);
                            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                            i += 2;
                        }
                        else {
                            c2 = utftext.charCodeAt(i + 1);
                            c3 = utftext.charCodeAt(i + 2);
                            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                            i += 3;
                        }
                    }
                    return string;
                }
            }
            vm.save = function (ele) {
                if (/msie/i.test(navigator.userAgent)) {

                }
                else {
                    var content = vm.md;
                    vm.file="data:application/octet-stream;base64,"+ vm.Base64.encode(content);
                }
            }
            vm.saveFile = function () {
                if (/msie/i.test(navigator.userAgent)) {
                    var path = prompt("输入保存路径和文件名", "D:\\" + "新建markdown文件.md");
                    var content = vm.md;
                    content = content.replace(/\n/g, "\r\n");
                    var fso = new ActiveXObject("Scripting.FileSystemObject");
                    var s = fso.CreateTextFile(path, true);
                    s.WriteLine(content);
                    s.Close();
                }
                else {

                }
            }

            //下拉菜单

            vm.dropdown = function (i) {
                if (vm[i]) {
                    vm[i] = false
                } else {
                    vm.dh = false
                    vm.dl = false
                    vm[i] = true
                }
            }

            //模态框控制
            vm.toggleModal= function (i) {
                vm.showModal=i
            }

        },
        $ready: function (vm, elem) {
            switch (vm.initType) {
                case 0:
                    vm.toWrite();//切换为专注书写模式
                    break;
                case 1:
                    vm.toBoth();//切换为实时预览模式
                    break;
                case 2:
                    vm.toRead();//切换为纯净阅读模式
                    break;
            }
            vm.autoHeight();//自适应高度
            vm.doubleScroll();//实时预览双滚动
            setTimeout(function () {
                vm.getLoaclDoc()
            }, 300)
        }

    })
})