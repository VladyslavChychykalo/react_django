from tastypie.resources import ModelResource
from .models import Post
from tastypie.authorization import Authorization


class PostResource(ModelResource):
    class Meta:
        queryset = Post.objects.all()
        resource_name = 'posts'
        allowed_methods = ['get', 'post', 'delete', 'put',]
        authorization = Authorization()
