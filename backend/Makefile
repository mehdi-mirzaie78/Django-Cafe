install:
	# intall dependencies
	pip install --upgrade pip && pip install -r requirements.txt

format:
	# format code
	black *.py */*.py

lint:
	# flake8 or Pylint
	pylint --disable=R,C *.py

makemigrations:
	# make migrations
	python3 manage.py makemigrations

cleanmigrations:
	# clean migrations
	find -wholename "*/migrations/*.py" -not -name "__init__.py" -delete

migrate:
	# migrate
	python3 manage.py migrate

collectstatic:
	# collect static files
	python3 manage.py collectstatic --noinput

all: install format lint makemigrations migrate collectstatic createsuperuser

createsuperuser:
	# create superuser
	python3 manage.py makesuperuser

rundev:
	python3 manage.py runserver

runprod:
	gunicorn --bind 0.0.0.0:8000 -w 4 --timeout 120 config.wsgi