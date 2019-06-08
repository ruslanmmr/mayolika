$(document).ready(function () {
  lazy();
  nav();
  scroll();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth();
//lazy
function lazy() {
  $(".lazy").Lazy({
    visibleOnly: true,
    effect: 'fadeIn',
    effectTime: '300'
  });
}
//nav
function nav() {
  var $navOpen = $('.nav-open'),
    $navClose = $('.nav-close'),
    $nav = $('.nav'),
    $overlay = $('.overlay');

  $navOpen.on('click', function (e) {
    e.preventDefault();
    $nav.toggleClass('active');
    navState();
  })
  $navClose.on('click', function (e) {
    e.preventDefault();
    $nav.removeClass('active');
    navState();
  })
  $overlay.on('click touchstart', function () {
    $nav.removeClass('active');
    navState();
  })
  
  function navState() {
    if ($nav.hasClass('active')) {
      $('.page').addClass('active');
      scrollLock.hide($("body"));
      $overlay.fadeIn(300);
    } else {
      scrollLock.show($("body"));
      $('.header').removeClass('active');
      $('.page').removeClass('active');
      $overlay.fadeOut(300);
    }
  }
}