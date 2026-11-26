FROM caddy:2.10-alpine
COPY index.html /srv/
# Porta fixa: o proxy aponta para web:3000.
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":3000"]
