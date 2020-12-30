$(document).ready(function () {
  slider();
  select();
  lazy();
  dropdown();
  search();
  aside();
  inputs();
  gallery();
  moreInfo();
  calculator();
  fancybox();
  designTab();
  descr();
  designForm();
  svg4everybody();
  pageScroll.init();
  $('[name="phone"]').inputmask('+7 (999) 999-99-99', {
    clearIncomplete: true
  });
});

$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  $('img').each(function () {
    imagesResize($(this))
  });
});
$(window).on('scroll', function () {
  scrollTop = $(window).scrollTop();
})


//global variables
var innerWidth = $('body').innerWidth(),
  scrollTop = $(window).scrollTop(),
  //
  Scrollbar = window.Scrollbar,
  scrollbarMain,
  scrollbarsOther = Scrollbar.initAll(),
  //
  $checkbox = $('.checkbox, .radio'),
  $slider = $('.slider'),
  $reset = $('.reset-btn'),
  $input = $('input'),
  $form = $('form'),
  popupCloseTimer,
  //scroll-styling
  cursorcolorVar = "transparent",
  cursorwidthVar = "15px",
  cursorborderVar = "0",
  cursorborderradiusVar = "0",
  zindexVar = [100],
  bouncescrollVar = false,
  $scrollContainer = $('.scroll-container');

//cart message
let $cartMessage = {
  el: $('.cartMessage'),
  timeout: '',
  fadeTime: 2000,
  state: false,
  show: function (t = 'Товар был добавлен в корзину') {
    if (this.state == true) {
      clearTimeout(this.timeout)
    } else {
      this.state = true;
      this.el.fadeIn(200);
    }
    this.timerStart();
    this.el.find('span').text(t);
  },
  fade: function () {
    this.state = false;
    this.el.fadeOut(200);
  },
  timerStart: function () {
    this.timeout = setTimeout(() => {
      this.fade();
    }, this.fadeTime)
  }
}

$.fn.hasAttr = function (name) {
  return this.attr(name) !== undefined;
};

//lazy
function lazy() {
  $(".lazy").Lazy({
    effect: 'show',
    visibleOnly: true,
    effectTime: 0,
    threshold: 500,
    imageBase: false,
    defaultImage: false,
    afterLoad: function (element) {
      imagesResize(element);
    }
  });
}

function imagesResize(element) {
  var box = element.parent();
  if (!box.hasClass('cover-box_size-auto')) {
    var boxH = box.height(),
      boxW = box.width();
    setTimeout(function () {
      var imgH = element.height(),
        imgW = element.width();
      if ((boxW / boxH) >= (imgW / imgH)) {
        element.addClass('ww').removeClass('wh');
      } else {
        element.addClass('wh').removeClass('ww');
      }
      setTimeout(function () {
        element.addClass('visible');
      }, 100)
    }, 100)
  } else {
    element.addClass('visible');
  }
}

