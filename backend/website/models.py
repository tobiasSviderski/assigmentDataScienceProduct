from django.db import models
# Categorical options definision
INCOME_CHOICES = (('commercial', str('Commercial associate')),
                  ('working', str('Working')),
                  ('pensioner', str('Pensioner')),
                  ('state', str('State servant')),
                  ('student', str('Student')))

EDUCATION_CHOICES = (('degree', str('Academic degree')),
                     ('higher', str('Higher education')),
                     ('secondary', str('Secondary / secondary special')),
                     ('higher_incomplete', str('Incomplete higher')),
                     ('lower', str('Lower secondary')))

FAMILY_CHOICES = (('civil', str('Civil marriage')),
                  ('married', str('Married')),
                  ('single', str('Single / not married')),
                  ('separated', str('Separated')),
                  ('widow', str('Widow')))

HOUSING_CHOICES = (
    ('rented', str('Rented apartment')),
    ('house', str('House / apartment')),
    ('coop', str('Co-op apartment')),
    ('municipal', str('Municipal apartment')),
    ('office', str('Office apartment')),
    ('parents', str('With parents')))


# Creating the model 
class ApplicationRecord(models.Model):
    id = models.AutoField(primary_key=True)
    code_gender = models.CharField(max_length=1, choices=[('F', 'F'), ('M', 'M')])  # F or M
    flag_own_car = models.BooleanField(default=False)  # Bool
    flag_own_realty = models.BooleanField(default=False)  # Bool
    cnt_children = models.IntegerField(default=0)  # Number
    amt_income_total = models.FloatField(default=0)  # Float
    name_income_type = models.CharField(max_length=20, choices=INCOME_CHOICES, default='working')
    name_education_type = models.CharField(max_length=30, choices=EDUCATION_CHOICES, default='secondary')
    name_family_status = models.CharField(max_length=20, choices=FAMILY_CHOICES, default='single')
    name_housing_type = models.CharField(max_length=20, choices=HOUSING_CHOICES, default='rented')
    days_birth = models.IntegerField(default=0)  # Number
    days_employed = models.IntegerField(default=0)  # Number
    flag_mobil = models.BooleanField(default=False)  # Bool
    flag_work_phone = models.BooleanField(default=False)  # Bool
    flag_phone = models.BooleanField(default=False)  # Bool
    flag_email = models.BooleanField(default=False)  # Bool
    occupation_type = models.CharField(max_length=30)  # String
    cnt_fam_members = models.IntegerField(default=0)  # Number
    status = models.BooleanField(null=True)  # Bool the result flag good or bad credit
