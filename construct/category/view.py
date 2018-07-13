from django.http import HttpResponse, JsonResponse

from .model import Category
from construct.world.model import World
from articles.article.model import Article
from user.models import Picture

from construct.world.serializer import WorldSerializer
from .serializer import CategorySerializer

from articles.article.serializer import ArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from rest_framework import viewsets
from rest_framework.decorators import action

from theworld.decorators import set_instance


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def filter_queryset(self, queryset):
        if self.request.GET.get('parent'):
            return queryset.filter(
                parent_id=self.request.GET.get('parent'))
        else:
            return queryset

    def create(self, request):
        world = World.objects.get(pk=request.POST.get('world'))
        if world.author.pk != request.user.pk:
            return Response(status=401)
        serialize = self.serializer_class(data=request.POST)
        if serialize.is_valid():
            serialize.save()
            categories = self.queryset.filter(
                world=World.objects.get(pk=request.POST['world']),
                parent_id=request.data.get('parent_id')
            )
            serialized_categories = self.serializer_class(categories, many=True)
            return Response(serialized_categories.data)
        return Response(serialize.errors, status=400)

    def perform_destroy(self, instance):
        def _delete_category(category_id):
            category = Category.objects.get(pk=category_id)
            category.articles.remove()
            category.delete()
            children = Category.objects.filter(parent_id=category_id);
            for child in children:
                delete_category(child.pk)

        _delete_category(instance.id)
        Article.objects.clear()
        return Response({})

    @action(methods=['GET'], detail=False)
    def print_category(self, request, pk):
        root_category = Category.objects.get(pk=pk)

        return Response({'text': root_category.print_category()})
