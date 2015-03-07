var CCMH = (function(window, document, $) {
    var socket;
    socket = io.connect('http://' + document.domain + ':' + location.port + '/#');

    var show_admin_menu = function() {
        $(document).ready(function(){
            socket.emit('request-admin-menu');
        });
    };


    return {

        init: function() {
            show_admin_menu()
        },

        base: function() {

        }
    };
})(window, document, jQuery);