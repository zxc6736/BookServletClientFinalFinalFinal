
// 화면에 HTML이 표시되면 호출!!

$(function() {
    $.ajax({
        url: "http://localhost:7070/book/SessionCheck",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        success: function (result) {
            if(result) {
                alert("로그인한 사람");
                // 로그아웃 버튼을 만들어서 화면에 붙어야 해요!
                // xxx님 환영합니다.
                var logoutbtn = $("<button></button>").text("로그아웃");

                $("#tttt").append(logoutbtn);

                logoutbtn.on("click", function () {



                    $.ajax({


                        url: "http://localhost:7070/book/BookLogoutServlet",
                        type: "GET",
                        dataType: "jsonp",
                        jsonp: "callback",
                        success: function () {
                            alert("세션이 지워졌다");
                            $(location).attr("href", "index.html");

                        },
                        error: function () {


                        }


                    })

                })



            } else {
                alert("로그인안한 사람");

                $("#logoutbtn").hide();
            }
            
        },
        error: function () {
            alert("로그인 에러 발생");

        }

    }) 
});

function searchBook() {

    if (event.keyCode == 13) {

        $.ajax({


            url: "http://localhost:7070/book/bookList",

            type: "GET",

            dataType: "jsonp",

            jsonp: "callback",

            data: {
                keyword: $("#keyword").val()


            },

            success: function (data) {

                for (var i = 0; i < data.length; i++)

                {
                    var tr = $("<tr></tr>").attr("data-isbn", data[i].isbn);
                    var img = $("<img />").attr("src", data[i].img);
                    var imgTd = $("<td></td>").append(img);
                    var titleTd = $("<td></td>").text(data[i].title);
                    var authorTd = $("<td></td>").text(data[i].author);
                    var priceTd = $("<td></td>").text(data[i].price);
                    var deletebtn = $("<input id='deletelist'/>").attr("type", "button").attr("value", "DELETE");
                    var infobtn = $("<input id='viewlist'/>").attr("type", "button").attr("value", "VIEW_Info");
                    var commentbtn = $("<input id='commentlist'/>").attr("type", "button").attr("value", "COMMENT");

//서평페이지로 가기----------------------------------------------------------------------------------------------------
                    commentbtn.on("click", function () {

                        localStorage.isbn = $(this).parent().parent().attr("data-isbn");


                        $(location).attr("href", "comment.html");


                        });



 //정보보기 ----------------------------------------------------------------------------------------------------

                    infobtn.on("click", function () {

                        var isbn = $(this).parent().parent().attr("data-isbn");

                        var tr = $(this).parent().parent();
                        $.ajax({
                            url: "http://localhost:7070/book/BookInfo",
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {               // 서버에게 보내주는 데이터
                                isbn: isbn
                            },
                            success: function (result) {

                                // DIV생성
                                var divd = $("<div></div>").text(result.date);
                                var divp = $("<div></div>").text(result.page);
                                var divt = $("<div></div>").text(result.publisher);

                                tr.find("td:nth-child(2)").append(divd);
                                tr.find("td:nth-child(2)").append(divp);
                                tr.find("td:nth-child(2)").append(divt);

                            },
                            error: function () {
                                alert("업데이트 에러 발생");

                            }

                        });



                    });

                    var infobtntd = $("<td></td>").append(infobtn);


//삭제---------------------------------------------------------------------------------------------------------
                    deletebtn.on("click", function () {
                        var isbn = $(this).parent().parent().attr("data-isbn");
                        $(this).parent().parent().remove();
                        $.ajax({
                            url: "http://localhost:7070/book/BookDelete",
                            type: "GET",
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: {
                                isbn: isbn,
                               // price: price,
                               // title: title,
                               // author: author
                            },
                            success: function (result) {
                                alert("정상처리 되었습니다");


                            },
                            error: function () {
                                alert("업데이트 에러 발생");

                            }

                        });


                   });
                   var deletebtntd = $("<td></td>").append(deletebtn);


//수정-----------------------------------------------------------------------------------------------------------------

                    var updatebtn = $("<input id='editlist'/>").attr("type", "button").attr("value", "EDIT");
                    updatebtn.on("click", function () {

                        //수정버튼이 클리되면, this: event source(버튼)

                        var title = $(this).parent().parent().find("td:nth-child(2)").text();//제목
                        var author = $(this).parent().parent().find("td:nth-child(3)").text();//저자
                        var price = $(this).parent().parent().find("td:nth-child(4)").text();//가격

                        var updateboxtitle = $("<input/>").attr("type", "text").val(title);
                        var updateboxauthor = $("<input/>").attr("type", "text").val(author);
                        var updatebox = $("<input/>").attr("type", "text").val(price);


                        updatebox.on("keyup", function () {

                            if (event.keyCode == 13) {

                                //update처리하 일단 db처리도 해야하고 ajax호출해서 서버프로그램을 실행시켜서 database의 데이터를 변경하면되요
                                //서버 프로그램에게 어떤값을 알려줘야지 처리가 될까요? --> 변경된 책 가격, ISBN값이 필요해요
                                var isbn = $(this).parent().parent().attr("data-isbn");

                                var title = $(updateboxtitle).val();
                                var author = $(updateboxauthor).val();
                                var price = $(this).val();

                                var tr = $(this).parent().parent();

                                $.ajax({
                                    url: "http://localhost:7070/book/bookUpdate",
                                    type: "GET",
                                    dataType: "jsonp",
                                    jsonp: "callback",
                                    data: {
                                        isbn: isbn,
                                        price: price,
                                        title: title,
                                        author: author
                                    },
                                    success: function (result) {
                                        alert("정상처리 되었습니다");

                                        tr.find("td:nth-child(2)").empty();
                                        tr.find("td:nth-child(2)").text(title);
                                        tr.find("td:nth-child(3)").empty();
                                        tr.find("td:nth-child(3)").text(author);
                                        tr.find("td:nth-child(4)").empty();
                                        tr.find("td:nth-child(4)").text(price);
                                    },
                                    error: function () {
                                        alert("업데이트 에러 발생");

                                    }

                                });


                            }

                        })

                        $(this).parent().parent().find("td:nth-child(2)").text("");
                        $(this).parent().parent().find("td:nth-child(2)").append(updateboxtitle);
                        $(this).parent().parent().find("td:nth-child(3)").text("");
                        $(this).parent().parent().find("td:nth-child(3)").append(updateboxauthor);
                        $(this).parent().parent().find("td:nth-child(4)").text("");
                        $(this).parent().parent().find("td:nth-child(4)").append(updatebox);

                        $(this).parent().parent().find("[type=button]").attr("disabled", "disabled");


                    });


                    var updatebtntd = $("<td></td>").append(updatebtn);
                    var commentbtntd = $("<td></td>").append(commentbtn);


                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(deletebtntd);
                    tr.append(updatebtntd);
                    tr.append(infobtntd);
                    tr.append(commentbtntd);


                    $("tbody").append(tr);
                }


            },
            error: function () {

                alert("이상하다 이상해");

            }


        });
    }
}

