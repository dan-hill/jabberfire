var CCMH = (function(window, document, $) {
    var socket;
    socket = io.connect('http://' + document.domain + ':' + location.port + '/#');

    var show_admin_menu = function() {
        $(document).ready(function(){
            socket.emit('request-admin-menu');
        });
    };

    var request_current_username = function() {
        socket.emit('request-current-username')
    };

    var set_current_username = function() {
        socket.on('response-current-username', function(data) {
            $('.username').text(data['username']);
        })
    };

    var handle_user_is_admin = function() {
      socket.on('response-user-is-admin', function(data) {
        $('.page-sidebar-menu').append(data['html']['admin-menu-entry'])
      })
    };

    return {

        init: function() {
            show_admin_menu();
            request_current_username();
            set_current_username();
            handle_user_is_admin();
        },

        base: function() {

        }
    };
})(window, document, jQuery);