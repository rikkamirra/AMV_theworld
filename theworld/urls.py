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
import articles.views as articles

urlpatterns = [
    url(r'^registration/', userapp.create_user),
    url(r'^login/', userapp.login_user),
    url(r'^logout/', userapp.logout_user),
    url(r'^account/worlds', userapp.get_worlds),

    url(r'^worlds/new', world.create_world),
    url(r'^worlds/(?P<world_id>\d+)/delete', world.delete_world),
    url(r'^worlds/(?P<world_id>\d+)', world.get_world),
    url(r'^worlds/all', world.get_worlds),

    url(r'^categories/new', world.create_category),
    url(r'^categories/(?P<category_id>\d+)/delete', world.delete_category),
    url(r'^categories/(?P<parent_id>\d+)/children', world.get_children),
    url(r'^categories/(?P<category_id>\d+)', world.get_category),

    url(r'^articles/new', articles.create_article),
    url(r'^articles/category/(?P<category_id>\d+)', articles.get_articles_by_category),
    # url(r'^artickes/(?P<article_id>\d+)', world.get_article),
    url(r'^articles/(?P<article_id>\d+)/edit', articles.edit_article),
    url(r'^articles/(?P<article_id>\d+)/delete', articles.delete_article),
    url(r'^articles/all', articles.get_all_articles),
    url(r'^articles/add_category', articles.add_category),

    url(r'^admin/', admin.site.urls),

    url(r'^.*$', userapp.index),
]
