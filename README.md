# Desafio Backend

Sistema para simplificar a extração e acesso aos números de benefícios.

## Instruções de execução para avaliação do desafio.

### Dependências

- `docker` e `docker-compose`

### Iniciar todos os serviços

Execute no diretório raíz do projeto:
```sh
$ docker-compose up
```

## Instruções de execução para desenvolvimento

```sh
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up [api|crawler|frontend]
```

Use `--build` se estiver trocando de ambiente (de desenvolvimento para produção ou vice-versa):
```sh
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up [api|crawler|frontend] --build
```
