FROM gliderlabs/alpine:3.4

ARG NODE_ENV
ARG LOG_LEVEL
ARG NODE_VERSION


RUN sed -i -e 's/v[[:digit:]]\.[[:digit:]]/edge/g' /etc/apk/repositories
RUN apk upgrade --update-cache --available
RUN apk add --no-cache g++ make curl git nodejs python nodejs-npm

RUN npm install npm@latest -g

RUN echo `node -v`

WORKDIR /app
COPY package.json .
RUN npm install

RUN echo "npm install finished !!!"

ADD . .
RUN ls -al

CMD npm start

EXPOSE 8000

# run the below command to watch for changed in /src - only brackets
# sudo docker run -p 8000:8000 -v /absolute/path/to/brackets/src/:/app/src brackets