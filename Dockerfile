FROM node
RUN apt-get update
WORKDIR /home
RUN npx create-react-app react-docker
WORKDIR /home/react-docker
CMD ["npm","start"]
