
FROM node:alpine3.10


RUN npm install expo-cli --global && npm i react-native-table-component

RUN mkdir boq && cd boq


COPY . .
EXPOSE 19006

CMD ["expo", "start", "--web"]