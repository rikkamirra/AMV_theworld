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

from rest_framework.urlpatterns import format_suffix_patterns

from django.contrib import admin
import user.views as userapp
import construct.views as world
import articles.views as articles

from construct.views import WorldItem, WorldList, CategoryList, CategoryItem
from articles.views import ArticleList, ArticleItem
from user.views import AccountPictureItem


urlpatterns = [
    url(r'^registration/', userapp.create_user),
    url(r'^login/', userapp.login_user),
    url(r'^logout/', userapp.logout_user),
    url(r'^user/?$', userapp.get_info),
    url(r'^account/pictures', AccountPictureItem.as_view()),

    url(r'^worlds/?$', world.WorldList.as_view()),
    url(r'^worlds/(?P<world_id>\d+)/?$', WorldItem.as_view()),
    url(r'^worlds/categories/?$', CategoryList.as_view()),
    url(r'^worlds/categories/(?P<category_id>\d+)/?$', CategoryItem.as_view()),
    url(r'^worlds/categories/children/(?P<parent_id>\d+)/?$', world.get_children),

    url(r'^articles/$', ArticleList.as_view()),
    url(r'^articles/(?P<article_id>\d+)/?$', ArticleItem.as_view()),

    url(r'^articles_by_category/(?P<category_id>\d+)', articles.get_articles_by_category),
    url(r'^articles_by_world/(?P<world_id>\d+)', articles.get_articles_by_world),
    url(r'^articles/add_category', articles.add_category),

    url(r'^admin/', admin.site.urls),

    url(r'^.*$', userapp.index),
]

urlpatterns = format_suffix_patterns(urlpatterns)
