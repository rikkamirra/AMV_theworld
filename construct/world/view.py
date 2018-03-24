from construct.category.model import Category
from .model import World
from articles.article.model import Article
from user.models import Picture
from .serializer import WorldSerializer
from construct.category.serializer import CategorySerializer
from articles.article.serializer import ArticleSerializer

from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class WorldList(generics.ListCreateAPIView):
    queryset = World.objects.all()
    serializer_class = WorldSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        if not self.request.user.is_constructor:
            self.request.user.is_constructor = True
            self.request.user.save()
        super().perform_create(serializer)


class WorldItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = World.objects.all()
    serializer_class = WorldSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def perform_update(self, serializer):
        print(self.request.parser_context['kwargs'])
        super().perform_update(serializer)
        if self.request.data.get('picture'):
            Picture.objects.update(
                [self.request.data.get('picture')],
                owner=self.request.user,
                instance_type='world',
                instance_id=self.request.parser_context['kwargs']['pk'],
                redirect=f'/constructor/{self.request.parser_context["kwargs"]["pk"]}'
            )
