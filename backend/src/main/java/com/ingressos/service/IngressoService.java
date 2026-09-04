package com.ingressos.service;

import com.ingressos.exception.RecursoNaoEncontradoException;
import com.ingressos.exception.RegraNegocioException;
import com.ingressos.model.Ingresso;
import com.ingressos.model.IngressoComprado;
import com.ingressos.repository.IngressoRepository;
import com.ingressos.repository.IngressoCompradoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class IngressoService {

    private final IngressoRepository ingressoRepository;
    private final IngressoCompradoRepository ingressoCompradoRepository;

    public IngressoService(IngressoRepository ingressoRepository, IngressoCompradoRepository ingressoCompradoRepository) {
        this.ingressoRepository = ingressoRepository;
        this.ingressoCompradoRepository = ingressoCompradoRepository;
    }

    @Transactional
    public IngressoComprado comprarIngresso(Long ingressoId, Integer quantidade, Long compradorId) {
        Ingresso ingresso = ingressoRepository.findById(ingressoId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Ingresso não encontrado."));

        if (ingresso.getQuantidade() < quantidade) {
            throw new RegraNegocioException("Quantidade de ingressos insuficiente.");
        }

        ingresso.setQuantidade(ingresso.getQuantidade() - quantidade);
        ingressoRepository.save(ingresso);

        IngressoComprado compra = new IngressoComprado();
        compra.setIngressoId(ingressoId);
        compra.setCompradorId(compradorId);
        compra.setQuantidadeComprada(quantidade);

        return ingressoCompradoRepository.save(compra);
    }

    public List<IngressoComprado> listarMeusIngressos(Long compradorId) {
        return ingressoCompradoRepository.findByCompradorId(compradorId);
    }

    @Transactional
    public void cancelarCompra(Long compraId) {
        IngressoComprado compra = ingressoCompradoRepository.findById(compraId)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Compra não encontrada."));

        Ingresso ingresso = ingressoRepository.findById(compra.getIngressoId())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Ingresso vinculado não encontrado."));

        ingresso.setQuantidade(ingresso.getQuantidade() + compra.getQuantidadeComprada());
        ingressoRepository.save(ingresso);
        
        ingressoCompradoRepository.delete(compra);
    }
}