src/main/java/com/ingressos/
├── config/          # Filtros de Rate Limiting e Prevenção de Spam
├── controller/      # Endpoints REST (CompradorController, AdministradorController)
├── exception/       # Gestão de Erros, Exceptions Customizadas e Handler Global (Logs e Códigos HTTP)
├── model/           # Entidades (Evento, Ingresso, Usuario)
├── repository/      # Repositórios baseados em memória (ConcurrentHashMap)
├── service/         # Regras de negócio e validações (anti-injeção simulada por tipagem estrita)
└── util/            # Rotina de carga de dados do arquivo para memória