$(document).ready(function() {
    $.ajax({
        url:'http://morjoe.cc:8000/contest/list/',
        type:'GET',
        data:{
            "idx":'1',
            "offset":'20',
            "contest_type":'STD'
        },
        dataType:'JSON',

        success:function(data){
            if(data.code==0){
                for(var i in data.data){
                    var tr=$('<tr>');
                    // var prmi=data.data[i].id;
                    var td_title=$('<td>').append($('<a>').text(data.data[i].title).attr({'href':function(){
                            var s='contest_show.html?cid='+data.data[i].id;
                            return s;
                        }}));
                    tr.append($('<td>').text(data.data[i].id))
                        .append(td_title)
                        .append($('<td>').text(data.data[i].start_time))
                        .append($('<td>').text(data.data[i].end_time))
                        .append($('<td>').text(data.data[i].security_type))
                        .append($('<td>').text(data.data[i].status))
                        .append($('<td>').text(data.data[i].user_nickname));
                    $("#contestcontentlist").append(tr);
                    if($('td').value=="Pending"){
                        $('td').css('color','red');
                    }
                }

            }
        },
        error:function(jqXHR){
            console.log(JSON.stringify(jqXHR));
        }
    });
    $("#search").click(function(){
        $("#contestcontentlist").empty();
        $.ajax({
            url:'http://morjoe.cc:8000/contest/list/',
            type:'GET',
            data:{
                "idx":'1',
                "offset":'20',
                "contest_type":'STD',
                "title":$("#s_title").val(),
                "status":$("#s_contest_status option:selected").val(),
                "user_nickname":$("#s_author").val(),
                "security_type":$("#s_security_type option:selected").val()
            },
            dataType:'JSON',
            success:function(data){
                if(data.code==0){
                    for(var i=0;i<data.data.length();i++){
                        var tr=$('<tr>');
                        var td_title=$('<td>').append($('<a>').text(data.data[i].title).attr('href',function(){
                            var s='./contest/contest_show.html?cid='+data.data[i].id;
                            return s;
                        }));
                        tr.append($('<td>').text(data.data[i].id))
                            .append(td_title)
                            .append($('<td>').text(data.data[i].start_time))
                            .append($('<td>').text(data.data[i].end_time))
                            .append($('<td>').text(data.data[i].security_type))
                            .append($('<td>').text(data.data[i].status))
                            .append($('<td>').text(data.data[i].user_nickname));
                        $("#contestcontentlist").append(tr);
                        if(data.data[i].security_type=='Password'){
                            td_title.click(function(){
                                window.location.href='./contest/contest_show?cid='+data.data[i].id;
                            });
                        }
                    }

                }
            },
            error:function(jqXHR){
                console.log(JSON.stringify(jqXHR));
            }
        });
    });
    $("#create").click(function(){
        if(nickname==null){
            $("#contestlist").html("<p>您还未登陆，请先登陆</p>");
            $("#userlogin").click();
        }else{
            window.open("./createtk.html");
        }
    });
});