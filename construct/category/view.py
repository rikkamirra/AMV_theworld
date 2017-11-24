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

from theworld.decorators import set_instance


class CategoryList(APIView):
    def post(self, request):
        world = World.objects.get(pk=request.POST.get('world'))
        if world.author.pk != request.user.pk:
            return Response(status=401)
        serialize = CategorySerializer(data=request.POST)
        if serialize.is_valid():
            serialize.save()
            categories = Category.objects.filter(
                world=World.objects.get(pk=request.POST['world']),
                parent_id=request.POST.get('parent_id')
                )
            serialized_categories = CategorySerializer(categories, many=True)
            return Response(serialized_categories.data)
        return Response(serialize.errors, status=400)


class CategoryItem(APIView):
    @set_instance('Category')
    def get(self, request, category):
        chain = []
        chain.append(category)
        while True:
            category = Category.objects.get(pk=category.parent_id)
            chain.append(category)
            if category.parent_id == 0:
                break
        serialize = CategorySerializer(chain, many=True)
        return JsonResponse(serialize.data, safe=False)

    @set_instance('Category', need_auth=True)
    def put(self, request, category):
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    @set_instance('Category', need_auth=True)
    def delete(self, request, category):
        def delete_category(category_id):
            category = Category.objects.get(pk=category_id)
            category.articles.remove()
            category.delete()
            children = Category.objects.filter(parent_id=category_id);
            for child in children:
                delete_category(child.pk)

        delete_category(category.id)
        Article.objects.clear()
        return Response({})



def get_children(request, parent_id):
    children = Category.objects.filter(parent_id=parent_id)
    serialize = CategorySerializer(children, many=True)
    return JsonResponse(serialize.data, safe=False)
