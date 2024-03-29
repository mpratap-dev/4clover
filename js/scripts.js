(function ($) {
  'use strict';
  var mobileDevice = false;

  const projectCarouselContainer = $('.project-carousel');
  const slidesContainer = $('.js-slides-container');
  projectCarouselContainer.html(slidesContainer.html());
  initializeMagnificPopup();
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('mobile');
    mobileDevice = true;
  } else {
    $('html').addClass('no-mobile');
    mobileDevice = false;
  }
  $(window).on('load', function () {
    $('.loader').fadeOut(200);
    if ($('.wow').length > 0) {
      var wow = new WOW({
        offset: 150,
        mobile: false
      });
      wow.init();
    }
  });
  $('.js-navbar').affix({
    offset: {
      top: 50
    }
  });
  $('.js-navbar').on('affix.bs.affix', function () {
    if (!$('.js-navbar').hasClass('affix')) {
      $('.js-navbar').addClass('animated slideInDown');
    }
  });
  $('.js-navbar').on('affixed-top.bs.affix', function () {
    $('.js-navbar').removeClass('animated slideInDown');
  });
  $('.navigation ul li a, .mobile-menu ul li a').on('click', function () {
    var target = $(this.hash);
    if (target.length) {
      $('html,body').animate({
        scrollTop: (target.offset().top - $('.js-navbar').outerHeight() + 1)
      }, 1000);
      $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
      return false;
    }
  });
  $('body').scrollspy({
    offset: $('.js-navbar').outerHeight()
  });

  function hideMenu() {
    $('body').removeClass('menu-is-opened').addClass('menu-is-closed');
  }

  function showMenu() {
    $('body').removeClass('menu-is-closed').addClass('menu-is-opened');
  }

  function initializeProjectCarousel() {
    projectCarouselContainer.owlCarousel({
      dots: true,
      margin: 30,
      smartSpeed: 250,
      responsiveRefreshRate: 0,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        1200: {
          items: 3
        },
        1600: {
          items: 4
        }
      }
    });
  }

  function initializeMagnificPopup() {
    $('.popup-with-zoom-anim').magnificPopup({
      type: 'inline',
      fixedContentPos: false,
      fixedBgPos: true,
      overflowY: 'auto',
      closeBtnInside: true,
      preloader: false,
      midClick: true,
      fixedContentPos: true,
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in'
    });
  }

  $('.navbar-toggle').on('click', function () {
    showMenu();
  });
  $('.close-menu, .click-capture').on('click', function () {
    hideMenu();
    $('.menu-list ul').slideUp(300);
  });
  if ($('.owl-carousel').length > 0) {
    initializeProjectCarousel();
    $('.client-carousel').owlCarousel({
      margin: 30,
      smartSpeed: 250,
      nav: true,
      navText: [],
      dots: false,
      autoHeight: true,
      responsiveRefreshRate: 0,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 1
        },
        992: {
          items: 2
        },
        1200: {
          items: 2
        }
      }
    });
    $('.partner-carousel').owlCarousel({
      margin: 30,
      smartSpeed: 250,
      dots: true,
      autoplay: true,
      responsiveRefreshRate: 0,
      responsive: {
        0: {
          items: 2
        },
        768: {
          items: 3
        },
        992: {
          items: 4
        },
        1200: {
          items: 5
        }
      }
    });
    $(".review-carousel").owlCarousel({
      responsive: {
        0: {
          items: 1
        },
        720: {
          items: 1,
        },
        1280: {
          items: 1
        }
      },
      responsiveRefreshRate: 0,
      nav: true,
      navText: [],
      animateIn: 'fadeIn',
      dots: false
    });
  }

  $('.js-filter-carousel li a').on('click', function (event) {
    event.preventDefault();
    $('.js-filter-carousel .active').removeClass('active');
    $(this).closest('li').addClass('active');
    var selector = $(this).attr('data-filter');
    $('.project-carousel').fadeOut(300);
    $('.project-carousel').fadeIn(300);
    let filteredSlides = ``;
    if(selector === '*') {
      filteredSlides = slidesContainer.find('.project-item').clone();
    } else {
      filteredSlides = slidesContainer.find($(selector)).clone();
    }
    setTimeout(function() {
      projectCarouselContainer.html(filteredSlides);
      projectCarouselContainer.trigger('destroy.owl.carousel');
      initializeProjectCarousel();
      initializeMagnificPopup();
    }, 300)
  });


  if ($('.pagepiling').length > 0) {
    $('.pagepiling').pagepiling({
      scrollingSpeed: 280,
      menu: '.menu-pagepiling',
      anchors: ['main', 'about', 'projects', 'partners', 'testimonials', 'contacts'],
      afterLoad: function (anchorLink, index) {
        if ($('.pp-scrollable:nth-child(' + (index) + ')').hasClass(('section-white'))) {
          $('.navbar').removeClass('navbar-white');
          $('#pp-nav').removeClass('white');
          $('.copy-bottom').removeClass('white');
          $('.lang-bottom').removeClass('white');
        } else {
          $('.navbar').addClass('navbar-white');
          $('#pp-nav').addClass('white');
          $('.copy-bottom').addClass('white');
          $('.lang-bottom').addClass('white');
        }
      }
    });
    $('.menu-pagepiling ul li a').on('click', function () {
      hideMenu();
    });
    $('.pp-scrollable').on('scroll', function () {
      var scrollTop = $(this).scrollTop();
      if (scrollTop > 0) {
        $('.navbar-2').removeClass('navbar-white');
      } else {
        $('.navbar-2').addClass('navbar-white');
      }
    });
    $('#pp-nav').prepend('<div class="pp-nav-up icon-chevron-up"></div>').append('<div class="pp-nav-down icon-chevron-down"></div>').addClass('white right-boxed hidden-xs');
    $('.pp-nav-up').on('click', function () {
      $.fn.pagepiling.moveSectionUp();
    });
    $('.pp-nav-down').on('click', function () {
      $.fn.pagepiling.moveSectionDown();
    });
  }
  $('.project-box').on('mouseover', function () {
    var index = $('.project-box').index(this);
    $('.bg-changer .section-bg').removeClass('active').eq(index).addClass('active');
  });
  if ($('.js-form').length > 0) {
    $('.js-form').each(function () {
      $(this).validate({
        errorClass: 'error wobble-error',
        submitHandler: function (form) {
          $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(form).serialize(),
            success: function () {
              $('.success-message').show();
            },
            error: function () {
              $('.error-message').show();
            }
          });
        }
      });
    });
  }
})(jQuery);