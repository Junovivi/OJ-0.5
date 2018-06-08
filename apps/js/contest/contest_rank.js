$(function() {
    var userid=$.cookie("userid");
    var token=$.cookie("token");
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
        url: 'http://morjoe.cc:8000/contest/rank/',
        type: 'POST',
        data: {},
        dataType: 'JSON',
        headers:{"Userid":userid, "token":token, "Contestid":cid,"contestPwd":""},
        success: function (data) {
            if(data.code==0){
                var tr=$('<tr>').append($('<th>').text("Rank"))
                    .append($('<th>').text('Team'))
                    .append($('<th>').text('Solved'))
                    .append($('<th>').text('Penalty'));
                for(var i in data.data.problemList){
                    tr.append($('<th>').text(data.data.problemList[i].id+data.data.problemList[i].ratio));
                }
                var thead=$('<thead>').append(tr);
                var tbody=$('<tbody>');
                var r=0;

                for (var i in data.data.rank) {
                    r++;
                    var t = $('<tr>').append($('<td>').text(r))
                        .append($('<td>').text(i))
                        .append($('<td>').text(data.data.rank[i].solved_num));
                    var tm=Math.floor((data.data.rank[i].penalty) / 3600) + ':'
                        + Math.floor(((data.data.rank[i].penalty) / 60 % 60)) + ':'
                        + Math.floor(((data.data.rank[i].penalty) % 60));
                    t.append($('<td>').text(tm));
                    for(var k in data.data.problemList){
                        var td=$("<td>");
                        var problemId=data.data.problemList[k].id;
                        if(data.data.rank[i].detail[problemId]){
                            var times = Math.floor((data.data.rank[i].detail[problemId].time) / 3600) + ':'
                                + Math.floor(((data.data.rank[i].detail[problemId].time) / 60 % 60)) + ':'
                                + Math.floor(((data.data.rank[i].detail[problemId].time) % 60));
                            if (data.data.rank[i].detail[problemId].is_firstblood) {
                                td.css({"background": "#d9edf7"});
                            } else if (data.data.rank[i].detail[problemId].status == 1) {
                                td.css({"background": "#dff0d8"});
                            } else if (data.data.rank[i].detail[problemId].status == 0 && data.data.rank[i].detail[problemId].wrongtimes != 0) {
                                td.css({"background": "#fcf8e3"})
                            }
                            if (data.data.rank[i].detail[problemId].status == 0 && data.data.rank[i].detail[problemId].wrongtimes == 0) {
                                td.text(' ');
                            } else if (data.data.rank[i].detail[problemId].wrongtimes == 0) {
                                td.text(times);
                            } else {
                                td.text(times + '(-' + data.data.rank[i].detail[problemId].wrongtimes + ')');
                            }

                        }else{
                            td.text(' ');
                        }
                        t.append(td);
                    }
                    tbody.append(t);
                }
            }
            $('#c_ranklist').append(thead).append(tbody);
        },/////succ
        error: function (jqXHR) {
            console.log(JSON.stringify(jqXHR));
        }
    });
});