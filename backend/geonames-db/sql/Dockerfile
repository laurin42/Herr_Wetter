FROM postgres:15

COPY ./sql/init.sql /docker-entrypoint-initdb.d/init.sql
COPY ./sql/cities5000.txt /docker-entrypoint-initdb.d/cities5000.txt
