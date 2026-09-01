// src/main/java/com/ingressos/service/EventoService.java
package com.ingressos.service;

import com.ingressos.exception.RecursoNaoEncontradoException;
import com.ingressos.exception.RegraNegocioException;
import com.ingressos.model.Evento;
import com.ingressos.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {
    private final EventoRepository eventoRepository;

    public EventoService(EventoRepository eventoRepository) {
        this.eventoRepository = eventoRepository;
    }

    public Evento criarEvento(Evento evento) {
        if (evento == null) {
            throw new RegraNegocioException("Dados do evento são obrigatórios.");
        }
        if (evento.getDescricao() == null || evento.getDescricao().isBlank()) {
            throw new RegraNegocioException("A descrição do evento é obrigatória.");
        }
        if (evento.getTipoEvento() == null || evento.getTipoEvento().isBlank()) {
            throw new RegraNegocioException("O tipo do evento é obrigatório.");
        }
        return eventoRepository.save(evento);
    }

    public void cancelarEvento(Long id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento não encontrado."));
        
        eventoRepository.deleteById(id);
    }

    public List<Evento> listarEventos() {
        return eventoRepository.findAll();
    }
}