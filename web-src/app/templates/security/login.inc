<!DOCTYPE html>
<!--[if IE 8]>
<html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
<!--<![endif]-->

<!-- START HEAD -->
<head>
    <meta charset="utf-8"/>

    <!-- TODO Pull the site and page titles into the template using variables. -->
    <title>CCMH IT Asset Management System | Login</title>

    <!-- TODO Pull in description and author data into the template -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta content="{{ DESCRIPTION }}" name="description"/>
    <meta content="{{ AUTHOR }}" name="author"/>

    <!-- TODO Trim down the css to a minimum number of imports. -->
    <!-- START GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/>
    <link href="{{ config.PLUGIN }}simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->

    <!-- START PAGE LEVEL STYLES -->
    <link href="{{ config.CSS }}login/login.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL SCRIPTS -->

    <!-- START THEME STYLES -->
    <link href="{{ config.CSS }}components.css" id="style_components" rel="stylesheet" type="text/css"/>
    <link href="{{ config.CSS }}plugins.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.CSS }}layout.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.CSS }}themes/darkblue.css" rel="stylesheet" type="text/css" id="style_color"/>
    <link href="{{ config.CSS }}custom.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME STYLES -->

    <!-- TODO Get Multimedia Team to create a custom favicon -->
    <!-- START FAVICON -->
    <link rel="shortcut icon" href="favicon.ico"/>
    <!-- END FAVICON -->

    <script type="text/javascript"
            src="//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js"></script>
</head>
<!-- END HEAD -->


<!-- START BODY -->
<body class="login">

<!-- START SIDEBAR TOGGLER BUTTON -->
<div class="menu-toggler sidebar-toggler"></div>
<!-- END SIDEBAR TOGGLER BUTTON -->


<!-- START LOGIN -->
<div class="border-div">

    <!-- START FORMS CONTAINER -->
    <div class="content">

        <!-- START LOGO -->
        <div class="logo">
            <a href="/">
                <img src="{{ config.IMG }}ccmh/ccmh-pantone-300.png" alt=""/>
            </a>
        </div>
        <!-- END LOGO -->

        {% include 'security/login_form.inc' %}

        {% include 'security/forgot_form.inc' %}

        {% include 'security/request_form.inc' %}

    </div>
    <!-- END FORMS CONTAINER -->

</div>
<!-- END LOGIN -->

<!-- START COPYRIGHT -->
<div class="copyright">
    2015 © Comanche County Memorial Hospital
</div>
<!-- END COPYRIGHT -->

<!-- TODO Trim out any extranious javascript that is being included. -->
<!-- START JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- START CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="{{ config.PLUGIN }}respond.min.js"></script>
<script src="{{ config.PLUGIN }}excanvas.min.js"></script>
<![endif]-->
<script src="{{ config.PLUGIN }}jquery.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery-migrate.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery.blockui.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery.cokie.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}uniform/jquery.uniform.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- START PAGE LEVEL PLUGINS -->
<script src="{{ config.PLUGIN }}jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- START PAGE LEVEL SCRIPTS -->
<script src="{{ config.JS }}metronic.js" type="text/javascript"></script>
<script src="{{ config.JS }}layout.js" type="text/javascript"></script>
<script src="{{ config.JS }}demo.js" type="text/javascript"></script>
<script src="{{ config.JS }}login.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<script>
    jQuery(document).ready(function () {
        Metronic.init(); // init metronic core components
        Layout.init(); // init current layout
        Login.init();
        Demo.init();
    });
</script>
<!-- END JAVASCRIPTS -->
</body>
<!-- END BODY -->
</html>