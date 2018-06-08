$(function(){
    $.ajax({
        url:'http://morjoe.cc:8000/contest/problem/list/',
        type:'POST',
        data:{
            "User_id":userid,
            "token":token,
            "contestid":cid
        },
        dataType:'JSON',
        success:function(data){
            if(data.code==0){
                for(var i=0;i<data.data.status.length;i++){
                    var tr=$('<tr>');
                    var td_title=$('<td>').append($('<a>').text(data.data.list[i].title).attr('href',function(){
                        var s='./problem.html?cid='+cid+'&pid='+data.data.list[i].id;
                        return s;
                    }));
                    tr.append($('<td>').text(data.data.status[i].id))
                        .append($('<td>').text(data.data.status[i].contest_problem_id))
                        .append($('<td>').text(data.data.status[i].user_id))
                        .append($('<td>').text(data.data.status[i].lang))
                        .append($('<td>').text(data.data.status[i].result))
                        .append($('<td>').text(data.data.status[i].exe_time))
                        .append($('<td>').text(data.data.status[i].exe_mem))
                        .append($('<td>').text(data.data.status[i].code_len))
                        .append($('<td>').text(data.data.status[i].post_time));
                    $("#c_list").append(tr);
                }
            }
        },
        error: function (jqXHR) {
            console.log(JSON.stringify(jqXHR));
        }
    });
});