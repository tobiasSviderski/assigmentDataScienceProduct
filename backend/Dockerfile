FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app/
COPY requirements.txt .
COPY manage.py manage.py
# Give permision to run manage.py
RUN chmod +x manage.py
RUN pip install -r requirements.txt
COPY . .
# RUN python manage.py runserver 0.0.0.0:8000
# RUN python manage.py makemigrations
# RUN python manage.py migrate

