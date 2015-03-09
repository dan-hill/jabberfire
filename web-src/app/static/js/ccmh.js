var CCMH = (function (window, document, $) {
    var socket;
    socket = io.connect('http://' + document.domain + ':' + location.port + '/#');

    var page_initializers = {
        user_management: (function () {

            var handle_user_list = function () {
                socket.on('response-user-list', function (data) {
                    console.log(data)
                })
            };

            var user_list_pagination = function () {
                var options = {
                    valueNames: ['name', 'city']
                };

                var user_list = new List('user-list', options);
            };

            var handle_tooltips = function() {
                $('.portlet > .portlet-title > .tools > .tool-test').tooltip({
                    container: 'body',
                    title: 'Test'
                });
            };

            var handle_list_item_selection = function() {
                $('.list-checkbox').on('click', function() {
                    console.log('checked box');
                    if ($(this).hasClass('fa-square-o')){
                        $(this).removeClass('fa-square-o').addClass('fa-check-square-o');
                    } else {
                        $(this).removeClass('fa-check-square-o').addClass('fa-square-o');
                    }
                });
            };
            return {
                init: function () {
                    handle_user_list();
                    user_list_pagination();
                    handle_tooltips();
                    handle_list_item_selection();
                }
            };
        })()

    };

    function execute_page_initializer() {

        if (typeof  document.getElementById('pjax-content').getAttribute('data-js') !== 'undefined') {

            /* The name of the function to excute for the current page */
            var function_name = document.getElementById('pjax-content').getAttribute('data-js');

            if (typeof page_initializers[function_name].init === 'function') {
                page_initializers[function_name].init()
            }
        }

        else {
            console.log('Undefined page handler.')
        }
    }


    var setup_pjax_container = function () {

        $(document).pjax('a', '#pjax-container');

        $('#pjax-container').on('pjax:end', function () {
            execute_page_initializer()
        });
    };

    var show_admin_menu = function () {
        $(document).ready(function () {
            socket.emit('request-admin-menu');
        });
    };

    var request_current_username = function () {
        socket.emit('request-current-username')
    };

    var set_current_username = function () {
        socket.on('response-current-username', function (data) {
            $('.username').text(data['username']);
        })
    };

    var handle_user_is_admin = function () {
        socket.on('response-user-is-admin', function (data) {
            $('.page-sidebar-menu').append(data['html']['admin-menu-entry'])
        })
    };


    /* User management functions */


    return {

        init: function () {
            setup_pjax_container();
            show_admin_menu();
            request_current_username();
            set_current_username();
            handle_user_is_admin();

            page_initializers.user_management.init()
        },

        base: function () {

        }
    };
})(window, document, jQuery);