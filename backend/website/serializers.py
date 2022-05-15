from rest_framework import serializers
from website.models import ApplicationRecord

# Serializer
class ApplicationRecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ApplicationRecord
        lookup_field = 'id'
        fields = [
            'id',
            'code_gender',
            'flag_own_car',
            'flag_own_realty',
            'cnt_children',
            'amt_income_total',
            'name_income_type',
            'name_education_type',
            'name_family_status',
            'name_housing_type',
            'days_birth',
            'days_employed',
            'flag_mobil',
            'flag_work_phone',
            'flag_phone',
            'flag_email',
            'occupation_type',
            'cnt_fam_members',
            'status'
        ]
