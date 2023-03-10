FROM node:19-bullseye
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV PORT 8000
EXPOSE $PORT
CMD ["npm", "run", "dev"]