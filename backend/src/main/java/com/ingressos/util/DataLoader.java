package com.ingressos.util;

import com.ingressos.model.Evento;
import com.ingressos.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private EventoRepository eventoRepository;

    @Override
    public void run(String... args) {
        for (int i = 1; i <= 10000; i++) {
            String tipo = (i % 2 == 0) ? "FUTEBOL" : "SHOW";
            Evento evento = new Evento(
                    "Evento " + i,
                    tipo,
                    new BigDecimal("150.00"),
                    500
            );
            eventoRepository.save(evento);
        }
    }
}