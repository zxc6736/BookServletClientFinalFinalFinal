

function searchBook(){

    if(event.keyCode == 13){

        $.ajax({


            url: "http://localhost:7070/book/bookList",

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
                    var tr = $("<tr></tr>");
                    var img = $("<img />").attr("src", data[i].img);
                    var imgTd = $("<td></td>").append(img);
                    var titleTd = $("<td></td>").text(data[i].title);
                    var authorTd = $("<td></td>").text(data[i].author);
                    var priceTd = $("<td></td>").text(data[i].price);
                   var deleteTd = $("<td><input type='button' value='삭제' onClick='myDelete(this)'></td>");

                    tr.append(titleTd);
                    tr.append(imgTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(deleteTd);

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