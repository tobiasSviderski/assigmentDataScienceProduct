from rest_framework import routers

from website.views.record import DefaultRecordSet
from website.views.template import ApplicationTemplateSet
from website.views.graph import DefaultGraphSet

router = routers.SimpleRouter()
router.register(r'template', ApplicationTemplateSet, basename="ApplicationTemplateSet")
router.register(r'graph', DefaultGraphSet, basename="DefaultGraphSet")
router.register(r'record', DefaultRecordSet, basename="DefaultRecordSet")
urlpatterns = router.urls
