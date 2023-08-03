FROM node:18
WORKDIR /app
# set the workdir to /app meaning all commands will be executed from this directory within the container
COPY package.json .
# copy package.json to the workdir


#ARG NODE_ENV
#RUN if [ "$NODE_ENV" = "production" ]; \
#    then npm install --only=production; \
#    else npm ci; \
#    fi

RUN npm install

# install dependencies
COPY . ./
# copy all files to the workdir abar copy korar karon layer by layer korar jonne. change er immediate ager ta cache kore rakhe.
CMD ["npm","run","start:dev"]