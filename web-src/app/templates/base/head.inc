   <meta charset="utf-8"/>
    <title>CCMH IT Asset Management System | {% block page_title %}{% endblock %}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="{{ META_DESCRIPTION}}"/>
    <meta content="" name="{{ META_AUTHOR }}"/>

    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/>
    <link href="{{ config.PLUGIN }}font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet" type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->

    <!-- BEGIN PAGE LEVEL PLUGIN STYLES -->
    <link href="{{ config.PLUGIN }}bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}fullcalendar/fullcalendar.min.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.PLUGIN }}jstree/dist/themes/default/style.min.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL PLUGIN STYLES -->

    <!-- BEGIN PAGE STYLES -->
    <link href="{{ config.CSS }}tasks.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE STYLES -->

    <!-- BEGIN THEME STYLES -->
    <!-- DOC: To use 'rounded corners' style just load 'components-rounded.css' stylesheet instead of 'components.css' in the below style tag -->
    <link href="{{ config.CSS }}components.css" id="style_components" rel="stylesheet" type="text/css"/>
    <link href="{{ config.CSS }}plugins.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.CSS }}layout.css" rel="stylesheet" type="text/css"/>
    <link href="{{ config.CSS }}themes/darkblue.css" rel="stylesheet" type="text/css" id="style_color"/>
    <link href="{{ config.CSS }}custom.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME STYLES -->

    <!-- BEGIN FAVICON -->
    <link rel="shortcut icon" href="favicon.ico"/>
    <!-- END FAVICON -->

    <script type="text/javascript"
            src="//cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js"></script>