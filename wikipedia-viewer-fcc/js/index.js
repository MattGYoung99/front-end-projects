$(document).ready(function() {
 $('button').on('click',function () {
  var searchTerm = $('#searchInput').val();
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm + "&format=json&callback=?"; // url to look for using the search input by the user
  $('input[type="search"]').val('');
     $.ajax({
        type:"GET",
        url:url,
        async:true,
        dataType: "json",
        success:function(data){
        $('.container').removeClass('hidden')
        $('.container').empty()
        for (var i=0;i<data[1].length;i++) {
          var $elem = $('body div.container')
          var thelink = $('<a>',{
            text: data[3][i],
            title: data[3][i],
            href: data[3][i]
          })
          $elem.append(
            $('<div/>',{'class': 'result'}).append(
             $('<p/>', {'class': 'title'}).text(data[1][i]),
             $('<p/>').text(data[2][i]),thelink
              )
            )
         $('.result').show('slide',{direction: 'left'}, 500).delay(1000)
          }
        },
        error: function(errorMessage){alert("Error");}
    });
   return false;
 });
});

/* 
   data[1][1] 
   data[2][1]
   data[3][1]
*/