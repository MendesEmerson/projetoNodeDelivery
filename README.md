# Node Delivery 
#### Projeto que possibilita a criação de usuários e entregadores, estabelece a conexão entre eles via app. onde é possivel que os Clientes façam pedidos e os intregadores possam visualizar itens disponiveis para entregar.

## Tecnologias Utilizadas
<a href="https://nodejs.org/en/download" title="Node">
  <img src="https://img.icons8.com/?size=48&id=54087&format=png" alt="Node">
</a>
<a href="https://www.typescriptlang.org/" title="TypeScript">
  <img src="https://img.icons8.com/color/48/000000/typescript.png" alt="TypeScript">
</a>
<a href="https://expressjs.com/pt-br/" title="ExpressJS">
  <img src="https://img.icons8.com/color/48/000000/express.png" alt="ExpressJS">
</a>
<a href="https://www.prisma.io/" title="Prisma">
  <img src="https://img.icons8.com/?size=48&id=YKKmRFS8Utmm&format=png" alt="Prisma">
</a>
<a href="https://jwt.io/" title="Jwt">
  <img src="https://img.icons8.com/?size=48&id=rHpveptSuwDz&format=png" alt="Json web token">
</a>
<a href="https://www.npmjs.com/package/bcrypt" title="Bcrypt">
  <img src="https://img.icons8.com/color/48/000000/password.png" alt="Bcrypt">
</a>
<a href="https://www.postgresql.org/" title="PostgresSQL">
  <img src="https://img.icons8.com/?size=48&id=38561&format=png" alt="PostgresSQL">
</a>


## Preparando ambiente de desenvolvimento
#### instale as dependencias de desenvolvimento: 
##### TypeScript;
##### Ts-node-dev;
##### Prisma;
##### Types/express;
##### Types/jsonwebtoken;
##### Types/bcrypt;

## Utilizando a Api
##### Acesse a aplicação em http://localhost:3001.

#### End-points

**Campos obrigatórios para criação do cliente/entregador. username/password**
**Campos obrigatórios para criar um novo item. item_name** 

=========================== **Cliente** ===========================

**POST:** /client -> Acessando a API atraves do metodo post com a url /client você poderá criar um novo usuario "Cliente". <br/>

**POST:** /login/client -> Acessando a API atraves do metodo post com a url /login/client, passando username e password você poderá logar como cliente e receber um token de autenticação. <br/>

**GET:** /client -> Acessando a API atraves do metodo post com a url /client retornara as informações do cliente que estiver logado e autenticado.<br/>

**GET:** /client/deliveries -> Acessando a API atraves do metodo post com a url /client/deliveries retornara todos os pedidos feitos pelo cliente.

**POST:** /delivery -> Acessando a API atraves do metodo post com a url /delivery o cliente poderar criar um novo item para ser entregue. <br/>




=========================== **Entregador** ===========================

**POST:** /deliveryman -> Acessando a API atraves do metodo post com a url /deliveryman você poderá criar um novo usuario. "Entregador". <br/>

**POST:** /login/deliveryman -> Acessando a API atraves do metodo post com a url /login/deliveryman, passando username e password  você poderá logar como entregador e receber um token de autenticação. <br/>

**GET:** /deliveryman -> Acessando a API atraves do metodo post com a url /deliveryman retornara as informações do entregador que estiver logado e autenticado.<br/>

**GET:** /deliveryman/deliveries -> Acessando a API atraves do metodo post com a url /deliveryman/deliveries retornara todos os pedidos aceitos pelo entregador.

**GET:** /delivery/available -> Acessando a API atraves do metodo post com a url /delivery/available retornara todos os pedidos disponiveis para serem aceitos.

**POST:** /delivery/updateDeliveryman/id -> Acessando a API atraves do metodo post com a url /delivery/updateDeliveryman/id, o entregador poderar aceitar uma entrega que esta disponivel na lista de pedidos. <br/>

**POST:** /delivery/updateEndDate/id -> Acessando a API atraves do metodo post com a url /delivery/updateEndDate/id , o entregador finalizará a entrega que aceitou anteriormente. <br/>

## Proximas implementações
#### Criar funcionalidade para cadastrar restaurantes
#### Criar funcionalidade para que cada restaurante cadastre seus itens