//select
(function ($) {
  $.fn.niceSelect = function (method) {
    // Methods
    if (typeof method == 'string') {
      if (method == 'update') {
        this.each(function () {
          var $select = $(this);
          var $dropdown = $(this).next('.nice-select');
          var open = $dropdown.hasClass('open');

          if ($dropdown.length) {
            $dropdown.remove();
            create_nice_select($select);

            if (open) {
              $select.next().trigger('click');
            }
          }
        });
        return this;
      } else if (method == 'destroy') {
        this.each(function () {
          var $select = $(this);
          var $dropdown = $(this).next('.nice-select');

          if ($dropdown.length) {
            $dropdown.remove();
            $select.css('display', '');
          }
        });
        if ($('.nice-select').length == 0) {
          $(document).off('.nice_select');
        }
        return this;
      }
    }

    // Create custom markup
    this.each(function () {
      var $select = $(this);

      if (!$select.next().hasClass('nice-select')) {
        if ($select.parent().hasClass('color-select')) {
          $select.hide();
          create_nice_select($select);
        } else {
          if ($('html').hasClass('desktop')) {
            $select.hide();
            create_nice_select($select);
          } else {
            $select.parent().addClass('mobile-select')
          }
        }
      }
    });

    function create_nice_select($select) {
      $select.after($('<div></div>')
        .addClass('nice-select')
        .addClass($select.attr('class') || '')
        .addClass($select.attr('disabled') ? 'disabled' : '')
        .attr('tabindex', $select.attr('disabled') ? null : '0')
        .html('<span class="current"></span><div class="list scrollbar"></div>')
      );

      var $dropdown = $select.next();
      var $options = $select.find('option');
      var $selected = $select.find('option:selected');

      $dropdown.find('.current').html($selected.data('display') || $selected.html());

      $options.each(function (i) {
        var $option = $(this);
        var display = $option.data('display');
        var $index = $option.index();

        $dropdown.find('.list').append($('<div></div>')
          .attr('data-value', $option.val())
          .attr('data-display', (display || null))
          .addClass('option' +
            ($option.is(':selected') ? ' selected' : '') +
            ($option.is(':disabled') ? ' disabled' : ''))
          .html($option.text())
        );

        if ($select.parent().hasClass('color-select')) {
          let color = $option.data('color');
          if ($option.hasAttr('data-color')) {
            $dropdown.find('.option').eq($index).prepend('<span class="color-label"></span>');
            $dropdown.find('.option').eq($index).find('.color-label').css('background-color', color)
          }
        }
      });

      Scrollbar.init($dropdown[0].querySelector('.list'), {
        damping: 0.1,
        alwaysShowTracks: true
      });

    }

    // Unbind existing events in case that the plugin has been initialized before
    $(document).off('.nice_select');
    // Open/close
    $(document).on('click.nice_select', '.nice-select', function (event) {
      var $dropdown = $(this);

      $('.nice-select').not($dropdown).removeClass('open');
      $dropdown.toggleClass('open');

      if ($dropdown.hasClass('open')) {
        $dropdown.find('.option');
        $dropdown.find('.focus').removeClass('focus');
        $dropdown.find('.selected').addClass('focus');
      } else {
        $dropdown.focus();
      }
    });
    // Close when clicking outside
    $(document).on('click.nice_select', function (event) {
      if ($(event.target).closest('.nice-select').length === 0) {
        $('.nice-select').removeClass('open').find('.option');
      }
    });
    // Option click
    $(document).on('click.nice_select', '.nice-select .option:not(.disabled)', function (event) {
      var $option = $(this);
      var $dropdown = $option.closest('.nice-select');

      $dropdown.find('.selected').removeClass('selected');
      $option.addClass('selected');

      var text = $option.data('display') || $option.html();
      $dropdown.find('.current').html(text);

      $dropdown.prev('select').val($option.data('value')).trigger('change');
    });
    // Keyboard events
    $(document).on('keydown.nice_select', '.nice-select', function (event) {
      var $dropdown = $(this);
      var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

      // Space or Enter
      if (event.keyCode == 32 || event.keyCode == 13) {
        if ($dropdown.hasClass('open')) {
          $focused_option.trigger('click');
        } else {
          $dropdown.trigger('click');
        }
        return false;
        // Down
      } else if (event.keyCode == 40) {
        if (!$dropdown.hasClass('open')) {
          $dropdown.trigger('click');
        } else {
          var $next = $focused_option.nextAll('.option:not(.disabled)').first();
          if ($next.length > 0) {
            $dropdown.find('.focus').removeClass('focus');
            $next.addClass('focus');
          }
        }
        return false;
        // Up
      } else if (event.keyCode == 38) {
        if (!$dropdown.hasClass('open')) {
          $dropdown.trigger('click');
        } else {
          var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
          if ($prev.length > 0) {
            $dropdown.find('.focus').removeClass('focus');
            $prev.addClass('focus');
          }
        }
        return false;
        // Esc
      } else if (event.keyCode == 27) {
        if ($dropdown.hasClass('open')) {
          $dropdown.trigger('click');
        }
        // Tab
      } else if (event.keyCode == 9) {
        if ($dropdown.hasClass('open')) {
          return false;
        }
      }
    });
    return this;
  };

}(jQuery));

function select() {
  $('.select select').niceSelect();
}

