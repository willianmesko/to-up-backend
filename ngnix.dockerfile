FROM nginx:latest
COPY /docker/config/nginx.conf /etc/ngnix/nginx.conf
EXPOSE 80 443
ENTRYPOINT [ "nginx" ]
CMD ["-g", "daemon off;"]