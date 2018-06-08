$(document).ready(function() {
    var inx=1;
    var offset=20;
    $.ajax({
        url:'',
        type:'GET',
        data:{
            "idx":idx,
            "offset":offset,
            "contest_type":'DIY'
        },
        dataType:'JSON',
        success:function(data){
            if(data.code==0){
                for(var i in data.data){
                    var tr=$('<tr>');
                    var start_time = new Date(data.data[i].start_time);
                    var end_time = new Date(data.data[i].end_time);
                    var current =new Date();
                    if(start_time<current){
                        status='Pennding';
                    }else if(start_time>current && current<end_time){
                        status='Running';
                    }else if(current>end_time){
                        status='Ended';
                    }
                    tr.append($('<td>').text(data.data[i].id))
                        .append($('<td>').text(data.data[i].title))
                        .append($('<td>').text(data.data[i].start_time))
                        .append($('<td>').text(data.data[i].end_time))
                        .append($('<td>').text(data.data[i].security_type))
                        .append($('<td>').text(data.data[i].status))
                        .append($('<td>').text(data.data[i].User));
                    $("#DIYcontentlist").append(tr);
                }
            }
        },
        error:function(jqXHR){
            console.log(JSON.stringify(jqXHR));
        }


    });
});