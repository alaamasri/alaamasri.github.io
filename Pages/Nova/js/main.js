/*
Template : Rovast - Corporate HTML5 Template
Author: JIllur Rahman
Author URI: www.developerjillur.me
Version: 1.0.0

NOTE: main.js, All custom script and plugin activation script in this file. 
*/

/*================================================
[  Table of contents  ]
================================================
  Add Menu children angle, Mena menu Activation, wow Activation, Testimonials Carousel, blog post Carousel, Banner Carousel, Slick Carousel, Partner logo carousel, Counter up, knob circle, magnific popup, Swiper For Video slider, Custom Accordion, Mailchimp subscription Activation,
  Standerd Fixed header
*/

(function($) {
    "use strict";

    // Add Menu children angle
    /* If Have dropdown in menu, Add arrow in parent menu item */
    $('#mainMenu > ul li a').each(function() {
        if ( $(this).parent('li').children('ul,.mega-menu-wrapper').size() > 0 ) {
            $(this).append('<span class="parent-angle"><i class="icofont icofont-simple-down"></i></span>');
        }           
    });

    /* Mena menu Activation */
    $('#mainMenu').meanmenu({
        meanMenuContainer: '.header-menu',
        meanScreenWidth: "767",
    });

    /*  bootstrap tooltip Activation */
    $('[data-toggle="tooltip"]').tooltip();
    /*  bootstrap popover Activation */
    $('[data-toggle="popover"]').popover();

    /* wow Activation */
    new WOW().init();

    /* Mixitup Activation */
    $('#mixitupContent').mixItUp();

    /* Testimonials Carousel */ 
    $('#carouselTesti').owlCarousel({
      autoPlay: false, 
      items : 2,
      nav: false,
      margin: 30,
      responsive:{
          0:{
              items:1
          },
          479:{
              items:1
          },
          767:{
              items:1
          },
          980:{
              items:2
          },
          1000:{
              items:2
          }
      }
    });

    /* blog post Carousel */ 
    $('#blogCarousel').owlCarousel({
      autoPlay: false, 
      items : 3,
      nav: true, 
      dots: false,
      margin: 0,
      navText: ["&#xeb8a;", "&#xeb8b;"],
      responsive:{
          0:{
              items:1
          },
          479:{
              items:1
          },
          767:{
              items:2
          },
          980:{
              items:3
          },
          1000:{
              items:3
          }
      }
    });

    /* Banner text effect Carousel - home three */ 
    $('#bannerTextCarousel').owlCarousel({
      autoPlay: false, 
      items : 1,
      nav: false,
    });

    /* Slick Carousel for testimonials */ 
    $('.testimonial-text-slider').slick({
      slidesToShow: 1,
      arrows: false,
      asNavFor: '.testimonial-image-slider',
    });
    /* Slick img */ 
    $('.testimonial-image-slider').slick({
      centerMode: true,
      centerPadding: '0',
      dots: true,
      arrows: false,
      slidesToShow: 3,
      asNavFor: '.testimonial-text-slider',
    });

    /* Partner logo carousel */ 
    $('#logoCarousel').owlCarousel({
      autoPlay: false, 
      items : 5,
      nav: false,
      dots: false,
      margin: 0,
      responsive:{
          0:{
              items:2
          },
          479:{
              items:2
          },
          767:{
              items:3
          },
          980:{
              items:4
          },
          1000:{
              items:5
          }
      }
    });

    /* Counter up  */ 
    $('.counter-number').counterUp({
        delay: 10,
        time: 1500
    });

    /* knob circle */
    if(typeof($.fn.knob) != 'undefined') {
      $('.knob-active').each(function () {
        var $this = $(this),
          knobVal = $this.attr('data-rel');
    
        $this.knob({
        'draw' : function () { 
          $(this.i).val(this.cv + '%');
        }
        });
        
        $this.appear(function() {
        $({
          value: 0
        }).animate({
          value: knobVal
        }, {
          duration : 2000,
          easing   : 'swing',
          step     : function () {
          $this.val(Math.ceil(this.value)).trigger('change');
          }
        });
        }, {accX: 0, accY: -150});
      });
    } 

    /* magnific popup */
    /* magnific effect Names 
    # mfp-zoom-in
    # mfp-rotate
    # mfp-move-horizontal
    # mfp-move-from-top
    # mfp-3d-unfold
    # mfp-zoom-out
    # mfp-with-fade
    */

    // magnific Text Activation
    $('.popup-text').magnificPopup({
        removalDelay: 500, //delay 
        callbacks: {
          beforeOpen: function() {
             this.st.mainClass = this.st.el.attr('data-effect');
          }
        },
        midClick: true // allow opening popup on middle mouse click.
    });
    // magnific image Activation
    $('.popup-img').magnificPopup({
        type: 'image',
        removalDelay: 500, //delay
        callbacks: {
          beforeOpen: function() {
            // just a hack that adds mfp-anim class to markup 
             this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
             this.st.mainClass = this.st.el.attr('data-effect');
          }
        },
        closeOnContentClick: true,
        midClick: true // allow opening popup on middle mouse click.
    });
    // magnific gallery Activation
    $('.popup-gallery').each(function () {
        $(this).magnificPopup({
            delegate: 'a.popup-gallery-img',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });
    // magnific iframe Activation
    $('.popup-iframe').magnificPopup({
        dispableOn: 700,
        type: 'iframe',
        removalDelay: 160,
        mainClass: 'mfp-fade',
        preloader: false
    });
    $('.popup-img,.popup-gallery-img').on('click', function(){
      $('.header-bottom').addClass('visible-header no-transition static-header afterclickpopup');
    });

    /* Initialize Swiper For Video slider */ 
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 30,
        autoplay: 8000,
        autoplayDisableOnInteraction: false
    });

    /* Scroll to top */
    $.scrollUp({
      scrollName: 'scrollUp',
      topDistance: '300', // Distance from top before showing element (px)
      topSpeed: 900, // Speed back to top (ms)
      animation: 'fade', // Fade, slide, none
      animationInSpeed: 500, // Animation in speed (ms)
      animationOutSpeed: 500, // Animation out speed (ms)
      scrollText: '<span><i class="icofont icofont-thin-up"></i></span>', // Text for element
      activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });
    
    /* Custom Accordion */
    // Angle up-down 
    $('.i-accordion').on('show.bs.collapse', function(n){
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-down fa-chevron-up');
    });
    $('.i-accordion').on('hide.bs.collapse', function(n){
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-chevron-up fa-chevron-down');
    });

    // Plus
    $('.accordion-2a, .accordion-2b, .accordion-3').on('show.bs.collapse', function(n){
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-minus fa-plus');
    });
    $('.accordion-2a, .accordion-2b, .accordion-3').on('hide.bs.collapse', function(n){
      $(n.target).siblings('.panel-heading').find('.panel-title i').toggleClass('fa-plus fa-minus');
    });

    /* Mailchimp subscription Activation */ 
    $('#mc-form').ajaxChimp({
        language: 'en',
        callback: callbackFunction,
        url: '//devssquad.us14.list-manage.com/subscribe/post?u=ca0fa734dec0f017b3f124127&id=2c6909961e' // just replace your subscription url
    });
    function callbackFunction (resp) {
        if (resp.result === 'success') {
            //console.log(resp);
        }
    }

    /* Standerd Fixed header */
    // Static Class
    $('.header-bottom').addClass('visible-header no-transition static-header');
    // After scroll
    $(window).on('scroll', function () {
      var className = '.header-bottom';
      if ($(this).scrollTop() > 0) { 
        $(className).removeClass('static-header afterclickpopup no-transition');
        var previousTop = 0;
        var currentTop = $(window).scrollTop();
        if (currentTop < this.previousTop ) {
          $(className).addClass('visible-header');
        } else {
            $(className).removeClass('visible-header');
        }
        this.previousTop = currentTop;
      } else {
         $(className).addClass('static-header');
      }
      // End Standerd header

      // Slider position 
      if ($(this).scrollTop() > 0) { 
          $('.slider-section,.slider-bottom-fix').addClass('header-slider-bottom');
      } else {
          $('.slider-section,.slider-bottom-fix').removeClass('header-slider-bottom');
      }
    });
    /* #End window scroll event */

    $('.header-bottom a').click(function () {
        var scroll = $($(this).attr('href')).offset().top - 70;
        if ($(window).width() < 768) { scroll = scroll + 20 }
        $('html, body').animate({
            scrollTop: scroll
        }, 500);
        return false;
    });


}) (jQuery);





    