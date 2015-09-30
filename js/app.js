$(function() {
    // Countdown
    var now = new Date();
    var countTo = 15 * 24 * 60 * 60 * 1000 + now.valueOf();
    $('.timer').countdown(countTo, function(event) {
    	$(this).find('.days').text(event.offset.totalDays);
    	$(this).find('.hours').text(event.offset.hours);
    	$(this).find('.minutes').text(event.offset.minutes);
    	$(this).find('.seconds').text(event.offset.seconds);
    });

    var el = $('#message');
    var videoPlayer = $('#video-player');
    var loader = $('.loader');
    var route = 'http://localhost:4567';
    $.ajax({
      dataType: 'json',
      url: route
    }). done(function (data) {
      window.setTimeout(function () {
        el.addClass('visible');
        el.html(data.cajoe);

        if (data.videoSrc !== '') {
          videoPlayer.append('<iframe width="420" height="315" src="https://www.youtube.com/embed/' + data.videoSrc + '" frameborder="0" allowfullscreen></iframe>');
          $('#legend').hide();
          $('#timer').hide();
        }
      }, 500);
    });
});

