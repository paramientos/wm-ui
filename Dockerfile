FROM node:14-alpine AS development
ENV NODE_ENV development
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN rm -rf node_modules
RUN npm install
COPY . .
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]
