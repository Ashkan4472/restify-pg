FROM node:10.12.0

# Create app directory
RUN mkdir -p /restify-pg
WORKDIR /restify-pg

EXPOSE 1337

ENTRYPOINT [ "./entrypoint.sh" ]
