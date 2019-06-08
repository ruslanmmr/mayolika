$(document).ready(function () {
  lazy();
  nav();
  scrollInit();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});

//global variables
var innerWidth = $('body').innerWidth(),
//scroll-styling
cursorcolorVar = "#C4C4C4",
cursorwidthVar = "15px",
cursorborderVar = "5px solid transparent",
cursorborderradiusVar = "15px",
zindexVar = [100],
bouncescrollVar = false,
$scrollContainer = $('.scroll-container');


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

//scroll
function scrollInit() {
  if ($('html').hasClass('android') || $('html').hasClass('ios')) {

  } else {
    $scrollContainer.niceScroll({
      cursorcolor: cursorcolorVar,
      cursorwidth: cursorwidthVar,
      cursorborder: cursorborderVar,
      cursorborderradius: cursorborderradiusVar,
      zindex: zindexVar,
      bouncescroll: bouncescrollVar,
      autohidemode: true
    });
  }
};