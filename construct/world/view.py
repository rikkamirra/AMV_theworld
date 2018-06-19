from construct.category.model import Category
from .model import World
from articles.article.model import Article
from user.models import Picture
from .serializer import WorldSerializer, WorldListSerializer
from construct.category.serializer import CategorySerializer
from articles.article.serializer import ArticleSerializer

from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

import cProfile
from io import StringIO
import pstats
from contextlib import contextmanager

@contextmanager
def profiled():
    pr = cProfile.Profile()
    pr.enable()
    yield
    pr.disable()
    s = StringIO()
    ps = pstats.Stats(pr, stream=s).sort_stats('cumulative')
    ps.print_stats()
    # uncomment this to see who's calling what
    # ps.print_callers()
    print(s.getvalue())



class WorldList(generics.ListCreateAPIView):
    queryset = World.objects.all()
    serializer_class = WorldListSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, *args, **kwargs):
        return super().get(*args, **kwargs)

    def perform_create(self, serializer):
        if not self.request.user.is_constructor:
            self.request.user.is_constructor = True
            self.request.user.save()
        super().perform_create(serializer)


class WorldItem(generics.RetrieveUpdateDestroyAPIView):
    queryset = World.objects.all()
    serializer_class = WorldSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, *args, **kwargs):
        with profiled():
            return super().get(*args, **kwargs)

    def perform_update(self, serializer):
        super().perform_update(serializer)
        if self.request.data.get('picture'):
            Picture.objects.update(
                [self.request.data.get('picture')],
                owner=self.request.user,
                instance_type='world',
                instance_id=self.request.parser_context['kwargs']['pk'],
                redirect=f'/constructor/{self.request.parser_context["kwargs"]["pk"]}'
            )
