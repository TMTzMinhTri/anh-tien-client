FROM node:latest
RUN npm install -g serve
COPY package.json
RUN npm install
COPY . ./src
RUN npm run build
CMD serve -p $PORT -s dist
