

$(function () {


    $.ajax({

        url: "http://localhost:7070/book/BookCommentServlet",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {               // 서버에게 보내주는 데이터
            isbn: localStorage.isbn
        },
        success: function (result) {

            var tr = $("<tr></tr>").attr("data-isbn", result.isbn);
            var img = $("<img />").attr("src", result.img);
            var imgTd = $("<td></td>").append(img);
            var titleTd = $("<td></td>").text(result.title);
            var authorTd = $("<td></td>").text(result.author);
            var priceTd = $("<td></td>").text(result.price);

            tr.append(imgTd);
            tr.append(titleTd);
            tr.append(authorTd);
            tr.append(priceTd);

            $("tbody").append(tr);



                    },
        error: function () {
            alert("업데이트 에러 발생");
        }
    });

});

$(function () {


    $.ajax({

        url: "http://localhost:7070/book/BookCommentLoad",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {               // 서버에게 보내주는 데이터
            isbn: localStorage.isbn
        },
        success: function (result) {
           for (var i = 0; i < result.length; i++) {

                 var divd = $("<div></div>").text(result[i].id);
                 var divp = $("<div></div>").text(result[i].text);
                 var divt = $("<div></div>").text(result[i].date);


                 $("#enrollcomment").append(divd);
                 $("#enrollcomment").append(divp);
                 $("#enrollcomment").append(divt);
           }
     },
        error: function () {
            alert("업데이트 에러 발생");
        }
    });

});


function wrcommentbtn() {

    var herecomment = $("#herecomment").val();

    $.ajax({

        url: "http://localhost:7070/book/CommentInsertServlet",
        type: "GET",
        dataType: "jsonp",
        jsonp: "callback",
        data: {               // 서버에게 보내주는 데이터
            isbn: localStorage.isbn,
            herecomment: herecomment
        },
        success: function (result) {

           $(location).attr("href","comment.html");
          var divd = $("<div></div>").text(result.id);
            var divp = $("<div></div>").text(herecomment);
           var divt = $("<div></div>").text(result.date);

           $("#enrollcomment").append(divd);
           $("#enrollcomment").append(divp);
           $("#enrollcomment").append(divt);



        },
        error: function () {
            alert("업데이트 에러 발생");

        }


    });


};



