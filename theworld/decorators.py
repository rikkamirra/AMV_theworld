from construct.models import World, Category
from user.models import Account, Picture
from articles.models import Article



def set_instance(name, is_auth):
    def wrap(fun):
        def wrapped_f(view, request, **kwargs):
            try:
                model = globals()[name]
                instance = model.objects.get(pk=kwargs.get(name.lower()+'_id'))
            except model.DoesNotExist:
                return Response(status=404)
            except Exception as e:
                return Response([str(e)], status=500)

            if is_auth:
                if instance.author.id != request.user.pk:
                    return Response(status=401)
            new_kwargs = {}
            new_kwargs[name.lower()] = instance
            return fun(view, request, **new_kwargs)
        return wrapped_f
    return wrap
