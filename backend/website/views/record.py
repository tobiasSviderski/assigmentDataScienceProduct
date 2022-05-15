from types import SimpleNamespace
from django.forms import model_to_dict
from rest_framework import status
import os
import joblib
import json
import pandas as pd

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from website.models import ApplicationRecord
from django.db.models import Count, Case, When, Max, Min
# import get_bools function from the graph.py file in the same folder
from website.views.graph import get_bools, get_categories


# Take the parameter of the data frame
# Load the pipeline machine learning model and predict the value
# Return the response or in the case of error return the error
def get_status(dataframe):
    try:
        module_dir = os.path.dirname(__file__)
        file_path = os.path.join(module_dir, '../../core/credit_risk_pipeline.pkl')
        pipeline = joblib.load(file_path)

        return pipeline.predict(dataframe)

    except ValueError as e:
        return Response(e.args[0], status.HTTP_400_BAD_REQUEST)

# Get which column needs the boxplot values and ask them through the Django ORM
# For box plot get the max, min values and the first and third quatrile
def get_boxplot(column):
    all_records = ApplicationRecord.objects.all().values(column).annotate(
        total=Count("status")).order_by(column)

    return {
        'max': ApplicationRecord.objects.aggregate(Max(column)).get(column+'__max'),
        'min': ApplicationRecord.objects.aggregate(Min(column)).get(column+'__min'),
        'first': all_records[int(len(all_records) * 0.25)][column],
        'third': all_records[int(len(all_records) * 0.75)][column],
    }

# Define the main viewset
class DefaultRecordSet(viewsets.ModelViewSet):
    queryset = []

    # On api call new/ get the data from the post method
    # Create the object of a Application Record 
    # Convert it into a data frame
    # Use the function that runs the predict function
    # Fill the prediction into the object of a record 
    # and save it into the database
    @action(methods=['post'], detail=False, url_path='new', url_name='record-new')
    def new_record(self, request):
        data = request.body
        person = json.loads(data, object_hook=lambda d: SimpleNamespace(**d))

        p = ApplicationRecord.objects.create(
            code_gender=person.CODE_GENDER,
            flag_own_car=person.FLAG_OWN_CAR,
            flag_own_realty=person.FLAG_OWN_REALTY,
            cnt_children=person.CNT_CHILDREN,
            amt_income_total=person.AMT_INCOME_TOTAL,
            name_income_type=person.NAME_INCOME_TYPE,
            name_education_type=person.NAME_EDUCATION_TYPE,
            name_family_status=person.NAME_FAMILY_STATUS,
            name_housing_type=person.NAME_HOUSING_TYPE,
            days_birth=person.DAYS_BIRTH,
            days_employed=person.DAYS_EMPLOYED,
            flag_mobil=person.FLAG_MOBIL,
            flag_work_phone=person.FLAG_WORK_PHONE,
            flag_phone=person.FLAG_PHONE,
            flag_email=person.FLAG_EMAIL,
            occupation_type=person.OCCUPATION_TYPE,
            cnt_fam_members=person.CNT_FAM_MEMBERS,
        )
        p.save()

        df = pd.DataFrame({
            'CODE_GENDER': p.code_gender,
            'FLAG_OWN_CAR': p.flag_own_car,
            'FLAG_OWN_REALTY': p.flag_own_realty,
            'CNT_CHILDREN': p.cnt_children,
            'AMT_INCOME_TOTAL': p.amt_income_total,
            'NAME_INCOME_TYPE': p.name_income_type,
            'NAME_EDUCATION_TYPE': p.name_education_type,
            'NAME_FAMILY_STATUS': p.name_family_status,
            'NAME_HOUSING_TYPE': p.name_housing_type,
            'DAYS_BIRTH': p.days_birth,
            'DAYS_EMPLOYED': p.days_employed,
            'FLAG_MOBIL': p.flag_mobil,
            'FLAG_WORK_PHONE': p.flag_work_phone,
            'FLAG_PHONE': p.flag_phone,
            'FLAG_EMAIL': p.flag_email,
            'OCCUPATION_TYPE': p.occupation_type,
            'CNT_FAM_MEMBERS': p.cnt_fam_members
        }, index=[p.id])

        result = get_status(df)  # Get the predicted result
        p.status = result  # Put the prediction as another field of the record
        p.save()  # Save the predicted result into a database

        jsonObject = model_to_dict(p)

        return Response(data=jsonObject, status=status.HTTP_200_OK)

    # If api call /details 
    # Get the whole person from the database with the statistical information for the boxplot
    # Retun a response
    @action(methods=['get'], detail=False, url_path='details/(?P<pk>[^/.]+)', url_name='record-details')
    def comparison_record(self, request, pk):
        # Get the id from the request
        # print(pk)
        # TODO: get the pk into the find person search function at the bottom
        # region Category response
        response_category = {}
        categorical_values = ['name_income_type', 'name_education_type', 'name_family_status', 'name_housing_type']
        for category in categorical_values:
            response_category[category] = ApplicationRecord.objects.all().values(category).annotate(
                total=Count(category)).order_by(category)
        # endregion
        # region Boolean response
        response_boolean = {}
        carTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_own_car=True, then=1))))['true']
        carFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_own_car=False, then=1))))['false']
        response_boolean['flag_own_car'] = {"true": carTrue, "false": carFalse}

        realtyTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_own_realty=True, then=1))))['true']
        realtyFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_own_realty=False, then=1))))[
            'false']
        response_boolean['flag_own_realty'] = {"true": realtyTrue, "false": realtyFalse}

        mobilTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_mobil=True, then=1))))['true']
        mobilFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_mobil=False, then=1))))['false']
        response_boolean['flag_mobil'] = {"true": mobilTrue, "false": mobilFalse}

        workPhoneTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_work_phone=True, then=1))))[
            'true']
        workPhoneFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_work_phone=False, then=1))))[
            'false']
        response_boolean['flag_work_phone'] = {"true": workPhoneTrue, "false": workPhoneFalse}

        phoneTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_phone=True, then=1))))['true']
        phoneFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_phone=False, then=1))))['false']
        response_boolean['flag_phone'] = {"true": phoneTrue, "false": phoneFalse}

        emailTrue = ApplicationRecord.objects.aggregate(true=Count(Case(When(flag_email=True, then=1))))['true']
        emailFalse = ApplicationRecord.objects.aggregate(false=Count(Case(When(flag_email=False, then=1))))['false']
        response_boolean['flag_email'] = {"true": emailTrue, "false": emailFalse}
        # endregion
        

        return Response(data={
            'person': model_to_dict(ApplicationRecord.objects.get(id=pk)),
            'details': {
                'members': get_boxplot('cnt_fam_members'),
                'children': get_boxplot('cnt_children'),
                'income': get_boxplot('amt_income_total'),
                'employed': get_boxplot('days_employed'),
                'birth': get_boxplot('days_birth'),
                'category': get_categories(),
                'boolean': get_bools(),
            }
        })
