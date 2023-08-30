# ----------------- BASE STAGE ------------------ #
FROM node:alpine AS base

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .

EXPOSE 3000

# ----------------- DEVELOPMENT STAGE ------------------ #
FROM base AS development

ENV NODE_ENV=development

RUN npm install
RUN npm install cross-env -g

# Bundle app source
COPY . .

# Running default command 
CMD ["npm", "run", "dev"]


# # ----------------- PRODUCTION STAGE ------------------- #
# FROM base AS production

# ENV NODE_ENV=production

# # If you are building your code for production
# RUN npm ci --omit=dev
# RUN npm install cross-env -g

# # Bundle app source
# COPY . .

# # Running default command 
# CMD ["npm", "start"]