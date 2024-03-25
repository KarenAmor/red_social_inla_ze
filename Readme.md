# Red Social para la Empresa Inla Ze - Version 1.0.0
API de Negocio que administra una red social que permita a los usuarios registrarse, iniciar sesión, publicar mensajes, ver el muro, buscar mensajes y otras funcionalidades adicionales.

## Especificaciones Funcionales
## Métodos HTTP
### Auth: /auth
POST /auth/register - Registrarse
POST /auth/login - Iniciar sesión
POST /auth/logout - Cerrar sesión
GET /auth/refresh - Refresh token
### User: /user
GET /user/users - Obtener información de los usuario
GET /user/user/:id - Obtener información del usuario
PUT /user/users/:id - Actualizar información del usuario
DELETE /user/users/:id - Eliminar usuario (soft delete)
### Post: /post
GET /post/post - Obtener y filtrar publicaciones
POST /post/post - Hacer una publicación
GET /post/post/:userId Obtener y filtrar publicaciones por usuario
PUT /post/post/:id - Actualizar una publicación
DELETE /post/post - Eliminar una publicación (soft delete)

## Especificaciones Técnicas
- Lenguaje de Programación: Typescript
- Entorno de Ejecución: Node.JS 18
- Gestor de Paquetes: npm
- Tipo de despliegue: Container (Docker)


## Instalación
Utiliza el gestor de paquetes [npm](https://nodejs.org/en/download/) para instalar el proyecto.
```bash
npm install
```
Crea un archivo .env en la raíz del proyecto y completa los siguiente valores.
```bash
PORT=3000
ATLAS_URI=<URI de la base de datos MongoDB>
ACCESS_TOKEN_SECRET=<Secreto para la generación del token de acceso>
```
Ejecutar el siguiente comando para iniciar el proyecto.
```bash
npm run dev
```
## Despliegue (Docker)
Construye la imagen del contenedor.
```bash
docker build -t red-social-backend .
```
Ejecuta el contenedor.
```bash
docker run -p 3000:3000 red-social-backend
```
¡Ahora la aplicación estará funcionando en el puerto 3000 de tu máquina local!