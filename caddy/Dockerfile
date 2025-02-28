FROM caddy:2.9-alpine

RUN apk update && apk add nss-tools

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]