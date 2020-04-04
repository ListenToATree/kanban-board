FROM node:lts-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=./dist/out --configuration $configuration

FROM nginx:alpine
COPY --from=build /app/dist/out/ /user/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
