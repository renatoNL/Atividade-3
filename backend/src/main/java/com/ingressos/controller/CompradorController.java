package com.ingressos.controller;

import com.ingressos.model.IngressoComprado;
import com.ingressos.service.IngressoService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comprador/ingressos")
public class CompradorController {

    private final IngressoService ingressoService;

    public CompradorController(IngressoService ingressoService) {
        this.ingressoService = ingressoService;
    }

    @PostMapping("/comprar")
    @ResponseStatus(HttpStatus.CREATED)
    public IngressoComprado comprarIngresso(@RequestParam String eventoId, @RequestParam String compradorId) {
        return ingressoService.comprarIngresso(eventoId, compradorId);
    }

    @GetMapping("/{compradorId}")
    public List<IngressoComprado> listarMeusIngressos(@PathVariable String compradorId) {
        return ingressoService.listarMeusIngressos(compradorId);
    }

    @PostMapping("/{ingressoId}/cancelar")
    public void cancelarCompra(@PathVariable String ingressoId) {
        ingressoService.cancelarCompra(ingressoId);
    }
}