from .model import Comment

from .serializer import CommentSerializer

from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class CommentListView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_serializer(self, data):
        data = {
            'author': self.request.user.id,
            'article': data.get('article_id'),
            'text': data.get('text') 
        }
        return super().get_serializer(data=data)
