# Environment
En la raíz crear un archivo `.env` con las siguientes variables de entorno:
- VITE_API_URL

Para que el proceso siempre ocupe el mismo puerto, matarlo con q + enter. Si no se hace de esta manera el proceso ocupara el puerto hasta reiniciar la PC. Se necesita ocupar siempre el mismo puerto ya que el backend solo le da permiso a lo que viene de localhost:81.

# Docker
Comandos para generar la imagen que utiliza el server
- docker login
- npm run build
- docker build -t tobiasriccone/frontend-lacandelaria:latest .
- docker push tobiasriccone/frontend-lacandelaria:latest