$(document).ready(function () {
  lazy();
  scrollInit();
  dropdown();
  search();
  aside();
  inputs();
  slider();
  scrollBtnTop();
  select();
  gallery();
  moreInfo();
  calculator();
  fancybox();
  validation();
});
$(window).resize(function () {
  innerWidth = $('body').innerWidth();
  imagesResize();
});
$(window).on('scroll', function() {
  scrollTop = $(window).scrollTop();
  scrollBtnTop();
})

//global variables
var innerWidth = $('body').innerWidth(),
scrollTop = $(window).scrollTop(),
$checkbox = $('.checkbox'),
$slider = $('.slider'),
popupCloseTimer,
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
    effect: 'fadeIn',
    visibleOnly: true,
    effectTime: 300,
    threshold: 0,
    imageBase: false,
    defaultImage: false,
    afterLoad: function(element) {
      var box = $(element).parent(),
        boxH = box.height(),
        boxW = box.width(),
        imgH = element.height(),
        imgW = element.width();

        if ((boxW / boxH) >= (imgW / imgH)) {
          element.addClass('ww').removeClass('wh');
        } else {
          element.addClass('wh').removeClass('ww');
        }

        element.addClass('visible');
    }
  });
}

//scrollTop
function scrollBtnTop() {
  var $btn = $('.button_scroll-top');
  if(scrollTop>200) {
    $btn.fadeIn();
  } else {
    $btn.fadeOut();
  }
}

function imagesResize() {
  setTimeout(function() {
    $('img.visible').each(function() {
      var box = $(this).parent(),
      boxH = box.height(),
      boxW = box.width(),
      imgH = $(this).height(),
      imgW = $(this).width();
  
      if ((boxW / boxH) >= (imgW / imgH)) {
        $(this).addClass('ww').removeClass('wh');
      } else {
        $(this).addClass('wh').removeClass('ww');
      }
    })
  }, 100)
}

//select
function select() {
  if ($('html').hasClass('android') || $('html').hasClass('ios')) {
    return;
  } else {
    $('.select').niceSelect();
  }
}
//scroll
function scrollInit() {
  $scrollContainer.niceScroll(".scroll-wrapper", {
    cursorcolor: cursorcolorVar,
    cursorwidth: cursorwidthVar,
    cursorborder: cursorborderVar,
    cursorborderradius: cursorborderradiusVar,
    zindex: zindexVar,
    bouncescroll: bouncescrollVar,
    autohidemode: "leave",
  });
  var timerId = setInterval(function() {
    $scrollContainer.getNiceScroll().resize();
  }, 50);
  
  if ($('html').hasClass('desktop')) {
    $('body').niceScroll({
      cursorcolor: cursorcolorVar,
      cursorwidth: cursorwidthVar,
      cursorborder: cursorborderVar,
      cursorborderradius: cursorborderradiusVar,
      zindex: zindexVar,
      bouncescroll: bouncescrollVar,
      autohidemode: true
    });
    var timerId = setInterval(function() {
      $('body').getNiceScroll().resize();
    }, 50);

    $(".button_scroll-top").on('click', function(e) {
      e.preventDefault();
      $('body').getNiceScroll().doScrollPos(0,0);
    })
  } else {
    $('html, body').css('overflow', 'auto');
    $(".button_scroll-top").on('click', function(e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, 500);
    })
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
    $('html').toggleClass('catalogue-opened');
    if($('html').hasClass('filter-opened')) {
      $('html').removeClass('filter-opened');
    }
    $(".aside .scroll-container").getNiceScroll().doScrollPos(0,0);
  })

  //при клике на кнопку фильтров
  $filterToggle.on('click', function(e) {
    e.preventDefault();
    if(!$('html').hasClass('nav-opened')) {
      scrollLock.hide($("body"));
      $('html').addClass('nav-opened');
    }
    $('html').toggleClass('filter-opened');
    $(".aside .scroll-container").getNiceScroll().doScrollPos(0,0);
  })

  //при клике на табы фильтров
  $sectionToggle.on('click', function(e) {
    e.preventDefault();
    $(this).parent().toggleClass('active');
  })

  //при клике на кнопку навигации
  $navToggle.on('click', function(e) {
    e.preventDefault();
    if($('html').hasClass('nav-opened')) {
      scrollLock.show($("body"));
      $('html').removeClass('filter-opened').removeClass('catalogue-opened').removeClass('nav-opened');
    } else {
      scrollLock.hide($("body"));
      $('html').addClass('nav-opened');
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
    if(innerWidth>992) {
      $('body').removeClass('filter-opened').removeClass('catalogue-opened').removeClass('nav-opened');
      scrollLock.show($("body"));
    }
  });
}


