/**
 * Created by mooshroom on 2015/12/11.
 *
 * ע��͵�½����һ��VM��ע���߼���login.js��
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