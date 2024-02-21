# import json
from tastypie.resources import ModelResource
from blog.models import Post
from tastypie.authorization import Authorization
from .authentication import CustomAuthentication
from tastypie.http import HttpNoContent, HttpResponse
from tastypie.bundle import Bundle
from tastypie.exceptions import NotFound
# from django.core import serializers


class PostResource(ModelResource):
    class Meta:
        queryset = Post.objects.all()
        resource_name = 'posts'
        allowed_methods = ['get', 'post', 'delete', 'put',]
        authentication = CustomAuthentication()
        authorization = Authorization()
        always_return_data = True

    def hydrate(self, bundle):
        bundle.obj.author = bundle.request.user
        return bundle

    def dehydrate(self, bundle):
        bundle.data['author'] = bundle.obj.author
        bundle.data['author_id'] = bundle.obj.author_id
        return bundle

    def dehydrate_title(self, bundle):
        return bundle.data['title'].upper()

    def delete_detail(self, request, **kwargs):
        try:
            obj_to_delete = self.obj_get(bundle=Bundle(
                request=request), **self.remove_api_resource_names(kwargs))
            obj_id = obj_to_delete.id
            super(PostResource, self).delete_detail(request, **kwargs)
            return self.create_response(request, {'id': obj_id}, response_class=HttpResponse)
        except NotFound:
            raise
        except Exception as e:
            raise

    # full data after delete
    # def delete_detail(self, request, **kwargs):
    #     super(PostResource, self).delete_detail(request, **kwargs)
    #     posts = Post.objects.all()
    #     bundles = [self.full_dehydrate(
    #         self.build_bundle(obj=post)) for post in posts]
    #     object_list = {
    #         'meta': {
    #             'limit': len(posts),
    #             'next': None,
    #             'offset': 0,
    #             'previous': None,
    #             'total_count': len(posts)
    #         },
    #         'objects': [bundle.data for bundle in bundles]
    #     }
    #     return self.create_response(request, object_list, response_class=HttpNoContent)

    # full data after post
    # def post_list(self, request, **kwargs):
    #     super(PostResource, self).post_list(request, **kwargs)
    #     posts = Post.objects.all()
    #     bundles = [self.full_dehydrate(
    #         self.build_bundle(obj=post)) for post in posts]

    #     object_list = {
    #         'meta': {
    #             'limit': len(posts),
    #             'next': None,
    #             'offset': 0,
    #             'previous': None,
    #             'total_count': len(posts)
    #         },
    #         'objects': [bundle.data for bundle in bundles]
    #     }
    #     return self.create_response(request, object_list, response_class=HttpCreated)
