# custom errors

# def delete_detail(self, request, **kwargs):
#     try:
#         obj_to_delete = self.obj_get(bundle=Bundle(
#             request=request), **self.remove_api_resource_names(kwargs))
#         obj_id = obj_to_delete.id
#         super(PostResource, self).delete_detail(
#             request, **kwargs)
#         return self.create_response(request, {'id': obj_id}, response_class=HttpNoContent)
#     except Exception as e:
#         return self.error_response(request, str(e))
