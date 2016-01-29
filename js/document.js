/**
 * Created by nathandewitte on 20/4/15.
 */

$(window).scroll(function() {

  var scroll = $(this).scrollTop();

  if (scroll>10)
  {
    $('.elephant-banner').addClass("hide-element");
  }
  else
  {
    $('.elephant-banner').removeClass("hide-element");
  }
});