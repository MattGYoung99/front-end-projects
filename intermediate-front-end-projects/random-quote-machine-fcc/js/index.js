var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 30;
var minRadius = 2;

var colorArray = [
    '#55C5CB',
    '#0068FF',
    '#D23F47',
    '#089F00',
    '#FFA93A'
];

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy; 
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
        // interactivity 
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
         if (this.radius < maxRadius) {
            this.radius += 1;
         }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i=0;i<500;i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 5) + radius;
        var dx = (Math.random() - 0.5) * 0.5;
        var dy = (Math.random() - 0.5) * 0.5;
        var radius = Math.random() * 3 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
  function animate() {
      requestAnimationFrame(animate);
      c.clearRect(0, 0, innerWidth, innerHeight);
     for (var i=0;i<circleArray.length;i++) {
        circleArray[i].update();
    }
  }
  
  init();
  animate();


$(document).ready(function() {
  $('#newQuote').click(function(){
  $.ajax({
    url: "https://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function(data) {
      $('#both').fadeOut("slow", function() {
      $('#quoteBox').html('"'  + data.quoteText +  '"');
      if (data.quoteAuthor === '') {
        return 'unknown';
      } else {
      $('#authBox').html('-' + data.quoteAuthor);
      }
      $('#both').fadeIn("slow");
    });
    $('#tweetQuote').click(function() {
		var encodedQuote = encodeURIComponent( '"' + data.quoteText + '"' + ' ' + '-' + data.quoteAuthor);
		var tweetUrl = "https://twitter.com/intent/tweet?text=" + encodedQuote;
		window.open(tweetUrl, '_blank');
  });
  }
  });
 });
});