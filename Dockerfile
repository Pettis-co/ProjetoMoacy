FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY ./sofware .

ENV FLASK_APP=api.py
ENV FLASK_RUN_HOST=0.0.0.0

EXPOSE 8082

CMD ["flask", "run"]
