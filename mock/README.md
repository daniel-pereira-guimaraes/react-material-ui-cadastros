# Para que serve este mock?

Este mock simula um back-end para testar a aplicação React desenvolvida neste projeto.

# Requisitos

Este mock necessita do ```json-server```, que pode ser instalado com um dos comandos mostrados a seguir, dependendo da sua preferência e do gerenciador de pacotes disponível.

1. Instalação como dependência de desenvolvimento:

```npm install -D json-server```

ou

```yarn add -D json-server```

2. Instalção global:

```npm install -g json-server```

ou

```yarn global add json-server```

# Como usar este mock?

## Inicie o json-server

Para iniciar o ```json-server``` execute um desses comandos, conforme o gerenciador de pacotes que estiver usando:

```npx json-server -w -p 3333 ./mock/database.json```

ou

```yarn run json-server -w -p 3333 ./mock/database.json```

O endereço do arquivo ```database.json``` deve ser ajustado para indicar o local correto.

## Acesse pelo navegador de internet

Após iniciar o ```json-server```, você poderá acessar a base de dados ```database.json``` através do navegador de internet, informando a URL que corresponde à requisição desejada, tal como:

```localhost:3333/pessoas```

# Mais informações

Para saber mais sobre ```json-server``` consulta a documentação disponível neste link:

```https://www.npmjs.com/package/json-server```