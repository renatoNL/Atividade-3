package com.ingressos.controller;

import com.ingressos.model.Evento;
import com.ingressos.service.EventoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

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

    @PatchMapping("/{id}/preco")
    public Evento atualizarPreco(@PathVariable String id, @RequestParam BigDecimal novoPreco) {
        return eventoService.atualizarPreco(id, novoPreco);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void cancelarEvento(@PathVariable String id) {
        eventoService.cancelarEvento(id);
    }

    @GetMapping("/{id}/relatorio")
    public Map<String, Object> obterRelatorio(@PathVariable String id) {
        return eventoService.obterRelatorio(id);
    }

    @GetMapping
    public List<Evento> listarEventos(@RequestParam(defaultValue = "50") int limite) {
        return eventoService.listarEventos(limite);
    }
}