let pageScroll = {
  $BtnToTop: $('.button_scroll-top'),
  init: function () {
    //для скролла страницы
    if ($('html').hasClass('desktop')) {
      let scrollY,
        flagInit,
        inScroll = false,
        scrollEvent = true,
        scrollInit = false;

      innerWidth > 992 ? flagInit = true : flagInit = false;

      let updateInterval;

      function initCustomScroll() {
        if (innerWidth > 992 && flagInit == true) {
          if (scrollInit == true) {
            scrollbarMain.destroy();
          }
          flagInit = false;
          scrollbarMain = Scrollbar.init(document.querySelector('.main'), {
            damping: 0.1,
          });
          addEvents();
        } else if (innerWidth <= 992 && flagInit == false) {
          if (scrollInit == true) {
            scrollbarMain.destroy();
          }
          flagInit = true;
          scrollInit = true;
          scrollbarMain = Scrollbar.init(document.querySelector('.main__content'), {
            damping: 0.1,
          });
          addEvents();
        }
      }
      initCustomScroll();
      scrollInit = true;

      $(window).resize(function () {
        initCustomScroll();
      });

      function addEvents() {
        clearInterval(updateInterval)
        updateInterval = setInterval(function () {
          scrollbarMain.update();
        }, 250)
        scrollbarMain.addListener(listener);
        scrollbarMain.track.yAxis.show();

        function listener(status) {
          scrollY = scrollbarMain.offset.y;

          if (scrollEvent == true) {
            scrollEvent = false;
            setTimeout(function () {
              scrollEvent = true;
            }, 500)
            lazy();
          }


          if (!inScroll) {
            scrollY > 200 ? pageScroll.$BtnToTop.fadeIn(200) : pageScroll.$BtnToTop.fadeOut(200);
          }
          (scrollY > 0 && innerWidth <= 992) ? $('.aside').addClass('scrolled'): $('.aside').removeClass('scrolled');
        }
      }

      //click event
      pageScroll.$BtnToTop.on('click', function (e) {
        e.preventDefault();
        inScroll = true;
        pageScroll.$BtnToTop.fadeOut(200);
        scrollbarMain.scrollTo(0, 0, 500);
        setTimeout(function () {
          inScroll = false;
        }, 1000)
      })
    }
    // 
    else {
      $('html, body').css('overflow', 'auto');

      //добавление тени при прокрутке
      if (scrollTop > 0) {
        $('.aside').addClass('scrolled');
      } else {
        $('.aside').removeClass('scrolled');
      }

      $(window).on('scroll', function () {

        if (scrollTop > 0) {
          $('.aside').addClass('scrolled');
        } else {
          $('.aside').removeClass('scrolled');
        }
        if (!$('html').hasClass('in-scroll')) {
          if (scrollTop > 200) {
            pageScroll.$BtnToTop.fadeIn(200);
          } else {
            pageScroll.$BtnToTop.fadeOut(200);
          }
        }
      })

      pageScroll.$BtnToTop.on('click', function (e) {
        e.preventDefault();
        $('html').addClass('in-scroll');
        pageScroll.$BtnToTop.fadeOut(200);
        $("html, body").animate({
          scrollTop: 0
        }, 500);
        setTimeout(function () {
          $('html').removeClass('in-scroll')
        }, 1000)
      })

    }
  },
  scrollTo: function (block) {
    let h,
      ph;

    if ($('html').hasClass('desktop')) {
      h = block.offset().top - 20;
      ph = $('.main .scroll-content').offset().top;
      console.log(ph, h)
      scrollbarMain.scrollTo(0, -(ph - h), 500);
    } else {
      if (innerWidth <= 992) {
        h = block.offset().top - 80;
      } else {
        h = block.offset().top - 20;
      }
      $("html, body").animate({
        scrollTop: h
      }, 500);
    }
  }
}

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
      }
    }
  });
}
//search
function search() {
  var $searchOpen = $('.search-open'),
    $searchClose = $('.search-close'),
    $search = $('.header__search');

  $searchOpen.on('click', function (e) {
    e.preventDefault();
    $search.show();
  })
  $searchClose.on('click', function (e) {
    e.preventDefault();
    $search.hide();
  })
  $(window).resize(function () {
    if (innerWidth > 576) {
      $search.show(300);
    }
  });
}

