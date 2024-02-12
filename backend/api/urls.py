from django.urls import path, include
from api.models import PostResource
from tastypie.api import Api

api = Api(api_name='v1')
api.register(PostResource())

urlpatterns = [
    path('', include(api.urls), name='index')
]
