  var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "RobotCaleb", "habathcx"]
  // var url = 'https://wind-bow.gomix.me/twitch-api/channels/freecodecamp?callback=?' 
  function getChannel() {
   channels.forEach(function(channel) {
      function makeURL(type, name) {
         return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
      };
  $.getJSON(makeURL("channels", channel), function(data) {
      $("#" + channel).attr('src',data.logo)
      $("." + channel).html(channel)
      $("#" + channel + '1').attr('href', data.url)
      $(".game" + channel).html('GAME:' + '<br>' + data.game)
      $(".status" + channel).html('STATUS:' + '<br>' + data.status)
    });
  $.getJSON(makeURL("streams",channel), function(data) {
    console.log(data);
    var str1 = 'This user is currently not streaming.';
    if (data.stream === null) {
      $("." + channel).addClass("offline")
      $(".game" + channel).html(str1)
      $('.game' + channel).show();
    } else {
      $("." + channel).addClass("online")
      $(".game" + channel).removeClass('hidden')
      $(".status" + channel).removeClass('hidden')
      }
    });
  });
};
$(document).ready(function() {
  getChannel()
});