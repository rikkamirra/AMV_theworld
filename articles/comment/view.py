from django.http import HttpResponse, JsonResponse
from .model import Comment

from .serializer import CommentSerializer

from rest_framework.views import APIView
from rest_framework.response import Response


class CommentListView(APIView):
    def post(self, request):
        serializer = CommentSerializer(data=comment_params(request))
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        else:
            return JsonResponse(serializer.errors, status=401)


def comment_params(request):
    return {
        'text': request.POST.get('text', ''),
        'article': request.POST.get('article_id', 0),
        'author': request.user.pk
     }
