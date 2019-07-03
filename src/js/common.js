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
  popup();
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
  if ($('html').hasClass('desktop')) {
    $('html').css('overflow', 'hidden');
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
    var timerId = setInterval(function() {
      $('body').getNiceScroll().resize();
      $scrollContainer.getNiceScroll().resize();
    }, 50);
    $(".button_scroll-top").on('click', function(e) {
      e.preventDefault();
      $('body').getNiceScroll().doScrollPos(0,0);
    })
  } else {
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
    if($('html').hasClass('nav-opened')) {}
    else {
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
    $galleryLink = $('.gallery-nav__link');

  $galleryLink.on('click', function(event) {
    event.preventDefault();
    var index = $(this).parent().index();
    $gallery.slick('slickGoTo', index);
  });
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
  })
  $('.product-calculator').find('.product-calculator__value-input').on('change', function() {
    var $block = $(this).parents('.product-calculator');
    actionProcessing($block, 'adjustment');
    actionProcessing($block, 'calculatePrice');
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
            }
          }
        }
      }
    }
    //если меняем велечину
    else if($(e.target).hasClass(toggleClass) || $(e.target).parents('.' + toggleClass).length > 0) {
      $(e.target).closest('.' + toggleClass);
      $target = $(e.target).closest('.' + toggleClass);
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
    //если ввод инпут
    else if($(e.target).hasClass(inputClass) || $(e.target).parents('.' + inputClass).length > 0) {
      $(e.target).closest('.' + inputClass);
      $target = $(e.target).closest('.' + inputClass);
      if(e.type == 'input') {
        $target.val($target.val().replace(/[^\d\.]/g, ""));
        actionProcessing($block, 'calculatePrice');
        if($target.val().match(/\./g).length > 1) {
          $target.val($target.val().substr(0, $target.val().lastIndexOf(".")));
          actionProcessing($block, 'calculatePrice');
        }
      } else if(e.type == 'mouseout') {
        $target.blur();
        actionProcessing($block, 'adjustment');
        actionProcessing($block, 'calculatePrice');
      }
    }
  })

  //functions
  function actionProcessing(block, operation) {{
    var tileSquare = parseFloat($(block).find('.product-calculator__value-input').data('square').toFixed(2)),
        minSquare = parseFloat((Math.ceil(+$(block).find('.product-calculator__value-input').data('minsquare')/tileSquare) * tileSquare).toFixed(2)),
        $input = block.find('.product-calculator__value-input'),
        tilePrice = +$(block).find('.product-calculator__value-input').data('price'),
        $price = block.find('.product-calculator__total-price'),
        inputVal = +$input.val();
    if(operation == 'increase') {
      if($(block).hasClass('product-calculator_js-count-calc')) {
        $input.val(parseFloat((inputVal + 1).toFixed(0)));
      } else {
        $input.val(parseFloat((inputVal + tileSquare).toFixed(2)));
      }
    } else if (operation == 'reduce') {
      if($(block).hasClass('product-calculator_js-count-calc')) {
        if(inputVal>minSquare/tileSquare) {
          $input.val(parseFloat((inputVal - 1).toFixed(0)));
        }
      } else {
        if(inputVal>minSquare) {
          $input.val(parseFloat((inputVal - tileSquare).toFixed(2)));
        }
      }
    } else if (operation == 'measureChange') {
      if($(block).hasClass('product-calculator_js-count-calc')) {
        $input.val(parseFloat((inputVal/tileSquare).toFixed(0)));
      } else {
        $input.val(parseFloat((inputVal*tileSquare).toFixed(2)));
      }
    } else if (operation == 'calculatePrice') {
      if($(block).hasClass('product-calculator_js-count-calc')) {
        $price.text(parseFloat((inputVal * tileSquare * tilePrice).toFixed(2)))
      } else {
        $price.text(parseFloat((inputVal * tilePrice).toFixed(2)))
      }
    } else if (operation == 'adjustment') {
      //количество
      if($(block).hasClass('product-calculator_js-count-calc')) {
        var val = Math.ceil(inputVal);
        if(val < minSquare/tileSquare) {
          $input.val(parseFloat((minSquare/tileSquare).toFixed(0)));
        } else {
          $input.val(parseFloat(val.toFixed(0)));
        }
      }
      //площадь
       else {
        var val = parseFloat((Math.floor(inputVal/tileSquare) * tileSquare).toFixed(2));
        if(val < minSquare) {
          $input.val(parseFloat(minSquare.toFixed(2)))
          console.log('1');
        } else if(inputVal != val) {
          console.log(val + tileSquare)
          $input.val(parseFloat((val + tileSquare).toFixed(2)));
        }
      }
    }
  }}
}
//popup
function popup() {

  $(".popup-link").on('click', function() {
    var content = $($(this).attr('href'));
    modalOpen(content, false);
  })
  
  $(".modal-link").fancybox({
    autoFocus: false,
    smallBtn: true,
    touch: false
  });

  $('.gallery-slide a').on('click', function() {
    var $selector = $(this).parents('.gallery').find('.slick-slide:not(.slick-cloned) a');

    $.fancybox.open( $selector, {
        selector : $selector,
        backFocus : false,
        loop: true,
        animationEffect: "fade"
    }, $selector.index( this ) );

    return false;
  });
}

function modalOpen(content, timer) {
  $.fancybox.open( content, {
      autoFocus: false,
      loop: false,
      autoFocus: false,
      type: 'html',
      smallBtn: true,
      touch: false,
      btnTpl: {
        smallBtn:
        '<button type="button" data-fancybox-close class="button button_style2 button-toggle fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
        '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" stroke="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.115 1.49L12.689.118 7.193 5.819 1.491.323.117 1.748 5.82 7.244.323 12.947l1.426 1.373 5.496-5.702 5.702 5.496 1.374-1.425-5.702-5.496 5.496-5.702z"></path></svg>' +
        "</button>"
      },
      afterClose: function() {
        if(timer==true) {
          popupCloseTimer = clearTimeout(popupCloseTimer);
        } 
        return;
      }
  });
}

//validate
function validation() {
  var $phoneInput = $('input[name="phone"]'),
      $form = $(".contact-form");

  function succes(form) {
    $(form).find('.input').val('');
    if($(form).parents('.popup').length > 0) {
      $.fancybox.close();
    }
    modalOpen($('<div class="popup popup-succes fancybox-content" id="popup-succes" style="display: none;"> <div class="popup-succes__container"> <div class="popup-succes__icon popup-succes__item"><svg class="icon"><use xlink:href="img/icons/icons-sprite.svg#icon20"></use></svg></div><div class="popup-succes__text">Благодарим за Вашу заявку. </div><div class="popup-succes__text">Наш дизайнер свяжется с вами в ближайшее время</div><a class="button button_style1 popup-succes__close" href="#" data-fancybox-close="">Закрыть</a> </div><button type="button" data-fancybox-close="" class="button button_style2 button-toggle fancybox-button fancybox-close-small" title="Close"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" stroke="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.115 1.49L12.689.118 7.193 5.819 1.491.323.117 1.748 5.82 7.244.323 12.947l1.426 1.373 5.496-5.702 5.702 5.496 1.374-1.425-5.702-5.496 5.496-5.702z"></path></svg></button></div>'), true);
    popupCloseTimer = setTimeout(function() {
      $.fancybox.close();
    }, 3000)
  }

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

      /*
      var form_data = $(form).serialize();
      $.ajax({
      type: "POST",
      url: "send.php",
      data: form_data,
      success: function() {
        succes(form);
      }
      });
      */

     //временно
     succes(form);
    }
  });
}