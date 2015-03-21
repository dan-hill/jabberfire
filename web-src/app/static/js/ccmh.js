var CCMH = (function (window, document, $) {
    var socket;
    socket = io.connect('http://' + document.domain + ':' + location.port + '/#');

    var page_initializers = {
        user_management: (function () {

            var handle_user_list = function () {
                socket.on('response-user-list', function (data) {
                })
            };

            var user_list_pagination = function () {
                var options = {
                    valueNames: ['name', 'city']
                };

                var user_list = new List('user-list', options);
            };

            var handle_tooltips = function () {
                $('.portlet > .portlet-title > .tools > .tool-test').tooltip({
                    container: 'body',
                    title: 'Test'
                });
            };

            var handle_list_item_selection = function () {
                $('.list-checkbox').on('click', function () {
                    if ($(this).hasClass('fa-square-o')) {
                        $(this).removeClass('fa-square-o').addClass('fa-check-square-o');
                    } else {
                        $(this).removeClass('fa-check-square-o').addClass('fa-square-o');
                    }
                });
            };

            var handleSample1 = function () {
                var False = 'false'
                $('#tree_1').jstree({
                    "core": {
                        "themes": {
                            "responsive": false
                        },
                        'data': {
                            'a_attr': {},
                            'children': [{
                                'a_attr': {},
                                'children': [{
                                    'a_attr': {},
                                    'children': [],
                                    'icon state': {
                                        'disabled': False,
                                        'opened': False,
                                        'selected': False
                                    },
                                    'id': 8,
                                    'li_attr': {},
                                    'text': 'Maternity'
                                },
                                    {
                                        'a_attr': {},
                                        'children': [],
                                        'icon state': {
                                            'disabled': False,
                                            'opened': False,
                                            'selected': False
                                        },
                                        'id': 9,
                                        'li_attr': {},
                                        'text': 'Lobby'
                                    }],
                                'icon state': {
                                    'disabled': False,
                                    'opened': False,
                                    'selected': False
                                },
                                'id': 2,
                                'li_attr': {},
                                'text': 'Emergency Room'
                            },
                                {
                                    'a_attr': {},
                                    'children': [{
                                        'a_attr': {},
                                        'children': [],
                                        'icon state': {
                                            'disabled': False,
                                            'opened': False,
                                            'selected': False
                                        },
                                        'id': 10,
                                        'li_attr': {},
                                        'text': 'Goiders'
                                    }],
                                    'icon state': {
                                        'disabled': False,
                                        'opened': False,
                                        'selected': False
                                    },
                                    'id': 3,
                                    'li_attr': {},
                                    'text': 'Intensive Care Unit'
                                }],
                            'icon state': {'disabled': False, 'opened': False, 'selected': False},
                            'id': 1,
                            'li_attr': {},
                            'text': 'CCMH Main'
                        }

                    },
                    "types": {
                        "default": {
                            "icon": "fa fa-hospital-o icon-state-default icon-lg"
                        },
                        "file": {
                            "icon": "fa fa-hospital-o icon-state-success icon-lg"
                        }
                    },
                    "plugins": ["types"]
                });

                // handle link clicks in tree nodes(support target="_blank" as well)
                $('#tree_1').on('select_node.jstree', function (e, data) {
                    var link = $('#' + data.selected).find('a');
                    if (link.attr("href") != "#" && link.attr("href") != "javascript:;" && link.attr("href") != "") {
                        if (link.attr("target") == "_blank") {
                            link.attr("href").target = "_blank";
                        }
                        document.location.href = link.attr("href");
                        return false;
                    }
                });
            };

            var handle_add_user_modal_submit_button = function () {
                $('.submit').on('click', function () {
                    var data = {};
                    $('#add-user-form .form-control').each(function () {
                        data[$(this).attr('name')] = $(this).val();
                    });
                    socket.emit('add-user', data)
                });
            };


            return {
                init: function () {
                    handle_user_list();
                    user_list_pagination();
                    handle_tooltips();
                    handle_list_item_selection();
                    handleSample1()
                    handle_add_user_modal_submit_button();
                }
            };
        })(),

        dashboard: (function () {
            return {
                init: function () {

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
            update_menu_selection_indicator()
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
            update_menu_selection_indicator()
        })
    };

    var update_menu_selection_indicator = function () {
        $('.page-sidebar-menu>li, .sub-menu>li').each(function() {
            var menu_id = $(this)[0].getAttribute('data-item');
            var page_id = $('#pjax-content')[0].getAttribute('data-js');
            if(menu_id == page_id){

                $(this).parents('li').addClass('active open');
                var m = $(this.parentNode).parents('li');

                m.find('a').append('<span class="selected"></span>');
                $(this).addClass('active');

                m.find('.arrow').addClass('open')

            } else {
                $(this).parents('li').removeClass('active open');
                var m = $(this.parentNode).parents('li');

                m.find('selected').remove();
                $(this).removeClass('active');
            }
        });


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