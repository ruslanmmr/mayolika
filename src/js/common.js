$(document).ready(function () {
  lazy();
  nav();
  scrollInit();
  dropdown();
  search();
  aside();
  checkbox();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
});
$(window).on('scroll', function() {
  scrollTop = $(window).scrollTop();
})

//global variables
var innerWidth = $('body').innerWidth(),
scrollTop = $(window).scrollTop(),
//scroll-styling
cursorcolorVar = "transparent",
cursorwidthVar = "15px",
cursorborderVar = "0",
cursorborderradiusVar = "0",
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
  //
  if (scrollTop>0) {
    $('.aside').addClass('scrolled');
  } else {
    $('.aside').removeClass('scrolled');
  }
  
  $(window).on('scroll', function() {
    if (scrollTop>0) {
      $('.aside').addClass('scrolled');
    } else {
      $('.aside').removeClass('scrolled');
    }
  })
}

//scroll
function scrollInit() {
  if ($('html').hasClass('android') || $('html').hasClass('ios')) {

  } else {
    $('body').niceScroll({
      cursorcolor: cursorcolorVar,
      cursorwidth: cursorwidthVar,
      cursorborder: cursorborderVar,
      cursorborderradius: cursorborderradiusVar,
      zindex: zindexVar,
      bouncescroll: bouncescrollVar,
      autohidemode: true
    });
    $scrollContainer.niceScroll(".scroll-wrapper", {
      cursorcolor: cursorcolorVar,
      cursorwidth: cursorwidthVar,
      cursorborder: cursorborderVar,
      cursorborderradius: cursorborderradiusVar,
      zindex: zindexVar,
      bouncescroll: bouncescrollVar,
      autohidemode: "leave",
    });
  }
};

//dropdowns
function dropdown() {
  var $link = $('.dropdown-item__button'),
      $dropdownContainer = $('.dropdown-item__container'),
      $dropdown = $('.dropdown-item'),
      flag;

  $(document).on('click touchstart', function (e) {
    if ($link.is(e.target)) {
      e.preventDefault();
    }
    if (!flag) {
      flag = true;
      setTimeout(function () {
        flag = false;
      }, 300);
      if ((!$dropdownContainer.is(e.target) && $dropdownContainer.has(e.target).length === 0 && !$link.is(e.target) && $dropdown.hasClass('visible')) || ($link.is(e.target) && $(e.target).parents('.dropdown-item').hasClass('visible'))) {
        $dropdown.removeClass('visible');
      } else if ($link.is(e.target)) {
        $dropdown.removeClass('visible');
        $(e.target).parents('.dropdown-item').addClass('visible');
        $scrollContainer.getNiceScroll().resize();
      }
    }
  });
}
//search
function search() {
  var $searchOpen = $('.search-open'),
  $searchClose = $('.search-close'),
  $search = $('.header__search');

  $searchOpen.on('click', function(e) {
    e.preventDefault();
    $search.addClass('visible');
  })
  $searchClose.on('click', function(e) {
    e.preventDefault();
    $search.removeClass('visible');
  })
  $(window).resize(function () {
    if(innerWidth>576) {
      $search.removeClass('visible');
    }
  });
}

//aside
function aside() {
  var $catalogueToggle = $('.catalogue-toggle'),
  $filterToggle = $('.filter-toggle'),
  $sectionToggle = $('.filter-section__title');

  $catalogueToggle.on('click', function(e) {
    e.preventDefault();
    $('.aside').toggleClass('catalogue-opened');
    if($('.aside').hasClass('filter-opened')) {
      $('.aside').removeClass('filter-opened');
    }
    $scrollContainer.getNiceScroll().resize();
    $(".aside .scroll-container").getNiceScroll().doScrollPos(0,0);
  })
  $filterToggle.on('click', function(e) {
    e.preventDefault();
    $('.aside').toggleClass('filter-opened');
    $scrollContainer.getNiceScroll().resize();
    $(".aside .scroll-container").getNiceScroll().doScrollPos(0,0);
  })
  $sectionToggle.on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    $scrollContainer.getNiceScroll().resize();
  })
}

function checkbox() {
  var $checkbox = $('.checkbox');

  $checkbox.on('click', function() {
    if($(this).find('input').prop('checked')) {
      $(this).addClass('checked');
    } else {
      $(this).removeClass('checked');
    }
  })
}