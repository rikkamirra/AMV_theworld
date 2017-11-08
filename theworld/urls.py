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
import articles.views as articles

from construct.categories import CategoryList, CategoryItem, get_children
from construct.worlds import WorldItem, WorldList
from articles.views import ArticleList, ArticleItem
from user.views import AccountPictureItem, AccountItem #, AccountDetails
from chat.views import ChatRoomList, MessageList


urlpatterns = [
    url(r'^registration/', userapp.create_user),
    url(r'^login/', userapp.login_user),
    url(r'^logout/', userapp.logout_user),
    url(r'^user/?$', userapp.get_info),
    # url(r'^account/', AccountList.as_view()),
    url(r'^account/(?P<user_id>\d+)/?$', AccountItem.as_view()),
    url(r'^account/pictures', AccountPictureItem.as_view()),

    url(r'^chats/?', ChatRoomList.as_view()),

    url(r'^messages/(?P<room_name>[\d\w]+)/?', MessageList.as_view()),

    url(r'^worlds/?$', WorldList.as_view()),
    url(r'^worlds/(?P<world_id>\d+)/?$', WorldItem.as_view()),
    url(r'^worlds/categories/?$', CategoryList.as_view()),
    url(r'^worlds/categories/(?P<category_id>\d+)/?$', CategoryItem.as_view()),
    url(r'^worlds/categories/(?P<parent_id>\d+)/children/?$', get_children),

    url(r'^articles/(?P<article_id>\d+)/?$', ArticleItem.as_view()),

    url(r'^categories/(?P<category_id>\d+)/articles/?', ArticleList.as_view()),
    url(r'^worlds/(?P<world_id>\d+)/articles/?', articles.get_articles_by_world),
    url(r'^articles/add_category', articles.add_category),

    url(r'^admin/', admin.site.urls),

    url(r'^.*$', userapp.index),
]

urlpatterns = format_suffix_patterns(urlpatterns)
