{% extends "base/base.inc" %}
{% block page_title %}User Management{% endblock %}
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
                        <form action="#" class="form-horizontal" id="add-user-form">
                            <div class="form-body">

                                <!-- START USERNAME -->
                                <div class="form-group">

                                    <label class="col-md-4 control-label">Username</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                                            <input name='username' type="text" class="form-control" placeholder="username">
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
                                            <input name='password' type="password" class="form-control" placeholder="Password">
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
                                            <input name='email' type="email" class="form-control" placeholder="Email Address">
                                        </div>
                                    </div>
                                </div>
                                <!-- END EMAIL  ADDRESS -->

                                <!-- START FIRST NAME -->
                                <div class="form-group">

                                    <label class="col-md-4 control-label">First Name</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <input name='first-name' type="text" class="form-control" placeholder="First Name">
                                        </div>
                                    </div>
                                </div>
                                <!-- END FIRST NAME -->

                                <!-- START LAST NAME -->
                                <div class="form-group">

                                    <label class="col-md-4 control-label">Last Name</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <input name='last-name' type="text" class="form-control" placeholder="Last Name">
                                        </div>
                                    </div>
                                </div>
                                <!-- END LAST NAME -->

                                <!-- START EMPLOYEE ID -->
                                <div class="form-group">

                                    <label class="col-md-4 control-label">Employee ID</label>

                                    <div class="col-md-5">
                                        <div class="input-group">
                                            <input name='employee-id' type="text" class="form-control" placeholder="Employee ID Code">
                                        </div>
                                    </div>
                                </div>
                                <!-- END EMPLOYEE ID -->

                                <hr>

                                <!-- START DEPARTMENTS -->
                                <div class="form-group">

                                    <label class="col-md-4 control-label">Departments</label>

                                    <div class="col-md-7">

                                            <ul class="list-group" style="margin-bottom: 2px;">
                                                <li class="list-group-item">
                                                    <a href="javascript:;"><i class="fa fa-close pull-right"></i></a>
                                                    CCMH Main <i class="fa fa-arrow-right"></i>Emergency Room<i class="fa fa-arrow-right"></i>Lobby
                                                </li>
                                                <li class="list-group-item">
                                                    <a href="javascript:;"><i class="fa fa-close pull-right"></i></a>
                                                    CCMH Main<i class="fa fa-arrow-right"></i>Intensive Care Unit
                                                </li>
                                            </ul>
                                        <div class="input-group pull-right">
                                            <a data-toggle="modal" href="#add-departments"
                                               class="btn btn-icon-only green">
                                                <i class="fa fa-plus"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <!-- END DEPARTMENTS -->
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn default">Close</button>
                        <button type="button" class="btn green submit">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div id="add-departments" class="modal fade" tabindex="-1" aria-hidden="true" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                        <h4 class="modal-title">Add Departments to User</h4>
                    </div>
                    <div class="modal-body">
                        <div id="tree_1" >

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" data-dismiss="modal" class="btn default">Close</button>
                        <button type="button" class="btn green save">Save changes</button>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <!-- END USER MANAGEMENT CONTAINER -->


{% endblock %}