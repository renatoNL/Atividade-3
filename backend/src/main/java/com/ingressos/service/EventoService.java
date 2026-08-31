package com.ingressos.service;

import com.ingressos.exception.RecursoNaoEncontradoException;
import com.ingressos.exception.RegraNegocioException;
import com.ingressos.model.Evento;
import com.ingressos.repository.EventoRepository;
import com.ingressos.repository.IngressoRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EventoService {
    private final EventoRepository eventoRepository;
    private final IngressoRepository ingressoRepository;

    public EventoService(EventoRepository eventoRepository, IngressoRepository ingressoRepository) {
        this.eventoRepository = eventoRepository;
        this.ingressoRepository = ingressoRepository;
    }

    public Evento criarEvento(Evento evento) {
        if (evento == null) {
            throw new RegraNegocioException("Dados do evento são obrigatórios.");
        }
        if (evento.getDescricao() == null || evento.getDescricao().isBlank()) {
            throw new RegraNegocioException("A descrição do evento é obrigatória.");
        }
        if (evento.getTipo() == null || evento.getTipo().isBlank()) {
            throw new RegraNegocioException("O tipo do evento é obrigatório.");
        }
        if (evento.getPreco() == null || evento.getPreco().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RegraNegocioException("O preço do ingresso deve ser maior que zero.");
        }
        if (evento.getId() == null || evento.getId().isBlank()) {
            evento.setId(java.util.UUID.randomUUID().toString());
        }
        return eventoRepository.save(evento);
    }

    public Evento atualizarPreco(String id, BigDecimal novoPreco) {
        if (novoPreco == null || novoPreco.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RegraNegocioException("O novo preço deve ser maior que zero.");
        }
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento não encontrado."));
                
        evento.setPreco(novoPreco);
        return eventoRepository.save(evento);
    }

    public void cancelarEvento(String id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento não encontrado."));
                
        eventoRepository.deleteById(id);
    }

    public Map<String, Object> obterRelatorio(String id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento não encontrado."));

        long vendidos = ingressoRepository.findByEventoId(id).stream()
                .filter(i -> i.getStatus().equals("ATIVO"))
                .count();

        Map<String, Object> relatorio = new HashMap<>();
        relatorio.put("evento", evento.getDescricao());
        relatorio.put("ingressosDisponiveis", evento.getIngressosDisponiveis());
        relatorio.put("ingressosVendidos", vendidos);
        return relatorio;
    }

    public List<Evento> listarEventos(int limite) {
        return eventoRepository.findAll().stream()
                .limit(limite)
                .collect(Collectors.toList());
    }
}