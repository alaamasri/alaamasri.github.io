$(document).on("click", ".pass-toggle", function () {
    const type = $(this).siblings('.form-control').attr('type') === 'password' ? 'text' : 'password';
    $(this).siblings('.form-control').attr('type', type);
    
});
$(document).on("click", ".form-list", function () {
    $(this).parent().find(".ddl").toggleClass("visible");
});
$(document).on("click", ".ddl li,.ddl li a", function () {
    $(this).parents('.ddl').removeClass('visible');

    if ($(this).parents('.ddl').siblings('.form-control').hasClass('form-control-icon')) {
        $(this).parents('.form-group').find('.form-control').val($(this).text());
        $(this).parents('.form-group').find('.form-control').css({ 'background-image': 'url(' + $(this).children('img').attr('src') + ')' });
        $(this).parents('.ddl').siblings('.form-control').attr('placeholder', $(this).text());
    }


    if (!$(this).parents('.ddl').siblings('.form-control').hasClass('.selected-items') && !$(this).parents('.ddl').siblings('.phone-code').length>0) {
        $(this).parents('.ddl').siblings('.form-control').attr('placeholder', $(this).text())
        $(this).parents('.form-group').find('.form-control').val($(this).text());
    }
    if ($(this).parents('.ddl').siblings('.phone-code').length > 0) {
        $(this).parents('.ddl').siblings('.phone-code').text("+" + $(this).text().replace(/\D/g, ""));
        
    }
    
});
$(function () {
    $('.sidebar-container').load("./sidebar.html", function () {
        //$('.sidebar').addClass('sidebar-collapsed');
        //$('.content').addClass('expanded');
        //$(".sidebar .item").click(function () {
        //    if ($('.sidebar').hasClass('sidebar-collapsed')) {
        //        $(".sidebar").toggleClass("sidebar-collapsed");
        //        $('.content-screen .content').toggleClass("expanded");
        //    }
        //    $(this).toggleClass("expanded");
        //    $(this).next(".nav-list").slideToggle();
        //});

    });

    $('.content-screen .content').prepend('<div class="user-pop"> <div class="row mx-0 wrapper"> <div class="col-6"><img class="c-pointer" onclick="$(\'.user-pop\').removeClass(\'expanded\');" src="./img/back-arrow-gray.svg" style="width:25px;"> </div> <div class="col-6"> <div class="iphone-chk-group text-right"> <input class="form-check-input" type="checkbox" id="blankCheckbox_0" value="option2"> <label for="blankCheckbox_0">Online</label> </div> </div> <div class="col-12 my-4"> <div class="main-profile-info"> <div class="profile-pic mr-3"> <img src="img/customers/profile-pic.svg"> <div class="edit-pic"> <img src="img/products-menu/edit_grayBg.svg" style="width:22px;"> </div> </div> <div class="info pt-4"> <div class="f-16">Abdulrahman ahmad</div> <div>abd.ahmad@gmail.com</div> </div> </div> </div> <div class="col-12 user-pages"> <a href="settings-add_user.html">My profile</a> <a href="#" data-toggle="modal" data-target="#transferOrder">Transfer Orders</a> <a href="#">Support</a> <a href="#">Logout</a> </div> </div> </div><div class="modal fade" id="transferOrder" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="transferOrder"> <div class="modal-dialog modal-dialog-centered modal-padding" role="document" style="max-width:700px;"> <div class="modal-content px-3 px-md-5"> <div class="modal-header border-0 mt-3 px-0 pb-2"> <div class="row justify-content-between w-100"> <h6 class="col-6 f-20 font-weight-medium "> <button class="panel-button p-0"><img data-dismiss="modal" aria-label="Close" src="./img/back-arrow-gray.svg" style="width:28px;" /></button> Transfer orders: </h6> <div class="col-6"> <button class="btn btn-gray btn-txt-icon ml-auto"><img src="img/availability/calendar.svg" style="width:20px;" /> Duration</button> </div> </div> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body px-0 pb-5"> <div class="container-fluid p-0"> <div class="col-12 mb-3"> <div class="row"> <div class="col-12 px-3 titled-wrapper"> <div class="row"> <div class="col-12 col-md-8"> <div class="form-group form-group-arrow"> <label class="req-lbl">Branch name</label> <input type="text" class="form-control form-list" placeholder="Select category"> <!-- <div class="err-msg">Please fill the name</div> --> <ul class="ddl"> <li>Cat 1 </li> <li>Cat 2 </li> <li>Cat 3 </li> </ul> </div> </div> <div class="col-12 col-md-4"> <div class="form-group pt-2"> <label>No. of orders</label> <div class="form-group-qty"> <button type="button" class="btn-number" disabled="disabled" data-type="minus" data-field="quant[1]"> </button> <input type="text" name="quant[1]" class="input-number" value="1" min="1" max="10"> <button type="button" class="btn-number" data-type="plus" data-field="quant[1]"> </button> </div> </div> </div> </div> </div> </div> </div> <div class="col-12"> <div class="btn-branch"> <img src="img/branches/location_green.svg" /><span class="text-primary">Khalda Area</span><span class="pl-3">10 Orders</span><span class="del">+</span> </div> </div> <div class="col-12"> <div class="btn-branch"> <img src="img/branches/location_green.svg" /><span class="text-primary">Sweileh Area</span><span class="del">+</span> </div> </div> <div class="col-12"> <div class="btn-branch"> <img src="img/branches/location_green.svg" /><span class="text-primary">Jabal Amman Branch</span><span class="del">+</span> </div> </div> <div class="col-12 text-right mt-3"> <button class="btn btn-primary wide" data-dismiss="modal" aria-label="Close">Transfer</button> </div> </div> </div> </div> </div> </div>');


    $(".menu-btn").click(function () {
        $(".sidebar").toggleClass("sidebar-collapsed");
        $('.content-screen .content').toggleClass("expanded");
    });

    $('.content .nav-actions').remove();

    if ($('.navbar-content .nav-actions').length) {
        $('.navbar .nav-actions').load("./nav-actions.html");
    }
    else {
        $('.navbar-content').append("<div class='nav-actions'></div>");
        $('.navbar .nav-actions').load("./nav-actions.html");

    }


    $('body').append('<div class="modal fade" id="promptModal" tabindex="-1" role="dialog" aria-labelledby="promptModal"> <div class="modal-dialog modal-dialog-centered alert-modal" role="document" style="width:400px;"> <div class="modal-content"> <div class="modal-body"> <div class="container-fluid px-4 pt-4"> <div class="row text-center mb-4"> <h5 class="col-12 modal-title font-weight-bolder"> Do you want really to remove this item? </h5> </div> </div> <div class="container-fluid"> <div class="row"> <div class="col-md-6 col-xs-12"><button class="btn btn-danger w-100 font-weight-medium mb-2" data-toggle="modal" data-target="#promptModal">Yes, Remove</button></div> <div class="col-md-6 col-xs-12"><button class="btn btn-primary w-100 font-weight-medium" data-toggle="modal" data-target="#promptModal">No, Dont</button></div> </div> </div> </div> </div> </div> </div> ');



    $(document).mouseup(function (e) {
        var container = $(".actions-list");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
    $(document).mouseup(function (e) {
        var container = $(".ddl.visible");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('visible')
        }
    });

    $(document).mouseup(function (e) {
        var container = $(".hidden-ddl:visible");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.fadeOut();
        }
    });
});

$(document).on('keydown', function (e) {
    if (e.keyCode === 27) { // ESC
        $('.user-pop').removeClass('expanded');
        $('.notifications-pop').fadeOut();
        $('.filter-options').fadeOut();
        $(".ddl").each(function () {
            if ($(this).hasClass('visible')) { $(this).removeClass('visible');}
        });
        $(".hidden-ddl:visible").fadeOut();
    }
});


      //function getUrlVars() {
        //    var vars = [], hash;
        //    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        //    for (var i = 0; i < hashes.length; i++) {
        //        hash = hashes[i].split('=');
        //        vars.push(hash[0]);
        //        vars[hash[0]] = hash[1];
        //    }
        //    return vars;
        //}

            //var name = getUrlVars()["name"];
            //console.log(getUrlVars());
            //$('.nameField').val(name.replaceAll("%20"," "));