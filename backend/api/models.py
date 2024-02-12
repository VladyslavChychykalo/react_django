# import json
from tastypie.resources import ModelResource
from blog.models import Post
from tastypie.authorization import Authorization
from .authentication import CustomAuthentication
from tastypie.http import HttpNoContent
from django.core import serializers


class PostResource(ModelResource):
    class Meta:
        queryset = Post.objects.all()
        resource_name = 'posts'
        allowed_methods = ['get', 'post', 'delete', 'put',]
        authentication = CustomAuthentication()
        authorization = Authorization()

    # def dehydrate_title(self, bundle):
    #     bundle.data['title'] = bundle.data['title'].upper()
    # def dehydrate_title(self, bundle):
    #     bundle.data['title'] = bundle.data['title'].upper()

    # def obj_delete(self, bundle, **kwargs):
    #     super(PostResource, self).obj_delete(bundle, **kwargs)

    def delete_detail(self, request, **kwargs):
        # super(PostResource, self).delete_detail(request, **kwargs)
        # posts_serialized = serializers.serialize('json', Post.objects.all())
        # posts = json.loads(posts_serialized)
        # return self.create_response(request, posts, response_class=HttpNoContent)
        super(PostResource, self).delete_detail(request, **kwargs)
        posts = Post.objects.all()
        bundles = [self.full_dehydrate(
            self.build_bundle(obj=post)) for post in posts]
        object_list = {
            'meta': {
                'limit': len(posts),
                'next': None,
                'offset': 0,
                'previous': None,
                'total_count': len(posts)
            },
            'objects': [bundle.data for bundle in bundles]
        }
        return self.create_response(request, object_list, response_class=HttpNoContent)
