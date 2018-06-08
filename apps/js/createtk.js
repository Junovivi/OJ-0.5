$(document).ready(function() {
    var token=$.cookie("token");
    $("#end_time,#start_time").change(function(){
        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();
        if (end_time.indexOf("-")>0 && start_time.indexOf("-")>0){
            var date1 = new Date(start_time);
            var date2 = new Date(end_time);
            if(date1 == "Invalid Date" ){
                $("#tk-submit").attr("disabled",true);
                document.getElementById("checktime").innerHTML = "时间格式错误，请检查开始时间！";
            }else if(date2 == "Invalid Date"){
                $("#tk-submit").attr("disabled",true);
                document.getElementById("checktime").innerHTML = "时间格式错误，请检查结束时间！";
            }
            else if(date1 >= date2){
                $("#tk-submit").attr("disabled",true);
                document.getElementById("checktime").innerHTML = "结束时间不能小于开始时间！";
            }
            else if(date1 <= new Date()){
                $("#tk-submit").attr("disabled",true);
                document.getElementById("checktime").innerHTML = "开始时间不能设置为过往！";
            }
            else{
                document.getElementById("checktime").innerHTML = "";
                $("#tk-submit").attr("disabled",false);
            }
        }
        else{
            document.getElementById("checktime").innerHTML = "时间格式错误！";
            $("#tk-submit").attr("disabled",true);
        }
    });
    $("#tk-submit").click(function () {
        var formtk = new FormData();
        var start_time = $("#start_time").val();
        var end_time = $("#end_time").val();
        formtk.append("title", $("#title").val());
        formtk.append("contest_type", $("#contest_type option:selected").val());
        formtk.append("des_in", $("#description").val());
        formtk.append("notice", $("#notice").val());
        formtk.append("start_time", start_time);
        formtk.append("end_time", end_time);
        var obj=document.getElementsByName("language");
        var s='';
        for(var i =0;i< obj.length;i++){
            if(obj[i].checked){
                s+=obj[i].value+' ';
            }
            if(s==' '||s==''||s==null){
                s='All ';
            }
        }
        formtk.append("language", s);
        $.ajax({
            type: 'POST',
            url: 'http://123.207.45.186:8000/contest/create/',
            data: formtk,
            dataType: 'json',
            processData: false,
            contentType: false,
            cache: false,
            headers: {"token":token},
            success: function (data) {
            },
            error: function (jqXHR) {
                console.log(JSON.stringify(jqXHR));
            }
        });
    });
});
