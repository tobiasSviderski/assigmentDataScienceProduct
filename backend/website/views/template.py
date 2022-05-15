from django.forms import model_to_dict
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from website.models import ApplicationRecord
import random


class ApplicationTemplateSet(viewsets.ModelViewSet):
    queryset = []

    def process_obj(self, obj):
        random_item = random.choice(obj)
        jsonObject = model_to_dict(random_item)
        d = {k.upper(): v for k, v in jsonObject.items()}
        return d

    @action(methods=['get'], detail=False, url_path='success', url_name='template-success')
    def template_success(self, request):
        queryset = list(ApplicationRecord.objects.filter(status=True))
        return Response(data=self.process_obj(queryset))

    @action(methods=['get'], detail=False, url_path='reject', url_name='template-reject')
    def template_reject(self, request):
        queryset = list(ApplicationRecord.objects.filter(status=False))
        return Response(data=self.process_obj(queryset))

