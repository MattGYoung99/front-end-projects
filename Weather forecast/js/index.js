$(document).ready(function() {  
    if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showInfo)
    } else {
      alert ("This browser doesn't support geolocation!")
    }
    
    function showInfo(position) {
      var months = ["Janurary","February","March","April","May","June","July","August","September","October","November","December"];
      var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      var x = new Date();
      var fullDate = months[x.getMonth()] + ',' + " " +  x.getDate()  + ',' + " " + x.getFullYear();
      var day = days[x.getDay()];
      var lat = position.coords.latitude
      var long = position.coords.longitude
      $.getJSON( "https://fcc-weather-api.glitch.me/api/current?lat=" + lat +  "&lon=" + long, function(result) {
       var desc = result.weather[0].main.toLowerCase();
       var deg = Math.round(result["main"]["temp"]);
       var deghigh = Math.round(result["main"]["temp_max"]);
       var deglow = Math.round(result["main"]["temp_min"]);
       var $elem = $('body div.main');
       /* if (desc === 'drizzle') {
          $elem.append(
           $('<div/>', {'class': 'icon sun-shower'}).append(
              $('<div/>', {'class': 'cloud'}),
              $('<div/>', {'class': 'sun'}).append(
            $('<div/>', {'class': 'rays'})
           ),
         $('<div/>', {'class': 'rain'})
      )
  ) 
       } else if (desc === 'clouds') {
         $elem.append(
         $('<div/>', {'class': 'icon cloudy'}).append(
          $('<div/>', {'class': 'cloud'}),
          $('<div/>', {'class': 'cloud'})
       )
    )
       } else if (desc === 'rain') {
         $elem.append(
        $('<div/>', {'class': 'icon rainy'}).append(
          $('<div/>', {'class': 'cloud'}),
        $('<div/>', {'class': 'rain'})
    )
  )
       } else if (desc === 'snow') {
         $elem.append(
        $('<div/>', {'class': 'icon flurries'}).append(
           $('<div/>', {'class': 'cloud'}),
        $('<div/>', {'class': 'snow'}).append(
       $('<div/>', {'class': 'flake'}),
      $('<div/>', {'class': 'flake'})
      )
    )
  )
       } else if (desc === 'clear') {
         $elem.append(
        $('<div/>', {'class': 'icon sunny'}).append(
          $('<div/>', {'class': 'sun'}).append(
          $('<div/>', {'class': 'rays'})
      )
    )
  )
       } else if (desc === 'thunderstorm') {
         $elem.append(
        $('<div/>', {'class': 'icon thunder-storm'}).append(
        $('<div/>', {'class': 'cloud'}),
        $('<div/>', {'class': 'lightning'}).append(
          $('<div/>', {'class': 'bolt'}),
          $('<div/>', {'class': 'bolt'})
          )
      )
  ) 
       } else if (desc === 'mist') {
         $elem.append(
           $('<div/>', {'class': 'icon sun-shower'}).append(
              $('<div/>', {'class': 'cloud'}),
              $('<div/>', {'class': 'sun'}).append(
            $('<div/>', {'class': 'rays'})
           ),
         $('<div/>', {'class': 'rain'})
      )
  ) 
       } */
       $('#weathericon').removeClass('hiddenicon')
       $('#brk').removeClass('hidden')
       $('#brk2').removeClass('hidden')
       $('#day').html(day)
       $('#dateDayYear').html(fullDate)
       $('#city').html("<br>" + result["name"] + ',' + result["sys"]["country"] )
       $('#degrees').html(deg + '° C' )
       $('#humidity').html('Humidity:' + "<br>" + result["main"]["humidity"] + '%')
       $('#highlow').html('High-Low: ' + deghigh + '°' + '-' + deglow + '°')
       $('#wind').html('Wind Speed: ' + "<br>" + result["wind"]["speed"] + 'mph')
       $('#pressure').html('Pressure:' + "<br>" + result["main"]["pressure"] + 'hPa')
       $('#sky').html('Description:  ' + result.weather[0].main)
          function setCelcius(num) {
           return num;
          }
          function setFahrenheit(num) {
            var fah = num * 9/5 + 32;
            return Math.round(fah);
          }
          $(function() {
          $("#celciusfahrenheit").change(function() {
            if ($(this).prop('checked')) {
              $("#degrees").html(setCelcius(deg) + '° C');
              $("#highlow").html('High-Low: ' + setCelcius(deghigh) + '°' + '-' + setCelcius(deglow) + '°')
            } else {
              $("#degrees").html(setFahrenheit(deg) + '° F');
              $("#highlow").html('High-Low: ' + setFahrenheit(deghigh) + '°' + '-' + setFahrenheit(deglow) + '°')
            }
          }) 
          }); 
        });
      }
  });