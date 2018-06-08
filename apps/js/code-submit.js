$("#prm-submit").click(function () {
    var formD = new FormData();
    formD.append("prmauthor", $("#prmauthor").val());
    formD.append("prmsource", $("#prmsource").val());
    formD.append("prmtitle", $("#prmtitle").val());
    formD.append("prmdes", $("#prmdes").val());
    formD.append("prminput", $("#prminput").val());
    formD.append("prmoutput", $("#prmoutput").val());
    formD.append("prmspinput", $("#prmspinput").val());
    formD.append("prmspoutput", $("#prmspoutput").val());
    formD.append("hint", $("#hint").val());
    var fileobj = $("#prmzipfile")[0].files[0];
    formD.append("prmzipfile", fileobj);
    formD.append("isPublic", $("#isPublic").val());
    $.ajax({
        type: 'POST',
        url: 'http://123.207.45.186:8000/problem/CreateProblem/',
        data: formD,
        dataType: 'json',
        processData: false,
        contentType: false,
        cache: false,
        headers: {"userid": "1"},
        success: function (data) {
            if(data.code==0){
                window.location.href = "status.html";
            }
        },
        error: function (jqXHR) {
            console.log(JSON.stringify(jqXHR));
        }
    });
});