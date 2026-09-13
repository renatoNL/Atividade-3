# IngresseAí

Aplicação do SQUAD Marketplace de eventos e ingressos, com autenticação JWT, painel de vendedor, compra de ingressos e assistente IA.

## Checklist da avaliação

- [x] Aplicação existente reutilizada e trazida para a IDE.
- [x] Escopo do SQUAD definido: eventos, ingressos, comprador e vendedor.
- [x] Frontend compilando com Vite e backend compilando com Spring Boot.
- [x] Cadastro e login integrados ao backend.
- [x] Cadastro de evento protegido por `ROLE_VENDEDOR`.
- [x] Marketplace consulta ofertas reais e compra usa o lote de ingresso.
- [x] Quantidade de compra validada no backend entre 1 e 4.
- [x] Chat IA autenticado com integração Gemini via `GEMINI_API_KEY`.
- [x] Segredos externalizados por variáveis de ambiente.
- [x] Testes automatizados e commits separados por etapa.

## Execução

1. Crie `backend/.env` a partir de `backend/.env.example` e configure o MySQL.
2. Configure `GEMINI_API_KEY` para respostas reais da IA. Sem ela, o chat informa que está aguardando configuração.
3. Execute `mvn spring-boot:run` dentro de `backend`.
4. Execute `npm install` e `npm run dev` dentro de `frontend`.

Validação: `mvn test` no backend e `npm run build` no frontend.

## Registro da refatoração

- `chore: establish functional frontend baseline`: corrigiu imports, dependências e estado do carrinho.
- `refactor: extract ticket and event business rules`: extraiu validações e montagem das entidades em métodos menores.
- `feat: add authenticated ai chat`: adicionou endpoint, serviço Gemini, segurança de configuração e interface do chat.

Prompts usados na refatoração: “extraia as regras de negócio em funções menores e descritivas”, “aplique validação no backend para não confiar no frontend” e “integre o chat usando variável de ambiente para a chave da API”.