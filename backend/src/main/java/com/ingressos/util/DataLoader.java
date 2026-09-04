package com.ingressos.util;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Override
    public void run(String... args) {
        // A inserção de dados iniciais já está garantida pelo seu script SQL principal.
        // Evitamos sobrescrever ou causar erros de foreign key apagando via JPA de forma desordenada.
    }
}