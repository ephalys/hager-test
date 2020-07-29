(function($) {
  $(document).ready(function() {
    var app = {
      swiperBullet: null,
      swiperNavbar: null,
      isMobile: false,
      isTablet: false,
      breakPointMenuBurger: 1200,
      breakPointMaxTablet: 1024,
      breakPointTablet: 992,
      breakPointMobile: 768,
      init: function() {
        app.handleResize();
        app.responsiveDetection();
        app.selectFormInit();
        app.swiperHeaderInit();
        app.swiperBulletInit();
        app.swiperBulletGeneralInit();
        app.swiperBulletLargeInit();
        app.initMasonryBlog();
        app.initMasonrySocialWall();
        app.navbarInit();
        app.handleMenu();
        app.handleMenuBody();
        app.questionsAccordion();
        app.callForm();
        app.handleTooltip();
        app.checkIE();
        app.numberIncrement();
        //app.displaySearchBar();
        $(document).ajaxComplete(function(e, x, s){
          app.selectFormInit();
        });
      },

      checkIE : function(){
        var nav = window.navigator.userAgent,
          idx = nav.indexOf("MSIE"),
          tri = nav.indexOf("Trident/");
        if(idx > 0 || tri > 0){
          var version = (parseInt(nav.substring(idx + 5, nav.indexOf('.', idx)), 10));
          app.ie = true;
          document.body.classList.add('ie');
        }
      },

      handleResize: function() {
        $(window).on('resize', function(){
          app.responsiveDetection();
          app.swiperBulletInit();
          app.navbarInit();
        });
      },

      responsiveDetection: function() {
        app.isMobile = $(window).width() < app.breakPointMobile;
        app.isTablet = $(window).width() < app.breakPointTablet;
        app.isMaxTablet = $(window).width() < app.breakPointMaxTablet;
        app.isMenuBurger = $(window).width() < app.breakPointMenuBurger;
      },

      displaySearchBar: function(){
        if($('.search_form').length > 0){
          $('.search_form').bind('click', function (e) {
            e.preventDefault();
            $('.filters-bar').hide();
            $('.search-bar').show();
          });
        }
      },

      selectFormInit: function() {
        if($('.selectpicker').length > 0) {
          $('.selectpicker').each(function(){
            $(this).selectpicker({
              mobile: true
            });
          });
        }
      },

      // Swiper header
      swiperHeaderInit: function () {
        const _swiperVerticalClass = '.header-custom .swiper-container.swiper-bullet';
        const _slides = '.header-custom .swiper-container.swiper-bullet .swiper-slide';
        if($(_swiperVerticalClass).length > 0 && $(_slides).length > 1) {
          var _swiperBulletHeader = new Swiper (_swiperVerticalClass, {
            slidesPerView: 1,
            loop: true,
            simulateTouch: true,
            // autoplay: {
            //     delay: 5000,
            // },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              watchOverflow: true
            }
          })
        }
      },
      // Swiper general all sliders
      swiperBulletGeneralInit: function() {
        const _swiperGeneralClass = '.swiper-general .swiper-container.swiper-bullet';
        const _swiperGeneralSlides = '.swiper-general .swiper-container.swiper-bullet .swiper-slide';
        if ($(_swiperGeneralClass).length > 0) {
          app.swiperBulletGeneral = new Swiper(_swiperGeneralClass, {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: ($(_swiperGeneralSlides).length < 4) ? true : false,
            pagination: {
              el: '.swiper-pagination',
              clickable:  true,
              watchOverflow: true
            },
            breakpoints: {
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              480: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              }
            }
          });
        }
      },
      // Swiper 3 slides - swiper environemennt
      swiperBulletLargeInit: function() {
        const _swiperLargeClass = '.swiper-large .swiper-container.swiper-bullet';
        const _swiperLargeSlides = '.swiper-large .swiper-container.swiper-bullet .swiper-slide';
        if ($(_swiperLargeClass).length > 0 && $(_swiperLargeSlides).length > 1) {
          var _swiperBulletLarge = new Swiper(_swiperLargeClass, {
            slidesPerView: 3,
            spaceBetween: 0,
            autoplay: {
              delay: 2000,
            },
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable:  true,
              watchOverflow: true
            },
            breakpoints: {
              320: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3
              }
            }
          });
        }
      },
      // Swiper bloc reinssurance bloc - active in mobile
      swiperBulletInit: function () {
        const _swiperBulletClass = '.reinsurance-boxes .swiper-container.swiper-bullet';
        const _swiperBulletSlides = '.reinsurance-boxes .swiper-container.swiper-bullet .swiper-slide';
        if($(_swiperBulletClass).length > 0 && $(_swiperBulletSlides).length > 1) {
          if(app.isTablet && !app.swiperBullet) {
            app.swiperBullet = new Swiper(_swiperBulletClass, {
              pagination: {
                el: '.swiper-pagination',
                clickable:  true,
                watchOverflow: true
              },
              slidesPerView: 1,
              breakpoints: {
                768: {
                  slidesPerView: 2
                }
              }
            });
          } else if (!app.isTablet && app.swiperBullet) {
            if(app.swiperBullet.length !== undefined) {
              app.swiperBullet.forEach(function (index) {
                index.destroy();
              });
            } else {
              app.swiperBullet.destroy();
            }
            app.swiperBullet = null;
            $(_swiperBulletClass + ' .swiper-wrapper').removeAttr('style');
            $(_swiperBulletClass + ' .swiper-slide').removeAttr('style');
            $(_swiperBulletClass + ' .swiper-pagination').empty();
          }
        }
      },
      navbarInit: function () {
        const _navbarClass = '.swiper-container.navbar-collapse',
          _navbarDiv = $(_navbarClass);
        if(app.isTablet && !app.swiperNavbar) {
          app.swiperNavbar = new Swiper (_navbarClass, {
            slidesPerView: 'auto',
            simulateTouch: true,
            freemode: true,
            loop: true,
            navigation: {
              nextEl: '.header-arrow-next',
              prevEl: '.header-arrow-prev',
            }
          })
        } else if(!app.isTablet && app.swiperNavbar)  {
          app.swiperNavbar.destroy();
          app.swiperNavbar = null;
          $(_navbarClass + ' .swiper-wrapper').removeAttr('style');
          $(_navbarClass + ' .swiper-slide').removeAttr('style');
        }
      },
      handleMenu: function () {
        const _menuButton = $('.navbar-burger'),
          _menu = $('.menu'),
          _body = $('body');

        _menuButton.on('click', function () {
          _menu.toggleClass('active');
          _body.toggleClass('overflow');
          _menuButton.toggleClass('close-burger-menu');

        })
      },
      handleMenuBody: function () {
        const _main = $('body div:not(.menu)'),
          _menuButton = $('.navbar-burger'),
          _body = $('body'),
          _menu = $('.menu');

        _main.on('click', function () {
          _menu.removeClass('active');
          _body.removeClass('overflow');
          _menuButton.removeClass('close-burger-menu');
        })
      },
      questionsAccordion: function () {
        if($('.questions-accordion').length > 0) {
          const _title = $('.question-item .title');

          _title.on('click', function () {
            const _parent  = $(this).parent(),
              _content = _parent.find('.content');
            if(_parent.hasClass('opened')) {
              _content.slideUp();
              _parent.removeClass('opened');
            } else {
              _content.slideDown();
              _parent.addClass('opened');
            }
          })
        }
      },
      callForm: function () {
        const _call = $('.call');
        if (_call.length > 0) {
          $('#collapseOne').on('show.bs.collapse', function () {
            const _btnCall = $('#headingOne button');
            _btnCall.hide();
          })
        }
      },
      handleTooltip: function () {
        const _iconHelper = $('.icon-helper');
        if(_iconHelper.length > 0) {
          _iconHelper.tooltip()
        }
      },
      initMasonrySocialWall: function() {
        const _socialgrid = $('.socialwall-grid');
        if(_socialgrid.length > 0) {
          _socialgrid.imagesLoaded().done(function (instance) {
            _socialgrid.isotope({
              itemSelector: '.social-item',
              percentPosition: true,
              masonry: {
                columnWidth: '.grid-sizer'
              },
            });
          });
        }
      },
      initMasonryBlog: function() {
        const _grid = $('.blog-grid');
        if(_grid.length > 0) {
          _grid.imagesLoaded(function () {
            _grid.isotope({
              itemSelector: '.blog-item', // use a separate class for itemSelector, other than .col-
              percentPosition: true,
              masonry: {
                columnWidth: '.grid-sizer'
              },
            });
          });
        }
      },
      numberIncrement: function () {
        if($('.content-chiffres-cles').length > 0){
          var a = 0;
          $(window).scroll(function() {
            var oTop = $('.content-chiffres-cles').offset().top - window.innerHeight;
            if (a == 0 && $(window).scrollTop() > oTop) {
              $('.count').each(function () {
                $(this).prop('Counter',0).animate({
                  Counter: $(this).text()
                }, {
                  duration: 3000,
                  easing: 'swing',
                  step: function (now) {
                    $(this).text(Math.ceil(now));
                  }
                });
              });
              a = 1;
            }
          });
        }
      },
    };
    app.init();
  });
})(jQuery);
