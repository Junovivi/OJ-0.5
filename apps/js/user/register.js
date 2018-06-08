/**
 * Created by Think on 2017/12/30.
 */

function isEmpty(){
    var u_name=$("#name").value;
    if(u_name.length==0){
        alert("用户名不能为空");
        return false;
    }else if(u_name.length>40){
        alert("用户名太长");
        return false;
    }

    var u_nickname=$("#nickname").value;
    if(u_nickname.length>40){
        alert("昵称过长");
        return false;
    }

    var u_passwd=$("#passwd").value;
    var u_passwd2=("#passwd2").value;
    if(u_passwd.length==0){
        alert("密码不能为空");
        return flase;
    }else if(u_passwd!=u_passwd2){
        alert("两次密码不一致");
        return false;
    }
    var email = document.getElementById("emailz").value;
    if(email.length > 48){
        alert("邮箱太长");
        return false;
    }

    return true;
}

function valcheck(){
    if(!isEmpty()){
        return false;
    }
    if(!isEmail()){
        alert("无效的邮箱名");
        return false;
    }
}


function isEmail(){
    var reg=/^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,3}$/;
    var val=$("#email").value;
    val.toLowerCase();

    var obj = document.getElementById("checkmail");

    if(reg.test(val)){
        obj.innerHTML = "<font-color=green>OK</font-color>";
        return true;
    }
    else if(val.length != 0){
        obj.innerHTML = "<font-color=red>Invalid</font-color>";
        return false;
    }else{
        obj.innerHTML = "";
        return false;
    }

}
