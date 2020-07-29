(function($) {
  $(document).ready(function() {
    var app = {
      swiperBullet: null,
      swiperNavbar: null,
      isMobile: false,
      isTablet: false,
      breakPointTablet: 992,
      breakPointMobile: 768,
      init: function() {
        app.handleResize();
        app.responsiveDetection();
        app.swiperHeaderInit();
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
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              watchOverflow: true
            }
          })
        }
      },
    };
    app.init();
  });
})(jQuery);
