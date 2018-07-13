from django.conf.urls import url

from .view import CategoryViewSet


category_list = CategoryViewSet.as_view({
    'get': 'list',
    'post': 'create'
});

category_detail = CategoryViewSet.as_view({
    'get': 'retrieve',
    'delete': 'destroy'
});

print_category = CategoryViewSet.as_view({
    'get': 'print_category'
});


urlpatterns = [
    url(r'^worlds/categories/?$', category_list),
    url(r'^worlds/categories/(?P<pk>\d+)/?$', category_detail),
    url(r'^worlds/categories/(?P<pk>\d+)/print', print_category)
]
