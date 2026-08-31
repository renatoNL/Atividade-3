package com.ingressos.model;

import java.util.UUID;

public class IngressoComprado {
    private String id;
    private String eventoId;
    private String compradorId;
    private String status; 

    public IngressoComprado() {}

    public IngressoComprado(String eventoId, String compradorId) {
        this.id = UUID.randomUUID().toString();
        this.eventoId = eventoId;
        this.compradorId = compradorId;
        this.status = "ATIVO";
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEventoId() { return eventoId; }
    public void setEventoId(String eventoId) { this.eventoId = eventoId; }

    public String getCompradorId() { return compradorId; }
    public void setCompradorId(String compradorId) { this.compradorId = compradorId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}