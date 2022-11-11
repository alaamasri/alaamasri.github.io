
        // Example starter JavaScript for disabling form submissions if there are invalid fields
        (function () {
            'use strict';
            window.addEventListener('load', function () {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByClassName('needs-validation');
                // Loop over them and prevent submission
                var validation = Array.prototype.filter.call(forms, function (form) {
                    form.addEventListener('submit', function (event) {
                        event.preventDefault();
                        if (form.checkValidity() === false) {
                            event.stopPropagation();
                        } else {
                            /*Begin*/

                            $('#contact-form .submit').attr('disabled', true);
                            // $('#contact-form').append(
                            //     '<div class="inner-loading"><div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'
                            // );

                            /* Form Submit */
                            $.ajax({
                                type: "POST",
                                url: './assets/js/contactengine.php',
                                data: $('#contact-form')
                                    .serialize()
                            }).done(function (data) {
                                console.log(data)
                                //callback which can be used to show a thank you message
                                //and reset the form
                                setTimeout(function () {
                                    $('#contact-form .submit')
                                        .attr(
                                            'disabled',
                                            false);
                                    $('#contactForm')[0]
                                        .reset();
                                    // $('.inner-loading')
                                    //     .remove();
                                }, 5000);

                            });




                            /*End*/
                        }

                    }, false);
                });
            }, false);
        })();
    