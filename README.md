# Crawler and Search System

Sistema para simplificar a extração e acesso aos números de benefícios.

![Visão Geral do Sistema](https://github.com/mdutra/crawler-and-search-system/assets/7758295/1ace6c7c-c841-4aba-922e-0791af9cfba1)

## Instruções de execução

### Dependências

`docker` e `docker-compose`.

### Execução

Execute os seguintes comandos na pasta raíz do projeto:
```sh
# Inicie todos os serviços
$ docker-compose up -d --scale crawler=3

# Espere os serviços se conectarem ao RabbitMQ
$ docker-compose logs -f api crawler

# Extraia o número de benefício pela API em `http://localhost:3000`:
$ curl -d '{"cpf": "000.000.000-00", "login": "usuario", "senha": "123456"}' -H 'Content-Type: application/json' "http://localhost:3000/crawler/extract-benefit-number"

# Execute os testes da API
$ docker-compose exec api npm test

# Execute os testes do crawler
$ docker-compose exec crawler npm test
```
 
### Frontend

Acesse o frontend em `http://localhost:80`.

## Instruções de execução para desenvolvimento

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Use `--build` se estiver trocando de ambiente (de desenvolvimento para produção ou vice-versa):
```sh
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