//aside
function aside() {
  var $catalogueToggle = $('.catalogue-toggle'),
    $filterToggle = $('.filter-toggle'),
    $setupOpen = $('.setup-open'),
    $sectionToggle = $('.filter-section__title'),
    $navToggle = $('.nav-toggle, .show-catalogue-btn');

  setInterval(function () {
    $('.aside__nav').height($('.aside__content').height() - $('.aside__buttons').height())
  }, 50)

  //при клике на кнопку каталога
  $catalogueToggle.on('click', function (e) {
    e.preventDefault();
    $('html').toggleClass('catalogue-opened');
    if ($('html').hasClass('filter-opened')) {
      $('html').removeClass('filter-opened');
    }
  })

  //при клике на кнопку фильтров
  $filterToggle.on('click', function (e) {
    e.preventDefault();
    if (!$('html').hasClass('nav-opened')) {
      scrollLock.hide($("body"));
      $('html').addClass('nav-opened');
    }
    $('html').toggleClass('filter-opened');
  })

  $setupOpen.on('click', function (e) {
    e.preventDefault();
    scrollLock.hide($("body"));
    $('html').addClass('nav-opened').addClass('filter-opened');
  })

  //при клике на табы фильтров
  $sectionToggle.on('click', function (e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
    scrollbarsOther[2].update();
  })

  //при клике на кнопку навигации
  $navToggle.on('click', function (e) {
    e.preventDefault();
    $('aside').removeClass('filtered');

    if ($('html').hasClass('nav-opened')) {
      scrollLock.show($("body"));
      $('html').removeClass('filter-opened').removeClass('catalogue-opened').removeClass('nav-opened');
    } else {
      scrollLock.hide($("body"));
      $('html').addClass('nav-opened');
    }
  })

  //закртие навигации при условии изменения ширины монитора
  $(window).resize(function () {
    if (innerWidth > 992) {
      $('body').removeClass('filter-opened').removeClass('catalogue-opened').removeClass('nav-opened');
      scrollLock.show($("body"));
    }
  });

  $reset.on('click', function () {
    scrollbarsOther[2].scrollTo(0, 0, 1000);
  })
}

function numChange(target) {
  target.val(target.val()
    .replace(/[^\d,.]*/g, '')
    .replace(/([,.])[,.]+/g, '$1')
    .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1')
  )
}

function checkboxCheck() {
  $checkbox.each(function () {
    if ($(this).find('input').prop('disabled')) {
      $(this).addClass('disabled');
    } else {
      $(this).removeClass('disabled');
    }
    if ($(this).find('input').prop('checked')) {
      $(this).addClass('checked');
    } else if ($('#' + $(this).attr('for')).prop('checked')) {
      $(this).addClass('checked');
    } else {
      $(this).removeClass('checked');
    }
  })
}

//sliders
function slider() {
  let prevArrow = '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.998 5.613"><path stroke="none" d="M4.416 0L0 4.582l1.07 1.03L4.454 2.1l3.513 3.386 1.03-1.07z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button>',
    nextArrow = '<button class="slick-next slick-arrow" aria-label="Next" type="button"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.998 5.613"><path stroke="none" d="M4.416 0L0 4.582l1.07 1.03L4.454 2.1l3.513 3.386 1.03-1.07z" clip-rule="evenodd" fill-rule="evenodd"></path></svg></button>';

  $slider.on('init', function () {
    $(this).addClass('visible');
  });

  $slider.each(function () {
    $(this).on('init reInit beforeChange afterChange', function () {
      lazy();
    });

    var slideCount = 1,
      slideCount1200 = 1,
      slideCount992 = 1,
      slideCount768 = 1,
      slideCount576 = 1,
      slideCount420 = 1,
      sliderSpeed = 300,
      arrows = true,
      dots = false,
      autoplayVar = false,
      centerMode = false,
      adaptiveHeight = false,
      fadeVar = false;

    if ($(this).hasClass('main-banner__slider')) {
      fadeVar = true;
      autoplayVar = true;
    }
    if ($(this).hasClass('interesting-items__slider')) {
      slideCount1200 = 3,
        slideCount992 = 3,
        slideCount768 = 2,
        slideCount576 = 1,
        slideCount = 4;
    }
    if ($(this).hasClass('product-slider')) {
      arrows = false,
        fadeVar = true
    }
    if ($(this).hasClass('design-tab__slider')) {
      fadeVar = true;
    }

    $(this).slick({
      infinite: true,
      dots: dots,
      arrows: arrows,
      speed: sliderSpeed,
      lazyLoad: 'ondemand',
      adaptiveHeight: adaptiveHeight,
      centerMode: centerMode,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      fade: fadeVar,
      autoplay: autoplayVar,
      autoplaySpeed: 7000,
      prevArrow: prevArrow,
      nextArrow: nextArrow,
      responsive: [{
          breakpoint: 1201,
          settings: {
            slidesToShow: slideCount1200,
            slidesToScroll: slideCount1200,
          }
        },
        {
          breakpoint: 993,
          settings: {
            slidesToShow: slideCount992,
            slidesToScroll: slideCount992,
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: slideCount768,
            slidesToScroll: slideCount768,
          }
        },
        {
          breakpoint: 577,
          settings: {
            slidesToShow: slideCount576,
            slidesToScroll: slideCount576,
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: slideCount420,
            slidesToScroll: slideCount420,
          }
        }
      ]
    });
  });
}

