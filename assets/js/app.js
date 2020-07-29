(function($) {
  $(document).ready(function() {
    var app = {
      isMobile: false,
      isTablet: false,
      breakPointTablet: 992,
      breakPointMobile: 768,
      init: function() {
        app.handleResize();
        app.responsiveDetection();
        app.swiperInit();
      },

      handleResize: function() {
        $(window).on('resize', function(){
          app.responsiveDetection();
        });
      },

      responsiveDetection: function() {
        app.isMobile = $(window).width() < app.breakPointMobile;
        app.isTablet = $(window).width() < app.breakPointTablet;
      },

      // Swiper header
      swiperInit: function () {
        const _swiperHomeDiv = '.swiper-home';
        if($(_swiperHomeDiv).length > 0) {
          var _swiperHome = new Swiper (_swiperHomeDiv, {
            slidesPerView: 1,
            loop: true,
            simulateTouch: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        }
      },
    };
    app.init();
  });
})(jQuery);
