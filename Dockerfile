FROM nginx
COPY dist/spa /usr/share/nginx/html
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]

