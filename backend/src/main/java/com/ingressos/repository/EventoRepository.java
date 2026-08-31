package com.ingressos.repository;

import com.ingressos.model.Evento;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class EventoRepository {
    private final ConcurrentHashMap<String, Evento> eventos = new ConcurrentHashMap<>();

    public Evento save(Evento evento) {
        eventos.put(evento.getId(), evento);
        return evento;
    }

    public Optional<Evento> findById(String id) {
        return Optional.ofNullable(eventos.get(id));
    }

    public List<Evento> findAll() {
        return new ArrayList<>(eventos.values());
    }

    public void deleteById(String id) {
        eventos.remove(id);
    }
}