//-----------------------Insert 부분이예요--------------------------------------------------------------------

function insertBook(){

        var isbn = $("#insertisbn").val();
        var title = $("#inserttitle").val();
        var author = $("#insertauthor").val();
        var price = $("#insertprice").val();

        $.ajax({
            url: "http://localhost:7070/book/bookInsert",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            data:{
                isbn:isbn,
                title:title,
                author:author,
                price:price
            },

            success: function () {
                alert("정상처리 되었습니다");

            },
            error: function () {
                alert("업데이트 에러 발생");

            }





        })

}
//-----------------------------회원가입하기--------------------------------------------------
function enroll() {

    var id = $("#enrollid").val();
    var email=$("#enrollemail").val();
    var password = $("#enrollpass").val();

    $.ajax({
        url: "http://localhost:7070/book/BookEnrollServlet",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data:{

            id:id,
            email:email,
            password:password
        },

        success: function () {
            alert("정상처리 되었습니다");
            $(location).attr("href", "login.html");

        },
        error: function () {
            alert("업데이트 에러 발생");

        }

    })

}
//------------------로그인---------------------------------------------------------
function myLogin() {

    var id = $("#loginid").val();
    var password = $("#loginpass").val();

    $.ajax({
        url: "http://localhost:7070/book/BookLoginServlet",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data:{

            id:id,
            password:password
        },

        success: function () {
            alert("정상처리 되었습니다");

            $(location).attr("href","list.html");
        },
        error: function () {
            alert("로그인 에러 발생");

        }

    })


}
























