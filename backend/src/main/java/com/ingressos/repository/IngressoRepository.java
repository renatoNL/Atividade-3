package com.ingressos.repository;

import com.ingressos.model.IngressoComprado;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class IngressoRepository {
    private final ConcurrentHashMap<String, IngressoComprado> ingressos = new ConcurrentHashMap<>();

    public IngressoComprado save(IngressoComprado ingresso) {
        ingressos.put(ingresso.getId(), ingresso);
        return ingresso;
    }

    public Optional<IngressoComprado> findById(String id) {
        return Optional.ofNullable(ingressos.get(id));
    }

    public List<IngressoComprado> findByCompradorId(String compradorId) {
        return ingressos.values().stream()
                .filter(i -> i.getCompradorId().equals(compradorId))
                .collect(Collectors.toList());
    }
    
    public List<IngressoComprado> findByEventoId(String eventoId) {
        return ingressos.values().stream()
                .filter(i -> i.getEventoId().equals(eventoId))
                .collect(Collectors.toList());
    }
}