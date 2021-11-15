var text;
var names = [];

function reset() {
  setTimeout("$('#go').removeAttr('disabled')", 11005);
  var namesbreak = "";
  if (gup('names') != "") {
    var names = gup('names');
    namesbreak = names.replace(/101/g, '\n');
    namesbreak = namesbreak.replace(/%20/g, ' ');
  } else {
    var names = [];
    for (var i in names) {
      name = names[i];
      if (name == "" || typeof(name) == undefined) {} else {
        namesbreak = namesbreak + name + "\n";
      }
    }
  }
  $("#namesbox").val(namesbreak);
}

function gup(para) {
  para = para.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + para + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null)
    return "";
  else
    return results[1];
}

function randOrd() {
  return (Math.round(Math.random()) - 0.5);
}

function namelist() {
  $("#varnote").hide();
  $('#namesbox').removeAttr('disabled', 'disabled');
  $('#headline').text('Kodları daxil edin');
  $("#popdown").show();
  $("#values").hide();
  $("#names").show();
  $('body').css({
    "overflow-y": "visible"
  });
}

function go() {
  $("#varnote").hide();
  $('body').css({
    "overflow-y": "hidden"
  });
  $('#go').attr('disabled', 'disabled');
  $('#list').attr('disabled', 'disabled');
  $('#headline').slideUp();
  $('#namesbox').slideDown();

  var count = 1;
  count = 1;
  $("div").remove("#result1");
  names = $("#namesbox").val();
  if (document.all) { // IE
    names = names.split("\n");
  } else { //Mozilla
    names = names.split("\n");
  }

  $("#values").show();
  $(".name").show();
  $("#popdown").hide();
  $("div").remove(".name");
  $("div").remove(".extra");

  newtop = names.length * 200 * -1;

  $('#values').css({
    top: +newtop
  });

  //names.sort(randOrd);

  for (var i in names) {
    if (names[i] == "" || typeof(names[i]) == undefined) {
      count = count - 1;
    } else {
      name = names[i];
      $('#values').append('<div id=result' + count + ' class=name>' + name + '</div>');
    }
    count = count + 1;
  }

  for (var i in names) {
    if (names[i] == "" || typeof(names[i]) == undefined) {} else {
      name = names[i];
      $('#values').append('<div class=name>' + name + '</div>');
    }
    count = count + 1;
  }

  for (var i in names) {
    if (names[i] == "" || typeof(names[i]) == undefined) {} else {
      name = names[i];
      $('#values').append('<div class=name>' + name + '</div>');
    }
    count = count + 1;
  }

  text = $('#result1').text()
  $('#values').animate({
    top: '+176'
  }, 5000);
  setTimeout("standout(text)", 5000);
}

function standout(text) {
  $('#result1').removeClass('name');
  $('.name').animate({
    opacity: .25
  });
  $('#result1').animate({
    height: '+=60px'
  });
  $('#result1').append('<div class="extra"><a class="small alert button" href="#" onClick="removevictim();">Kodu siyahıdan çıxart</a></div>');
  $('#go').removeAttr('disabled', 'disabled');
  $('#list').removeAttr('disabled', 'disabled');
  $('#headline').text('TƏBRİKLƏR!');
  $('#headline').slideDown();
}

function removevictim() {
  var nameupdated = "";
  for (var i in names) {
    name = names[i];
    if (name == "" || name == text || typeof(name) == undefined) {} else {
      nameupdated = nameupdated + "\n" + name;
    }
  }
  $('#namesbox').val("");
  $('#namesbox').val(nameupdated);
  $('#result1').html("Sıyahıdan çıxarıldı!");
  $('#result1').fadeOut(1000, function() {
    $("div").remove("#result1");
  });
  $("div").remove(".name");
  $("div").remove(".extra");
  $('#headline').text('Növbəti qalıb üçün "Başla!" düyməsini basın');
}
