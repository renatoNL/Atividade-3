# Etapa 1: Build da aplicação
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copia apenas o pom.xml primeiro para aproveitar o cache do Docker
COPY pom.xml .
RUN mvn dependency:go-offline

# Copia o código-fonte e realiza o build ignorando os testes (que já rodaram no CI)
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Imagem final de execução
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copia apenas o arquivo .jar gerado na Etapa 1
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta que a aplicação utiliza
EXPOSE 8080

# Comando para iniciar a aplicação
ENTRYPOINT ["java", "-jar", "app.jar"]