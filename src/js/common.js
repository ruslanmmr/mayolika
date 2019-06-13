$(document).ready(function () {
  lazy();
  scrollInit();
  dropdown();
  search();
  aside();
  filter();
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
$checkbox = $('.checkbox'),
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
  $filterToggle = $('.filter-toggle, .setup-open'),
  $sectionToggle = $('.filter-section__title'),
  $navToggle = $('.nav-toggle');

  //при клике на кнопку каталога
  $catalogueToggle.on('click', function(e) {
    e.preventDefault();
    $('body').toggleClass('catalogue-opened');
    if($('body').hasClass('filter-opened')) {
      $('body').removeClass('filter-opened');
    }
    $scrollContainer.getNiceScroll().resize();
    $(".aside .scroll-container").getNiceScroll().doScrollPos(0,0);
  })

  //при клике на кнопку фильтров
  $filterToggle.on('click', function(e) {
    e.preventDefault();
    if($('body').hasClass('nav-opened')) {}
    else {
      scrollLock.hide($("body"));
      $('body').addClass('nav-opened');
    }
    $('body').toggleClass('filter-opened');
    $scrollContainer.getNiceScroll().resize();
    $(".aside .scroll-container").getNiceScroll().doScrollPos(0,0);
  })

  //при клике на табы фильтров
  $sectionToggle.on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    $scrollContainer.getNiceScroll().resize();
  })

  //при клике на кнопку навигации
  $navToggle.on('click', function(e) {
    e.preventDefault();
    if($('body').hasClass('nav-opened')) {
      scrollLock.show($("body"));
      $('body').removeClass('filter-opened').removeClass('catalogue-opened').removeClass('nav-opened');
    } else {
      scrollLock.hide($("body"));
      $('body').addClass('nav-opened');
    }
  })
  
  //добавление тени при прокрутке
  if(scrollTop>0) {
    $('.aside').addClass('scrolled');
  } else {
    $('.aside').removeClass('scrolled');
  }
  $(window).on('scroll', function() {
    if(scrollTop>0) {
      $('.aside').addClass('scrolled');
    } else {
      $('.aside').removeClass('scrolled');
    }
  })
  
  //закртие навигации при условии изменения ширины монитора
  $(window).resize(function () {
    if(innerWidth>768) {
      $('body').removeClass('filter-opened').removeClass('catalogue-opened').removeClass('nav-opened');
      scrollLock.show($("body"));
    }
  });
}

function filter() {
  var $resetFilter = $('.filter__reset');

  checkboxCheck();
  filterState();

  $(".filter input").on('change', function() {
    filterState();
    checkboxCheck();
    $scrollContainer.getNiceScroll().resize();
  })

  function checkboxCheck() {
    $checkbox.each(function() {
      if($(this).find('input').prop('checked')) {
        $(this).addClass('checked');
      } else {
        $(this).removeClass('checked');
      }
    })
  }
  function filterState() {
    if($('.filter input:checked').length > 0 || $('.filter input').val()) {
      $('.filter').addClass('active');
    } else {
      $('.filter').removeClass('active');
    }
  }

  //при клике на сброс фильтров
  $resetFilter.on('click', function(e) {
    e.preventDefault();
    $('.filter').find('input').val("").prop('checked',false);
    checkboxCheck();
    filterState();
    $('.filter-section').removeClass('active');
    $scrollContainer.getNiceScroll().resize();
  })
}