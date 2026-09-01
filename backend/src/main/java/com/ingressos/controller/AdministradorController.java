// src/main/java/com/ingressos/controller/AdministradorController.java
package com.ingressos.controller;

import com.ingressos.model.Evento;
import com.ingressos.service.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/eventos")
public class AdministradorController {
    private final EventoService eventoService;

    public AdministradorController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Evento criarEvento(@RequestBody Evento evento) {
        return eventoService.criarEvento(evento);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelarEvento(@PathVariable Long id) {
        eventoService.cancelarEvento(id);
    }

    @GetMapping
    public List<Evento> listarEventos() {
        return eventoService.listarEventos();
    }
}