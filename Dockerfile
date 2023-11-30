FROM python:3.11.6-slim

ARG REQUIREMENTS
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y --no-install-recommends build-essential \
    && apt-get install -y ufw \
    && apt-get install -y dsniff \
    && apt-get install -y csvtool

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x scripts/ipban.sh \
    && chmod +x scripts/ipunban.sh \
    && chmod +x scripts/restore.sh \
    && chmod +x scripts/unbanall.sh

CMD ["python", "main.py"]
