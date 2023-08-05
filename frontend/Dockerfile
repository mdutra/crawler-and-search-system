# Use the first stage only for developement
# Use the three stages for production
FROM node:16-alpine AS installer

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node package.json yarn.lock ./

RUN yarn

COPY --chown=node:node . .

FROM node:16-alpine AS builder

WORKDIR /app

COPY --chown=node:node --from=installer /app .

RUN yarn run build

# Lightweight web server to serve the static files
FROM nginx:alpine
# Copy the built app to the NGINX static file directory
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
