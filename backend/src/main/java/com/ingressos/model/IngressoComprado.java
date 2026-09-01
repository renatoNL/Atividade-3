package com.ingressos.model;

import jakarta.persistence.*;

@Entity
@Table(name = "compras")
public class IngressoComprado {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "evento_id")
    private Long eventoId;
    
    @Column(name = "comprador_id")
    private Long compradorId;
    
    private String status;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getEventoId() { return eventoId; }
    public void setEventoId(Long eventoId) { this.eventoId = eventoId; }
    public Long getCompradorId() { return compradorId; }
    public void setCompradorId(Long compradorId) { this.compradorId = compradorId; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}