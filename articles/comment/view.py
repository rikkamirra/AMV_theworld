from django.http import HttpResponse, JsonResponse
from .model import Comment

from .serializer import CommentSerializer

from rest_framework.views import APIView
from rest_framework.response import Response


class CommentListView(APIView):
    def post(self, request):
        serializer = CommentSerializer(data=request.POST.update({ 'author_id': request.user.id }))
        if serializer.is_valid():
            return JsonResponse({}, status=201)
        else:
            return JsonResponse(serializer.errors, status=401)
