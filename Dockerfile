FROM node

COPY ./app /srv/app
WORKDIR /srv/app

RUN npm install -s \
  && npm run -s build

CMD ["./bin/run-app"]
