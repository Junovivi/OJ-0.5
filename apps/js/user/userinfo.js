/**
 * 页面加载完成时获取用户注册信息，填入到输入框内，（用户名，邮箱 样式为不可更改）
 * 修改密码需邮箱验证
 * 用户修改之后点击确定提交新的到服务器；
 * 点击确定时，弹框提示确定修改，或者放弃
 * 离开当前页面时，提示当前页面还有尚未保存的页面，是否确定离开
 */

$(function(){
    var token=$.cookie("token");
    var cid=$.cookie("Contestid");
    var cpwd=$.cookie("contestPwd");

    $.ajax({
        url: 'http://morjoe.cc:8000/userinfo/',
        type: 'POST',
        data: {},
        dataType: 'JSON',
        headers:{"Userid":userid, "token":token, "Contestid":cid,"contestPwd":cpwd},
        success: function (data) {

            $("#user-sub").click(function(){
                $.ajax({
                    url: 'http://morjoe.cc:8000/userinfo/',
                    type: 'POST',
                    data: {
                        "nickname":$("#nickname").val(),
                        "email":$("#email").val()
                    },
                    dataType: 'JSON',
                    headers:{"Userid":userid,"token":token,"Contestid":cid,"contestPwd":cpwd},
                    success:function(data){

                    }
                });
            });
        }
    });

});