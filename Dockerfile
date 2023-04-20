# build stage
FROM node:lts-alpine as build-stage
RUN apk --no-cache add git
RUN git clone https://github.com/hydronautics-team/frontend
WORKDIR /frontend
RUN npm install
RUN npm run build
# RUN apk add bash
# CMD ["bash"]


# # production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /frontend/dist/spa /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
