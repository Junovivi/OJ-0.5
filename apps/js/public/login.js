
$(function(){
    var nickname=$.cookie("nickname");
    if(nickname==null){
        $("#userinfo").show();
        $("#userinfo1").hide();
    }else{
        $("#userinfo").hide();
        $("#userinfo1").show();
        $("#info-name").text(nickname);

    }
    // $("#logout").click(function(){
    //     $.cookie("nickname",null);
    //     $.cookie("userid",null);
    //     $.cookie("token",null);
    //     location.href="onload";
    //     $("#userinfo").html('Login');
    //     $("#userlog").html('Register');

    // });

    $("#userlogin").click(function(){
        $("#gray").show();
        $("#popup").show();//查找ID为popup的DIV show()显示#gray
        loginbtn_center();
    });


    //点击关闭按钮
    $("a.close").click(function(){
        $("#gray").hide();
        $("#popup").hide();//查找ID为popup的DIV hide()隐藏
    });

    //窗口水平居中
    $(window).resize(function(){
        loginbtn_center();
    });

    function loginbtn_center(){
        var _top=($(window).height()-$(".popup").height())/2;
        var _left=($(window).width()-$(".popup").width())/2;

        $(".popup").css({top:_top,left:_left});
    }
    $(".top_nav").mousedown(function(e){
        $(this).css("cursor","move");//改变鼠标指针的形状
        var offset = $(this).offset();//DIV在页面的位置
        var x = e.pageX - offset.left;//获得鼠标指针离DIV元素左边界的距离
        var y = e.pageY - offset.top;//获得鼠标指针离DIV元素上边界的距离
        $(document).bind("mousemove",function(ev){ //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件

            $(".popup").stop();//加上这个之后

            var _x = ev.pageX - x;//获得X轴方向移动的值
            var _y = ev.pageY - y;//获得Y轴方向移动的值

            $(".popup").animate({left:_x+"px",top:_y+"px"},10);
        });

    });
    $(document).mouseup(function() {
        $(".popup").css("cursor","default");
        $(this).unbind("mousemove");
    });

    $("#name").blur(function () {
        var name=$("#name").val();
        if(name==""||name==null){
            $("#login_submit").attr("disabled",true);
        }else{
            $("#login_submit").attr("disabled",false);
        }
    });

    $("#passwd").blur(function () {
        var passwd=$("#passwd").val();
        if(passwd==""||passwd==null){
            $("#login_submit").attr("disabled",true);
        }else{
            $("#login_submit").attr("disabled",false);
        }
    });



    $("#login_submit").click(function(){
        var passwd=md5($("#passwd").val());
        $.ajax({
            url:'http://123.207.45.186:8000/user/login/',
            type:'POST',
            data:
                {
                    'username':$("#name").val(),
                    'passwd':passwd
                },
            dataType:'json',
            headers:{"userId":document.cookie.id,"token":document.cookie.token},
            success:function(data){
                if(data.code==0){
                    $("#gray").hide();
                    $("#popup").hide();
                    $("#userinfo").html('<p>Hello, '+data.data.nickname+'</p>').css({
                        "font-size":"1.2em",
                        "color":"#777",
                        "margin-top":"12px"
                    });
                    $.cookie("token",data.data.token);
                    $.cookie("nickname",data.data.nickname);
                    $.cookie("userid",data.data.userid);
                }else if(data.code==15){
                    $("#info").html("用户名不存在").css({"color":"red"});
                }else if(data.code==16){
                    $("#info").html("密码错误").css({"color":"red"});
                }
            },
            error:function(jqXHR){
                console.log(JSON.stringify(jqXHR));
            }
        });
    });
}) ;