//checkboses
function inputs() {
  var $reset = $('.form-reset-btn'),
  $input = $('input'),
  $form = $('form');

  checkboxCheck();
  filterState();

  $input.on('change', function() {
    checkboxCheck();
    filterState();
  })

  $reset.on('click', function() {
    setTimeout(function() {
      checkboxCheck();
      filterState();
    }, 100)
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
    $form.each(function() {
      if($(this).find($reset).length) {
        if($(this).find('input:checked').length > 0 || $(this).find('input').val()) {
          $(this).find($reset).prop('disabled', false);
        } else {
          $reset.prop('disabled', true);
        }
      }
    })
  }
}

//sliders
function slider() {
  $slider.on('init', function () {
    $(this).addClass('visible');
  });

  $slider.each(function () {
    $(this).on('init reInit afterChange', function(){
      lazy();
    });

    var slideCount = 1,
      slideCount1200 = 1,
      slideCount992 = 1,
      slideCount768 = 1,
      slideCount576 = 1,
      slideCount420 = 1,
      sliderSpeed = 400,
      arrows = true,
      dots = false,
      autoplayVar = false,
      centerMode = false,
      adaptiveHeight = false,
      fadeVar = false;

    if ($(this).hasClass('main-slider__slider')) {
      fadeVar = true,
      autoplayVar = true;
    }
    if ($(this).hasClass('interesting-items__slider')) {
      slideCount1200 = 3,
      slideCount992 = 3,
      slideCount768 = 2,
      slideCount576 = 1,
      slideCount = 4;
    }
    if ($(this).hasClass('gallery-slider')) {
      arrows = false,
      fadeVar = true
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
      autoplaySpeed: 3000,
      prevArrow: '<button class="slick-prev slick-arrow" aria-label="Previous" type="button"><svg class="icon"><use xlink:href="img/icons/icons-sprite.svg#icon18"></use></svg></button>',
      nextArrow: '<button class="slick-next slick-arrow" aria-label="Previous" type="button"><svg class="icon"><use xlink:href="img/icons/icons-sprite.svg#icon18"></use></svg></button>',
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
  var $gallery = $('.gallery-slider'),
    $galleryLink = $('.gallery-nav__link'),
    activeSlide;

    $gallery.on('swipe beforeChange', function(event, slick, currentSlide, nextSlide){
      setTimeout(function() {
        pag();
      }, 400)
    });

  $galleryLink.on('click', function(event) {
    event.preventDefault();
    var index = $(this).parent().index();
    $gallery.slick('slickGoTo', index);
    pag();
  });

  //custom pagination
  function pag() {
    activeSlide = $gallery.find('.slick-active').index();
    $galleryLink.removeClass('active');
    $('.gallery-nav__item').eq(activeSlide).find($galleryLink).addClass('active');
  }
}

//more 
function moreInfo() {
  var $buttonToggle = $('.product-head__item .button-toggle');

  $buttonToggle.on('click', function(event) {
    event.preventDefault();
    $(this).parents('.product-head__item').find('.product-head__more-info').toggleClass('active');
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

  $('.product-calculator').each(function() {
    var $block = $(this);
    actionProcessing($block, 'adjustment');
    actionProcessing($block, 'calculatePrice');
    actionProcessing($block, 'totalPrice');
  })


  $('.product-calculator').find('.product-calculator__value-input').on('change', function() {
    //var $block = $(this).parents('.product-calculator');
    //actionProcessing($block, 'adjustment');
    //actionProcessing($block, 'calculatePrice');
  })

  $(document).on('touchstart touchend mousedown mouseup click input mouseout', '.product-calculator', function(e) {
    var $target = $(e.target),
        $block = $(this);
    
    //если жмем плюс или минус
    if($(e.target).hasClass(controlClass) || $(e.target).parents('.' + controlClass).length > 0) {
      $target = $(e.target).closest('.' + controlClass);
      if ($target.hasClass('product-calculator__plus')) {
        clickProcessing('increase');
      }
      else {
        clickProcessing('reduce');
      }
      //
      function clickProcessing(actionType) {
        if(e.type == 'mousedown' || e.type == 'touchstart') {
          if (!flagStart) {
            flagStart = true;

            timerToHold = setTimeout(function() {
              hold = true;
              counter = 150;

              var myFunction = function() {
                if(counter > 45) {
                  counter = counter - 5;
                }
                interval = setTimeout(myFunction, counter);
                actionProcessing($block, actionType);
                actionProcessing($block, 'calculatePrice');
                actionProcessing($block, 'totalPrice');
              }
              interval = setTimeout(myFunction, counter);
            }, 300)
          }
        }
        else if(e.type == 'mouseup' || e.type == 'touchend') {
          if (!flagEnd) {
            flagEnd = true;
            setTimeout(function(){ flagEnd = false; flagStart = false }, 100);

            timerToHold = clearTimeout(timerToHold);
            setTimeout(function(){ timerToHold = clearTimeout(timerToHold); }, 50);
            interval = clearTimeout(interval);
            if(hold == true) {
              hold = false;
            } else {
              actionProcessing($block, actionType);
              actionProcessing($block, 'calculatePrice');
              actionProcessing($block, 'totalPrice');
            }
          }
        }
      }
    }
    //если меняем велечину
    else if($(e.target).hasClass(toggleClass) || $(e.target).parents('.' + toggleClass).length > 0) {
      $(e.target).closest('.' + toggleClass);
      $target = $(e.target).closest('.' + toggleClass);
      if($block.hasClass('product-calculator_tile')) {
        if(e.type == 'click') {
          if ($target.hasClass('product-calculator__js-toggle_switch')) {
            $block.toggleClass('product-calculator_js-count-calc');
            actionProcessing($block, 'measureChange');
          } else if($target.hasClass('product-calculator__js-toggle_square')){
            $block.removeClass('product-calculator_js-count-calc');
            actionProcessing($block, 'measureChange');
          } else if($target.hasClass('product-calculator__js-toggle_count')) {
            $block.addClass('product-calculator_js-count-calc');
            actionProcessing($block, 'measureChange');
          }
        }
      }
    }
    //если ввод инпут
    else if($(e.target).hasClass(inputClass) || $(e.target).parents('.' + inputClass).length > 0) {
      $(e.target).closest('.' + inputClass);
      $target = $(e.target).closest('.' + inputClass);
      if(e.type == 'input') {
        $target.val($target.val().replace(/[^\d\.]/g, ""));
        actionProcessing($block, 'calculationTile');
        actionProcessing($block, 'calculatePrice');
        actionProcessing($block, 'totalPrice');
        if($target.val().match(/\./g).length > 1) {
          $target.val($target.val().substr(0, $target.val().lastIndexOf(".")));
          actionProcessing($block, 'calculationTile');
          actionProcessing($block, 'calculatePrice');
          actionProcessing($block, 'totalPrice');
        }
        $target.on('change', function() {
          actionProcessing($block, 'adjustment');
          actionProcessing($block, 'calculatePrice');
          actionProcessing($block, 'totalPrice');
        })
      } else if(e.type == 'mouseout') {
        $target.blur();
      }
    }
  })

  //functions
  function actionProcessing($block, operation) {{
    var $price = $block.closest('.product-item').find('.product-price-total span'),
        $totalPrice = $block.parents('.cart-form_with-total-price-count').find('.total-price span'),
        $input = $block.find('.product-calculator__value-input'),
        $hiddenInput = $block.find('.product-calculator__count-input'),
        hiddenInputVal = parseFloat(+$hiddenInput.val()),
        frontInputVal = parseFloat(+$input.val()),
        tileSquare = parseFloat($hiddenInput.data('square')),
        minCount = parseFloat($hiddenInput.data('mincount')),
        price = parseFloat($hiddenInput.data('price')),
        sum = 0;

    if(operation == 'increase') {
      $hiddenInput.val(hiddenInputVal + 1);
      hiddenInputVal = parseFloat(+$hiddenInput.val());
      if($block.hasClass('product-calculator_js-count-calc')) {
        $input.val(hiddenInputVal);
      } else {
        $input.val(parseFloat((hiddenInputVal * tileSquare).toFixed(2)));
      }
    } else if (operation == 'reduce') {
      if (hiddenInputVal>minCount) {
        $hiddenInput.val(hiddenInputVal - 1);
        hiddenInputVal = parseFloat(+$hiddenInput.val());
        if($block.hasClass('product-calculator_js-count-calc')) {
          $input.val(hiddenInputVal);
        } else {
          $input.val(parseFloat((hiddenInputVal * tileSquare).toFixed(2)));
        }
      }
    } else if (operation == 'measureChange') {
      if($block.hasClass('product-calculator_js-count-calc')) {
        $input.val(hiddenInputVal);
      } else {
        $input.val(parseFloat((hiddenInputVal * tileSquare).toFixed(2)));
      }
    } else if (operation == 'calculatePrice') {
      if($block.hasClass('product-calculator_tile')) {
        $price.text(parseFloat((((hiddenInputVal*tileSquare).toFixed(2))*price).toFixed(2)));
      } else {
        $price.text(parseFloat((hiddenInputVal*price).toFixed(2)));
      }
    } else if (operation == 'adjustment') {
      if(minCount > hiddenInputVal) {
        $hiddenInput.val(minCount);
        if($block.hasClass('product-calculator_js-count-calc')) {
          $input.val(minCount);
        } else {
          $input.val(parseFloat((minCount * tileSquare).toFixed(2)));
        }
      } else {
        if($block.hasClass('product-calculator_js-count-calc')) {
          $input.val(hiddenInputVal);
        } else {
          $input.val(parseFloat((hiddenInputVal*tileSquare).toFixed(2)));
        }
      }
    } else if (operation == 'calculationTile') {
      if($block.hasClass('product-calculator_js-count-calc')) {
        $hiddenInput.val(Math.ceil(frontInputVal));
      } else {
        $hiddenInput.val(Math.ceil(frontInputVal/tileSquare));
      }
    } else if (operation == 'totalPrice') {
      $('.product-price-total span').each(function(i, element) {
        sum = sum + parseFloat($(element).text());
      })
      $totalPrice.text(parseFloat(sum.toFixed(2)));
    }
  }}
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
    CLOSE       : 'Закрыть',
    NEXT        : 'Следующий слайд',
    PREV        : 'Предидущий слайд',
    ERROR       : 'Ошибка загрузки, попробуйте позже.',
    PLAY_START  : 'Запустить слайд-шоу',
    PLAY_STOP   : 'Остановить слайд-шоу',
    FULL_SCREEN : 'Полноэкранный режим',
    THUMBS      : 'Миниатюры',
    DOWNLOAD    : 'Загрузить',
    SHARE       : 'Поделиться',
    ZOOM        : 'Увеличить'
  };
  $.fancybox.defaults.lang = 'ru';
  $.fancybox.defaults.loop = true;
  $.fancybox.defaults.autoFocus = false;

  $(document).on('afterShow.fb', function( e, instance, slide ) {
    var $pano = $('.panorama');
    if($pano.length > 0) {
      var path = slide.$thumb.prevObject[0].dataset.pano,
          c = document.getElementById("pano");
      Ceramic3DPanorama(c,'',path);
    }
    if($(slide.$content).hasClass('popup')) {
      validation();
    }
  });
}

//validate
function validation() {
  var $phoneInput = $('input[name="phone"]'),
      $form = $(".validate-form");

  if($form.length > 0) {  
    $phoneInput.mask("+7 (999) 999-99-99", {completed:function(){$form.validate().element($phoneInput)}});  
    $phoneInput.on('keyup', function() {
      if($(this).hasClass('error')) {
        $form.validate().element($phoneInput);
      }
    })
    
    jQuery.validator.addMethod("correctPhone", function(value, element){
      if (/^(?!_$)([+]{1}[0-9]{1} [(]{1}[0-9]{3}[)]{1} [0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2})$/.test(value)) {
          return true;  
      } else {
          return false;   
      };
    }); 
  
    $form.validate({
      rules: {
        email: {
          required: true,
          email: true
        },
        name: {
          required: true,
          minlength: 2 
        },
        text: {
          required: true,
          minlength: 5 
        },
        phone: {
          required: true,
          correctPhone: true
        }
      },
      messages: {
        email: {
          required: "Пожалуйста, заполните это поле",
          email: jQuery.validator.format("Введите корректный адрес электронной почты")
        },
        name: {
          required: "Пожалуйста, заполните это поле",
          minlength: jQuery.validator.format("Длина имени должна быть больше 1-го символa")
        },
        text: {
          required: "Пожалуйста, заполните это поле",
          minlength: jQuery.validator.format("Текст сообщения не должен быть короче 5-ти символов")
        },
        phone: {
          required: "Пожалуйста, заполните это поле",
          correctPhone: jQuery.validator.format("Укажите корректный номер телефона")
        }
      },
      submitHandler: function(form) {
        //отправка формы
        //если отправка успешна
        succes(form);
      }
    });

    function succes(form) {
      if($(form).hasClass('contact-form')) {
        //очистка полей формы
        $(form).find('.input').val('');
        //Если форма во всплывающем окне - закрыть окно
        if($(form).parents('.popup').length > 0) {
          $.fancybox.close();
        }
        //показать окно благодарности 
        $.fancybox.open({
          type: 'ajax',
          src: '../popup-succes.html',
          smallBtn: true,
          touch: false
        });
        //закрыть автоматически чрез 3 сек
        popupCloseTimer = setTimeout(function() {
          $.fancybox.close();
        }, 3000)
      }
    }
  }
}
function panorama($parent) {
  var path = $parent.data('images');
  console.log(path);
}