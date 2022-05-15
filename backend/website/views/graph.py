from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Case, When

from website.models import ApplicationRecord

# Function that returns all the bools variables 
# and their sum of the totals 0 and 1
def get_bools():
    response = {}

    carTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_own_car=True, then=1))))['true']
    carFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_own_car=False, then=1))))['false']
    response['flag_own_car'] = {"true": carTrue, "false": carFalse}

    realtyTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_own_realty=True, then=1))))['true']
    realtyFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_own_realty=False, then=1))))['false']
    response['flag_own_realty'] = {"true": realtyTrue, "false": realtyFalse}

    mobilTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_mobil=True, then=1))))['true']
    mobilFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_mobil=False, then=1))))['false']
    response['flag_mobil'] = {"true": mobilTrue, "false": mobilFalse}

    workPhoneTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_work_phone=True, then=1))))['true']
    workPhoneFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_work_phone=False, then=1))))['false']
    response['flag_work_phone'] = {"true": workPhoneTrue, "false": workPhoneFalse}

    phoneTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_phone=True, then=1))))['true']
    phoneFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_phone=False, then=1))))['false']
    response['flag_phone'] = {"true": phoneTrue, "false": phoneFalse}

    emailTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_email=True, then=1))))['true']
    emailFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_email=False, then=1))))['false']
    response['flag_email'] = {"true": emailTrue, "false": emailFalse}

    return response

# Function that returns all the categories and their 1 tootals
def get_categories():
    response = {}
    categorical_values = ['name_income_type', 'name_education_type', 'name_family_status', 'name_housing_type']
    for category in categorical_values:
        response[category] = ApplicationRecord.objects.all().values(category).annotate(
            total=Count(category)).order_by(category)

    return response


# Defining the viewset
class DefaultGraphSet(viewsets.ModelViewSet):
    queryset = []

    # If api call is to the category return all the categories
    @action(methods=['get'], detail=False, url_path='category', url_name='graph-category')
    def categorical_graph(self, request):
        return Response(data=get_categories())

    # If api call is to the bool returns all the bools
    @action(methods=['get'], detail=False, url_path='bool', url_name='graph-bool')
    def bool_graph(self, request):
        return Response(data=get_bools())

    # If api call to the date graphs get the date values and sum the 1 totals
    @action(methods=['get'], detail=False, url_path='date', url_name='graph-date')
    def date_graph(self, request):
        response = ApplicationRecord.objects.all().values("days_birth").annotate(
                total=Count("status")).order_by("days_birth")
        return Response(data=response)

    # If api call to the employee return the data values and sum the 1 totals
    @action(methods=['get'], detail=False, url_path='employed', url_name='graph-employed')
    def employed_graph(self, request):
        response = ApplicationRecord.objects.all().values("days_employed").annotate(
                total=Count("status")).order_by("days_employed")
        return Response(data=response)

    # If api call to the income return the positive 1 income sum of totals
    @action(methods=['get'], detail=False, url_path='income', url_name='graph-income')
    def income_graph(self, request):
        response = ApplicationRecord.objects.all().values("amt_income_total").annotate(
                total=Count("status")).order_by("amt_income_total")
        return Response(data=response)

    # If the api call to the people return the members count and the children count
    @action(methods=['get'], detail=False, url_path='pple', url_name='graph-pple')
    def pple_count_graph(self, request):
        responseFam = ApplicationRecord.objects.all().values("cnt_fam_members").annotate(
                total=Count("status")).order_by("cnt_fam_members")
        responseChildren = ApplicationRecord.objects.all().values("cnt_children").annotate(
                total=Count("status")).order_by("cnt_children")
        return Response(data={'cnt_fam_members': responseFam, 'cnt_children': responseChildren})
