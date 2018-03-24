from django.conf.urls import url

from rest_framework.urlpatterns import format_suffix_patterns

from django.contrib import admin
import user.views as userapp

from construct.category.view import CategoryList, CategoryItem
from construct.world.view import WorldItem, WorldList
from construct.world.view import get_full_world
from articles.article.view import ArticleList, ArticleItem, add_category
from articles.comment.view import CommentListView
from user.views import AccountPictureItem, AccountItem, AccountList

from admin.views import ArticleAdminView, ArticleItemAdminView, CommentAdminView, CommentItemAdminView, WorldAdminView, WorldItemAdminView, CategoryAdminView, CategoryItemAdminView, AccountAdminView, AccountItemAdminView, PictureAdminView, PictureItemAdminView, PicturesRelationshipAdminView, PicturesRelationshipItemAdminView


urlpatterns = [
    url(r'^info/', userapp.get_info),
    url(r'^registration/', userapp.create_user),
    url(r'^login/', userapp.login_user),
    url(r'^logout/', userapp.logout_user),
    # url(r'^user/?$', userapp.get_info),
    url(r'^account/(?P<user_id>\d+)/?$', AccountItem.as_view()),
    url(r'^account/pictures', AccountPictureItem.as_view()),
    url(r'^accounts/$', AccountList.as_view()),

    url(r'^worlds/?$', WorldList.as_view()),
    url(r'^worlds/(?P<world_id>\d+)/?$', WorldItem.as_view()),
    url(r'^worlds/categories/?$', CategoryList.as_view()),
    url(r'^worlds/categories/(?P<category_id>\d+)/?$', CategoryItem.as_view()),

    url(r'^articles/(?P<article_id>\d+)/?$', ArticleItem.as_view()),
    url(r'^articles/?', ArticleList.as_view()),

    url(r'^comments/?', CommentListView.as_view()),

    url(r'^articles/add_category', add_category),

    url(r'^get_full_world/(?P<world_id>\d+)/?$', get_full_world),

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
