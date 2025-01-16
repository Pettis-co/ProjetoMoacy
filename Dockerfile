FROM python:3.9-slim

WORKDIR /app

COPY project_requirements.txt .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r project_requirements.txt

COPY ./src/software/api.py .

ENV FLASK_APP=api.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 5000

CMD ["flask", "run"]
