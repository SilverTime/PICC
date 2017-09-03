/**
 * Created by mooshroom on 2015/12/11.
 *
 * 注册和登陆公用一个VM，注册逻辑在login.js中
 */
define('register',[
    'avalon',
    'text!../../package/getIn/register.html',
    'css!../../package/getIn/getIn.css',
],function(avalon,html,css){
    var vm=avalon.define({
        $id:"register",
        ready:function(){
            index.html=html
        },
        reset:function(){

        }
    })
    return register=vm
})