### Instalação e execução

Este projeto requer [Node.js](https://nodejs.org/) para ser executado.
Para instalar, basta executar no terminal:

```sh
sudo apt update
sudo apt install nodejs
sudo apt install npm
```
Verifique se a instalação ocorreu com sucesso checando a versão do nodejs e do npm:
```sh
nodejs -v
npm -v
```
Navegue até o diretorio raiz do projeto.
Instale as dependencias e inicie o projeto:
```sh
sudo npm install
sudo npm run dev
```
Verifique o funcionamento da aplicação navegando para este endereço:
```sh
http://localhost:3000/
```

### Tech
Este projeto utiliza diversas tecnologias e bibliotecas open source:

* [Node.js] - Interpretador de JavaScript assíncrono com código aberto orientado a eventos.
* [Express] - Framework back-end para criação de rotas no servidor.
* [React] - Uma biblioteca JavaScript para criar interfaces de usuário.
* [MongoDB] - Software de banco de dados orientado a documentos livre (NoSQL)
* [MongoDB NodeJS Driver] - Driver que prove interações com o Mongo para o NodeJS.
* [Material UI] - Framework com componentes react para um desenvolvimento facil e rapido.
* [Concurrently] - Roda multiplos comandos concorrentemente.
* [Nodemon] - Monitora mudanças no projeto para recarregar o server ou o client automaticamente.
* [Create React App] - Ferramenta do facebook que cria todo o codigo base para o projeto React funcionar.

### Implementação:

Ao carregar a página inicial da aplicação ***"localhost:3000"***, mostramos o que foi pedido no desafio, porém, o botão que envia o número para o backend está desabilitado, pois o input atual do textLabel não é um número inteiro.

Ao digitar algo no textLabel, verificamos se aquela string é um inteiro valido, tentando dar match daquela string com um regex. Também verificamos se ***o número é maior que 0 e menor que 10^8*** (para não sobrecarregar o back end).

Caso não for um inteiro valido, ou estiver fora do intervalo citado acima, desabilitamos o botão de enviar. Para o caso de estar fora do intervalo citado, também mostramos uma mensagem de erro, para que o usuario saiba qual intervalo disponivel para calculo.

Se for um inteiro valido, habilitamos o botão para calcular os divisores. Quando o usuario clica no botão, fazemos uma requisição para ***/api/divisors*** passando o parametro ***number={numero no textLabel}***. Enquanto esperamos a resposta, mostramos um spinner para o usuario, para que ele saiba que algo está acontecendo.

***No backend***, recebemos o request em ***/api/divisors***. Por segurança, verificamos também se o número está no intervalo definido anteriormente, retornando status=404 caso não. Caso esteja no intervalo, ***verificamos se o cliente está conectado com nosso banco de dados no mongo*** (atualmente a função sempre retorna true pois não tive tempo de estudar o driver deles para implementar algo que verifique o cliente). 

Se o cliente mongo estiver conectado, fazemos uma ***query na collection "numbers_divisors"*** (os registros desta collection tem o padrão {reqNumber: Int, divisors: Array}) buscando algum registro que possua o atributo "reqNumber" igual ao número que foi solicitado. ***Caso algum registro seja encontrado***, retornamos como resposta a informação dos divisores contida naquele registro. ***Se não encontramos nenhum registro***, significa que os divisores daquele número ainda não foram calculados, logo, calculamos os divisores e inserimos na collection esta informação, retornando-a também como resposta ao request.

***Caso o cliente mongo não estiver conectado***, realizamos o calculo dos divisores e respondemos ao request sem realizar a inserção destes na collection.

Vale salientar que, também enviamos de volta o número solicitado e se ele é primo (pois o front end vai precisar guardar essas informaçoes).

De volta ao ***front-end***, ao recebermos a resposta, guardamos ela dentro do estado do componente App, no array de resultados "results" (acessivel em this.state.results). Este array de resultados é util, pois podemos ***salvar os resultados obtidos anteriormente***, renderizando todos estes mais o novo resultado através de um processo de mapping. 

É importante citar que também ***verificamos se o número no textLabel já foi calculado anteriormente***, desabilitando o botão de calcular caso sim. 

Também é importante citar que o ***banco de dados está localizado num server na amazon*** (opção disponibilizada gratis pelo pessoal do mongo, e eu liberei todos os ips para fazerem requisições a ele, para que o pessoal que vai avaliar o desafio para o qual este projeto foi feito consiga testar também)

Caso por algum problema, a ***conexão não esteja sendo feita***, alterar a ***linha 29 do arquivo mongodb.js*** para ***return false***.

[//]: # (Links de referencia)

   [node.js]: <http://nodejs.org>
   [express]: <https://expressjs.com>
   [react]: <https://reactjs.org/>
   [mongodb]: <https://www.mongodb.com/>
   [mongodb nodejs driver]: <http://mongodb.github.io/node-mongodb-native/3.4/quick-start/quick-start/>
   [material ui]: <https://material-ui.com/>
   [concurrently]: <https://www.npmjs.com/package/concurrently>
   [nodemon]: <https://nodemon.io/>
   [create react app]: <https://github.com/facebook/create-react-app>
