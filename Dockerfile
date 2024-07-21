FROM node:14

ADD package.json /tmp/package.json

RUN rm -rf dist

RUN cd /tmp && npm install

ADD ./ /src

RUN rm -rf src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npm run migrate
RUN npm run build
CMD ["node", "dist/index.js"]