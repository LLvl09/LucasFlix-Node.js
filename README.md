# Sobre o projeto 

Este é um projeto da challange do alura. É sobre criar uma "netflix" que só aceita videos do youtube.

# Endereços

Esta aplicação está rodando no aws com o endereço ip: **3.137.181.36** na porta **8080**.
Para rodar a apliação na web ou no **postman** ou **insomia**, use: **3.137.181.36:8080/rota**

**Apenas o usuário admin poderá postar categorias e video**

Tem os seguintes endereços:
    **/videos**
    **/categorias**


# Informações sobre o codigo

Fiz a validação de videos do youtube com regex com essa expressão: **/(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?/**

Tem duas rotas CRUD, que são: /video e /categorias. 

Configurei para que automáticamente coloca-se o video na categoria desejada.
