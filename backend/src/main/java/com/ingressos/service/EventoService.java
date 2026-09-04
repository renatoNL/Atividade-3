package com.ingressos.service;

import com.ingressos.dto.EventoRequestDTO;
import com.ingressos.exception.RecursoNaoEncontradoException;
import com.ingressos.exception.RegraNegocioException;
import com.ingressos.model.Evento;
import com.ingressos.model.Ingresso;
import com.ingressos.repository.EventoRepository;
import com.ingressos.repository.IngressoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class EventoService {

    private final EventoRepository eventoRepository;
    private final IngressoRepository ingressoRepository;
    private static final long LIMITE_MAXIMO_EVENTOS = 50;

    public EventoService(EventoRepository eventoRepository, IngressoRepository ingressoRepository) {
        this.eventoRepository = eventoRepository;
        this.ingressoRepository = ingressoRepository;
    }

    @Transactional
    public Evento criarEvento(EventoRequestDTO dto, Long vendedorId) {
        if (eventoRepository.count() >= LIMITE_MAXIMO_EVENTOS) {
            throw new RegraNegocioException("Erro fatal: Limite máximo de " + LIMITE_MAXIMO_EVENTOS + " eventos atingido.");
        }

        Evento evento = new Evento();
        evento.setVendedorId(vendedorId);
        evento.setTitulo(dto.getTitulo());
        evento.setDescricao(dto.getDescricao());
        evento.setTipoEvento(dto.getTipoEvento());
        evento.setDataEvento(dto.getDataEvento());
        Evento eventoSalvo = eventoRepository.save(evento);

        Ingresso ingresso = new Ingresso();
        ingresso.setEventoId(eventoSalvo.getId());
        ingresso.setQuantidade(dto.getQuantidadeIngressos());
        ingresso.setValor(dto.getValorIngresso());
        ingressoRepository.save(ingresso);

        return eventoSalvo;
    }

    @Transactional
    public void cancelarEvento(Long id) {
        Evento evento = eventoRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Evento não encontrado."));
        
        // Em um sistema real com banco populado, as dependências devem ser excluídas na ordem reversa 
        // ou o cancelamento deve ser lógico (soft delete).
        eventoRepository.deleteById(id);
    }

    public List<Evento> listarEventos() {
        return eventoRepository.findAll();
    }
}