<!-- START LOGIN FORM -->
        <form class="login-form">

            <!-- START INPUT ERROR ALERT -->
            <div class="alert alert-danger display-hide">
                <button class="close" data-close="alert"></button>
                <span> Enter any username and password. </span>
            </div>
            <!-- END INPUT ERROR ALERT -->

            <!-- START USERNAME INPUT -->
            <div class="form-group">
                <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                <label class="control-label visible-ie8 visible-ie9">Username</label>
                <input class="form-control form-control-solid placeholder-no-fix text-field" type="text"
                       autocomplete="off"
                       placeholder="Username" name="username"/>
            </div>
            <!-- END USERNAME INPUT -->

            <!-- START PASSWORD INPUT -->
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">Password</label>
                <input class="form-control form-control-solid placeholder-no-fix text-field" type="password"
                       autocomplete="off"
                       placeholder="Password" name="password"/>
            </div>
            <!-- END PASSWORD INPUT -->

            <!-- START SUBMIT BUTTON -->
            <div class="form-actions">
                <button type="submit" class="btn btn-success uppercase">Login</button>
            </div>
            <!-- END SUBMIT BUTTON -->

            <!-- START REQUEST ACCESS / FORGOT PASSWORD FORM GROUP -->
            <div class="form-actions">

                <!-- START REQUEST ACCESS LINK -->
                <!-- TODO Pull the register-button jquery from metronic.js and fix semantics -->
                <div class="pull-left forget-password-block">
                    <a href="javascript:;" id="register-btn" class="forget-password register-btn">Request Access</a>
                </div>
                <!-- END REQUEST ACCESS LINK -->

                <!-- START FORGOT PASSWORD LINK -->
                <div class="pull-right forget-password-block">
                    <a href="javascript:;" id="forget-password" class="forget-password">Forgot Password?</a>
                </div>
                <!-- END FORGOT PASSWORD LINK -->

            </div>
            <!-- END REQUEST ACCESS / FORGOT PASSWORD FORM GROUP -->

        </form>
        <!-- END LOGIN FORM -->