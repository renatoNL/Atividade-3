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

    public IngressoComprado comprarIngresso(String eventoId, String compradorId) {
        Evento evento = eventoRepository.findById(eventoId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento não encontrado."));

        if (!evento.decrementarIngresso()) {
            throw new RegraNegocioException("Ingressos esgotados para este evento.");
        }
        eventoRepository.save(evento);

        IngressoComprado ingresso = new IngressoComprado(eventoId, compradorId);
        return ingressoRepository.save(ingresso);
    }

    public List<IngressoComprado> listarMeusIngressos(String compradorId) {
        return ingressoRepository.findByCompradorId(compradorId);
    }

    public void cancelarCompra(String ingressoId) {
        IngressoComprado ingresso = ingressoRepository.findById(ingressoId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Ingresso não encontrado."));

        if ("CANCELADO".equals(ingresso.getStatus())) {
            throw new RegraNegocioException("Este ingresso já encontra-se cancelado.");
        }

        ingresso.setStatus("CANCELADO");
        ingressoRepository.save(ingresso);

        Evento evento = eventoRepository.findById(ingresso.getEventoId()).orElse(null);
        if (evento != null) {
            evento.incrementarIngresso();
            eventoRepository.save(evento);
        }
    }
}