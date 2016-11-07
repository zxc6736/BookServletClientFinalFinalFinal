




function searchComment() {
alert("코멘트 검색");
    if (event.keyCode == 13) {

        $.ajax({


            url: "http://localhost:7070/book/SearchComment",

            type: "GET",

            dataType: "jsonp",

            jsonp: "callback",

            data: {
                keyword: $("#comkeyword").val()


            },

            success: function (result) {

                for (var i = 0; i < result.length; i++) {
                        alert("포문에 들어오나요?")
                        var tr = $("<tr></tr>").attr("review-no",result[i].seq);
                        var divd = $("<td></td>").text(result[i].id);
                        var divp = $("<td></td>").text(result[i].text);
                        var divt = $("<td></td>").text(result[i].date);
                        //var deletebtn = $("<input id='deletecomment'/>").attr("type", "button").attr("value", "DELETE");
                        var deletebtn=$("<input type='button' id='deletecomment' value='DELETE' onclick='deletecomment()'>")
                         //var seq= $(this).parent().parent().attr(seq);



                    deletebtn.on('click', function deletecomment() {

                        $(this).parent().parent().remove();

                        $.ajax({
                            url: "http://localhost:7070/book/commentDelete",
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                seq: $(this).parent().parent().attr("review-no")
                            },
                            success: function (result) {
                                alert("커멘트가 삭제 되었습니다");

                            },
                            error: function () {
                                alert("커멘트 삭제 에러 발생");
                            }
                        });
                    });

                    tr.append(divd);
                    tr.append(divp);
                    tr.append(divt);
                    tr.append(deletebtn);
                    $("tbody").append(tr);

                    var deletebtntd = $("<td></td>").append(deletebtn);
                    tr.append(deletebtntd);

                }






            },
            error: function () {

                alert("이상하다 이상해");

            }


        });

    }

}


