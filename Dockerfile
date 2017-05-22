# Pull base image.
FROM library/node

WORKDIR /usr/src/app

COPY . /usr/src/app

# RUN echo '{ "allow_root": true }' > /usr/src/app/.bowerrc

RUN npm install -g bower gulp-cli
RUN npm install -g less
RUN npm install
RUN bower install

CMD node server.js
