FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Set environment variable
ENV MONGO_URL=mongodb://mongodb:27017/todo-app

# Run the application
CMD ["node", "index.js"]
