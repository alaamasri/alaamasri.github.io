  /*------------------------------------------------------------------------------*/
    /* Menu
    /*------------------------------------------------------------------------------*/


$(function () {
    $(".header-container").load('./index.html #masthead',function(){
        $(".mega-menu-item.active").removeClass("active");
        $(".main-menu a").each(function () {
            if ($(this).attr("href").indexOf("#")>-1){
                if($(this).attr("href").length<2){
                    $(this).attr("href","./index.html")
                }
                else{
                    $(this).attr("href","./"+$(this).attr("href"))
                }
            }
            
            if ($(this).attr("href").replace("./", "") == window.location.pathname.split("/").pop()) {
                $(this).parent().addClass("active");
                $(this).parents(".mega-menu-item").addClass("active");
                $(this).attr("href","#");
            }
            
        });
        
    

    $('.btn-show-menu-mobile').on('click', function () {
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });
    
    });
   

    $(".footer-container").load('./index.html #mastfooter')

    $(".rp-container").load('./index.html #homeProducts', function () {
        $(".rp-container .featured-thumbnail a").each(function () {
            if ($(this).attr("href").replace("./", "") == window.location.pathname.split("/").pop()) {
                $(this).parents(".ttm-box-col-wrapper.col-lg-4").remove();
            }
        });
        $(".slick_slider").slick();

    })


})
