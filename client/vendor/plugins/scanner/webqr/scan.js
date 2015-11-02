$(document).ready(function($){

 /**
  * function to load a given css file
  */
 loadCSS = function(href) {
   $.get(href, function(css)
   {
      $('<style type="text/css"></style>')
         .html(css)
         .appendTo("head");
   });
 };

/**
 *function to load a given js file
 */
 loadJS = function(src) {
     var jsLink = $("<script type='text/javascript' src='"+src+"'>");
     $("head").append(jsLink);
     //alert("type")
 };
 var qrCodeHTML=$('<div id="scanQrCode"></div>');
 $('body').append(qrCodeHTML);

});
