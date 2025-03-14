# Para construir la imagen con los últimos cambios, antes construir el proyecto con el comando "npm run build"
FROM nginx:stable-alpine
COPY dist /usr/share/nginx/html
COPY sitemap.xml /usr/share/nginx/html
COPY favicon.ico /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]