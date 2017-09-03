/**
 * Created by mooshroom on 2016/1/19.
 */
define('about',[
    'avalon',
    'text!../../package/doc/about.html',
    'css!../../package/doc/doc.css'
], function (avalon, html, css) {
    var vm=avalon.define({
        $id:"about",
        ready: function () {
            index.html=html
        }
    })
})