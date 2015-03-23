
                        <!-- START LIST ITEM -->
                        <li data-username="{{ username }}">

                            <!-- START PORTLET -->
                            <div class="portlet box">

                                <!-- START PORTLET HEADER BAR -->
                                <div class="portlet-title">

                                    <!-- START NAME -->
                                    <div class="caption">
                                        <i class="fa fa-square-o list-checkbox"></i>
                                        <span class="name">{{ fullname }}</span>
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

                            <div class="actions">
								<div class="btn-group btn-group-devided" data-toggle="buttons">
								    {% if status == 'active' %}
									<label class="btn btn-circle btn-transparent green btn-sm active">
									<input type="radio" name="options" class="toggle" id="option1">Active</label>
								    {% endif %}

								    {% if status == 'pending' %}
									<label class="btn btn-circle btn-transparent yellow btn-sm active">
									<input type="radio" name="options" class="toggle" id="option1">Pending</label>
								    {% endif %}

								 	{% if status == 'inactive' %}
									<label class="btn btn-circle btn-transparent grey-cararra btn-sm active">
									<input type="radio" name="options" class="toggle" id="option1">Inactive</label>
								    {% endif %}

								    {% if status == 'rejected' %}
									<label class="btn btn-circle btn-transparent red btn-sm active">
									<input type="radio" name="options" class="toggle" id="option1">Rejected</label>
								    {% endif %}
								</div>
							</div>
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
