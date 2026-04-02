# Desafío Like Me - Parte II

Este repositorio contiene la entrega oficial de la **Parte II** del desafío. Se han implementado todas las funcionalidades requeridas para el manejo de una red social de fotos utilizando Node.js, Express y PostgreSQL.

### Funcionalidades implementadas en esta entrega:
* **GET /posts**: Obtiene el listado completo de publicaciones desde la base de datos.
* **POST /posts**: Permite crear nuevas publicaciones (se guardan con 0 likes por defecto).
* **PUT /posts/like/:id**: Incrementa en 1 los likes de una publicación específica mediante su ID. *(Requerido para la Parte II)*.
* **DELETE /posts/:id**: Elimina una publicación de la base de datos de forma permanente. *(Requerido para la Parte II)*.

### Aspectos Técnicos:
* **Manejo de errores**: Todas las rutas están protegidas con bloques `try/catch` para capturar excepciones.
* **Consultas Parametrizadas**: Se utiliza el paquete `pg` con consultas seguras para evitar inyecciones SQL.
* **CORS**: Configurado para permitir la comunicación con el frontend.