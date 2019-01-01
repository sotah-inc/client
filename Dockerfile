# building
FROM node:10-alpine

# copying in source
COPY ./app /srv/app
WORKDIR /srv/app

# installing deps and building
RUN npm install -s \
  && cp /srv/app/vendor/react-markdown/index.d.ts /srv/app/node_modules/react-markdown/index.d.ts \
  && npm run -s build \
  && rm -rf ./node_modules \
  && npm install -s --only=production \
  && npm cache clean --force


# running
FROM node:10-alpine

# copying in source
COPY ./app /srv/app
WORKDIR /srv/app

# copying in built app
COPY --from=0 /srv/app/build ./build
COPY --from=0 /srv/app/node_modules ./node_modules

CMD ["./bin/run-app"]