//gallery
function gallery() {
  var $gallery = $('.product-slider'),
    $galleryLink = $('.product-slider-nav__item a'),
    activeSlide;

  $gallery.on('swipe beforeChange', function (event, slick, currentSlide, nextSlide) {
    setTimeout(function () {
      pag();
    }, 300)
  });

  $galleryLink.on('click', function (event) {
    event.preventDefault();
    var index = $(this).parent().index();
    $gallery.slick('slickGoTo', index);
    pag();
  });

  //custom pagination
  function pag() {
    activeSlide = $gallery.find('.slick-active').index();
    $galleryLink.removeClass('active');
    $('.product-slider-nav__item').eq(activeSlide).find($galleryLink).addClass('active');
  }
}

function designTab() {
  var $tabItem = $('.design-tab'),
    $tabLink = $('.design-info__nav-item .button');

  $tabItem.not(':first-child').hide();

  $tabLink.on('click', function (e) {
    e.preventDefault();
    var index = $(this).parent().index();
    $tabLink.removeClass('active');
    $(this).addClass('active');
    $tabItem.hide().eq(index).fadeIn(300);
    lazy();
  })

}

function designForm() {
  var $roomTabLink = $('.design-form__head-section .content'),
    $roomTabItem = $('.design-form__tab'),
    $stateToggleBtn = $('.design-form__toggle-section .button'),
    index = 0;

  tabChange(index)

  $roomTabLink.on('click', function (e) {
    e.preventDefault();
    index = $(this).parent().index();
    $roomTabLink.removeClass('active');
    tabChange(index)
  })
  $stateToggleBtn.on('click', function (e) {
    e.preventDefault();
    $stateToggleBtn.removeClass('active');
    $(this).addClass('active');
    if ($(this).hasClass('button_toggle_state2')) {
      $('.design-form__brand').show();
      $('.design-form__block_style').addClass('active');
      $('.design-form__block_style').find('input').prop('disabled', false);
      $('.design-form__block_style').find('textarea').val('').prop('disabled', false);
    } else {
      $('.design-form__brand').hide();
      $('.design-form__block_style').removeClass('active');
      $('.design-form__block_style').find('input').prop('checked', false).prop('disabled', true);
      $('.design-form__block_style').find('textarea').val('').prop('disabled', true);
      checkboxCheck();
    }
  })

  function tabChange(index) {
    $roomTabLink.removeClass('active');
    $roomTabLink.parent().eq(index).find($roomTabLink).addClass('active');
    $roomTabItem.removeClass('active');
    $roomTabItem.find('input').prop('checked', false).prop('disabled', true);
    $roomTabItem.eq(index).find('input').prop('disabled', false);
    $roomTabItem.eq(index).addClass('active');
    checkboxCheck();
  }



}

function moreInfo() {
  let $buttonToggle = $('.product-head__item .button-toggle'),
    $this;

  $buttonToggle.on('click', function (event) {
    event.preventDefault();
    $this = $(this);

    $this.parents('.product-head__item').find('.product-head__more-info').toggleClass('active');

    Scrollbar.get($this.parents('.product-head__item').find('.scrollbar'))
  })
}

