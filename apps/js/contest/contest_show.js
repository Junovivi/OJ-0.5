$(function(){
    $("#settings").hide();

    var userid=$.cookie("userid");
    var token=$.cookie("token");
    var contestpwd=$.cookie("contestpwd");
    var url=location.search;
    var cid;
    var Request=new Object();
    if(url.indexOf("?")!=-1){
        var str=url.substr(1);
        strs=str.split("&");
        for(var i=0;i<strs.length;i++){
            Request[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    cid=Request["cid"];

    $("#c_show").attr("href",function(){
        var a='./contest_show.html?cid='+cid;
        return a;
    });
    $("#c_status").attr("href",function(){
        var b='./contest_status.html?cid='+cid;
        return b;
    });
    $("#c_rank").attr("href",function(){
        var c='./contest_rank.html?cid='+cid;
        return c;
    });

    $.ajax({
        url:'http://morjoe.cc:8000/contest/problem/list/',
        type:'POST',
        data:{},
        dataType:'JSON',
        headers:{"Userid":userid, "token":token, "Contestid":cid,"contestpwd":contestpwd},
        success:function(data){
            if(data.code==11){
                alert("当前用户未登陆");
            }else if(data.code==56){
                $("#c_list").css({"text-align":"center"});
                var div=$('<div>').css({"margin":"0 auto","padding":"50px"});
                div.append($('<label>').text('请输入题库密码:').css({"font-size":"2em"}))
                    .append($('<input>').attr({"type":"password","id":"tk_pw"}).css({"line-height":"46px","margin":"20px"}))
                    .append($('<button>').text('确定').attr({"type":"button","id":"tk_sub"})
                        .css({"display":"inline-block","padding":"6px 12px","font-size":"14px",
                            "font-weight":"normal","line-height":"1.42857143","text-align":"center" ,
                            "white-space":"nowrap","vertical-align":"middle","cursor":"pointer",
                            "border": "1px solid transparent", "border-radius": "4px"}));
                $("#c_list").append(div);

                $("#tk_sub").click(function(){
                    var tkpw=$("#tk_pw").val();
                    $.cookie("contestpwd",tkpw);
                    location.reload();
                });


            }else if(data.code==0){
                if(data.data.is_author){
                    $("#settings").show();
                }
                for(var i=0;i<data.data.list.length;i++){
                    var tr=$('<tr>');
                    var td_title=$('<td>').append($('<a>').text(data.data.list[i].title).attr('href',function(){
                        var s='./problem.html?cid='+cid+'&pid='+data.data.list[i].id;
                        return s;
                    }));
                    var status=data.data.list[i].status;
                    if(status=='Accepted'){
                        status='√';
                    }else if(status=='Unsolved'){
                        status='-';
                    }else{
                        status='';
                    }
                    tr.append($('<td>').text(data.data.list[i].id))
                        .append($('<td>').text(status))
                        .append(td_title)
                        .append($('<td>').text(data.data.list[i].ratio));
                    $("#c_list").append(tr);
                }
            }
        },
        error: function (jqXHR) {
            console.log(JSON.stringify(jqXHR));
        }
    });
});