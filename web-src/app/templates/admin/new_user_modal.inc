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

                        <!-- START FIRST NAME -->
                        <div class="form-group">

                            <label class="col-md-4 control-label">First Name</label>

                            <div class="col-md-5">
                                <div class="input-group">
                                    <input name='first-name' type="text" class="form-control"
                                           placeholder="First Name">
                                </div>
                            </div>
                        </div>
                        <!-- END FIRST NAME -->

                        <!-- START LAST NAME -->
                        <div class="form-group">

                            <label class="col-md-4 control-label">Last Name</label>

                            <div class="col-md-5">
                                <div class="input-group">
                                    <input name='last-name' type="text" class="form-control"
                                           placeholder="Last Name">
                                </div>
                            </div>
                        </div>
                        <!-- END LAST NAME -->

                        <!-- START EMAIL  ADDRESS -->
                        <div class="form-group">
                            <label class="col-md-4 control-label">Email Address</label>

                            <div class="col-md-5">
                                <div class="input-group">
															<span class="input-group-addon">
															<i class="fa fa-envelope"></i>
															</span>
                                    <input name='email' type="email" class="form-control"
                                           placeholder="Email Address">
                                </div>
                            </div>
                        </div>
                        <!-- END EMAIL  ADDRESS -->

                        <!-- START EMPLOYEE ID -->
                        <div class="form-group">

                            <label class="col-md-4 control-label">Employee ID</label>

                            <div class="col-md-5">
                                <div class="input-group">
                                    <input name='employee-id' type="text" class="form-control"
                                           placeholder="Employee ID Code">
                                </div>
                            </div>
                        </div>
                        <!-- END EMPLOYEE ID -->

                        <!-- START PASSWORD -->
                        <div class="form-group">
                            <label class="col-md-4 control-label">Password</label>

                            <div class="col-md-5">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                    <input name='password' type="password" class="form-control"
                                           placeholder="Password">
                                </div>
                            </div>
                        </div>
                        <!-- END PASSWORD -->

                        <!-- START PASSWORD CONFIRMATION-->
                        <div class="form-group">
                            <label class="col-md-4 control-label">Confirm Password</label>

                            <div class="col-md-5">
                                <div class="input-group">
                                    <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                                    <input name='confirm-password' type="password" class="form-control"
                                           placeholder="Confirm Password">
                                </div>
                            </div>
                        </div>
                        <!-- END PASSWORD CONFIRMATION-->

                        <!-- START ROLES -->
                        <div class="form-group">
                            <!-- TODO Pull the roles from the database -->
                            <label class="col-md-4 control-label">Role</label>
                            <div class="col-md-5">
                                <select class="form-control" name="role">
                                    <option value="user">User</option>
                                    <option value="technician">Technician</option>
                                    <option value="administrator">Administrator</option>
                                </select>
                            </div>
                        </div>
                        <!-- END ROLES -->

                        <!-- START STATUS -->
                        <div class="form-group">
                            <!-- TODO Pull the roles from the database -->
                            <label class="col-md-4 control-label">Status</label>
                            <div class="col-md-5">
                                <select class="form-control" name="status">
                                    <option value="pending">Pending</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="declined">Declined</option>
                                </select>
                            </div>
                        </div>
                        <!-- END STATUS -->

                        <hr>

                        <!-- START DEPARTMENTS -->
                        <div class="form-group">

                            <label class="col-md-4 control-label">Departments</label>

                            <div class="col-md-7">

                                <ul class="list-group" style="margin-bottom: 2px;">
                                    <li class="list-group-item">
                                        <a href="javascript:;"><i class="fa fa-close pull-right"></i></a>
                                        CCMH Main <i class="fa fa-arrow-right"></i>Emergency Room<i
                                            class="fa fa-arrow-right"></i>Lobby
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