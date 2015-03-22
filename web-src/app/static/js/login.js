var Login = function () {

    var handleLogin = function () {

        $(".login-form").bind('submit', function (e) {
            // prevent page refresh
            e.preventDefault();
            // post the data

            var login = $.ajax({
                type: "POST",
                data: $(".login-form").serialize(),
                url: $(location).attr('href')
            });

            login.done(function (data) {
                var vars = [], hash;
                var q = document.URL.split('?')[1];
                if (q != undefined) {
                    q = q.split('&');
                    for (var i = 0; i < q.length; i++) {
                        hash = q[i].split('=');
                        vars.push(hash[1]);
                        vars[hash[0]] = hash[1];
                    }
                    window.location.href = vars['next'];
                }
                window.location.href = encodeURIComponent('/');

            });

            login.fail(function (data) {
                $.fn.getType = function () {
                    return this[0].tagName == "INPUT" ? this[0].type.toLowerCase() : this[0].tagName.toLowerCase();
                };

                // Reset to non-error conditions
                $('.login-form input').each(function () {
                    if ($(this).getType() == 'text' || $(this).getType() == 'password') {
                        $(this).removeClass('input-error');
                        $(this).addClass('text-field');
                    }
                });

                // Clear the error alert messages
                $('.login-form .alert span').each(function () {
                    $(this).remove();
                });

                var errors = $.parseJSON(data.responseText)['results'];

                errors.forEach(function (data) {
                    var element = $('.login-form [name=' + data['field'] + ']');

                    if (element.getType() == 'text' || element.getType() == 'password') {
                        element.removeClass('text-field');
                        element.addClass('input-error');
                    }

                    var alert = $('.login-form .alert');

                    alert.show();

                    // TODO Make errors into a list so they can be styled more effectivly.
                    alert.append('<span>*' + data['message'] + '<br/></span>');

                });
            });
        });

    };

    var handleForgetPassword = function () {
        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },

            messages: {
                email: {
                    required: "Email is required."
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit

            },

            highlight: function (element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function (form) {
                form.submit();
            }
        });

        $('.forget-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        jQuery('#forget-password').click(function () {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    };

    var handleRegister = function () {

        $(".register-form").bind('submit', function (e) {
            // prevent page refresh
            e.preventDefault();
            // post the data

            var register = $.ajax({
                type: "POST",
                data: $(".register-form").serialize(),
                url: "/request-access"
            });

            register.done(function (data) {
                console.log('success!')
            });

            register.fail(function (data) {
                $.fn.getType = function () {
                    return this[0].tagName == "INPUT" ? this[0].type.toLowerCase() : this[0].tagName.toLowerCase();
                };

                // Reset to non-error conditions
                $('.register-form input').each(function () {
                    if ($(this).getType() == 'text') {
                        $(this).removeClass('input-error');
                        $(this).addClass('text-field');
                    }
                });

                // Clear the error alert messages
                $('.register-form .alert span').each(function () {
                    $(this).remove();
                });

                var errors = $.parseJSON(data.responseText)['results'];

                errors.forEach(function (data) {
                    var element = $('[name=' + data['field'] + ']');

                    if (element.getType() == 'text') {
                        element.removeClass('text-field');
                        element.addClass('input-error');
                    }

                    var alert = $('.register-form .alert');

                    alert.show();
                    alert.append('<span>' + data['message'] + '</span>');

                });
            });
        });

        jQuery('#register-btn').click(function () {
            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function () {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    }

    return {
        //main function to initiate the module
        init: function () {

            handleLogin();
            handleForgetPassword();
            handleRegister();

        }

    };

}();