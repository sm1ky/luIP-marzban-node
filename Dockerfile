FROM python:3.11
ARG REQUIREMENTS
WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .

RUN chmod +x scripts/ipban.sh
RUN chmod +x scripts/ipunban.sh
RUN chmod +x scripts/restore_banned_ips.sh
RUN chmod +x scripts/unbanall.sh

RUN pip install --no-cache-dir -r requirements.txt

CMD ["python", "./main.py"]
