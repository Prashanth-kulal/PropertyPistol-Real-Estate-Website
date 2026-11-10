FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY scripts ./scripts
COPY seed ./seed
ENV NODE_ENV=production
EXPOSE 5000
USER node
CMD ["node", "src/server.js"]