//calcutor
function calculator() {
  var controlClass = 'product-calculator__control',
    toggleClass = 'product-calculator__js-toggle',
    inputClass = 'product-calculator__value-input',
    timerToHold,
    hold = false,
    counter,
    interval,
    flagStart = false,
    flagEnd = false;

  calc();

  $(document).on('touchstart touchend mousedown mouseup change click input mouseout', '.product-calculator', function (e) {
    var $target = $(e.target),
      $block = $(this);

    //если жмем плюс или минус
    if ($(e.target).hasClass(controlClass) || $(e.target).parents('.' + controlClass).length > 0) {
      $target = $(e.target).closest('.' + controlClass);
      if ($target.hasClass('product-calculator__plus')) {
        clickProcessing('increase');
      } else {
        clickProcessing('reduce');
      }
      //
      function clickProcessing(actionType) {
        if (e.type == 'mousedown' || e.type == 'touchstart') {
          if (!flagStart) {
            flagStart = true;

            timerToHold = setTimeout(function () {
              hold = true;
              counter = 150;

              var myFunction = function () {
                if (counter > 45) {
                  counter = counter - 5;
                }
                interval = setTimeout(myFunction, counter);
                actionProcessing($block, actionType);
                actionProcessing($block, 'calculatePrice');
              }
              interval = setTimeout(myFunction, counter);
            }, 300)
          }
        } else if (e.type == 'mouseup' || e.type == 'touchend') {
          if (!flagEnd) {
            flagEnd = true;
            setTimeout(function () {
              flagEnd = false;
              flagStart = false
            }, 100);

            timerToHold = clearTimeout(timerToHold);
            setTimeout(function () {
              timerToHold = clearTimeout(timerToHold);
            }, 50);
            interval = clearTimeout(interval);
            if (hold == true) {
              hold = false;
            } else {
              actionProcessing($block, actionType);
              actionProcessing($block, 'calculatePrice');
            }
          }
        }
      }
    }
    //если меняем велечину
    else if ($(e.target).hasClass(toggleClass) || $(e.target).parents('.' + toggleClass).length > 0) {
      $(e.target).closest('.' + toggleClass);
      $target = $(e.target).closest('.' + toggleClass);
      if ($block.hasClass('product-calculator_tile')) {
        if (e.type == 'click') {
          if ($target.hasClass('product-calculator__js-toggle_switch')) {
            $block.toggleClass('product-calculator_js-count-calc');
            actionProcessing($block, 'measureChange');
          } else if ($target.hasClass('product-calculator__js-toggle_square')) {
            $block.removeClass('product-calculator_js-count-calc');
            actionProcessing($block, 'measureChange');
          } else if ($target.hasClass('product-calculator__js-toggle_count')) {
            $block.addClass('product-calculator_js-count-calc');
            actionProcessing($block, 'measureChange');
          }
        }
      }
    }
    //если ввод инпут
    else if ($(e.target).hasClass(inputClass) || $(e.target).parents('.' + inputClass).length > 0) {
      $(e.target).closest('.' + inputClass);
      $target = $(e.target).closest('.' + inputClass);
      if (e.type == 'input') {
        actionProcessing($block, 'calculationTile');
        actionProcessing($block, 'calculatePrice');
      } else if (e.type == 'change' || e.type == 'mouseout') {
        $target.blur();
        actionProcessing($block, 'adjustment');
        actionProcessing($block, 'calculatePrice');
      }
    }
  })
}

function calc() {
  $('.product-calculator').each(function () {
    var $block = $(this);
    actionProcessing($block, 'adjustment');
    actionProcessing($block, 'calculatePrice');
  })
}

function priceCorrecting(number, decimals) {
  let i, j, kw, kd, km;
  i = parseInt(number = (+number || 0).toFixed(decimals)) + '';
  ((j = i.length) > 3) ? (j = j % 3) : (j = 0)
  km = j ? i.substr(0, j) + ' ' : '';
  kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ' ');
  kd = (decimals ? '.' + Math.abs(number - i).toFixed(decimals).replace(/-/, '0').slice(2) : '');
  return (km + kw + kd).replace(/(0+)$/, '').replace(/[^0-9]$/, '');
}

