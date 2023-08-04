# Desafio Backend

Sistema para simplificar a extração e acesso aos números de benefícios.

## Instruções de execução para avaliação do desafio.

### Dependências

`docker` e `docker-compose`.

### Iniciar todos os serviços

1. Execute no diretório raíz do projeto:
```sh
$ docker-compose up
```

2. Extraia o número de benefício pela API em `http://localhost:3000`:
```sh
curl -d '{"cpf": "000.000.000-00", "login": "usuario", "senha": "123456"}' -H 'Content-Type: application/json' "http://localhost:3000/crawler/extract-benefit-number"
```
3. Acesse o frontend `http://localhost:80`.

## Instruções de execução para desenvolvimento

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Use `--build` se estiver trocando de ambiente (de desenvolvimento para produção ou vice-versa):
```sh
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```
