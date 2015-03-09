{% extends "base/base.html" %}
{% block body %}
    <!-- START USER MANAGEMENT CONTENT -->
    <div id="pjax-content" data-js="user_management">

        <!-- START LIST AND LIST FUNCTIONS CONTAINER -->
        <div id="user-list">

            <!-- START LIST TOOLS -->
            <div class="row">

                <!-- START SEARCH BOX -->
                <div class="col-md-4">
                    <div class="form-group">
                        <div class="input-group">
                            <input type="search" class="form-control search" placeholder="">
                            <span class="input-group-addon"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
                <!-- END SEARCH BOX -->

                <!-- START ACTIONS BUTTON -->
                <div class="col-md-2 col-md-offset-6">
                    <div class="btn-group pull-right">
                        <button class="btn blue dropdown-toggle" type="button" data-toggle="dropdown"
                                aria-expanded="false">
                            Actions <i class="fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu" role="menu">
                            <li><a data-toggle="modal" href="#add-user">Add User</a></li>
                            <li><a href="#">Deactivate Selected</a></li>
                        </ul>
                    </div>
                </div>
                <!-- END ACTIONS BUTTON -->
            </div>
            <!-- END LIST TOOLS -->

            <!-- START USER LIST CONTAINER -->
            <div class="row">

                <!-- START USER LIST -->
                <ul class="list portlet-list">

                    {% for user in USERS %}
                        <!-- START LIST ITEM -->
                        <li>

                            <!-- START PORTLET -->
                            <div class="portlet box">

                                <!-- START PORTLET HEADER BAR -->
                                <div class="portlet-title">

                                    <!-- START NAME -->
                                    <div class="caption">
                                        <i class="fa fa-square-o list-checkbox"></i>
                                        <span class="name">{{ user.full_name }}</span>
                                    </div>
                                    <!-- END NAME -->

                                    <!-- START TOOLS -->
                                    <div class="tools">
                                        <a href="javascript:;" class="expand" data-original-title="" title="">
                                        </a>
                                        <a href="javascript:;" class="reload" data-original-title="" title="">
                                        </a>
                                        <a href="javascript:;" class="tool-test" data-original-title="" title="">
                                            <i class="fa fa-pencil"></i>
                                        </a>
                                    </div>
                                    <!-- END TOOLS -->

                                </div>
                                <!-- END PORTLET HEADER BAR -->

                                <!-- START PORTLET BODY -->
                                <div class="portlet-body display-hide">
                                    <strong>User Information</strong>

                                    <p>User information goes in here... Especially info that we want to sort and filter
                                        by.</p>
                                </div>
                                <!-- END PORTLET BODY -->

                            </div>
                            <!-- END PORTLET -->

                        </li>
                        <!-- END LIST ITEM -->

                    {% endfor %}

                </ul>
                <!-- END USER LIST -->
            </div>
            <!-- END USER LIST CONTAINER -->

        </div>
        <!-- END LIST AND LIST FUNCTIONS CONTAINER -->

        <div id="add-user" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title">Add a New User</h4>
                    </div>
                    <div class="modal-body">
                        <form action="#" class="form-horizontal">
                            <div class="form-body">

                                <!-- START USERNAME -->
                                <div class="form-group">

                                    <label class="col-md-4 control-label">Username</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                            <input type="text" class="form-control" placeholder="username">
                                        </div>
                                    </div>
                                </div>
                                <!-- END USERNAME -->

                                <!-- START PASSWORD -->
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Password</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                            <input type="password" class="form-control" placeholder="Password">
                                        </div>
                                    </div>
                                </div>
                                <!-- END PASSWORD -->

                                <!-- START EMAIL  ADDRESS -->
                                <div class="form-group">
                                    <label class="col-md-4 control-label">Email Address</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
															<span class="input-group-addon">
															<i class="fa fa-envelope"></i>
															</span>
                                            <input type="email" class="form-control" placeholder="Email Address">
                                        </div>
                                    </div>
                                </div>
                                <!-- END EMAIL  ADDRESS -->

                                <!-- START EMPLOYEE ID -->
                                <div class="form-group">

                                    <label class="col-md-4 control-label">Employee ID</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Employee ID Code">
                                        </div>
                                    </div>
                                </div>
                                <!-- END EMPLOYEE ID -->

                                <div class="form-group">
                                    <label class="col-md-3 control-label">Left Icon</label>

                                    <div class="col-md-4">
                                        <div class="input-icon">
                                            <i class="fa fa-bell-o"></i>
                                            <input type="text" class="form-control" placeholder="Left icon">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">Right Icon</label>

                                    <div class="col-md-4">
                                        <div class="input-icon right">
                                            <i class="fa fa-microphone"></i>
                                            <input type="text" class="form-control" placeholder="Right icon">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">Input With Spinner</label>

                                    <div class="col-md-4">
                                        <input type="password" class="form-control spinner" placeholder="Password">
                                    </div>
                                </div>
                                <div class="form-group last">
                                    <label class="col-md-3 control-label">Static Control</label>

                                    <div class="col-md-4">
                                        <p class="form-control-static">
                                            email@example.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn default">Close</button>
                        <button type="button" class="btn green">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- END USER MANAGEMENT CONTAINER -->


{% endblock %}