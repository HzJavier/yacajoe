$(function() {
    // Countdown
    var pay = new Date();
    var cajoe = false;
    var tmpDate;
    var user = 'Joe' + (Math.floor(Math.random()  * 99 + 1));
    var message = $('#message');
    var videoPlayer = $('#video-player');
    var loader = $('.loader');
    var route = 'http://yacajoe.com:4567';
    var chat = $('.chat-scroll');
    var socket = io('http://0.0.0.0:3000');
    var input = $('.chat-input');
    var chatOpen = true;

    if(pay.getDate() > 15) {
      tmpDate = new Date(pay.getYear() + 1900, pay.getMonth() + 1, 0, 9);
    } else if(pay.getDate() < 16) {
      tmpDate = new Date(pay.getYear() + 1900, pay.getMonth(), 15, 9);
    }
    if(tmpDate.getDay() == 0) tmpDate -= 1000 * 60 * 60 * 24 * 2;
    if(tmpDate.getDay() == 6) tmpDate -= 1000 * 60 * 60 * 24 * 1;
    tmpDate = new Date(tmpDate);

    if(pay.getDate() == tmpDate.getDate()) cajoe = true;
    now = tmpDate;
    $('#timer').countdown(now, function(event) {
    	$(this).find('#days').text(event.offset.totalDays);
    	$(this).find('#hours').text(event.offset.hours);
    });
    $.ajax({
      dataType: 'json',
      url: route
    }).done(function (data) {
      window.setTimeout(function () {
        message.addClass('visible');
        if(cajoe){
          $('#timer').hide();
          $('#legend').hide();
          if(data.cajoe == 'No') {
            message.html('Verificando...');
          } else {
            message.html(data.cajoe);
          }
        }
        if (data.videoSrc !== '') {
          videoPlayer.append('<iframe width="420" height="315" src="https://www.youtube.com/embed/' + data.videoSrc + '" frameborder="0" allowfullscreen></iframe>');
        }
      }, 500);
    });
    socket.on('broadcast', function(from, msg){
        chat.append(formatMessage(from, msg));
    });

    $('.open-chat').on('click', function() {
      var chatPanel = $('.chat-panel');
      if(chatOpen) {
        $('.open-chat').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-left');
        $('.chat').addClass('chat-close');
        $('.inner-bg').removeClass('full-panel');
        chatPanel.hide();
      } else {
        $('.open-chat').removeClass('glyphicon-triangle-left').addClass('glyphicon-triangle-right');
        $('.chat').removeClass('chat-close');
        $('.inner-bg').addClass('full-panel');
        chatPanel.show();
      }
      chatOpen = !chatOpen;
    });

    input.keydown(function(e) {
      if(e.keyCode == 13) {
        sendMessage(input.val());
        input.val('');
      }
    });

    function sendMessage(msg) {
      socket.emit('message', user, msg);
    }
    function formatMessage(from, msg) {
      return "<div class='chat-line'><span class='chat-user'>" + from + ":</span>" + msg + "</div>";
    }
});

