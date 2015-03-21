<!-- START REGISTRATION FORM -->
        <form class="register-form" action="index.html" method="post">

            <!-- START INSTRUCTIONS -->
            <p class="hint">
                Enter your personal details below:
            </p>
            <!-- END INSTRUCTIONS -->

            <!-- START FIRST NAME -->
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">First Name</label>
                <input class="form-control placeholder-no-fix text-field" type="text" placeholder="First Name"
                       name="first-name"/>
            </div>
            <!-- END FIRST NAME -->

            <!-- START LAST NAME -->
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">Last Name</label>
                <input class="form-control placeholder-no-fix text-field" type="text" placeholder="Last Name"
                       name="last-name"/>
            </div>
            <!-- END FIRST NAME -->

            <!-- START EMPLOYEE ID -->
            <div class="form-group">
                <label class="control-label visible-ie8 visible-ie9">Employee ID</label>
                <input class="form-control placeholder-no-fix text-field" type="text" autocomplete="off"
                       placeholder="Employee ID" name="employee-id"/>
            </div>
            <!-- END EMPLOYEE ID -->

            <!-- START EMAIL -->
            <div class="form-group">
                <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                <label class="control-label visible-ie8 visible-ie9">Email</label>
                <input class="form-control placeholder-no-fix text-field" type="text" placeholder="Email" name="email"/>
            </div>
            <!-- END EMAIL -->

            <!-- START TERMS AND POLICIES -->
            <div class="form-group margin-top-20 margin-bottom-20">

                <!-- START TERMS OF SERVICE AND PRIVACY POLICY CHECK BOXES -->
                <label class="check">
                    <input type="checkbox" name="tnc"/> I agree to the <a href="#">
                    Terms of Service </a>
                    & <a href="#">
                    Privacy Policy </a>
                </label>
                <!-- END TERMS OF SERVICE AND PRIVACY POLICY CHECK BOXYES -->

                <!-- START TERMS ERROR -->
                <div id="register_tnc_error">
                </div>
                <!-- END TERMS ERROR -->

            </div>
            <!-- TERMS AND POLICIES -->

            <!-- START BUTTONS -->
            <div class="form-actions">
                <button type="button" id="register-back-btn" class="btn btn-default">Back</button>
                <button type="submit" id="register-submit-btn" class="btn btn-success uppercase pull-right">Submit
                </button>
            </div>
            <!-- END BUTTONS -->

        </form>
        <!-- END REGISTRATION FORM -->
