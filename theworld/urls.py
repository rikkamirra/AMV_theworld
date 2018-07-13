from django.conf.urls import url

from rest_framework.urlpatterns import format_suffix_patterns

from django.contrib import admin
import user.views as userapp

# from construct.category.view import CategoryViewSet

from construct.category.urls import urlpatterns as category_routes

from construct.world.view import WorldItem, WorldList
from articles.article.view import ArticleList, ArticleItem, add_category
from articles.comment.view import CommentListView
from user.views import (
    RegistrationAPIView,
    LoginAPIView,
    AccountPictureItem,
    AccountItem
)

from admin.views import *


urlpatterns = category_routes + [
    url(r'^info/', userapp.get_info),
    url(r'^registration/', RegistrationAPIView.as_view()),
    url(r'^login/', LoginAPIView.as_view()),
    url(r'^account/(?P<pk>\d+)/?$', AccountItem.as_view()),
    url(r'^account/pictures', AccountPictureItem.as_view()),

    url(r'^worlds/?$', WorldList.as_view()),
    url(r'^worlds/(?P<pk>\d+)/?$', WorldItem.as_view()),

    url(r'^articles/(?P<pk>\d+)/?$', ArticleItem.as_view()),
    url(r'^articles/?', ArticleList.as_view()),

    url(r'^comments/?', CommentListView.as_view()),

    url(r'^articles/add_category', add_category),

    url(r'^admin/articles/?$', ArticleAdminView.as_view()),
    url(r'^admin/articles/(?P<pk>\d+)/?$', ArticleItemAdminView.as_view()),

    url(r'^admin/categories/?$', CategoryAdminView.as_view()),
    url(r'^admin/categories/(?P<pk>\d+)/?$', CategoryItemAdminView.as_view()),

    url(r'^admin/comments/?$', CommentAdminView.as_view()),
    url(r'^admin/comments/(?P<pk>\d+)/?$', CommentItemAdminView.as_view()),

    url(r'^admin/worlds/?$', WorldAdminView.as_view()),
    url(r'^admin/worlds/(?P<pk>\d+)/?$', WorldItemAdminView.as_view()),

    url(r'^admin/accounts/?$', AccountAdminView.as_view()),
    url(r'^admin/accounts/(?P<pk>\d+)/?$', AccountItemAdminView.as_view()),

    url(r'^admin/pictures/?$', PictureAdminView.as_view()),
    url(r'^admin/pictures/(?P<pk>\d+)/?$', PictureItemAdminView.as_view()),

    url(r'^admin/picture_relationships/?$', PicturesRelationshipAdminView.as_view()),
    url(r'^admin/picture_relationships/(?P<pk>\d+)/?$', PicturesRelationshipItemAdminView.as_view()),

    url(r'^.*$', userapp.index),
]

urlpatterns = format_suffix_patterns(urlpatterns)
