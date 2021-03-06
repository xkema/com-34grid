window.log = function() {
  log.history = log.history || [];
  log.history.push(arguments);
  if (this.console) {
      var a = arguments;
      a.callee = a.callee.caller;
      a = [].slice.call(a);
      typeof console.log === "object" ? log.apply.call(console.log, console, a) : console.log.apply(console, a)
  }
}
;
(function(a) {
  function c() {}
  for (var d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), b; b = d.pop(); )
      a[b] = a[b] || c
}
)(function() {
  try {
      return console.log(),
      window.console
  } catch (a) {
      return window.console = {}
  }
}());
$(document).ready(function() {
  function b(a) {
      $pane = $("#pattern-preview");
      $pane.data("currentPatternIndex", a.index());
      $pane.filter(":visible").length != 1 && $pane.fadeIn(250);
      $pane.css("background-image", "url(" + a.data("imageUrl").replace('http://', 'https://') + ")");
      $("#pattern-url").attr("href", a.data("url"));
      $("#pattern-url-text").html('<img src="' + a.data("badgeUrl").replace('http://', 'https://') + '">');
      $("#color-1").css("background-color", "#" + a.data("colors")[0]).attr("title", "#" + a.data("colors")[0]);
      $("#color-2").css("background-color", "#" + a.data("colors")[1]).attr("title", "#" + a.data("colors")[1]);
      $("#color-3").css("background-color", "#" + a.data("colors")[2]).attr("title", "#" + a.data("colors")[2]);
      $("#color-4").css("background-color", "#" + a.data("colors")[3]).attr("title", "#" + a.data("colors")[3]);
      $("#color-5").css("background-color", "#" + a.data("colors")[4]).attr("title", "#" + a.data("colors")[4])
  }
  $("#pattern-preview").data("currentPatternIndex", -1);
  $.ajax({
      url: "https://www.colourlovers.com/api/patterns/top?format=json&jsonCallback=?&numResults=100",
      type: "POST",
      dataType: "json",
      error: function(a, b, c) {
          console.log("error:", a, b, c)
      },
      success: function(a) {
          $($(a)).each(function() {
              var a = $('<div class="col_6 pattern-wrapper" style="display: none;"><a href="' + this.url + '" target="_blank" style="background-image: url(' + this.imageUrl.replace('http://', 'https://') + ');">&nbsp;<div class="hover-curtain">click for details</div></a></div>').appendTo("#patterns-holder");
              a.data({
                  apiUrl: this.apiUrl,
                  imageUrl: this.imageUrl,
                  title: this.title,
                  url: this.url,
                  userName: "by " + this.userName,
                  badgeUrl: this.badgeUrl,
                  colors: this.colors
              });
              a.delay(480).fadeIn(1280).click(function() {
                  b($(this));
                  return !1
              })
          })
      }
  });
  $("#close-pane").click(function() {
      $pane = $("#pattern-preview");
      $pane.fadeOut(250);
      return !1
  });
  $(document).keyup(function(a) {
      console.log(a.keyCode);
      $pane = $("#pattern-preview");
      if (a.keyCode == 27) {
          if ($pane.filter(":visible").length == 1)
              return $pane.fadeOut(250),
              !1
      } else if (a.keyCode == 37 || a.keyCode == 38)
          $pane.filter(":visible").length != 1 && $pane.fadeIn(250),
          a = $pane.data("currentPatternIndex") - 1,
          a < 0 && (a = 99),
          $pattern = $($("#patterns-holder .pattern-wrapper").get(a % 100)),
          b($pattern);
      else if (a.keyCode == 39 || a.keyCode == 40)
          $pane.filter(":visible").length != 1 && $pane.fadeIn(250),
          a = $pane.data("currentPatternIndex") + 1,
          $pattern = $($("#patterns-holder .pattern-wrapper").get(a % 100)),
          b($pattern)
  });
  $("#next-pattern, #prev-pattern").click(function() {
      $control = $(this);
      $pane = $("#pattern-preview");
      if ($control.attr("id") == "next-pattern")
          var a = $pane.data("currentPatternIndex") + 1;
      else
          $control.attr("id") == "prev-pattern" && (a = $pane.data("currentPatternIndex") - 1,
          a == -1 && (a = 99));
      $pattern = $($("#patterns-holder .pattern-wrapper").get(a % 100));
      b($pattern)
  })
});
$(window).load(function() {
  $("#spinner").slideUp(420)
});
