$(document).ready(function(){
    var userid=$.cookie("userid");
    var token=$.cookie("token");
    var cid;
    var url=location.search;
    var Request=new Object();
    var pid;
    if(url.indexOf("?")!=-1){
        var str=url.substr(1);
        strs=str.split("&");
        for(var i=0;i<strs.length;i++){
            Request[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
    }
    cid=Request["cid"];
    pid=Request["pid"];
    $.ajax({
        url:'http://morjoe.cc:8000/contest/problem/detail/',
        type:'POST',
        data:{
            "contest_problem_id":pid
        },
        dataType:'JSON',
        headers:{"Userid":userid, "token":token, "contestid":cid},
        success:function(data){
            if(data.code==0) {
                $("#prm-info").text(data.data.Problem_id + "   " + data.data.title);
                $("#prm-timelimit").text("Time Lismit : " + data.data.c_time_limit + "/" + data.data.java_time_limit + "(C/Java)");
                $("#prm-memorylimit").text("Memory Lismit : " + data.data.c_memory_limit + "/" + data.data.java_memory_limit + "(C/Java)");
                $("#prm-des").text(data.data.description);
                $("#prm-input").text(data.data.input);
                $("#prm-output").text(data.data.output);
                $("#prm-sp-input").text(data.data.sample_input);
                $("#prm-sp-output").text(data.data.sample_output);
                $("#prm-author").text(data.data.author);
                $("#prm-hint").text(data.data.hint);
                $("#prm-source").text(data.data.source);


                if(data.data.author==""){
                    $("#h-author").hide();
                }
                if(data.data.hint==""){
                    $("#h-hint").hide();
                }
                if(data.data.source==""){
                    $("#h-source").hide();
                }

            }
        },
        error:function(xhr){

        }
    });


    $("#prmcode").blur(function(){
        var userCode=$("#prmcode").val();
        if(userCode==undefined||userCode==""||userCode==null){
            $("#prmsubmit").attr("disabled",true);
        }else{
            $("#prmsubmit").attr("disabled",false);
        }
    });

    $("#prmsubmit").click(function(){
        var formprm=new FormData();

        var obj = document.getElementsByTagName("input");

        var userCode=$("#prmcode").val();

        formprm.append("contest_problem_id",pid);
        formprm.append("lang",$("#language option:selected").val());
        formprm.append("userCode",userCode);
        $.ajax({
            type:'POST',
            url:'http://morjoe.cc:8000/problem/SubmitUserCode/',
            data:formprm,
            dataType:'json',
            processData:false,
            contentType:false,
            cache:false,
            headers:{"userId":userid,"token":token,"contestId":cid,"contestPwd":""},
            success:function(data){
                alert(data);
            },
            error:function(jqXHR){
                console.log(JSON.stringify(jqXHR));
            }
        });

    });


});