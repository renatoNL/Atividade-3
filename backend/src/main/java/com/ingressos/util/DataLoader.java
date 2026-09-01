package com.ingressos.util;

import com.ingressos.model.Evento;
import com.ingressos.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private EventoRepository eventoRepository;

    @Override
    public void run(String... args) {
        if (eventoRepository.count() > 0) {
            return;
        }

        for (int i = 1; i <= 10; i++) {
            String tipo = (i % 2 == 0) ? "FUTEBOL" : "SHOW";
            Evento evento = new Evento(
                    1L,
                    "Evento " + i,
                    "Descrição do evento " + i + ".",
                    tipo,
                    LocalDateTime.now().plusDays(i)
            );
            eventoRepository.save(evento);
        }
    }
}