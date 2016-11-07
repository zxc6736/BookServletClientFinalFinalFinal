

function searchBook(){

    if(event.keyCode == 13){

        $.ajax({


            url: "http://localhost:7070/book/booklist",

            type: "GET",

            dataType:"jsonp",

            jsonp:"callback",

            data:{
                keyword: $("#keyword").val()


            },

            success: function(data){
                console.log(data.length);
                for( var i = 0 ; i < data.length ; i ++)
               // while(data.length)
                {
                    var tr = $("<tr></tr>").attr("data-isbn", data[i].isbn);
                    var img = $("<img />").attr("src", data[i].img);
                    var imgTd = $("<td></td>").append(img);
                    var titleTd = $("<td></td>").text(data[i].title);
                    var authorTd = $("<td></td>").text(data[i].author);
                    var priceTd = $("<td></td>").text(data[i].price);
                  // var deleteTd = $("<td><input type='button' value='삭제' onClick='myDelete(this)'></td>");
                    var deletebtn = $("<input/>").attr("type","button").attr("value","삭제");
                    deletebtn.on("click", function(){

                    // 삭제처리

                     });
                    var deletebtntd = $("<td></td>").append(deletebtn);
                    var updatebtn = $("<input/>").attr("type","button").attr("value","수정");
                    updatebtn.on("click", function(){

                     //수정버튼이 클리되면, this: event source(버튼)
                        var price = $(this).parent().parent().find("td:nth-child(4)").text();
                        var updatebox = $("<input/>").attr("type","text").val(price);

                        updatebox.on("keyup", function () {

                            if(event.keyCode == 13){

                                //update처리하 일단 db처리도 해야하고 ajax호출해서 서버프로그램을 실행시켜서 database의 데이터를 변경하면되요
                                //서버 프로그램에게 어떤값을 알려줘야지 처리가 될까요? --> 변경된 책 가격, ISBN값이 필요해요
                                var isbn = $(this).parent().parent().attr("data-isbn");
                                var price=$(this).val();
                                var tr = $(this).parent().parent();
                                $.ajax({
                                    url:"http://localhost:7070/book/bookUpdate",
                                    type:"GET",
                                    dataType:"jsonp",
                                    jsonp:"callback",
                                    data:{
                                        isbn:isbn,
                                        price:price
                                    },
                                    success: function (result) {
                                        alert("정상처리 되었습니다");
                                        tr.find("td:nth-child(4)").empty();
                                        tr.find("td:nth-child(4)").text(price);
                                    },
                                    error:function () {
                                        alert("업데이트 에러 발생");

                                    }

                                });

                                // 화면 처리도 해야되요



                            }

                        })


                        $(this).parent().parent().find("td:nth-child(4)").text("");
                        $(this).parent().parent().find("td:nth-child(4)").append(updatebox);
                        $(this).parent().parent().find("[type=button]").attr("disabled","disabled");


                     });




                    var updatebtntd = $("<td></td>").append(updatebtn);


                    tr.append(titleTd);
                    tr.append(imgTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(deletebtntd);
                    tr.append(updatebtntd);

                    $("tbody").append(tr);
                }


            },
            error: function(){

                alert("이상하다 이상해");

            }


        });
    }
}

function myDelete(obj) {

    $(obj).parent().parent().remove();

}

function mySort(){


}