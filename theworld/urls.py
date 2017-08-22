"""theworld URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import user.views as userapp
import construct.views as world

urlpatterns = [
    url(r'^registration/', userapp.create_user),
    url(r'^login/', userapp.login_user),
    url(r'^logout/', userapp.logout_user),

    url(r'^world/', world.world),
    # url(r'^world/(?P<tag_id>\d+)', world.get_world)
    # url(r'^world/category/', world.category),
    # url(r'^world/category/(?P<tag_id>\d+)', world.get_category),
    # url(r'^world/article/', world.article),
    # url(r'^world/article/(?P<tag_id>\d+)', world.get_article),

    url(r'^admin/', admin.site.urls),

    url(r'^.*$', userapp.index),
]
