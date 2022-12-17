
# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir admin
WORKDIR /admin

# copy source files
COPY . /admin/

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run dev