//calc processing
function actionProcessing($block, operation) {
  {
    var $price = $block.closest('.product-item').find('.product-price-item span'),
      $input = $block.find('.product-calculator__value-input'),
      $hiddenInput = $block.find('.product-calculator__count-input'),
      hiddenInputVal = parseFloat(+$hiddenInput.val()),
      frontInputVal = parseFloat(+$input.val()),
      tileSquare = parseFloat($hiddenInput.data('square')),
      minCount = parseFloat($hiddenInput.data('mincount')),
      price = parseFloat($hiddenInput.data('price'));

    if (operation == 'increase') {
      $hiddenInput.val(hiddenInputVal + 1).trigger('change');
      hiddenInputVal = parseFloat(+$hiddenInput.val());

      if ($block.hasClass('product-calculator_js-count-calc')) {
        $input.val(hiddenInputVal);
      } else {
        $input.val(parseFloat((hiddenInputVal * tileSquare).toFixed(4)));
      }
    } else if (operation == 'reduce') {
      if (hiddenInputVal > minCount) {
        $hiddenInput.val(hiddenInputVal - 1).trigger('change');
        hiddenInputVal = parseFloat(+$hiddenInput.val());

        if ($block.hasClass('product-calculator_js-count-calc')) {
          $input.val(hiddenInputVal);
        } else {
          $input.val(parseFloat((hiddenInputVal * tileSquare).toFixed(4)));
        }
      } // переключение
    } else if (operation == 'measureChange') {
      if ($block.hasClass('product-calculator_js-count-calc')) {
        $input.val(hiddenInputVal);
      } else {
        $input.val(parseFloat((hiddenInputVal * tileSquare).toFixed(4)));
      }
    } else if (operation == 'calculatePrice') {
      if ($block.hasClass('product-calculator_tile')) {
        $price.text(priceCorrecting((price * tileSquare * hiddenInputVal), '2'))
      } else {
        $price.text(priceCorrecting((hiddenInputVal * price), '2'))
      }
    } else if (operation == 'adjustment') {
      if (minCount > hiddenInputVal) {
        $hiddenInput.val(minCount).trigger('change');
        if ($block.hasClass('product-calculator_js-count-calc')) {
          $input.val(minCount);
        } else {
          $input.val(parseFloat((minCount * tileSquare).toFixed(4)));
        }
      } else {
        if ($block.hasClass('product-calculator_js-count-calc')) {
          $input.val(hiddenInputVal);
        } else {
          $input.val(parseFloat((hiddenInputVal * tileSquare).toFixed(4)));
        }
      }
    } else if (operation == 'calculationTile') {
      if ($block.hasClass('product-calculator_js-count-calc')) {
        $hiddenInput.val(Math.ceil(frontInputVal));
        if ($hiddenInput.val() >= minCount) {
          $hiddenInput.trigger('change');
        }
      } else {
        $hiddenInput.val(Math.ceil(frontInputVal / tileSquare));
        if ($hiddenInput.val() >= minCount) {
          $hiddenInput.trigger('change');
        }
      }
    }
  }
}

