// src/main/java/com/ingressos/service/IngressoService.java
package com.ingressos.service;

import com.ingressos.exception.RecursoNaoEncontradoException;
import com.ingressos.exception.RegraNegocioException;
import com.ingressos.model.Evento;
import com.ingressos.model.IngressoComprado;
import com.ingressos.repository.EventoRepository;
import com.ingressos.repository.IngressoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IngressoService {
    private final EventoRepository eventoRepository;
    private final IngressoRepository ingressoRepository;

    public IngressoService(EventoRepository eventoRepository, IngressoRepository ingressoRepository) {
        this.eventoRepository = eventoRepository;
        this.ingressoRepository = ingressoRepository;
    }

    public IngressoComprado comprarIngresso(Long eventoId, Long compradorId) {
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento não encontrado."));

        IngressoComprado ingresso = new IngressoComprado();
        ingresso.setEventoId(evento.getId());
        ingresso.setCompradorId(compradorId);
        ingresso.setStatus("ATIVO");

        return ingressoRepository.save(ingresso);
    }

    public List<IngressoComprado> listarMeusIngressos(Long compradorId) {
        return ingressoRepository.findByCompradorId(compradorId);
    }

    public void cancelarCompra(Long ingressoId) {
        IngressoComprado ingresso = ingressoRepository.findById(ingressoId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Ingresso não encontrado."));

        if ("CANCELADO".equals(ingresso.getStatus())) {
            throw new RegraNegocioException("Este ingresso já encontra-se cancelado.");
        }

        ingresso.setStatus("CANCELADO");
        ingressoRepository.save(ingresso);
    }
}