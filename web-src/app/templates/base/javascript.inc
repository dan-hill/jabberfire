<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="{{ config.PLUGIN }}respond.min.js"></script>
<script src="{{ config.PLUGIN }}excanvas.min.js"></script>
<![endif]-->
<script src="{{ config.PLUGIN }}jquery.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery-migrate.min.js" type="text/javascript"></script>
<!-- IMPORTANT! Load jquery-ui.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="{{ config.PLUGIN }}jquery-ui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"
        type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery.blockui.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery.cokie.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="{{ config.PLUGIN }}flot/jquery.flot.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}flot/jquery.flot.resize.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}flot/jquery.flot.categories.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery.pulsate.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}bootstrap-daterangepicker/moment.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
<!-- IMPORTANT! fullcalendar depends on jquery-ui.min.js for drag & drop support -->
<script src="{{ config.PLUGIN }}fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery-easypiechart/jquery.easypiechart.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jquery.sparkline.min.js" type="text/javascript"></script>

                <script src="{{ config.PLUGIN }}jquery.pjax.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}list.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}list.pagination.min.js" type="text/javascript"></script>
<script src="{{ config.PLUGIN }}jstree/dist/jstree.min.js" type="text/javascript"></script>




<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="{{ config.JS }}metronic.js" type="text/javascript"></script>
<script src="{{ config.JS }}layout.js" type="text/javascript"></script>
<script src="{{ config.JS }}quick-sidebar.js" type="text/javascript"></script>
<script src="{{ config.JS }}demo.js" type="text/javascript"></script>
<script src="{{ config.JS }}index.js" type="text/javascript"></script>
<script src="{{ config.JS }}tasks.js" type="text/javascript"></script>
<script src="{{ config.JS }}ccmh.js" type="text/javascript"></script>

<!-- END PAGE LEVEL SCRIPTS -->
<script>
    jQuery(document).ready(function () {
        Metronic.init(); // init metronic core componets
        Layout.init(); // init layout
        QuickSidebar.init(); // init quick sidebar
        Demo.init(); // init demo features
        Index.init();
        Index.initDashboardDaterange();
        Index.initJQVMAP(); // init index page's custom scripts
        Index.initCalendar(); // init index page's custom scripts
        Index.initCharts(); // init index page's custom scripts
        Index.initChat();
        Index.initMiniCharts();
        Tasks.initDashboardWidget();
        CCMH.init();


    });
</script>
<!-- END JAVASCRIPTS -->