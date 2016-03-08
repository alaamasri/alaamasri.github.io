$(function () {

    /*Preload Mobile onHover*/
    $.preloadImages = function () {
        for (var i = 0; i < arguments.length; i++) {
            $("<img />").attr("src", arguments[i]);
        }
    }

    $.preloadImages("./Images/loadingLogo.png");

    /* Slider touch */
    $("#slider li.active").next().click();
    $("#slider").swiperight(function () {
        $(this).carousel('prev');
    });

    $("#slider").swipeleft(function () {
        $(this).carousel('next');
    });

    $('.carousel').carousel({
        interval: 5000
    });

    $('.carousel').carousel('cycle');

    $('.carousel').on('slide.bs.carousel', function (e) {
        $('.carousel .left-caption.animated').addClass('fadeInLeft');
        $('.carousel .right-caption.animated').addClass('fadeInRight');
    });


}); /*== Document ready== */

$(window).load(function () {

    new WOW({ offset: 100 }).init();
    if ($(window).width() > 767) {
        var captionTop = $('.menu-container').height() + 40;
        $('#slider .caption').css({ "top": captionTop });
        $('#slider .item').height($('#slider .item .large-slide')[0].height);
    }
    else {
        $('#slider .item').height("auto");
    }

    //if ($('.search-slider').length > 0) {
    //    $('.slider-controls').css({ "top": $('.featured-item').position().top + $('.featured-item').outerHeight() });
    //}
    $('.loading').fadeOut('slow');
    $('html').removeClass('locked');
    //$('#slider').animo('blur');
    //$('#slider .left-caption').animo({ animation: 'fadeInLeft', duration: 1 });

});

$(window).resize(function () {
    if ($(window).width() > 767) {
        var captionTop = $('.menu-container').height() + 40;
        $('#slider .caption').css({ "top": captionTop });
        $('#slider .item').height($('#slider .item .large-slide')[0].height);
    }
    else {
        $('#slider .item').height("auto");
    }

});