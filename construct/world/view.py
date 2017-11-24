from django.http import HttpResponse, JsonResponse

from construct.category.model import Category
from .model import World

from articles.article.model import Article
from user.models import Picture
from .serializer import WorldSerializer
from construct.category.serializer import CategorySerializer
from articles.article.serializer import ArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response

from theworld.decorators import set_instance


class WorldList(APIView):
    def get(self, request):
        worlds = World.objects.filter(is_private=False)
        serializer = WorldSerializer(worlds, many=True)
        response = Response(serializer.data)
        return response

    def post(self, request):
        if not request.user.is_constructor:
            request.user.is_constructor = True
            request.user.save()

        serializer = WorldSerializer(data=request.POST)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class WorldItem(APIView):
    @set_instance('World')
    def get(self, request, world):
        serializer = WorldSerializer(world)
        response = Response(serializer.data)
        if world.is_private:
            response['Crypt'] = 'Crypt'
        return response

    @set_instance('World', need_auth=True)
    def put(self, request, world):
        serializer = WorldSerializer(world, data=request.data)
        if serializer.is_valid():
            serializer.save()
            if request.data.get('picture'):
                Picture.objects.update(
                    [request.data.get('picture')],
                    owner=request.user,
                    instance_type='world',
                    instance_id=world.id,
                    redirect="/constructor/"+str(world.id)
                    )
            response = Response(serializer.data)
            if world.is_private:
                response['Crypt'] = 'Crypt'
            return response
        return Response(serializer.errors, status=400)

    @set_instance('World', need_auth=True)
    def delete(self, request, world):
        world.delete()
        return Response(status=200)
