<li class="">
    <a href="{{ TARGET }}">
        <i class="icon-home"></i>
        <span class="title">{{ MENU_ITEM_TITLE }}</span>
        {%  if HAS_SUBMENU == True %}
        <span class="arrow"></span>
        {% endif %}
    </a>
    {%  if HAS_SUBMENU == True %}
    <ul class="sub-menu">
        <li data-item="user_management"><a href="/admin/user-management"><i class="fa fa-users"></i> <span class="title">User Management</span></a></li>
	</ul>
    {% endif %}
</li>