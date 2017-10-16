from construct.models import World, Category
# from construct.serializers import WorldSerializer, CategorySerializer

from articles.models import Article
# from articles.serializers import ArticleSerializer

from user.models import Account, Picture
# from user.serializers import AccountSerializer, PictureSerializer

from rest_framework.response import Response


get_author = {
    'Category': lambda x: x.world.author.pk,
    'World': lambda x: x.author.pk,
    'Article': lambda x: x.world.author.pk
    }


def set_instance(name, need_auth=False):
    def wrap(fun):
        def wrapped_f(view, request, **kwargs):
            try:
                model = globals()[name]
                instance = model.objects.get(pk=kwargs.get(name.lower()+'_id'))
            except model.DoesNotExist:
                return Response(status=404)
            except Exception as e:
                return Response([str(e)], status=500)

            if need_auth:
                if get_author[name](instance) != request.user.pk:
                    return Response(status=401)
            new_kwargs = {}
            new_kwargs[name.lower()] = instance
            return fun(view, request, **new_kwargs)
        return wrapped_f
    return wrap