//popup
function fancybox() {
  $.fancybox.defaults.btnTpl.close = '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.6 13.6"><path d="M6.8 5.4L1.4 0 0 1.4l5.4 5.4L0 12.2l1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4L12.2 0z"></path></svg>' +
    "</button>";
  $.fancybox.defaults.btnTpl.arrowLeft = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}">' +
    '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10.14"><path d="M6.28 8.77l-1.34 1.37L0 5.07 4.94 0l1.34 1.38L3.6 4.1H14v1.94H3.6z"></path></svg></div>' +
    "</button>";
  $.fancybox.defaults.btnTpl.arrowRight = '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_right" title="{{PREV}}">' +
    '<div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 10.14"><path d="M10.4 6.04L7.72 8.76l1.34 1.38L14 5.07 9.06 0 7.72 1.38 10.4 4.1H0v1.94z"></path></svg></div>' +
    "</button>";
  $.fancybox.defaults.btnTpl.zoom = '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.056 14.096"> <path d="M13.756 12.356l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zm-10.6-3.5a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"></path> </svg>' +
    "</button>";
  $.fancybox.defaults.btnTpl.download = '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.24 14"> <path d="M13.24 12.09V14H0v-1.91zm-2.97-6.96l1.35 1.32-5 4.87-5-4.87 1.36-1.32 2.68 2.64V0h1.92v7.77z"></path> </svg>' +
    "</a>";
  $.fancybox.defaults.btnTpl.slideShow = '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 13.2"> <path d="M0 0v13.2l11-6.6z"></path></svg>' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.35 12.5" id="slideshow"><path d="M0 0h2.2v12.5H0zm5.15 0h2.2v12.5h-2.2z"></path></svg>' +
    "</button>";
  $.fancybox.defaults.btnTpl.smallBtn = '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.6 13.6"><path d="M6.8 5.4L1.4 0 0 1.4l5.4 5.4L0 12.2l1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4L12.2 0z"></path></svg>' +
    "</button>";
  $.fancybox.defaults.btnTpl.thumbs = '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' +
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.7 12.7" id="slideshow"><path d="M8.94 8.94h3.76v3.76H8.94zm-4.47 0h3.76v3.76H4.47zM0 8.94h3.76v3.76H0zm8.94-4.47h3.76v3.76H8.94zm-4.47 0h3.76v3.76H4.47zM0 4.47h3.76v3.76H0zM8.94 0h3.76v3.76H8.94zM4.47 0h3.76v3.76H4.47zM0 0h3.76v3.76H0z"></path></svg>' +
    "</button>";
  $.fancybox.defaults.i18n.ru = {
    CLOSE: 'Закрыть',
    NEXT: 'Следующий слайд',
    PREV: 'Предидущий слайд',
    ERROR: 'Ошибка загрузки, попробуйте позже.',
    PLAY_START: 'Запустить слайд-шоу',
    PLAY_STOP: 'Остановить слайд-шоу',
    FULL_SCREEN: 'Полноэкранный режим',
    THUMBS: 'Миниатюры',
    DOWNLOAD: 'Загрузить',
    SHARE: 'Поделиться',
    ZOOM: 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.autoFocus = false;

  $(document).on('afterShow.fb', function (e, instance, slide) {
    var $pano = $('.panorama');
    if ($pano.length > 0) {
      var path = slide.$thumb.prevObject[0].dataset.pano,
        c = document.getElementById("pano");
      Ceramic3DPanorama(c, '', path);
    }
  });

}


//inputs
function inputs() {
  checkboxCheck();
  filterState();

  $input.on('change', function () {
    checkboxCheck();
    filterState();
  })

  $(document).on('input change click', '.js-validation', function (e) {
    var $target = $(e.target);

    //только цифры, и '.'
    if ($target.hasClass('js-validation_num-only')) {
      $target.val($target.val()
        .replace(/[^\d,.]*/g, '')
        .replace(/([,.])[,.]+/g, '$1')
        .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1'))
    }

    //условие для файлов
    else if ($target.hasClass('js-validation_file')) {
      if ($(this).val() != '') {
        $(this).parents('.input-box').find('.label-loaded').remove();
        $(this).parents('.input-box').prepend('<span class="label-loaded">План помещения успешно загружен!</span>');
      }
    }

  });



  $reset.on('click', function () {
    setTimeout(function () {
      checkboxCheck();
      filterState();
    }, 100)
  });

  function filterState() {
    $form.each(function () {
      if ($(this).find($reset).length) {
        if ($(this).find('input:checked').length > 0 || $(this).find('input').val()) {
          $(this).find($reset).prop('disabled', false);
        } else {
          $reset.prop('disabled', true);
        }
      }
    })
  }
}

function descr() {
  let $container = $('.product-head__description'),
    $content = $('.product-head__description .content'),
    $btn = $('.product-head__more-btn'),
    showText = $btn.find('.link').data('show-text'),
    hideText = $btn.find('.link').data('hide-text'),
    maxh,
    hc
  if ($container.length > 0) {
    maxh = $container.height() + 10;

    function check() {
      hc = $content.height();
      if (hc > maxh) {
        $btn.show();
      } else {
        $btn.hide();
      }
      if ($container.hasClass('active')) {
        $(this).css('height', hc + 5)
      }
    }
    check();

    $(window).resize(function () {
      check();
    });

    $btn.find('.link').on('click', function (event) {
      event.preventDefault();
      toggleNav()
    })

    function toggleNav() {
      if (!$container.hasClass('active')) {
        $container.addClass('active');
        $container.css('height', hc + 5);
        $btn.find('.link').addClass('active');
        $btn.find('.link').text(hideText);
      } else {
        $container.removeClass('active');
        $container.css('height', maxh);
        $btn.find('.link').removeClass('active');
        $btn.find('.link').text(showText);
      }
    }

  }
}
